/**
 * 安装脚本
 */
import UserBaseModel from "./model/user_base";
import UserWechatModel from "./model/user_wechat";
import UserInfoModel from "./model/user_info";

//强制初始化mysql数据库
UserBaseModel.sync(true).then(() => {
    UserBaseModel.insert({ username: "admin", nickname: "疯狂紫萧" }, "admin");
});
UserWechatModel.sync(true);
UserInfoModel.sync(true);
