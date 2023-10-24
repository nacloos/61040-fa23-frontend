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
const emit = defineEmits(['update:modelValue']);
let editor: any;

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    readOnly: {
        type: Boolean,
        default: true
    }
});

// const config = stringify(props.modelValue);
const config = props.modelValue;

onMounted(() => {
    if (editorContainer.value) {
        editor = CodeMirror(editorContainer.value, {
            mode: 'yaml',
            theme: 'default',
            lineNumbers: true,
            readOnly: props.readOnly,
            // value: stringify(props.content.value)
            value: config
        });

        editor.on('change', () => {
            emit('update:modelValue', editor.getValue());
        });
    }
});

</script>

<style>
.editor .CodeMirror {
    height: auto !important;
}
</style>
