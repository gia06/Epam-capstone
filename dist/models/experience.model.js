"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const sequelize_1 = require("sequelize");
class Experience extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Experience.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                field: 'user_id',
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            companyName: {
                field: 'company_name',
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            role: {
                field: 'role',
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            startDate: {
                field: 'startDate',
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                field: 'endDate',
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            description: {
                field: 'description',
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            tableName: 'experiences',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        // Example of how to define a association.
        // User.hasMany(models.project, {
        //   foreignKey: 'user_id'
        // });
        Experience.belongsTo(models.user, {
            foreignKey: 'user_id',
        });
    }
}
exports.Experience = Experience;
//# sourceMappingURL=experience.model.js.map