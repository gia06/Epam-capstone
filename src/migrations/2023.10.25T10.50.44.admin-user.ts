import { DataTypes, STRING, Sequelize } from 'sequelize';
import { generateHash } from '../libs/bcrypt';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  const password = await generateHash('admin');

  await q.bulkInsert('users', [
    {
      id: '29173c82-0b38-11gd-9284-7t7454c8c891',
      first_name: 'admin',
      last_name: 'admin',
      image: 'images/admin',
      title: 'adminTItle',
      summary: 'Summary',
      role: 'Admin',
      email: 'admin@example.com',
      password,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.bulkDelete('users', { role: 'Admin' });
};
