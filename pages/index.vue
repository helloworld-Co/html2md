<template>
  <client-only>
    <div class="html2md-box">
      <div class="title-view">
        <a href="https://www.helloworld.net" target="_blank">
          <img width="100" src="/img/logo.svg">
        </a>
        <div>
          <h1 class="h1">html 转 md</h1>
          <h3 class="h3">支持 csdn、掘金、简书、segmentfault、cnblogs、oschina、微信文章</h3>
        </div>
        <a href="https://github.com/helloworld-Co/html2md" target="_blank">
          <img width="40" src="/img/github.svg">
        </a>
      </div>

      <div class="url-box">
        <el-input
          @keyup.enter.native="transformUrl"
          @focus="getInputFocus($event)"
          v-model="url"
          size="small"
          placeholder="请输入文章地址" />
        <div>&nbsp;</div>
        <el-button
          @click="transformUrl"
          :loading="isLoading"
          size="small"
          type="primary"
        >👉一键转换</el-button>
      </div>
      <br/>
      <el-input
        @focus="getInputFocus($event)"
        v-model="title"
        size="small"
        placeholder="标题（自动读取）" />
      <br/>

      <div class="input-box">
        <mavon-editor ref="editor" v-model="md" @save="toDownload"/>
      </div>
    </div>
  </client-only>
</template>
<script>
import TurndownService from 'turndown'
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm'

export default {
  name: 'Html2mdBox',
  data () {
    return {
      html: '<pre>Hello world!<br/>换行了</pre>',
      url: '',
      isLoading: false,
      title: ''
    }
  },
  computed: {
    md: {
      get () {
        return this.html2md(this.html)
      },
      set (val) {

      }
    }
  },
  methods: {
    downLoadFile (url) {
      const a = document.createElement('a')
      a.download = `${Date.now()}.md`
      a.href = url
      a.click()
    },
    toDownload () {
      const params = {
        md: this.md,
        url: window.location.origin
      }
      this.$axios.post(`${window.location.origin}/getMdFile`, params)
        .then((res) => {
          this.downLoadFile(res.path)
        })
    },
    html2md (str) {
      const turndownService = new TurndownService({ codeBlockStyle: 'fenced' })
      // Use the gfm plugin
      turndownService.use(gfm)

      // Use the table and strikethrough plugins only
      turndownService.use([tables, strikethrough])
      // 自定义配置
      turndownService.addRule('pre2Code', {
        filter: ['pre'],
        replacement (content) {
          return '```\n' + content + '\n```'
        }
      })
      const markdown = turndownService.turndown(str)
      return markdown
    },
    getInputFocus (event) {
      event.currentTarget.select()
    },
    transformUrl () {
      if (!this.url) { return }
      this.isLoading = true
      this.$axios.get(`${window.location.origin}/getUrlHtml`, { params: { url: this.url } })
        .then((res) => {
          this.html = res.html
          this.title = res.title
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .html2md-box{
    height: 100vh;
    padding: 0 30px;
    overflow: hidden;
    .title-view{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      .h1{
        text-align: center;
        font-size: 30px;
      }
      .h3{
        text-align: center;
        color: #666;
      }
    }
    .url-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-box{
      margin: 20px auto;
      min-height: 80vh;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .v-note-wrapper{
      &.shadow{
        width: 100%;
        height: 74vh;
      }
      &.fullscreen{
        height: auto!important;;
      }
    }
  }

</style>
