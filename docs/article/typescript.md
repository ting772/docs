---
title: ts常用语法
date: "2024-11-10"
outline: [2,3]
tags: "ts"
---

# {{ $frontmatter.title }}

## 链接
* [typescript文档](https://www.typescriptlang.org/)
* [typescript在线编辑](https://ts.nodejs.cn/play/)
* [一些内置工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 获取函数参数的类型  
  ```ts
    function test(a:string){}
    Parameters<typeof test>[0] //获取第一参数的类型
  ```

## 获取函数返回值的类型
  ```ts
    function test() { return true }
    ReturnType<typeof test>
  ```

## 获取对象的所有key  
  ```ts
    let person={
      name:'lili',
      gender:'nan',
      height:170
    }
    type keys = keyof typeof person
  ```