import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserProject } from './user-projects.entity';
import { User } from '../../user/user.entity';
import { Project } from '@modules/projects/projects.entity';
import { CreateUserProjectDto } from './dto/create-project.dto';

@Injectable()
export class UserProjectsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(UserProject)
    private readonly userProjectsRepository: Repository<UserProject>,
  ) {}

  async bindProject({
    projectId,
    userId,
  }: CreateUserProjectDto): Promise<{ success: boolean; message: string }> {
    if (!projectId || !userId) {
      this.logger.error(`Missing ${projectId ? 'project' : 'user'} id`);
      throw new InternalServerErrorException('missing project and user ids.');
    }

    try {
      const newProject = this.userProjectsRepository.create({
        projectId,
        userId,
      });
      await this.userProjectsRepository.save(newProject);
      return {
        success: true,
        message: 'Project created successfully',
      };
    } catch (err) {
      this.logger.error(
        'Something went wrong while creating the project: ' + err,
      );
      throw new InternalServerErrorException(
        'Something went wrong while creating the project.',
      );
    }
  }

  async getUserProjects(userId: User['id']): Promise<Project[]> {
    if (!userId) {
      this.logger.error('Missing user id');
      throw new InternalServerErrorException('Missing user id.');
    }

    try {
      const userProjects = await this.userProjectsRepository
        .createQueryBuilder('user_projects')
        .leftJoinAndSelect('user_projects.project', 'project')
        .where('user_projects.userId = :userId', { userId })
        .getMany();

      return userProjects.map((userProject) => userProject.project);
    } catch (err) {
      this.logger.error('Something went wrong while fetching projects: ' + err);
      throw new InternalServerErrorException(
        'Something went wrong while fetching project.',
      );
    }
  }
}
