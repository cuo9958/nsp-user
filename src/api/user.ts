import Router from "koa-router";
import { ictx } from "../extends";
import { CheckUser } from "../middleware/check_user";
import { SuccessData, ErrorData } from "../service/utils";
import UserInfoModel from "../model/user_info";

/**
 * 用户相关操作接口,
 * 公开接口，只针对当前登录用户
 */
const router = new Router();

//获取用户信息
router.get("/", CheckUser(), async function (ctx: ictx) {
    try {
        const user = ctx.session.user;
        const info = await UserInfoModel.get(user.uuid);
        ctx.body = SuccessData(info);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});

//修改用户信息
router.post("/update", CheckUser(), async function (ctx: ictx) {
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
