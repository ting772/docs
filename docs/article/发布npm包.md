---
title: 发布npm包
date: "2025-2-14"
outline: [2,3]
tags: "npm"
---

# {{ $frontmatter.title }}

## 步骤  

1. 准备好待发布的npm包
2. 为npm包项目添加.npmignore控制哪些文件不需要被发布
3. 登录npm账号 npm login
    - 如果登录失败，查看是否设置了npm镜像 npm config list|grep registry，如果设置，暂时删除即可npm config delete registry
    - 操作成功后，npm whoami查看是否正常
4. 检查package.json文件version字段是否是最新版本
5. 更新package.json 相关字段 [参考](./package.json字段说明)

6. 如果要发布**作用域包**package.json文件中的**name**字段要定义成 **@你的npm账户名/包名**的形式

  :::info
  如果此时运行npm publish，会出现402 Payment Required - PUT https://registry.npmjs.org/XXXX - You must sign up for private packages错误,
  需要在package.json文件中添加以下配置
  ```json
   "publishConfig":{
    "access": "public"
  }
  ```
  :::

7. 以上正常后，npm publish发布 (后续发版前更新version字段)
