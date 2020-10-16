/**
 * 安装脚本
 */
import UserBaseModel from "./model/user_base";

//强制初始化mysql数据库
UserBaseModel.sync({ force: true });
