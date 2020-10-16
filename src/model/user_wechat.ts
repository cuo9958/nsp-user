import { Model, DataTypes } from "sequelize";
import db from "../db//mysql";

/**
 * 微信登录表
 */
class UserWechat extends Model {}
UserWechat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        openid: {
            type: DataTypes.STRING(30),
            defaultValue: "",
            comment: "微信openid",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_user_wechat",
        indexes: [
            {
                unique: true,
                fields: ["openid"],
            },
        ],
    }
);

//强制初始化数据库
// UserWechat.sync({ force: true });

export default {
    sync: (force = true) => UserWechat.sync({ force }),
    insert: function (model: any) {
        return UserWechat.create(model);
    },
    get: function (id: number) {
        return UserWechat.findOne({
            where: {
                id,
            },
        });
    },
};
