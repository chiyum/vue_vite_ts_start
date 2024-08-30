# Vue 3 + Vite + TS 起手專案
腳手架為Vite，使用的語言是TS並掛載Vue

## 主要運用的套件

- quasar UI組件
- pinia 狀態儲存
- autoImport 自動引入

## 架構說明

### assets 樣式／媒體檔
存放圖、影、scss的資料夾

### _app 自動化等的設定檔存放位置
專案的路由是使用自動化。
若有要新增頁面只需要在pages新增vue檔案，就會自動新增在Vue-router中。
支援多層路由 example:user/phone

### directive
自定義directive存放地點，已經搭配自動化載入。
新增檔案後會自動加入Vue

### layouts layout存放位置
專案的路由可以設定不同路由搭配指定layout。
這個資料夾專門儲存layout的.vue檔

### pages 頁面存放位置
放入此資料夾的檔案，會自動設定並加入Vue-router

### store 狀態儲存的資料夾
儲存pinia的資料夾，pinia會根據功能分成不同的ts檔

### utills
儲存小函式所存的資料夾，目前是一個函式一個檔案。
可以依照個人需求更改。

### models
儲存class的資料夾，可以以功能區分各個檔案

### types
儲存interface以及types等的資料夾，與models一樣可以使用功能來區分檔案

### interceptors
儲存axios攔截器的資料夾，依照功能區分檔案

### locales
儲存語系檔的資料夾，依照語系區分檔案

### store
儲存pinia的資料夾，pinia會根據功能分成不同的ts檔

### public
存放不會打包的靜態檔


### 其他設定檔

- auto-imports.d.ts 自動引入產生的設定檔 ts用

- vite-env.d.ts 可以在專案中運用vite環境的設定檔

- .eslintrc-auto-import.json 自動引入的設定檔

- tsconfig.node.json tsconfig.json的額外設定檔

- quasar-variables.scss quasar的變數檔，可以在此檔案中設定quasar的變數

## Version

- **Node.js** v20.9.0
- **yarn** v1.22.18
- **vue** v3.4.31

## Config

- **.env.development** 開發模式
- **.env.production** 生產模式
- **.env.uat** 測試模式

## Setup

```
yarn install
```

### Compiles and minifies for production

```
yarn run dev 開發模式
yarn build 生產模式
yarn build:uat 測試模式
```

### Deploy

執行 compile 之後根目錄下產生 `/docs` 檔案夾
