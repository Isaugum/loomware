import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EncryptionService } from '../encryption/encryption.service';
import { promisify } from 'util';
import { UserService } from '../../../api/modules/user/user.service';
import { type User } from '../../../api/modules/user/user.entity';


@Injectable()
export class AuthService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
    ) {}

    async signUp(email: string, password: string): Promise<{ success: boolean } | undefined>
    {
        if(!email || !password) {
            this.logger.error('Email and password are required.');
            throw new BadRequestException('Email and password are required.');
        }

        try {
            const passwordHash = await this.encryptionService.hashPassword(password);
            const user = await this.userService.createUser(email, passwordHash);

            if (user) {
                this.logger.log('Succesfully created user: ', user.id + ' - ' + user.email);
                return await this.startSession(user);
            }
        } catch (err) {
            this.logger.error('Error signing up: ', err);
            throw new InternalServerErrorException('Error signing up: ', err);
        }
    }

    async validateUser(email: string, password: string): Promise<User>
    {
        if(!email || !password) {
            this.logger.error('Email and password are required.');
            throw new BadRequestException('Email and password are required.');
        }

        const user = await this.userService.findByEmail(email);
        if (!user) {
            this.logger.error('Invalid email or password.');
            throw new UnauthorizedException('Invalid email or password.');
        }

        const validate = await this.encryptionService.verifyPassword(password, user.password);
        if (!validate) {
            this.logger.error('Invalid email or password.');
            throw new UnauthorizedException('Invalid email or password.');
        }

        return user;
    }

    async startSession(req: any): Promise<{ success: boolean }>
    {
        req.session.userId = req.user.id;
        return {
            success: true
        };
    }

    async destroySession(session: any) 
    {
        return await promisify(session.destroy).bind(session)();
    }

    async signOut(
        req: { 
            session: any; 
            res: { 
                clearCookie: (value: string) => void; 
            }; 
        }
    ): Promise<{ success: boolean }>
    {
        await this.destroySession(req.session);
        req.res?.clearCookie(process.env.SESSION_NAME || 'sid');
        return {
            success: true
        }
    }
}