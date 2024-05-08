<script lang="ts" setup>
import CommandPalette from '@/modules/command-palette/command-palette.vue';
import LocaleSelector from '@/modules/i18n/components/locale-selector.vue';
import CButton from '@/ui/c-button/c-button.vue';
import CTooltip from '@/ui/c-tooltip/c-tooltip.vue';
import {NIcon, useThemeVars} from 'naive-ui';

import {RouterLink} from 'vue-router';
import {Heart, Home2, Menu2} from '@vicons/tabler';

import {storeToRefs} from 'pinia';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import {useStyleStore} from '@/stores/style.store';
import {config} from '@/config';
import type {ToolCategory} from '@/tools/tools.types';
import {useToolStore} from '@/tools/tools.store';
import {useTracker} from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const {tracker} = useTracker();
const {t} = useI18n();

const toolStore = useToolStore();
const {favoriteTools, toolsByCategory} = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0
      ? [{name: t('tools.categories.favorite-tools'), components: favoriteTools.value}]
      : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <div flex flex-col relative h-100vh>

        <RouterLink to="/" class="hero-wrapper">
          <div class="gradient" h-120px/>
          <div class="text-wrapper">
            <div class="title">
              <!--            IT - TOOLS-->
            </div>
            <div class="divider"/>
          </div>
        </RouterLink>

        <div class="sider-content  h-[calc(100vh-120px)]">
          <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
            <locale-selector my="12px" w="90%"/>
            <div flex justify-center absolute bottom-0>
              <NavbarButtons/>
            </div>
          </div>

          <CollapsibleToolMenu :tools-by-category="tools"/>

          <div class="footer"></div>
        </div>
      </div>
    </template>

    <template #content>
      <div flex items-center justify-between gap-2>
        <div>
          <c-button
              circle
              variant="text"
              :aria-label="$t('home.toggleMenu')"
              @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="25" :component="Menu2"/>
          </c-button>

          <c-tooltip :tooltip="$t('home.home')" position="bottom">
            <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
              <NIcon size="25" :component="Home2"/>
            </c-button>
          </c-tooltip>

          <!--#v-ifdef env.MODE==='development' -->
          <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
            <c-button
                to="/c-lib"
                circle
                variant="text"
                :aria-label="$t('home.uiLib')"
            >
              <icon-mdi:brush-variant text-20px/>
            </c-button>
          </c-tooltip>
          <!--#v-endif-->

        </div>
        <!--#v-ifdef env.VITE_IS_DESKTOP -->
        <command-palette/>
        <!--#v-endif-->

        <div flex gap-12px>
          <locale-selector v-if="!styleStore.isSmallScreen"/>
          <NavbarButtons v-if="!styleStore.isSmallScreen"/>

        </div>

      </div>
      <slot/>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition: padding ease 0.2s !important;

  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
}

.sider-content {
  position: sticky;
  top: 120px;
  //padding-top: 120px;
  padding-bottom: 200px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.hero-wrapper {
  //position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    position: relative;
    background-image: url(../assets/hero-bg.jpg),
    url(../assets/wave.gif);
    background-repeat: no-repeat;
    background-position: center, bottom;
    background-blend-mode: screen;
    background-size: 100% 100%;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
    }

    .divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: v-bind('themeVars.primaryColor');
      margin: 0 auto 5px;
    }

    .subtitle {
      font-size: 16px;
    }
  }
}
</style>
