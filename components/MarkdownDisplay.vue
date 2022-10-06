<template>
  <div v-html="markdown"></div>
</template>

<script>
import {marked} from 'marked'

export default {
  name: "MarkdownDisplay",
  props: {
    text: {
      type: String
    }
  },
  computed: {
    markdown() {
      return marked(this.text)
    }
  }
}
</script>

<style>

</style>
