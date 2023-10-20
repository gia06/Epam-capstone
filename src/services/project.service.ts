import { Project } from '../models/project.model';

export class ProjectService {
  project: typeof Project;

  constructor(project: typeof Project) {
    this.project = project;
  }

  async create(project: Project) {
    const newProject = this.project.build(project);

    await newProject.save();
    return newProject;
  }

  async findAll() {
    return await this.project.findAll();
  }

  async findById(id: string) {
    return await this.project.findOne({ where: { id } });
  }

  async update(id: string, newProject: Project) {
    const storedProject = await this.project.findOne({ where: { id } });

    storedProject.image = newProject.image;
    storedProject.description = newProject.description;

    await storedProject.save();
    return storedProject;
  }

  async delete(id: string) {
    await this.project.destroy({ where: { id } });
  }
}
