---
title: electron app开发摘要
date: "2025-3-12"
outline: [2,3]
tags: "electron"
---

# {{ $frontmatter.title }}

api文档参考[连接](https://www.electronjs.org/zh/docs/latest/api/browser-window)，我开发常见问题归纳如下

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

### 启动electron app时会闪烁一下黑色区域

解决如下 

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

### 鼠标拖拽窗口右边框扩大窗口时出现黑底

解决如下： 

1. 调用app.disableHardwareAcceleration关闭硬件加速效果会稍微好点
```js
app.disableHardwareAcceleration()
```
2. 除非设置窗口resizable:false，不让扩大缩小

### 打包后不显示内容

vite+vue3+vue-router electron 开发模式下调试好好的  

[参考网友详细分析文章](https://jesse121.github.io/blog/articles/2022/07/22.html)，简而言之就是  

1.  当loadFil路径是字面量字符串时
  ```js
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
  ```

开发模式下用加载用的是http协议，而loadFile(XXXX)使用的是本地文件协议

![](/assets/img/2025-3-8/20250308210203.png)  

导致history模式下路由解析未按照预期进行，调整vue-router为hash模式即可解决问题。

2. 当loadFile路径需要拼接时，使用path.join()合成，而不是path.resolve，否则生成的路径也会导致加载不了index.html

```js
if (process.env.VITE_DEV_SERVER_URL) {
  win.loadURL(process.env.VITE_DEV_SERVER_URL)
} else {
  //@ts-ignore  Load your file
  win.loadFile(path.join(import.meta.env.VITE_WEB_BUILD_DIST, 'index.html'));
}
```

### ERROR: Cannot create symbolic link : �ܾ����ʡ� : C:\Users\Admin\AppData\Local\electron-builder\Cache\winCodeSign\583472143\darwin\10.12\lib\libcrypto.dylib

win11 使用electron-builder打包报错

1. 手动下载winCodeSign [链接](https://github.com/electron-userland/electron-builder-binaries/releases/tag/winCodeSign-2.6.0)

2. 解压上面下载的文件，拷贝解压产生的文件夹**winCodeSign-2.6.0**至%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0
我的win11是C:\Users\Admin\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0

### errorOut=Fatal error: Unable to commit changes

关闭电脑管家，杀毒软甲（如360等）

### app-builder-bin\win\x64\app-builder.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE

```
• downloading     url=https://npmmirror.com/mirrors/electron-builder-binaries/nsis-3.0.4.1/nsis-3.0.4.1.7z size=1.3 MB parts=1
  • downloaded      url=https://npmmirror.com/mirrors/electron-builder-binaries/nsis-3.0.4.1/nsis-3.0.4.1.7z duration=998ms
  ⨯ exit status 2

1  failedTask=build stackTrace=Error: \node_modules\app-builder-bin\win\x64\app-builder.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Exit code:
```

解决如下：

1. 手动下载nsis [链接](https://npmmirror.com/mirrors/electron-builder-binaries/nsis-3.0.4.1/nsis-3.0.4.1.7z)

2. 解压上面下载的文件，拷贝解压产生的文件夹**nsis-3.0.4.1**至%LOCALAPPDATA%\electron-builder\Cache\nsis\nsis-3.0.4.1