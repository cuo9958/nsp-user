import Router from "koa-router";
import { ictx } from "../extends";
import { CheckUser } from "../middleware/check_user";
import { SuccessData, ErrorData } from "../service/utils";
import UserService from "../service/user";
import UserBaseModel from "../model/user_base";
import crypto from "crypto";
import config from "config";
import { customAlphabet } from "nanoid";

const router = new Router();
const dot = config.get("dot");
const UUIDFactory = customAlphabet("1234567890abcdef", 20);

function CreatePWD(password: string) {
    const hash = crypto.createHash("sha256");
    hash.update(password + "" + dot);
    return hash.digest("hex").substr(0, 50);
}
//鉴权接口
router.get("/", CheckUser(), function (ctx: ictx) {
    ctx.body = SuccessData(ctx.session.user);
});
//登录接口
router.post("/login", async function (ctx) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        return (ctx.body = ErrorData("用户名或密码不正确"));
    }
    try {
        const pwd = CreatePWD(password);
        console.log(pwd);
        const model = await UserBaseModel.login(username, pwd);
        if (!model) {
            return (ctx.body = ErrorData("用户名或密码不正确"));
        }
        const token = UserService.CreateToken(username, {
            username: model.username,
            nickname: model.nickname,
            uuid: model.uuid,
        });
        ctx.body = SuccessData(Object.assign({ token }, model.dataValues));
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData("用户名或密码不正确");
    }
});
//注册接口
router.post("/reg", async function (ctx) {
    const { username, password, nickname = "游客" } = ctx.request.body;
    if (!username || !password) {
        return (ctx.body = ErrorData("用户名或密码不能为空"));
    }

    try {
        const uuid = UUIDFactory();
        const pwd = CreatePWD(password);
        const model = {
            username,
            nickname,
            uuid,
        };
        const isInsert = await UserBaseModel.isExist(username);
        if (isInsert) throw new Error("账号已经存在");
        await UserBaseModel.insert(model, pwd);
        const token = UserService.CreateToken(username, model);
        ctx.body = SuccessData({ token, username, nickname, uuid });
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message || "注册失败");
    }
});

export default router.routes();
