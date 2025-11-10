import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { EncryptionModule } from '../../../common/modules/encryption/encryption.module';
import { SessionModule } from '../../../common/modules/session/session.module';
import { LocalStrategy } from '../../../common/strategies/local.strategy';

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