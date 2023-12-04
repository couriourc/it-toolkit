<template>
  <div>

    <div flex justify-center my-12px>
      <c-input-text placeholder="请输入URL" v-model:value="url" @keydown.enter="getRss()"></c-input-text>
      <c-button @click="getRss()">获取</c-button>
    </div>

    <div flex flex-col gap-12px v-if="result.description">
      <c-card>
        <div v-html="result.description"></div>
      </c-card>
      <c-card v-for="item in result.items">
        <div v-html="item.description"></div>
      </c-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CCard from "@/ui/c-card/c-card.vue";
import {ParserByURL} from "../../../wailsjs/go/RSSParser/RSSParser";

const url = ref<string>('https://news.ycombinator.com/rss');
const result = ref({})

const logger = (res) => {
  console.log(res)
  return Promise.resolve(res)
}

async function getRss() {
  // console.log(
  //
  // )
  // ParserByURL(`${url.value}`)
  //     .then(
  //         logger
  //     )
  fetch(`http://localhost:8080/rss_parser?url=${url.value}`)
      .then(res => res.json())
      .then(logger)
      .then(res => {
        result.value = res;
      })
}

</script>

<style lang="less" scoped>
</style>
