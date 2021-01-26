<template>
  <div ref="editorDom"></div>
</template>
<script>
import Editor from "wangeditor";  // 富文本编辑器
export default {
  name: "Wangeditor",
  data() {
    return {
      //富文本对象
      editor: null,
    }
  },
  methods: {
    //创建富文本对象
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom)
      this.editor.config.onchange = html => {
        this.$emit("update:content", html);
      }
      this.editor.create();
    },
  },
  mounted() {
    this.createEditor()       //创建富文本对象
  },
  props: {
    isClear: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    isClear: {
      handler() {
        this.editor.txt.clear()
      }
    },
    value: {
      handler(newValue) {
        this.editor.txt.html(newValue)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>