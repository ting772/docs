---
title: setInterval后台运行一段时间后不执行的问题
date: "2025-3-12"
outline: [2,3]
tags: "一些意想不到的js问题"
---

# {{ $frontmatter.title }}

## 原本的意图 

使用setInterval一直执行某个动作。

## 实际状况 

当页面处在后台状态，**如切换到其他浏览器tab，浏览器缩小等情形**，
setInterval过一段时间后就会不再执行回调，虽然当切回页面时会恢复继续执行。

## 其它

requestAnimationFrame也会存在切换到后台状态不执行

## 解决办法

在web worker中使用setInterval，web worker中使用setInterval会一直执行。

## 原因

谷歌浏览器的优化策略，后台情形下不执行，节省性能