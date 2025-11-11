import { Module } from '@nestjs/common';
import { ProjectsController } from '@modules/projects/projects.controller';
import { ProjectsService } from '@modules/projects/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@modules/projects/projects.entity';
import { UserProjectsModule } from '@modules/_relational/user-projects/user-projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserProjectsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
