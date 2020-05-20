<template>
  <div class="app-aside">
    <div class="app-aside__logo">
      <span v-if="!isCollapse">后台管理系统LOGO</span>
    </div>
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="transparent"
        :default-active="menuActive"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <app-menu-item
          v-for="menu in allRoutes"
          :key="menu.name"
          :menu="menu"
        ></app-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import AppMenuItem from './AppMenuItem';

const {
  mapGetters,
} = createNamespacedHelpers('app');

export default {
  name: 'AppAside',
  components: {
    AppMenuItem,
  },
  computed: {
    ...mapGetters(['allRoutes', 'isCollapse']),
    menuActive() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-aside {
  padding-bottom: 36px;
  background-color: $--app-aside-background-color;
}
.app-aside__logo {
  height: $--app-header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid rgba(14, 185, 221, .5);
}
::v-deep.el-scrollbar {
  height: 100%;
}
</style>
