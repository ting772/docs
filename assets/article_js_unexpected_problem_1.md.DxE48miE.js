import{_ as r,c as o,o as n,j as t,ae as l,a as s,t as i}from"./chunks/framework.YyOF0cHw.js";const f=JSON.parse('{"title":"setInterval后台运行一段时间后不执行的问题","description":"","frontmatter":{"title":"setInterval后台运行一段时间后不执行的问题","date":"2025-3-12","outline":[2,3],"tags":"一些意想不到的js问题"},"headers":[],"relativePath":"article/js_unexpected_problem_1.md","filePath":"article/js_unexpected_problem_1.md"}'),d={name:"article/js_unexpected_problem_1.md"},_={id:"frontmatter-title",tabindex:"-1"};function c(a,e,h,p,m,u){return n(),o("div",null,[t("h1",_,[s(i(a.$frontmatter.title)+" ",1),e[0]||(e[0]=t("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1))]),e[1]||(e[1]=l('<h2 id="原本的意图" tabindex="-1">原本的意图 <a class="header-anchor" href="#原本的意图" aria-label="Permalink to &quot;原本的意图&quot;">​</a></h2><p>使用setInterval一直执行某个动作。</p><h2 id="实际状况" tabindex="-1">实际状况 <a class="header-anchor" href="#实际状况" aria-label="Permalink to &quot;实际状况&quot;">​</a></h2><p>当页面处在后台状态，<strong>如切换到其他浏览器tab，浏览器缩小等情形</strong>， setInterval过一段时间后就会不再执行回调，虽然当切回页面时会恢复继续执行。</p><h2 id="其它" tabindex="-1">其它 <a class="header-anchor" href="#其它" aria-label="Permalink to &quot;其它&quot;">​</a></h2><p>requestAnimationFrame也会存在切换到后台状态不执行</p><h2 id="解决办法" tabindex="-1">解决办法 <a class="header-anchor" href="#解决办法" aria-label="Permalink to &quot;解决办法&quot;">​</a></h2><p>在web worker中使用setInterval，web worker中使用setInterval会一直执行。</p><h2 id="原因" tabindex="-1">原因 <a class="header-anchor" href="#原因" aria-label="Permalink to &quot;原因&quot;">​</a></h2><p>谷歌浏览器的优化策略，后台情形下不执行，节省性能</p>',10))])}const x=r(d,[["render",c]]);export{f as __pageData,x as default};
