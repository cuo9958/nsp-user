/**
 * 安装脚本
 */
import UserBaseModel from "./model/user_base";
import UserWechatModel from "./model/user_wechat";

//强制初始化mysql数据库
UserBaseModel.sync(true);
UserWechatModel.sync(true);
