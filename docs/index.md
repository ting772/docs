<div class="tag-container">
  <el-tag 
    v-for="tag in tags" 
    :key="tag"
    class="tag"
    type="primary" 
    size="large"
    :hit="tag==selectedTag"
    @click="select(tag)">{{tag}}</el-tag>
</div>
<ul>
  <li v-for="post of posts">
    <a :href="withBase(post.url)">{{ post.frontmatter.title}}</a>
  </li>
</ul>

<script setup>
  import { data as _posts} from './data-loader/article.data.js'
  import { withBase } from 'vitepress'

  let tags=ref(["全部"])

  function loadSelected(){
    //ssr环境
    if(typeof sessionStorage =='undefined') return '全部'
    return sessionStorage.getItem('home-selected-tag')??'全部'
  }

  function storeSelected(tag){
    return sessionStorage.setItem('home-selected-tag',tag)
  }

  let selectedTag=ref(loadSelected())

  
  tags.value.push(
    ...new Set(_posts.reduce((acc,post)=>{
          let ftags=post.frontmatter.tags
          if(ftags){
            let arr=ftags.split(/,|，/).filter(Boolean)
            acc.push(...arr)
            post.tags=arr
          }
          return acc
        },[])
      )
  )

  let posts=computed(()=>{
    return _posts.filter(post=>{
      return selectedTag.value=='全部'? _posts:(post.tags||[]).includes(selectedTag.value) 
    })
  })

  function select(tag){
    selectedTag.value=tag
    storeSelected(tag)
  }
</script>
<style scoped>
.tag-container{
  display:flex;
  flex-wrap:wrap;
  padding:10px;
}

.tag{
  margin-right:10px;
  margin-bottom:10px;
  cursor:pointer;
}
</style>