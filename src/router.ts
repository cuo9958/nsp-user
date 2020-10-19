import Router from "koa-router";

import test from "./api";
import auth from "./api/auth";
import user from "./api/user";
import s_user from "./api/s_user";

const router = new Router();

router.use("/api_user/test", test);

//公共接口
router.use("/api_user/pub/auth", auth);
router.use("/api_user/pub/user", user);

//内部接口
router.use("/api_user/s/user", s_user);

export default router;
