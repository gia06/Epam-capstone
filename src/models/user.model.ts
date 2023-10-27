import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  summary: string;
  role: UserRole;
  email: string;
  password: string;
}

export class User
  extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
  implements UserAttributes
{
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  summary: string;
  role: UserRole;
  email: string;
  password: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          field: 'first_name',
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        lastName: {
          field: 'last_name',
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        image: {
          type: new DataTypes.STRING(256),
          allowNull: true,
        },
        title: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        summary: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        role: {
          type: new DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        underscored: true,
        sequelize,
      }
    );
    sequelize.sync();
  }

  static associate(models: Models, sequelize: Sequelize) {
    User.hasMany(models.feedback, { foreignKey: 'from_user' });
    User.hasMany(models.feedback, { foreignKey: 'to_user' });

    User.hasMany(models.project, {
      foreignKey: 'user_id',
    });

    User.hasMany(models.experience, {
      foreignKey: 'user_id',
    });

    sequelize.sync();
  }
}
