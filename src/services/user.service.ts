import { comparePassword, generateHash } from '../libs/bcrypt';
import { User, UserRole } from '../models/user.model';
import { Avatar } from '../interfaces/general';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';

export class UserService extends AuthService {
  project: typeof Project;
  experience: typeof Experience;

  constructor(user: typeof User, project: typeof Project, experience: typeof Experience) {
    super(user);
    this.project = project;
    this.experience = experience;
  }

  async delete(id: string) {
    await this.user.destroy({ where: { id } });
  }

  async update(id: string, newUser: User) {
    const storedUser = await this.findById(id);

    storedUser.firstName = newUser.firstName;
    storedUser.lastName = newUser.lastName;
    storedUser.title = newUser.title;
    storedUser.summary = newUser.summary;
    storedUser.email = newUser.email;
    storedUser.password = await generateHash(newUser.password);

    await storedUser.save();
    return storedUser;
  }

  async aggregate(id: string) {
    return await this.user.findOne({ where: { id }, include: [Project, Experience] });
  }
}
