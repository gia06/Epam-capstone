"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Project.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                field: 'user_id',
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            image: {
                field: 'image',
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            description: {
                field: 'description',
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            tableName: 'projects',
            underscored: true,
            sequelize,
        });
        sequelize.sync();
    }
    static associate(models, sequelize) {
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
exports.Project = Project;
//# sourceMappingURL=project.model.js.map