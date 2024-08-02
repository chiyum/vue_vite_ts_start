// 引入所需的插件和配置
import pluginVue from 'eslint-plugin-vue';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import { readFileSync } from 'fs';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

// 讀取自動導入的配置文件
const autoImportConfig = JSON.parse(
  readFileSync('./.eslintrc-auto-import.json', 'utf-8')
);

export default tseslint.config({
  // 指定此配置適用的文件類型
  files: ['**/*.{js,ts,vue}'],

  // 擴展基礎配置
  extends: [
    eslint.configs.recommended, // ESLint 推薦配置
    ...tseslint.configs.recommended, // TypeScript ESLint 推薦配置
    ...pluginVue.configs['flat/essential'], // Vue 3 基本 ESLint 配置
    prettierConfig // Prettier 配置，用於解決 ESLint 和 Prettier 的衝突
  ],

  // 定義使用的插件
  plugins: {
    'vue': pluginVue, // Vue.js 插件
    'prettier': prettierPlugin, // Prettier 插件
    '@typescript-eslint': tseslint.plugin // TypeScript ESLint 插件
  },

  // 語言選項配置
  languageOptions: {
    parser: vueParser, // 使用 Vue 解析器
    parserOptions: {
      ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
      sourceType: 'module', // 代碼是 ECMAScript 模塊
      parser: tseslint.parser // 在 <script> 標籤中使用 TypeScript 解析器
    },
    globals: {
      ...autoImportConfig.globals // 添加自動導入的全局變量
    }
  },

  // ESLint 規則配置
  rules: {
    'semi': ['warn', 'always'], // 要求使用分號，違反時警告
    "comma-dangle": ["error", "never"], // 禁止使用尾隨逗號
    "no-unused-vars": 2, // 禁止未使用的變量（錯誤級別）
    'space-before-function-paren': 0, // 關閉函數括號前的空格規則
    'generator-star-spacing': 'off', // 關閉生成器函數 * 的空格規則
    'object-curly-spacing': 0, // 關閉對象字面量大括號內的空格規則
    'array-bracket-spacing': 0, // 關閉數組括號內的空格規則
    'vue/multi-word-component-names': 'off', // 關閉 Vue 組件需要多單詞名稱的規則
    '@typescript-eslint/no-explicit-any': 'off', // 允許使用 any 類型
    'prettier/prettier': 'error' // 啟用 Prettier 規則，違反時報錯
  }
});