---
title: vite-vue electron app开发环境搭建
date: "2025-3-12"
outline: [2,3]
tags: "vite,electron"
---

# {{ $frontmatter.title }}

### 1. 生成vue项目，或者准备已有项目
  ```bash 
  npm create vue@latest
  ```

### 2. 安装vite-plugin-electron，vite-plugin-electron-renderer包
  ```bash
  npm install -D vite-plugin-electron vite-plugin-electron-renderer
  ```

### 3. 在vite配置文件vite.config.ts中追加 plugins项 [参考](https://github.com/electron-vite/vite-plugin-electron)

  ```js
  import electron from 'vite-plugin-electron/simple'
  import electronRenderer from 'vite-plugin-electron-renderer'

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
      electronRenderer()
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
