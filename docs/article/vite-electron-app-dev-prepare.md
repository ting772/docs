---
title: 基于vite vue vite-plugin-electron的electron app开发环境搭建
date: "2025-3-12"
outline: [2,3]
tags: "vite,electron"
---

# {{ $frontmatter.title }}

### 1. 生成vite-vue项目，或者准备已有的vite-vue项目

```bash 
npm create vue@latest
```

### 2. 安装vite-plugin-electron包

```bash
npm install -D vite-plugin-electron
```

### 3. 在vite配置文件vite.config.ts中追加 plugins项 [参考](https://github.com/electron-vite/vite-plugin-electron)

```js
import electron from 'vite-plugin-electron/simple'

export default {
  plugins: [
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        input: 'electron/preload.ts',
      },
      // Optional: Use Node.js API in the Renderer process
      renderer: {},
    }),
  ],
}
```

### 4. 项目结构推荐如下

```
├─┬ electron
│ ├── main.ts
├─┬ src
│ ├── main.ts
│ ├── style.css
│ └── vite-env.d.ts
├── .gitignore
├── favicon.svg
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 5. 创建electron/main.ts文件，加入main进程基本代码

```js
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Main window',
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
})
```

### 6. package.json添加main字段如下
```json
{
  "main": "dist-electron/main.js"
}
```

### 7. 至此 npm run dev开始开发了（npm create vue@latest生成项目包含该命令）

### 8. 打包相关

1. 打包用的包
```
  npm install --save-dev electron-builder
```
2. 配置electron-builder.json5，基本配置及字段如下

```json5
{
  "directories": {
    "output": "dist-app",//打包结果输出目录
  },
  "win": {
    "target": "nsis",//nsis是windows安装程序制作程序
  },
  "files": [
    "dist-web/**/*",
    "dist-electron/**/*",
  ],//哪些文件被打包进app
  "asar": true,//打包进app的文件是否制成asar归档文件格式
  "nsis": {
    "oneClick": false, //一键点击
    "allowToChangeInstallationDirectory": true,//可以调整安装目录
    "displayLanguageSelector": true,//语言选择
    "uninstallDisplayName": "${productName}",//卸载展示名称
    "createDesktopShortcut": true,//创建桌面快捷图标
    "createStartMenuShortcut": true,//开始菜单创建快捷图标
    "shortcutName": "${productName}",//快捷名称
  }
}
```