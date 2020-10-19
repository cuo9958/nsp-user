/**
 * 安装脚本
 */
import UserBaseModel from "./model/user_base";
import UserWechatModel from "./model/user_wechat";
import UserInfoModel from "./model/user_info";
import crypto from "crypto";
import config from "config";

const dot = config.get("dot");
function CreatePWD(password: string) {
    const hash = crypto.createHash("sha256");
    hash.update(password + "" + dot);
    return hash.digest("hex").substr(0, 50);
}

//强制初始化mysql数据库
UserBaseModel.sync(true).then(() => {
    UserBaseModel.insert({ username: "admin", nickname: "疯狂紫萧", uuid: "123" }, CreatePWD("admin"));
});
UserWechatModel.sync(true);
UserInfoModel.sync(true);
