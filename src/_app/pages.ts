import { Component } from "vue";
import { markRaw } from "vue";

// 定義頁面模組的類型
interface PageModule {
  default: {
    layout?: string;
    title?: string;
    header?: string;
    noScroll?: boolean;
  };
}

// 定義路由的類型
interface Route {
  path: string;
  name: string;
  meta: {
    layout: string;
    title: string;
    useAwd?: boolean;
  };
  component:
    | (() => Promise<Component>)
    | {
        desktop: () => Promise<Component>;
        mobile: () => Promise<Component>;
      };
}

// 使用 import.meta.glob 獲取所有的 .vue 文件
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.glob<PageModule>("../pages/**/*.vue", {
  eager: true
});

const modules: Route[] = [];

for (const path in files) {
  /* 抓取路由 */
  const name = path.replace("../pages", "").toLowerCase().replace(".vue", "");
  let currentPath = name;

  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");

  /* /_id => /:id  動態路由 */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  const pageModule = defaults[path];

  /* 檢查是否為移動版路徑 */
  const isMobilePath = currentPath.endsWith("-mobile");

  /* 如果是移動版路徑，我們跳過它，因為我們將在桌面版路徑中處理它 */
  if (isMobilePath) {
    continue;
  }

  /* 檢查是否存在對應的移動版文件 */
  const mobilePath = `${path.replace(".vue", "-mobile.vue")}`;
  const mobileComponent = files[mobilePath];

  if (mobileComponent) {
    /* 存在移動版，使用 AWD */
    modules.push({
      path: currentPath,
      name: currentPath,
      meta: {
        layout: pageModule.default.layout || "layout-default",
        title: pageModule.default.title || "app.project.title",
        useAwd: true
      },
      component: markRaw({
        desktop: files[path],
        mobile: mobileComponent
      })
    });
  } else {
    /* 不存在移動版，使用普通路由 */
    modules.push({
      path: currentPath,
      name: currentPath,
      meta: {
        layout: pageModule.default.layout || "layout-default",
        title: pageModule.default.title || "app.project.title"
      },
      component: files[path]
    });
  }
}

export default modules;
