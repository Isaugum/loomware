import { Controller, Post, Request, Get, Body, Delete, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UserProjectsService } from '../_relational/user-projects/user-projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly userProjectsService: UserProjectsService
    ) {}

    @Get()
    getUserProjects(@Request() req: { userId: string }): Promise<Array<Project>>
    {
        return this.userProjectsService.getUserProjects(req.userId);
    }

    ////////////////////////////////////////////////////

    @Post('new')
    async newProject(@Request() req, @Body() body: { project: CreateProjectDto }): Promise<{ success: boolean }> 
    {
        const project = body.project;
        const userId = req.userId;

        const projectId = await this.projectsService.createProject(project);
        return await this.userProjectsService.bindProject({ projectId, userId });
    }

    ////////////////////////////////////////////////////

    @Delete('delete/:id')
    async deleteProject(@Request() req, @Param() id: string): Promise<{ success: boolean }> 
    {
        const userId = req.userId;
    
        return await this.projectsService.deleteProject(id, userId);;
    }
}