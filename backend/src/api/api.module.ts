import { ProjectsModule } from '@modules/projects/projects.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProjectsModule, UserModule],
    exports: [ProjectsModule, UserModule]
})
export class ApiModule {}