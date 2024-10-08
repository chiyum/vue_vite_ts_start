import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import createRoutes from "@/_app/routes";

/* 設定預設導入頁面 */
const options = {
  defaultPath: "/home"
};

/* 建立router */
const router = createRouter({
  //hash模式
  history: createWebHashHistory(),
  //掛載處理好的routes
  routes: createRoutes(options) as Array<RouteRecordRaw>,
  scrollBehavior() {
    /** 換頁捲軸回到上方 */
    return { top: 0 };
  }
});

// router.beforeEach(async (to, from, next) => {
//   console.log(from, to);
//   next();
// });

export default router;
