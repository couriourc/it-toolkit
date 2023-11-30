<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

syncRef(locale, useStorage('locale', locale));
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style lang="less">
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 3px;
    height: 3px;
    background-color: #dedede;
  }
  ::-webkit-scrollbar-track {
    background-color: gray;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #dedede;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #299a65;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-corner {
    background-color: #299a65;
  }
  ::-webkit-resizer {
    background-color: #299a65;
  }
}
</style>
