import Router from "koa-router";

import test from "./api";
import Login from "./api/login";

const router = new Router();

router.use("/api_user/test", test);

//公共接口
router.use("/api_user/pub/login", Login);

//内部接口

export default router;
