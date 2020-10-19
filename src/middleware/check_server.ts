import { ictx } from "../extends";
import { ErrorData } from "../service/utils";
import config from "config";

const pass_check = config.get("pass_check");

export function CheckServer() {
    return async function (ctx: ictx, next) {
        const { pass_check } = ctx.headers;

        //空参数是没登录
        if (!pass_check) {
            return (ctx.body = ErrorData("不是服务调用"));
        }
        await next();
    };
}
