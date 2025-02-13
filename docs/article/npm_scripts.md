---
title: npm scripts
date: "2024-11-10"
outline: [2,3]
tags: "npm"
---

# {{ $frontmatter.title }}

## npm scripts传入node环境变量（访问process.env）

如下方式： 

- ```sh
  PORT=3000 npm run start
```

- ``` json
    "scripts": {
      "start": "NODE_ENV=production node app.js"
    }
```  
```sh
  npm run start
```

- 跨平台方式先引入cross-env  
``` json
    "scripts": {
      "start": "cross-env NODE_ENV=production node app.js"
    }
```  
```sh
  npm run start
```

## npm run XXX执行时传入参数  (访问process.argv)
```json
  "scripts": {
    "start": "node app.js"
  }
```

```sh
  npm run start -- username 张三
```