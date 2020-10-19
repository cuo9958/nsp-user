import { Model, DataTypes, Optional } from "sequelize";
import db from "../db//mysql";

interface UserBaseAttr {
    id: number;
    uuid: string;
    username: string;
    nickname: string;
    pwd: string;
    status: number;
}
// interface UserBaseOption extends Optional<UserBaseAttr, "id"> {}
/**
 * 用户基础表，提供：
 * 1. 登录注册
 * 2. 鉴权、常用信息
 */
class UserBase extends Model<UserBaseAttr> implements UserBaseAttr {
    public id!: number;
    public uuid!: string;
    public username!: string;
    public nickname!: string;
    public pwd!: string;
    public status!: number;

    public dataValues: UserBaseAttr;
}

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
        nickname: {
            type: DataTypes.STRING(50),
            defaultValue: "",
            comment: "昵称",
        },
        pwd: {
            type: DataTypes.STRING(50),
            defaultValue: "",
            comment: "密码",
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            comment: "用户状态，0：禁止；1：启用",
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
    sync: (force = true) => UserBase.sync({ force }),
    insert: function (model: any, pwd: string) {
        return UserBase.create(Object.assign({}, model, { pwd }));
    },
    get: function (id: number) {
        return UserBase.findOne({
            where: {
                id,
            },
        });
    },
    isExist(username: string) {
        return UserBase.findOne({
            where: {
                username,
            },
            attributes: ["username"],
        });
    },
    login(username: string, pwd: string) {
        return UserBase.findOne({
            where: {
                username,
                pwd,
                status: 1,
            },
            attributes: ["uuid", "username", "nickname", "createdAt"],
        });
    },
};
