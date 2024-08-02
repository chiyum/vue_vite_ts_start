import { App, Component } from 'vue';

// 定義 layout 模組的類型
interface LayoutModule {
  componentName: string;
  component: Component;
}

// 使用 import.meta.glob 獲取所有的 .vue 文件
const files = import.meta.glob("../layouts/*.vue", { eager: true }) as Record<string, { default: Component }>;
const modules: LayoutModule[] = [];

for (const path in files) {
  /* 導入layoyt目錄中的.vue檔 */
  /* replace是比對字串是否有符合的字串 有就以第二個參數替代replace(正則, 新替代字串) */
  /* 第一次replace先去路徑 接著轉小寫 最後一次replace則是去除副檔名*/
  const name = path
    .replace("../layouts/", "")
    .toLowerCase()
    .replace(".vue", "");
  
  /* 將處理好的模組push */
  modules.push({
    componentName: name,
    component: files[path].default
  });
}

const layouts = {
  /* 將layout新增為component */
  install: (app: App) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  }
};

export default layouts;