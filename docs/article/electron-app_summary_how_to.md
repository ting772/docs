---
title: electron app开发摘要
date: "2025-3-5"
outline: [2,3]
tags: "electron"
---

# {{ $frontmatter.title }}

api文档参考[连接](https://www.electronjs.org/zh/docs/latest/api/browser-window)

### __dirname is not defined in ES module scope ?

解决如下：

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### 如何指定app显示名称

优先顺序如下：
- html的title字段会覆盖下面的几种
- BrowserWindow的title配置

  ```js
  const win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs')
    }
  })
  ```

- package.productName（如果有的话）
- package.json.name

### 如何开启控制台

1. 确定devTools标记是打开着的（默认是打开状态）。
```js
 let win=new BrowserWindow({
    webPreferences:{
      devTools :true
    } 
 })
```

2. 添加以下代码打开/关闭调试控制台
  ```js
    win.webContents.openDevTools() //打开
    win.webContents.closeDevTools() //关闭
  ```

### 常见窗口操作
### 

```js
let win=new BrowserWindow({
  resizable:true,//是否可以缩小/扩大窗口
  maximizable:false,//窗口是否可以最大化
  minimizable:false//设置窗口是否可被最小化
  alwaysOnTop:true,//窗口在最上面
  center:true,//窗口在屏幕显示居中
  frame:true,//窗口是否有边框
  minWidth:1000,//指定最小窗口宽
  minHeight:800,//指定最小窗口高
  skipTaskbar:true,//是否在任务栏上显示app窗口
})

win.removeMenu();//去掉窗口的菜单栏
```