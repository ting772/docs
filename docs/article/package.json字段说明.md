---
title: package.json字段说明
date: "2025-2-17"
outline: [2,3]
tags: "npm"
---

# {{ $frontmatter.title }}

## author

- 字符串形式:name \<email\> (url) email，url可省略
- 对象形式,如下是vue-router库的 author字段

```json
{
  "name": "Eduardo San Martin Morote",
  "email": "posva13@gmail.com"
}
```

## bin

字符串形式:"命令路径"，指定一个可执行命令。  
对象形式：指定多个可执行命令。
```json
{
  指令1:'路径1',
  指令2:'路径2',
  指令3:'路径3'
}
```

## bugs

关联git issue地址

```json
{  
  "url": ""  
}
```

## config

对象形式，nodejs脚本可以通过process.env.npm_package_config_字段拿到定义值，如果是嵌套形式，**用下划线连接各字段**。

## description

**npm官网输入框搜索时，会显示的说明文字**

## repository

关联git仓库地址，**npm包首页会显示**

```json
{  
  "type": "git",  
  "url": ""  
},
```

## files

控制npm publish执行后哪些文件可以被上传到仓库  

![](/assets/img/2025-2-17/20250217164215.png)

**.npmignore文件**也可用来控制npm publish文件上传，另外有些文件始终上传/始终忽略。

## type

指定包的模块类型
- node支持es模块后，es模块需要使用.mjs作为文件后缀，否则需要在type字段填入module
- type有两个值module和commonjs，不指定默认为commonjs。

## main

定义包入口文件，在Browser环境和Node环境中均可使用。如果不指定该字段，则会找包根目录下的index.js文件，没有的话则报错。

## module

定义包esm加载方式入口文件，在Browser环境和Node环境中均可使用。

## typings或者types

指定包ts类型定义入口

## private

如果不希望发布到npm上，设置为true，防止npm publish误发布。

## keywords

定义项目的一些关键词，**npm包首页会显示**

## homepage

定义项目主页链接，**npm包首页会显示**

## license

项目开源许可证，**npm包首页会显示**

## engines

常用来指定node，包管理器版本号
```json
{
  "node": ">=14",
  "npm": ">7"
}
```

## os

指定可以在哪些系统上运行

```json
[
  "darwin",
  "linux",
  "!win32",//不允许在win32上运行
]
```