import Router from "koa-router";
import { ictx } from "../extends";
import { CheckUser } from "../middleware/check_user";
import { SuccessData, ErrorData } from "../service/utils";
import UserService from "../service/user";
import UserBaseModel from "../model/user_base";
import crypto from "crypto";
import config from "config";

const router = new Router();
const dot = config.get("dot");

//鉴权接口
router.get("/", CheckUser(), function (ctx: ictx) {
    ctx.body = SuccessData(null);
});
//登录接口
router.post("/login", async function (ctx) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        return (ctx.body = ErrorData("用户名或密码不正确"));
    }
    try {
        const hash = crypto.createHash("sha256");
        hash.update(password + "" + dot);
        const pwd = hash.digest("hex");
        const model = await UserBaseModel.login(username, pwd);
        if (!model) {
            return (ctx.body = ErrorData("用户名或密码不正确"));
        }
        UserService.CreateToken(username, model);
        ctx.body = SuccessData(model);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData("用户名或密码不正确");
    }
});
//注册接口
router.post("/reg", function (ctx) {
    ctx.body = "注册接口";
});

export default router.routes();
