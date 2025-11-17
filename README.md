# simple-site-by-copilot

一個使用 Vite + Vue + SCSS 前端和純 Node.js 後端的簡單網站專案。

## 初始化 prompt

```markdown
建立一個簡單的網站
前端使用 vite + vue + scss
後台用純粹的 node.js 處理

前台有登入頁、登入後的歡迎頁、關於我們這三個頁面

登入使用 authorize token 處理，後台先以 mock request 處理即可

使用 .env.production 和 .env.development 來區分正測試環境設定

環境設定先設置一個環境變數：`CONTEXT_PATH` 作為網址前綴（正式區為`/foo/bar`；測試區為`/`）

在 package.json 的 script 中，要提供 `dev:production` 的 `script` 用以執行正式環境檔
```

## 技術堆疊

### 前端
- Vite - 快速建置工具
- Vue 3 - JavaScript 框架
- Vue Router - 路由管理
- SCSS - CSS 預處理器

### 後端
- Node.js - 純粹的 HTTP 伺服器
- Token 認證系統

## 功能特點

- 登入頁面
- 登入後的歡迎頁面
- 關於我們頁面
- 基於 Token 的授權機制
- 環境配置支援（開發/正式）

## 環境配置

專案使用兩個環境配置檔案：

- `.env.development` - 開發環境配置
  - `CONTEXT_PATH`: `/`
  
- `.env.production` - 正式環境配置
  - `CONTEXT_PATH`: `/foo/bar`

## 安裝

```bash
npm install
```

## 開發

### 啟動開發環境（使用 .env.development）

1. 啟動後端伺服器：
```bash
npm run server
```

2. 啟動前端開發伺服器：
```bash
npm run dev
```

3. 瀏覽器開啟 http://localhost:5173/

### 啟動正式環境模式（使用 .env.production）

1. 啟動後端伺服器：
```bash
npm run server
```

2. 啟動前端（正式環境配置）：
```bash
npm run dev:production
```

3. 瀏覽器開啟 http://localhost:5173/foo/bar/

## 建置

```bash
npm run build
```

## 測試帳號

- 帳號：admin / 密碼：admin123
- 帳號：user / 密碼：user123

## 專案結構

```
.
├── server/              # 後端程式碼
│   └── index.js        # Node.js 伺服器
├── src/
│   ├── router/         # 路由配置
│   ├── views/          # 頁面元件
│   │   ├── Login.vue   # 登入頁
│   │   ├── Welcome.vue # 歡迎頁
│   │   └── About.vue   # 關於我們
│   ├── utils/          # 工具函數
│   │   └── api.js      # API 請求
│   ├── App.vue         # 根元件
│   └── main.js         # 應用程式入口
├── .env.development    # 開發環境配置
├── .env.production     # 正式環境配置
└── vite.config.js      # Vite 配置
```

