---
title: npm常用命令
date: "2024-11-10"
outline: [2,3]
tags: "npm,npm常用命令"
---

# {{ $frontmatter.title }}

## npm配置
- npm config list  （查看本地配置）
- npm config list | grep registry （查看本地配置的注册表）
- npm config delete registry （删除本地注册表）
- npm config set registry registry https://registry.npmmirror.com （设置淘宝注册表,旧的https://registry.npm.taobao.org快失效了）


## nodejs版本管理 nvm
[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

## 更新npm
npm install -g npm@latest

## 查看本地全局安装的包  
npm list -g --depth=0

## 运行本地项目安装的命令
npx 命令 （等价于在项目目录下执行./node_modules/xxxx，省去了本地相对路径，npm 6以上才有npx命令）

## 安装包  
npm install 包名  
npm install -g 包名（全局安装）

## 查看npm命令帮助
npm 命令 -h

## 查看npm包全局安装的位置
npm root -g

## 查看npm全局路径前缀
npm prefix -g