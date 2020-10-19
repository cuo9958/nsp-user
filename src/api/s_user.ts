import Router from "koa-router";
import { ictx } from "../extends";
import { CheckServer } from "../middleware/check_server";
import { SuccessData, ErrorData } from "../service/utils";
import UserInfoModel from "../model/user_info";
import UserService from "../service/user";
import UserBaseModel from "../model/user_base";

/**
 * 用户相关操作接口,
 * 公开接口，只针对当前登录用户
 */
const router = new Router();

//获取用户信息
router.get("/", CheckServer(), async function (ctx: ictx) {
    try {
        const { token, username, uuid } = ctx.query;
        if (uuid) {
            const model = await UserBaseModel.getByUuid(uuid);
            return (ctx.body = SuccessData(model));
        }
        if (token) {
            const model = UserService.CheckUserToken(username, token);
            ctx.body = SuccessData(model);
        } else {
            const model = await UserBaseModel.getByUserName(username);
            ctx.body = SuccessData(model);
        }
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});

//修改用户信息
router.post("/update", CheckServer(), async function (ctx: ictx) {
    try {
        const user = ctx.session.user;
        const { headimg, remark } = ctx.request.body;
        const model = {
            headimg,
            remark,
        };
        const info = await UserInfoModel.update(model, user.uuid);
        ctx.body = SuccessData(info);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});

export default router.routes();
