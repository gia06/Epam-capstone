import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.createTable('experiences', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    companyName: {
      field: 'company_name',
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    role: {
      field: 'role',
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    startDate: {
      field: 'startDate',
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      field: 'endDate',
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
};

export const down: MigrationFn<Sequelize> = async ({ context }) => {
  const q = context.getQueryInterface();

  await q.dropTable('experiences');
};
