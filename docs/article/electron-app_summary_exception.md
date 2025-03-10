---
title: electron app异常摘要
date: "2025-3-5"
outline: [2,3]
tags: "electron"
---

# {{ $frontmatter.title }}

开发electron app过程中遇到的一些问题，找到解决方法后，在这里做一些整理，方便后续开发直接查阅。

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

![](/assets/img/2025-3/20250308210203.png)  

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