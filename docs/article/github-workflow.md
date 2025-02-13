---
title: 设置github workflow以及部署静态站点到github pages上
tags: "workflow"
---

# {{ $frontmatter.title }}

## 参考
- <el-tag>文章</el-tag> [Github通过workflow实现自动部署](https://juejin.cn/post/7260690057660563517)
- <el-tag>视频</el-tag> [GitHub Actions工作流自动化的入门核心](https://www.bilibili.com/video/BV1aT421y7Ar)
- <el-tag>文章</el-tag> [github actions](https://docs.github.com/en/actions/writing-workflows/quickstart)
- <el-tag>文章</el-tag> [github actions pages模板nextjs版](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml)
- <el-tag>连接</el-tag> [github actions market](https://github.com/marketplace?type=actions)

## 步骤 

1. github上创建一个带初始文件的仓库  

![](/assets/img/2024-12-7/20241207190733.png)

2. 本地新建仓库并关联远端分支
    - 绑定本地master分支到远端master（git branch -u origin/master）
    - 拉取远端仓库代码（git pull，本地仓库默认配置pull.rebase=true），解决rebase后的冲突，提交更新

3. 本地仓库添加项目文件

4. 本地根目录创建.github/workflows目录，并在里面创建.yml文件，文件名随便取
::: details 模板
```yml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."

```
:::

5. 推送远端，打开Actions
![](/assets/img/2024-12-28/20241228135043.png)

6. 调整workflow如下：  
:::details 模板
```yml
name: GitHub Pages部署
run-name: ${{ github.actor }} 正在部署GitHub Pages 🚀
on: 
  # Runs on pushes targeting the default branch
  push:
    branches: master

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
jobs:
  # 构建&部署
  build:
    runs-on: ubuntu-24.04
    name: 构建&部署
    permissions:
      contents: write
    steps:
      - name: 签出代码
        uses: actions/checkout@v3

      - name: 安装nodejs V20
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 安装依赖+打包
        run: |
          npm install
          npm run build

      - name: 展示即将上传artifact的资源
        run: ls -alh ./dist

      - name: 上传构件
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
          name: package
      - name: 部署到github page
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
  
```
:::

7. 调整仓库setting 

从分支部署，并选择分支gh-pages  

![](/assets/img/2025-1-1/20250101122201.png)

8. 部署成功