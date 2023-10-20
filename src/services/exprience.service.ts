import { Experience } from '../models/experience.model';

export class ExperienceService {
  experience: typeof Experience;

  constructor(experience: typeof Experience) {
    this.experience = experience;
  }

  async findAll() {
    return await this.experience.findAll();
  }

  async create(exp: Experience) {
    try {
      const newExp = this.experience.build(exp);
      await newExp.save();
      return newExp;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: string) {
    return await this.experience.findOne({ where: { id } });
  }

  async update(id: string, newExp: Experience) {
    const storedExp = await this.experience.findOne({ where: { id } });

    storedExp.companyName = newExp.companyName;
    storedExp.role = newExp.role;
    storedExp.startDate = newExp.startDate;
    storedExp.endDate = newExp.endDate;
    storedExp.description = newExp.description;

    await storedExp.save();
    return storedExp;
  }

  async delete(id: string) {
    await this.experience.destroy({ where: { id } });
  }
}
