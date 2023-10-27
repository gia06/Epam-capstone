import { DataTypes, Model, Optional, Sequelize, UUID } from 'sequelize';
import { Models } from '../interfaces/general';

interface FeedbackAttributes {
  id: string;
  fromUser: string;
  toUser: string;
  content: string;
  companyName: string;
}

export class Feedback
  extends Model<FeedbackAttributes, Optional<FeedbackAttributes, 'id'>>
  implements FeedbackAttributes
{
  id: string;
  fromUser: string;
  toUser: string;
  content: string;
  companyName: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Feedback.init(
      {
        id: {
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

    Feedback.belongsTo(models.user, { foreignKey: 'from_user' });
    Feedback.belongsTo(models.user, { foreignKey: 'to_user' });

    sequelize.sync();
  }
}
