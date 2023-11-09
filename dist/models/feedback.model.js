"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const sequelize_1 = require("sequelize");
class Feedback extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Feedback.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            fromUser: {
                field: 'from_user',
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            toUser: {
                field: 'to_user',
                type: sequelize_1.UUID,
                allowNull: false,
            },
            content: {
                field: 'content',
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            companyName: {
                field: 'company_name',
                type: sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            tableName: 'feedbacks',
            underscored: true,
            sequelize,
        });
    }
    static associate(models, sequelize) {
        // Example of how to define a association.
        // User.hasMany(models.project, {
        //   foreignKey: 'user_id'
        // });
        Feedback.belongsTo(models.user, { foreignKey: 'from_user' });
        Feedback.belongsTo(models.user, { foreignKey: 'to_user' });
        sequelize.sync();
    }
}
exports.Feedback = Feedback;
//# sourceMappingURL=feedback.model.js.map