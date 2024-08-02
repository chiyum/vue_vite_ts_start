import { Component } from "vue";

// 定義頁面模組的類型
interface PageModule {
  default: {
    layout?: string;
    title?: string;
    header?: string;
    noScroll?: boolean;
    // inSidebar?: boolean; // 後續自動新增sidebar
  };
}

// 定義路由的類型
interface Route {
  path: string;
  name: string;
  meta: {
    layout: string;
    title: string;
    // inSidebar: boolean;
  };
  component: () => Promise<Component>;
}

// 使用 import.meta.glob 獲取所有的 .vue 文件
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.glob<PageModule>("../pages/**/*.vue", { eager: true });

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

  /* 上傳路由 */
  modules.push({
    path: currentPath, // 路由
    name: currentPath, // 路由名稱
    meta: {
      layout: pageModule.default.layout || "layout-default", // 頁面 layout
      title: pageModule.default.title || "app.project.title" // 頁面 title
    },
    component: files[path] // 頁面 component
  });
}

export default modules;