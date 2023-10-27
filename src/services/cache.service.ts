import { RedisClient } from 'redis';
import { promisify } from 'util';
import { User } from '../models/user.model';

export class CacheService {
  client: RedisClient;
  // set: (arg1: string, arg2: string) => Promise<unknown>;
  // get: (arg1: string) => Promise<unknown>;

  constructor(client: RedisClient) {
    this.client = client;
    // this.set = promisify(this.client.set);
    // this.get = promisify(this.client.get);
  }

  async findById(id: string) {
    return new Promise((resolve, reject) => {
      this.client.get(id, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(result));
      });
    });
  }

  async create(key: string, cv: string) {
    return new Promise((resolve, reject) => {
      this.client.set(key, cv, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  async delete(id: string) {
    return new Promise((resolve, reject) => {
      this.client.del(id, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  async update() {}
}
