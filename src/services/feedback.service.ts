import { Feedback } from '../models/feedback.model';

export class FeedbackService {
  feedback: typeof Feedback;

  constructor(project: typeof Feedback) {
    this.feedback = project;
  }

  async create(fromUser: string, project: Feedback) {
    const newProject = this.feedback.build({ fromUser, ...project });

    await newProject.save();
    return newProject;
  }

  async findAll() {
    return await this.feedback.findAll();
  }

  async findById(id: string) {
    return await this.feedback.findOne({ where: { id } });
  }

  async update(id: string, newProject: Feedback) {
    const storedProject = await this.feedback.findOne({ where: { id } });

    storedProject.content = newProject.content;
    storedProject.companyName = newProject.companyName;

    await storedProject.save();
    return storedProject;
  }

  async delete(id: string) {
    await this.feedback.destroy({ where: { id } });
  }
}
