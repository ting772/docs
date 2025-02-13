---
title: 自定义脚手架
date: "2024-11-10"
outline: [2,3]
tags: "npm"
---

# {{ $frontmatter.title }}

1. 项目根目录执行npm init命令初始项目

2. 项目根目录创建bin/cli.js文件，并添加如下代码
```js
#!/usr/bin/env node
```

3. 修改package.json文件添加bin字段，如bin:cli文件相对路径，又或者{[name]:路径}形式定义多个可执行文件

4. 执行npm link命令，使变成全局包

5. 接下来的事就是在cli.js文件里写nodejs代码实现脚手架功能了