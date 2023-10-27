import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Models } from '../interfaces/general';

interface ProjectAttributes {
  id: string;
  userId: string;
  image: string;
  description: string;
}

export class Project
  extends Model<ProjectAttributes, Optional<ProjectAttributes, 'id'>>
  implements ProjectAttributes
{
  id: string;
  userId: string;
  image: string;
  description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  static defineSchema(sequelize: Sequelize) {
    Project.init(
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
        image: {
          field: 'image',
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        description: {
          field: 'description',
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'projects',
        underscored: true,
        sequelize,
      }
    );
    sequelize.sync();
  }

  static associate(models: Models, sequelize: Sequelize) {
    // Example of how to define a association.
    // User.hasMany(models.project, {
    //   foreignKey: 'user_id'
    // });

    Project.belongsTo(models.user, {
      foreignKey: 'user_id',
    });

    sequelize.sync();
  }
}
