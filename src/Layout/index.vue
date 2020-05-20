<template>
  <div class="app-layout">
    <app-aside class="app-aside" :style="{width: isCollapse ? 'auto' : appAsideWidth }"></app-aside>
    <div class="app-body">
      <app-header class="app-header"></app-header>
      <app-tag-view class="app-tag-view"></app-tag-view> <!--不需要此需求，去掉这个和对应组件和store/tagView.js文件即可-->
      <app-main class="app-main"></app-main>
    </div>
  </div>
</template>

<script>
import AppAside from './components/AppAside';
import AppHeader from './components/AppHeader';
import AppTagView from './components/AppTagView';
import AppMain from './components/AppMain';

import { createNamespacedHelpers } from 'vuex';
import { appAsideWidth } from '@/style/var.scss';

const {
  mapGetters,
} = createNamespacedHelpers('app');

export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader,
    AppTagView,
    AppMain,
  },
  data() {
    return {
      appAsideWidth,
    };
  },
  computed: {
    ...mapGetters(['isCollapse']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';
.app-layout {
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: $--app-layout-background-color;
}
.app-aside {
  width: $--app-aside-width;
  flex-shrink: 0;
}
.app-body {
  flex: 1;
}
.app-header {
  height: $--app-header-height;
}
.app-tag-view {
  height: $--app-tag-view-height;
}
.app-main {
  height: calc(100vh - #{$--app-header-height});
}
</style>
