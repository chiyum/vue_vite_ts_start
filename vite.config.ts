import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /** 自動導入plugins */
    AutoImport({
      imports: ["vue", "vue-router", "pinia"], // 自動導入的模塊
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/auto-imports.d.ts",
      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  /** 快捷路徑設定 */
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  /** 在全域也可以使用await */
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
  /** 本地開發設定 */
  server: {
    port: 8080,
  },
  /** 打包設定 */
  build: {
    // 根據當前 Git 分支決定輸出目錄，如果是 "online" 分支，則輸出到 `dist_online`，否則輸出到 `dist`
    outDir: 'dist', 
    rollupOptions: {
      output: {
        // 定義資源文件的輸出路徑和命名規則
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1); // 獲取文件的擴展名
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img"; // 如果是圖片文件，將擴展名設置為 "img"
          }
          return `assets/${extType}/[name]-[hash][extname]`; // 將資源文件輸出到對應的文件夾
        },
        // 定義代碼塊的輸出路徑和命名規則
        chunkFileNames: "admin_assets/js/[name]-[hash].js",
        entryFileNames: "admin_assets/js/[name]-[hash].js",
        // 手動定義代碼分塊策略
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 如果模塊來自 node_modules，將其單獨打包，並以其第一級目錄命名
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
          if (id.includes("pages")) {
            // 如果模塊來自 views 目錄，將其單獨打包為 "views"
            return "pages";
          }
        },
      },
    },
  },
})