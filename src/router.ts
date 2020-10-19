import Router from "koa-router";

import test from "./api";
import auth from "./api/auth";

const router = new Router();

router.use("/api_user/test", test);

//公共接口
router.use("/api_user/pub/auth", auth);

//内部接口

export default router;
