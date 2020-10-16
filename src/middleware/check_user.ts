import { ictx } from "../extends";
import UserService from "../service/user";
import { ErrorData } from "../service/utils";

export function CheckUser() {
    return async function (ctx: ictx, next) {
        const { token, username } = ctx.headers;

        //空参数是没登录
        if (!token || !username) {
            return (ctx.body = ErrorData("还没有登录"));
        }
        try {
            const model: any = await UserService.CheckUserToken(username, token);
            if (!model) {
                return (ctx.body = ErrorData("还没有登录"));
            }
            await next();
        } catch (error) {
            console.log(error);
            return (ctx.body = ErrorData("还没有登录"));
        }
    };
}
