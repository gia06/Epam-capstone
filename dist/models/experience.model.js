"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const sequelize_1 = require("sequelize");
class Experience extends sequelize_1.Model {
    static defineSchema(sequelize) {
        Experience.init({
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
        sequelize.sync();
    }
    static associate(models, sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            Experience.belongsTo(models.user, {
                foreignKey: 'user_id',
            });
            sequelize.sync();
        });
    }
}
exports.Experience = Experience;
//# sourceMappingURL=experience.model.js.map