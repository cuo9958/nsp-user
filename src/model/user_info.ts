import { Model, DataTypes } from "sequelize";
import db from "../db//mysql";

interface UserInfoAttr {
    id: number;
    uuid: string;
    headimg: string;
    remark: string;
}
/**
 * 微信登录表
 */
class UserInfo extends Model implements UserInfoAttr {
    public id: number;
    public uuid: string;
    public headimg: string;
    public remark: string;
}
UserInfo.init(
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
        headimg: {
            type: DataTypes.STRING(50),
            defaultValue: "",
            comment: "头像",
        },
        remark: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "备注",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_user_info",
        indexes: [
            {
                unique: true,
                fields: ["uuid"],
            },
        ],
    }
);

//强制初始化数据库
// UserInfo.sync({ force: true });

export default {
    sync: (force = true) => UserInfo.sync({ force }),
    insert: function (model: any) {
        return UserInfo.create(model);
    },
    get: function (uuid: string) {
        return UserInfo.findOne({
            where: {
                uuid,
            },
        });
    },
    update(model, uuid) {
        return UserInfo.update(model, {
            where: { uuid },
        });
    },
};
