"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["User"] = "User";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User extends sequelize_1.Model {
    static defineSchema(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            firstName: {
                field: 'first_name',
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            lastName: {
                field: 'last_name',
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
            image: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: true,
            },
            title: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            summary: {
                type: new sequelize_1.DataTypes.STRING(256),
                allowNull: false,
            },
            role: {
                type: new sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'users',
            underscored: true,
            sequelize,
        });
        sequelize.sync();
    }
    static associate(models, sequelize) {
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
exports.User = User;
//# sourceMappingURL=user.model.js.map