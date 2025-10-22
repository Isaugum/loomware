import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../../api/modules/user/user.module';
import { EncryptionModule } from '../encryption/encryption.module';
import { SessionModule } from '../session/session.module';
import { LocalStrategy } from '../../strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    EncryptionModule,
    SessionModule
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}