import { DataTypes, Model, Optional, Sequelize, UUID } from 'sequelize';
import { Models } from '../interfaces/general';

interface FeedbackAttributes {
  id: number;
  fromUser: number;
  toUser: number;
  content: string;
  companyName: string;
}

export class Feedback
  extends Model<FeedbackAttributes, Optional<FeedbackAttributes, 'id'>>
  implements FeedbackAttributes
{
  id: number;
  fromUser: number;
  toUser: number;
  content: string;
  companyName: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Feedback.init(
      {
        id: {
          // type: DataTypes.INTEGER.UNSIGNED,
          // autoIncrement: true,
          // primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        fromUser: {
          field: 'from_user',
          type: DataTypes.UUID,
          allowNull: false,
        },
        toUser: {
          field: 'to_user',
          type: UUID,
          allowNull: false,
        },
        content: {
          field: 'content',
          type: DataTypes.TEXT,
          allowNull: false,
        },
        companyName: {
          field: 'company_name',
          type: DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: 'feedbacks',
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(models: Models, sequelize: Sequelize) {
    // Example of how to define a association.
    // User.hasMany(models.project, {
    //   foreignKey: 'user_id'
    // });
    sequelize.sync();
  }
}
