import {
  Controller,
  Post,
  Request,
  Get,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ProjectsService } from '@modules/projects/projects.service';
import { UserProjectsService } from '@modules/_relational/user-projects/user-projects.service';
import { Project } from '@modules/projects/projects.entity';
import { CreateProjectDto } from '@modules/projects/dtos/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userProjectsService: UserProjectsService,
  ) {}

  @Get()
  getUserProjects(@Request() req: { userId: string }): Promise<Array<Project>> {
    return this.userProjectsService.getUserProjects(req.userId);
  }

  ////////////////////////////////////////////////////

  @Post('new')
  async newProject(
    @Request() req: { userId: string },
    @Body() body: { project: CreateProjectDto },
  ): Promise<{ success: boolean; message: string }> {
    const project: CreateProjectDto = body.project;
    const userId: string = req.userId;

    const projectId = await this.projectsService.createProject(project);
    return await this.userProjectsService.bindProject({ projectId, userId });
  }

  ////////////////////////////////////////////////////

  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.projectsService.deleteProject(id);

    return { success: Boolean(result.affected ?? 0) };
  }
}
