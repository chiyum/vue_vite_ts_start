// 引入vue模版的eslint
import pluginVue from 'eslint-plugin-vue';
import eslint from '@eslint/js';
// ts-eslint解析器，使 eslint 可以解析 ts 语法
import tseslint from 'typescript-eslint';
// vue文件解析器
import vueParser from 'vue-eslint-parser';
import { readFileSync } from 'fs';

const autoImportConfig = JSON.parse(
  readFileSync('./.eslintrc-auto-import.json', 'utf-8')
);

export default tseslint.config({
  // 使用 tseslint.config 來支持新的扁平配置格式
  extends: [
    eslint.configs.recommended, // 使用 ESLint 推薦的基本規則集
    ...tseslint.configs.recommended, // 使用 TypeScript ESLint 推薦的規則集
    ...pluginVue.configs['flat/essential'] // 使用 Vue 3 推薦的 ESLint 配置
  ],
  languageOptions: {
    parser: vueParser, // 使用 vue-eslint-parser 來解析 .vue 文件
    parserOptions: {
      parser: tseslint.parser, // 在 .vue 文件中的 <script> 標籤內使用 TypeScript 解析器
      sourceType: 'module' // 指定源碼是 ECMAScript 模塊
    },
    // 支援eslint9.0.0以上版本
    globals: {
      ...autoImportConfig.globals
    }
  },
  rules: {
    'semi': ['warn', 'always'], // 警告不使用分號
    "comma-dangle": ["error", "never"], // 禁止使用尾隨逗號
    "no-unused-vars": 2, // 禁止未使用的變量（錯誤級別）
    'space-before-function-paren': 0, // 關閉函數括號前的空格規則
    'generator-star-spacing': 'off', // 關閉生成器函數 * 的空格規則
    'object-curly-spacing': 0, // 關閉對象字面量大括號內的空格規則
    'array-bracket-spacing': 0, // 關閉數組括號內的空格規則
    'vue/multi-word-component-names': 'off', // 禁用多詞名稱規則
    '@typescript-eslint/no-explicit-any': 'off' // 禁用 @typescript-eslint/no-explicit-any 規則
  }
});