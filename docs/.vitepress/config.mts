import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve, join, basename } from 'path'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter';

function autoLoad(dirname) {
  let docPath = join('docs', dirname)
  let files = readdirSync(docPath)
  const hasIndex = files.some(path => path == 'index.md')

  let arr, ret = [] as any[]

  const readFile = (file) => readFileSync(join(docPath, file), { encoding: 'utf-8' })
  const toLink = (rpath) => "/" + join(dirname, rpath).replaceAll("\\", "/")
  const getMenuTitle = (content) => {
    let { data } = matter(content)
    //如果有frontmatter数据，用title字段
    if (data.title) return data.title

    //没有的话提取第一个1级标题的内容 （# xxxx)
    let arr = content.match(/^#\s+(.+)/m)
    if (arr) {
      return arr[1]
    }
  }
  //有index.md的目录
  if (hasIndex) {
    //抽出index.md里的连接
    const regex = /\[(.*)\]\((.*)\)/g
    const content = readFile('index.md')
    while (arr = regex.exec(content)) {
      //过滤站外链接
      if (arr[2].startsWith('http')) {
        continue
      }

      ret.push({
        text: arr[1],
        link: toLink(arr[2])
      })
    }
  } else {
    //无index.md的目录
    for (let file of files) {
      if (!file.endsWith('.md')) continue
      let content = readFile(file)
      let text = getMenuTitle(content)
      if (text) {
        ret.push({
          text,
          link: toLink(basename(file, ".md"))
        })
      }
    }
  }
  return ret
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的博客",
  description: "我的博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "常用站点",
        link: "/sites",
        target: "_blank"
      },
    ],
    sidebar: {
      // "/article/": autoLoad('article')
    }
  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config: md => {
    }
  },
  vite: {
    plugins: [
      // ...
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        "dts": true,
        // global imports to register
        imports: [
          'vue',
        ],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        "dts": true,
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "../code/"),
        "@img": resolve(__dirname, "../public/assets/img/"),
      }
    },
    ssr: { noExternal: ['element-plus'], }
  }
})
