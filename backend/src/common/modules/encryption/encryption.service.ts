import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger   } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as argon from 'argon2';

@Injectable()
export class EncryptionService {
    
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) public readonly logger: Logger,
    ) {}

    async hashPassword(rawPassword: string): Promise<string>
    {
        if(!rawPassword) {
            this.logger.error('Password is required.');
            throw new BadRequestException('Password is required.');
        }

        try {
            return await argon.hash(rawPassword);
        } catch (err) {
            this.logger.error('Failed to hash password: ', err);
            throw new InternalServerErrorException('Failed to hash password.');
        }
    }

    async verifyPassword(rawPassword: string, hashPassword: string): Promise<boolean>
    {
        if(!rawPassword) {
            this.logger.error('Password is required.');
            throw new BadRequestException('Password is required.');
        }

        try {
            return await argon.verify(hashPassword, rawPassword);
        } catch (err) { 
            this.logger.error('Password verification failed: ', err);
            throw new InternalServerErrorException('Password verification failed.');
        }
    }

    generatePassword(length: number = 10): string
    {
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numericChars = "0123456789";
        const specialChars = "!@#$%^&*()-_+=";

        const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;
        let password = "";

        try {
            for(let i; i <= length; i++) {
                const randomIndex = Math.floor(Math.random() * allChars.length);
                password = password + allChars[randomIndex];
            }
        } catch (err) {
            throw new InternalServerErrorException('Failed to generate password.');
        }

        return password;
    }
}
