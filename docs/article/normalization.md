---
title: 项目规范化
date: "2024-11-10"
tags: "工程化,项目规范"
---

约束项目格式化、git commit message、框架相关最佳实践

# {{ $frontmatter.title }}


## 前置

- 编辑器 vscode
- 安装npm包
  - [husky](https://github.com/typicode/husky)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
  - [commitizen](https://github.com/commitizen/cz-cli)
  - [eslint](https://eslint.nodejs.cn/)、([typescript-eslint](https://typescript-eslint.io/) 可选下载)
  - [prettier](https://www.prettier.cn/)
- 安装vscode插件
  - Prettier - Code formatter
  - ESLint
  - EditorConfig for VS Code
  - indent-rainbow
- git

## 项目支持prettier格式化

在EditorConfig for VS Code插件的帮助下，右键创建一个默认.editorconfig文件 ,调整indent_size=2

1. 初始项目

   ```bash
   npm init -y
   ```

2. 安装prettier

   ```bash
   npm install --save-dev --save-exact prettier
   ```

3. 调整vscode项目配置prettier本地路径

   ![](/assets/img/2024-8-15/20240815165009.png)

4. 设置prettier成为项目默认格式化工具

   ![](/assets/img/2024-8-15/20240815165226.png)

5. 格式化文件

   **手动格式化**

   ![](/assets/img/2024-8-15/20240815165436.png)

   **文件保存自动格式化**

   ![](/assets/img/2024-8-15/20240815165913.png)

**eslint对代码质量有问题处标红**

默认情况下，vscode在你编辑代码时是无法识别一些错误的、如使用未定义的变量。

![](/assets/img/2024-8-15/20240815170504.png)

**配置以下，使得vscode能发现错误（标红）**

1. 安装ESLint vscode插件

2. 安装eslint（v9版本）

   ```bash
   npm install --save-dev eslint @eslint/js
   ```

3. 项目根路径上创建eslint.config.mjs 文件、代码如下

   ```js
   import pluginJs from "@eslint/js";

   export default [pluginJs.configs.recommended];
   ```

4. 配置vscode项目配置

   ![](/assets/img/2024-8-15/20240815173027.png)

   ![](/assets/img/2024-8-15/20240815173128.png)

   ![](/assets/img/2024-8-15/20240815173305.png)

## 使用husky让项目简单使用git hooks

1. 安装

```bash
npm install --save-dev husky
```

2. 初始

```bash
npx husky init
```

3. 执行后

![](/assets/img/2024-8-15/20240815201600.png)

::: tip
npm.scripts.prepare命令自动运行在npm install执行后、这样其他用户拉取项目
并安装依赖时会自动执行husky命令配置好husky相关。
:::


### 跳过Git Hooks

1. 绝大部分git命令都有 -n/--no-verify 选项来跳过钩子、如

```bash
git commit -m "..." -n # Skips Git hooks
```

2. 对于不支持-n选项的git命令，使用临时环境变量 HUSKY=0

```bash
HUSKY=0 git ... # Temporarily disables all Git hooks
git ... # Hooks will run again
```

3. 对于多条命令时

```bash
export HUSKY=0 # Disables all Git hooks
git ...
git ...
unset HUSKY # Re-enables hooks
```

:::tip
其他的使用请[查看文档](https://typicode.github.io/husky/get-started.html)
:::

## 规范git commit

1. 安装 commitizen

```bash
npm install --save-dev commitizen
```

2. 配置或执行commitizen命令

::: code-group

```bash [直接执行bash命令]
npx cz
```

```json [配置npm scripts]
{
    "scripts": {
        "commit": "cz"
    }
}
```

:::

3. 项目Commitizen friendly化

   1. 安装cz-conventional-changelog

      ```bash
      npm install -D cz-conventional-changelog
      ```

   2. 配置config.commitizen到package.json文件

      ```json
      {
        "config": {
          "commitizen": {
            "path": "cz-conventional-changelog"
          }
        }
      }
      ```  

    3. 此时使用npx cz或者（配置了commit script时）npm run commit会出现如下选择列表

        ![](/assets/img/2024-8-15/20240815220858.png)


:::warning
此时，仍旧使用git commit命令的话，还是和没有安装commitizen时一样，因此还需要以下配置来约束
:::

**做如下添加配置**

1. 在.husky目录下创建 prepare-commit-msg钩子文件
2. prepare-commit-msg文件中添加如下脚本

```bash
exec </dev/tty >&0 && node_modules/.bin/cz --hook
```

:::tip
不要按照git文档上使用 exec </dev/tty && node_modules/.bin/cz --hook || true 有如下问题
1. exec < /dev/tty会有以下bug

![](/assets/img/2024-8-15/20240815222722.png)

2. node_modules/.bin/cz --hook || true 会使得用户直接CTRL+C取消输入，或者git commit -m '提交信息'的方式绕过。这样便达不到强制格式的效果。
:::

## lint即将提交的代码

虽然之前vscode安装并配置了eslint后有了对“问题”代码标红的能力，但是这些代码还是可以被提交到仓库的，因此需要堵上这个漏洞。

1. 安装lint-staged

```bash
npm install --save-dev lint-staged
```

2. 配置 [参考](https://github.com/lint-staged/lint-staged)

   - 创建.lintstagedrc.json文件
   - 加上如下配置，对js文件先格式检查，再代码质量检查。

   ```json
   {
     "*.js": ["prettier -l", "eslint"]
   }
   ```

3. 创建pre-commit钩子，并执行以下命令

```bash
lint-staged
```

效果截图如下：  
_初始_：

![](/assets/img/2024-8-16/20240816193135.png)

**git commit**提交代码触发钩子进行检查

*prettier*执行失败

![](/assets/img/2024-8-16/20240816193505.png)

_eslint检查失败_

![](/assets/img/2024-8-16/20240816193724.png)

  
**至此在git commit 提交代码时，会约束commit message以及会对项目提交的js文件进行样式、质量检查。**

:::tip
typescript项目，jsx项目，vue项目还需要其他的eslint相关包来满足“特定的代码质量检查”，思路相同。
:::

## 总结

::: details 规范相关配置

```bash
npm install --save-dev prettier husky commitizen cz-conventional-changelog lint-staged
```

- 配置prettier path配置
- 搜索format，找到format on save并勾选
- 设置prettier为vscode默认格式化工具

- 执行npx husky
```bash
npx husky init
```

- package.json文件添加以下配置

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

- 创建在npx husky init命令下生成的.husky目录下创建prepare-commit-msg钩子文件，并输入以下命令

```bash
exec </dev /tty> &0 && node_modules/.bin/cz --hook
```

- 创建.lintstagedrc.json文件，并输入以下
```json
{
  "*.js": [ "prettier -l", "eslint" ]
}
```

- .husky目录下创建pre-commit钩子文件，并输入以下命令
```bash
lint-staged
```

:::

::: details eslint相关配置

```bash
npm install --save-dev eslint @eslint/js
```

创建eslint.config.mjs

```js
import pluginJs from "@eslint/js";
export default [pluginJs.configs.recommended];
```  

- 搜eslint，勾选开启eslint，并勾选Use Flat Config
- 如果没有发现vscode eslint生效，需要关闭并重启vscode

:::
