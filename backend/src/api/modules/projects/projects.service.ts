import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@modules/projects/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateProjectDto } from '@modules/projects/dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findById(id: Project['id']): Promise<Partial<Project> | null> {
    const project = await this.projectRepository.findOne({
      where: { id },
      select: ['id', 'title'],
    });

    if (!project) {
      throw new NotFoundException('Project with id ' + id + ' not found.');
    }
    return project;
  }

  async createProject(project: CreateProjectDto): Promise<Project['id']> {
    const newProject = this.projectRepository.create(project);

    try {
      const savedProject = await this.projectRepository.save(newProject);
      this.logger.info(
        'Project ' +
          savedProject.id +
          ' ' +
          savedProject.title +
          ' succesfully created',
      );
      return savedProject.id;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteProject(projectId: Project['id']): Promise<DeleteResult> {
    try {
      const result = await this.projectRepository.delete(projectId);
      this.logger.info('Deleted project', { projectId, result });

      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
