import { AuthModule } from '@modules/auth/auth.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProjectsModule, UserModule, AuthModule],
    exports: [ProjectsModule, UserModule, AuthModule]
})
export class ApiModule {}