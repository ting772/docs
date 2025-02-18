---
title: nodejs新特性
date: "2025-2-17"
outline: [2,3]
tags: "nodejs"
---

# {{ $frontmatter.title }}

## nodejs14+版本中开始支持es6模块语法

## nodejs17.1+版本开始可以导入json模块

1. 静态导入json

    ```js
    import meta from "./package.json" assert {type: "json"};
    ```
    
2. 动态导入json
    ```js
    const { default: info } = await import("./package.json", {
      assert: {
        type: "json",
      },
    });
    ```