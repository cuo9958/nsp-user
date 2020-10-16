import { Model, DataTypes } from "sequelize";
import db from "../db//mysql";

/**
 * 用户基础表，提供：
 * 1. 登录注册
 * 2. 鉴权、常用信息
 */
class UserBase extends Model {}
UserBase.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.STRING(20),
            defaultValue: "",
            comment: "用户对外id",
        },
        username: {
            type: DataTypes.STRING(50),
            defaultValue: "",
            comment: "用户名",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_user_base",
        indexes: [
            {
                fields: ["uuid"],
            },
        ],
    }
);

//强制初始化数据库
// UserBase.sync({ force: true });

export default {
    sync: UserBase.sync,
    insert: function (model: any) {
        return UserBase.create(model);
    },
    get: function (id: number) {
        return UserBase.findOne({
            where: {
                id,
            },
        });
    },
};
