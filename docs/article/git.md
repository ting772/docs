---
title: git常用命令
date: "2024-11-10"
outline: [2,3]
tags: "git"
---

# {{ $frontmatter.title }}

## 配置
- git config core.ignorecase false (取消忽略文件名大小写)
- git config pull.rebase true（调整git pull默认使用rebase方式合并，而不是使用git pull --rebase方式）

## 远程相关
- git remote （查看远端仓库）
- git remote -v （详细查看远端仓库及其地址）
- git remote add 仓库名 仓库url （添加仓库）

## 分支  

### 查看分支
- git branch （查看本地分支）
- git branch -a （查看远端追踪分支和本地分支）
- git branch -vv (查看本地分支，及其关联的远端分支)

### 修改分支名
- git branch -m 新分支名（修改当前分支名为“新分支名”）
- git branch -m 老分支名 新分支名

### 删除分支
  - git branch -d 分支名
  - git fetch -p   （用于删除本地无用的远端追踪分支【远端分支删除，本地相关的跟踪分支残留】）
  - git push --delete origin 分支名 （删除远端分支）

### 切换分支
  - git checkout 已有分支名

### 移动分支到某个提交上
  - git checkout 分支  
    git reset --hard commit-hash

  - git branch -f feature commit-hash

### 创建分支并切换到该分支
  - git checkout -b 新分支名   （从当前分支创建新分支，名称为“新分支名”）
  - git checkout -b 新分支名 origin/远端分支名 (新建分支并设置它的远端分支)
  - git checkout -t origin/远端分支名 （新建本地分支并自动推导名称）

### 关联远端分支
  - git branch -u origin/分支名 （绑定当前分支到远端分支）

## 打印
- git log （基本打印）
- git log --oneline (单行打印，短hash)
- git log --pretty=oneline (单行打印，长hash)
- git show commitId (查看提交修改的内容)
- git show commitId --stat (查看提交被修改的文件有哪些)
- git log --follow 文件路径 （查看改动该文件的提交的历史）

## 合并不同历史的分支
当本地仓库已经存在，新建远端仓库里有初始的相关提交时，常用的git pull会报出错误：**fatal: refusing to merge unrelated histories**。使用**git pull --allow-unrelated-histories**可以完成拉取合并。

## 压缩合并commit

- 本地压缩本次即将提交的内容和上次提交 git commit --amend
- 本地压缩多次提交git rebase head~n 


## 移除不小心提交到远程文件的追踪

1. 将文件添加进.gitignore
2. git rm --cached 文件路径 移出版本控制
3. 提交

## git push --tags 和 git push --follow-tags的区别
--tags 推送本地所有的标签到远程
--follow-tags 本地有，远端无的标签，并推送提交
