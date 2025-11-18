import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from '@modules/user/user.service';
import { type User } from '@modules/user/user.entity';
import { EncryptionService } from '@common/modules/encryption/encryption.service';
import type { Request, Response } from 'express';
import type { Session, SessionData } from 'express-session';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
    req: Request & { session: Session & Partial<SessionData> },
  ): Promise<{ success: boolean } | undefined> {
    if (!username || !email || !password) {
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
      throw new BadRequestException(
        'Password must be at least 8 characters long.',
      );
    }

    try {
      const passwordHash = await this.encryptionService.hashPassword(password);
      const user = await this.userService.createUser(
        username,
        email,
        passwordHash,
      );

      if (user) {
        this.logger.info('Succesfully created user', {
          id: user.id,
          email: user.email,
        });
        return await this.startSession(req, user);
      }
    } catch (err: unknown) {
      const errorMeta =
        err instanceof Error
          ? { message: err.message, stack: err.stack }
          : { message: 'Unknown error' };
      this.logger.error('Error signing up', errorMeta);
      // Don't leak database errors to client
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'Error signing up. Please try again.',
      );
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    if (!email || !password) {
      this.logger.error('Email and password are required.');
      throw new BadRequestException('Email and password are required.');
    }

    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.error('Invalid email or password.');
      throw new UnauthorizedException('Invalid email or password.');
    }

    const validate = await this.encryptionService.verifyPassword(
      password,
      user.password,
    );
    if (!validate) {
      this.logger.error('Invalid email or password.');
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user;
  }

  async startSession(
    req: Request & {
      session: Session & Partial<SessionData>;
      user?: Partial<User>;
    },
    user?: Partial<User>,
  ): Promise<{ user?: Partial<User>; success: boolean }> {
    const userId = user?.id || req.user?.id;

    if (!userId) {
      this.logger.error('Cannot start session: user ID is missing.');
      throw new InternalServerErrorException(
        'Cannot start session: user ID is missing.',
      );
    }

    (
      req.session as Session & Partial<SessionData> & { userId?: string }
    ).userId = userId;

    let sessionUser: Partial<User> | undefined = user;
    if (!sessionUser) {
      sessionUser = (await this.userService.findById(userId)) ?? undefined;
    }

    return {
      user: sessionUser,
      success: true,
    };
  }

  destroySession(session: Session & Partial<SessionData>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          return reject(err instanceof Error ? err : new Error(String(err)));
        }
        resolve();
      });
    });
  }

  async signOut(
    req: Request & {
      session: Session & Partial<SessionData>;
      res?: Response;
    },
  ): Promise<{ success: boolean }> {
    await this.destroySession(req.session);
    req.res?.clearCookie(process.env.SESSION_NAME || 'sid');
    return {
      success: true,
    };
  }
}
