import { Module } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from './user-projects.entity';
import { Project } from '../../projects/projects.entity';
import { User } from '../../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProject, Project, User])
  ],
  providers: [UserProjectsService],
  exports: [UserProjectsService]
})
export class UserProjectsModule {}
