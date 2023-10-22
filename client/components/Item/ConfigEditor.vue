<template>
    <div ref="editorContainer" class="editor"></div>
  </template>
  
<script setup lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml.js';
import { onMounted, ref } from 'vue';
import { stringify } from 'yaml'

const editorContainer = ref(null);
const props = defineProps(["content"]);

const config = stringify(props.content);


onMounted(() => {
    if (editorContainer.value) {
        const editor = CodeMirror(editorContainer.value, {
            mode: 'yaml',
            theme: 'default',
            lineNumbers: true,
            readOnly: true,
            // value: stringify(props.content.value)
            value: config
        });
    }
});

</script>

<style>
.editor .CodeMirror {
    height: auto !important;
}
</style>
