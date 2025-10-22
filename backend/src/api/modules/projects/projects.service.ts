import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Project } from './projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from '@modules/user/user.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>
    ) {}

    async findById(id: Project['id']): Promise<Partial<Project> | null>
    {
      const project = await this.projectRepository.findOne({
        where: { id },
        select: ['id', 'title']
      });

      if (!project) { throw new InternalServerErrorException('Project with id ' + id + ' not found.') };
      return project;
    }

    async createProject(project: CreateProjectDto): Promise<any>
    {
        const newProject = this.projectRepository.create(project);

        try {
            const savedProject = await this.projectRepository.save(newProject);
            this.logger.info('Project ' + savedProject.id + ' ' + savedProject.title  + ' succesfully created');
            return savedProject.id;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async deleteProject(projectId: Project['id'], UserId: User['id']): Promise<any>
    {

        try {
            const result = this.projectRepository.delete(projectId);
            this.logger.info('Deleted project: ' + result);

            return result;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
