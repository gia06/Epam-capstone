import { Avatar } from '../interfaces/general';
import { comparePassword } from '../libs/bcrypt';
import { generateHash } from '../libs/bcrypt';
import { UserRole } from '../models/user.model';
import { User } from '../models/user.model';

export class AuthService {
  user: typeof User;

  constructor(user: typeof User) {
    this.user = user;
  }

  async findAll(): Promise<User[]> {
    return await this.user.findAll();
  }

  async create(user: User, avatar: Avatar): Promise<User> {
    const newUser = this.user.build(user);
    newUser.role = UserRole.User;
    newUser.password = await generateHash(user.password);
    newUser.image = `${avatar.destination}/${avatar.originalname}`;
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }

  async comparePassword(password: string, storedPassword: string): Promise<boolean> {
    return await comparePassword(password, storedPassword);
  }

  async findById(id: string): Promise<User> {
    const user = await this.user.findOne({ where: { id } });
    return user;
  }
}
