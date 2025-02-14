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
5. 更新package.json 相关字段
    ```json
      {
        /**
          作者
          单人形式"name <email> (url)
          多人对象形式 name, email 和 url 三个属性，
            其中 url 一般是该作者的个人网站,这些属性都是可选的
         */
        "author": "",
        "description":"",//npm官网输入框搜索时，显示的说明文字
        "repository": {  
          "type": "git",  
          "url": ""  
        },//关联git仓库地址
        "bugs": {  
          "url": ""  
        },//关联git issue地址
        "keywords":[],//关键字
        "homepage":"",//项目主页
      }
    ```
6. 以上正常后，npm publish发布 (后续发版前更新version字段)
