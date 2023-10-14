<template>
    <pre v-html="highlightedCode"></pre>
</template>
  
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';   
// import 'highlight.js/styles/color-brewer.css';

export default {
    props: {
        content: {
            code: {
                type: String,
                required: true
            },
            language: {
                type: String,
                default: 'javascript'
            }
        }
    },
    computed: {
        highlightedCode() {
        return hljs.highlight(this.content.language, this.content.code).value;
        }
    },
    mounted() {
        hljs.highlightBlock(this.$el);
    }
}
</script>

<style scoped>
.hljs {
    font-size: small;
}
</style>
  