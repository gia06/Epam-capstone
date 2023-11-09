import { File } from '../interfaces/general';
import { Project } from '../models/project.model';

export class ProjectService {
  project: typeof Project;

  constructor(project: typeof Project) {
    this.project = project;
  }

  async create(userId: string, project: Project, file: File): Promise<Project> {
    const newProject = this.project.build({
      userId,
      image: `${file.destination}/${file.originalname}`,
      ...project,
    });

    await newProject.save();
    return newProject;
  }

  async findAll(): Promise<Project[]> {
    return await this.project.findAll();
  }

  async findById(id: string): Promise<Project> {
    return await this.project.findOne({ where: { id } });
  }

  async findByName(projectName: string): Promise<Project> {
    return await this.project.findOne({ where: { projectName } });
  }

  async update(id: string, newProject: Project): Promise<Project> {
    const storedProject = await this.project.findOne({ where: { id } });

    storedProject.image = newProject.image;
    storedProject.description = newProject.description;

    await storedProject.save();
    return storedProject;
  }

  async delete(id: string): Promise<void> {
    await this.project.destroy({ where: { id } });
  }
}
