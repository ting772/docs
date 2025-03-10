---
title: electron app优化摘要
date: "2025-3-10"
outline: [2,3]
tags: "electron"
---

# {{ $frontmatter.title }}

开发electron app过程中遇到并实践的一些优化方案，在这里做一些整理，方便后续开发直接查阅。

### 将web端依赖的包从package.json中的dependencies移动到devDependencies

如：web端通过**npm install -S vue vue-router pinia**等包，打包过后会包含在web资源输出文件中，而electron app打包时会把
dependencies里的包都保留在node_modules里并拷贝到打包结果中，这样造成了dependencies web端引用的包被2次放置。这里我们将web端引用资源
放到devDependencies可以做到包体积优化

如下图：

#### 挪前

![](/assets/img/2025-3/20250310170328.png)  

![](/assets/img/2025-3/20250310170427.png)  

#### 挪后 

![](/assets/img/2025-3/20250310165531.png)  

![](/assets/img/2025-3/20250310165921.png)  

