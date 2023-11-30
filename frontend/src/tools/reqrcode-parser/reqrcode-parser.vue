<script setup lang="ts">
import {formatBytes} from '@/utils/convert';
import qrcodeParser from "qrcode-parser";
import {Directive, ref} from "vue";
import SpanCopyable from "@/components/SpanCopyable.vue";
import {useI18n} from "vue-i18n";
import {useCopy} from "@/composable/copy";

const status = ref<'idle' | 'parsed' | 'error' | 'loading'>('idle');
const file = ref<File | null>(null);
const result = ref('');

const {t} = useI18n();

async function onVerifyClicked(uploadedFile: File) {
  file.value = uploadedFile;
  const fileBuffer = await uploadedFile.arrayBuffer();
  status.value = 'loading';
  qrcodeParser(uploadedFile).then(res => {
    result.value = res;
    status.value = 'parsed';
  }).catch(_ => {
    status.value = 'error';
  });
}

const vPaste: Directive = {
  mounted(el: HTMLElement, {value: cb}) {
    document.addEventListener('paste', function (event) {
      const items = (event.clipboardData || event.originalEvent?.clipboardData).items;
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          cb(blob);
        }
      }
    });
  }
};
const {copy} = useCopy({source: result, text: t('tools.reqrcode-parser.copied')});

</script>
<template>
  <div style="flex: 0 0 100%">
    <div mx-auto max-w-600px>
      <c-file-upload title="Drag and drop a image file here, or click to select a file"
                     accept=".png,.jpg,.jpeg"
                     @file-upload="onVerifyClicked"
                     v-paste="onVerifyClicked"
      />
    </div>

    <div v-if="status === 'error'">
      <c-alert mt-4>
        No signatures found in the provided file.
      </c-alert>
    </div>

    <div v-if="status === 'parsed'"
         style="flex: 0 0 100%"
         mt-5 flex flex-col
         gap-4 mx-auto max-w-600px border-t-solid border-1px
         py-2 px-1
    >

      <c-input-text
          v-model:value="result"
          multiline
          readonly
          rows="3"
          placeholder="识别结果"
          autosize
          class="token-display"
      />

      <div mt-5 flex justify-center gap-3>
        <c-button @click="copy()">
          {{ t('tools.token-generator.button.copy') }}
        </c-button>
      </div>
    </div>

  </div>
</template>


<style lang="less" scoped>
</style>
