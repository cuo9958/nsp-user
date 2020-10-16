import Koa from "koa";
import KoaBody from "koa-body";
import Session from "koa-session";
import routers from "./router";

import pkg from "../package.json";

import "./task";

const app = new Koa();

const CONFIG = {
    key: "pickstars",
    maxAge: 86400000,
};
app.keys = [pkg.name];
app.use(Session(CONFIG, app));
app.use(
    KoaBody({
        multipart: true,
        formLimit: "20mb",
    })
);

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

const port = process.env.PORT || 18900;

app.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
