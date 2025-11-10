import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { promisify } from 'util';
import { UserService } from '../../../api/modules/user/user.service';
import { type User } from '../../../api/modules/user/user.entity';
import { EncryptionService } from 'src/common/modules/encryption/encryption.service';


@Injectable()
export class AuthService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
    ) {}

    async signUp(email: string, password: string, req: Request): Promise<{ success: boolean } | undefined>
    {
        if(!email || !password) {
            this.logger.error('Email and password are required.');
            throw new BadRequestException('Email and password are required.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.logger.error('Invalid email format.');
            throw new BadRequestException('Invalid email format.');
        }

        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            this.logger.error('User with this email already exists.');
            throw new BadRequestException('User with this email already exists.');
        }

        if (password.length < 8) {
            this.logger.error('Password must be at least 8 characters long.');
            throw new BadRequestException('Password must be at least 8 characters long.');
        }

        try {
            const passwordHash = await this.encryptionService.hashPassword(password);
            const user = await this.userService.createUser(email, passwordHash);

            if (user) {
                this.logger.log('Succesfully created user: ', user.id + ' - ' + user.email); 
                return await this.startSession(req, user);
            }
        } catch (err) {
            this.logger.error('Error signing up: ', err);
            // Don't leak database errors to client
            if (err instanceof BadRequestException) {
                throw err;
            }
            throw new InternalServerErrorException('Error signing up. Please try again.');
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

    async startSession(req: any, user?: Partial<User>): Promise<{ success: boolean }>
    {
        const userId = user?.id || req.user?.id;
        
        if (!userId) {
            this.logger.error('Cannot start session: user ID is missing.');
            throw new InternalServerErrorException('Cannot start session: user ID is missing.');
        }

        req.session.userId = userId;
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