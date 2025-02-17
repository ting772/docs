---
title: npm link命令
date: "2024-2-17"
outline: [2,3]
tags: "npm"
---

# {{ $frontmatter.title }}

npm包本地调试开发的好帮手

## 链接本地项目到全局

npm link
1. 切换到项目根目录下执行npm link会在npm全局node_modules目录中中创建一个指向当前目录的链接  

    ![](/assets/img/2025-2-12/20250212100608.png)

2. 如果当前项目还定义了可执行命令，还会在npm全局路径（npm pefix -g）中安装你的命令，从而可以全局执行（如果该目录已被添加进系统环境变量）

## 链接全局包到本地来

```
cd 本地项目
link 全局包名
```

## 取消链接
npm unlink 是npm uninstall 、npm remove等的别名

## 将本地开发的npm包项目B，链接到项目A本地来

```sh
cd 项目A
link 项目B路径
```

这样项目A的node_modules目录下就会创建链接到B的包