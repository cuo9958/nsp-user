import Router from "koa-router";

import test from "./api";

const router = new Router();

router.use("/api_user/test", test);

export default router;
