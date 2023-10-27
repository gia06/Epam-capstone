import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';

interface ExperienceAttributes {
  id: string;
  userId: string;
  companyName: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export class Experience
  extends Model<ExperienceAttributes, Optional<ExperienceAttributes, 'userId'>>
  implements ExperienceAttributes
{
  id: string;
  userId: string;
  companyName: string;
  role: string;
  startDate: Date;
  endDate: Date;
  description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Experience.init(
      {
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
      },
      {
        tableName: 'experiences',
        underscored: true,
        sequelize,
      }
    );
    sequelize.sync();
  }

  static async associate(models: Models, sequelize: Sequelize) {
    Experience.belongsTo(models.user, {
      foreignKey: 'user_id',
    });

    sequelize.sync();
  }
}
