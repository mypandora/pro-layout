<template>
  <aside
    class="sidebar-container"
    :class="{ 'theme-dark': sideTheme === 'theme-dark', 'sidebar-container-fixed': fixedSide, 'has-logo': showLogo }"
    :style="{
      width: `${sidebarOpened ? width : collpaseWidth}px`,
      paddingTop: settings.navMode === 'mix' ? '60px' : 0,
      background: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    }"
  >
    <logo v-if="showLogo" />
    <el-scrollbar v-if="fixedSide" :class="sideTheme" wrap-class="hidden-x">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="uniqueOpened"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
          :device="device"
          :theme="theme"
        />
      </el-menu>
    </el-scrollbar>
    <div v-else :class="sideTheme" style="flex: 1">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="uniqueOpened"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
          :device="device"
          :theme="theme"
        />
      </el-menu>
    </div>

    <hamburger
      :is-active="sidebarOpened"
      class="hamburger-container"
      :class="{ 'theme-dark hamburger-theme-dark': sideTheme === 'theme-dark' }"
      @toggleClick="toggleSidebar"
    />
  </aside>
</template>

<script>
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import Hamburger from '../Hamburger';
import variables from '../assets/styles/variables.module.scss';

export default {
  name: 'SideBar',
  components: { SidebarItem, Logo, Hamburger },
  inject: ['$computedProperty'],
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
    width() {
      return this.rootProps.sideWidth;
    },
    collpaseWidth() {
      return this.rootProps.sideCollpaseWidth;
    },
    device() {
      return this.rootProps.device;
    },
    logoTitle() {
      return this.rootProps.logoTitle;
    },
    sidebarOpened() {
      return this.rootProps.sidebar.opened;
    },
    settings() {
      return this.rootProps.settings;
    },
    sidebarRoutes() {
      return this.rootProps.sidebarRoutes;
    },
    showLogo() {
      const { showLogo, navMode } = this.settings;
      return showLogo && navMode !== 'mix';
    },
    sideTheme() {
      const { sideTheme } = this.settings;
      return sideTheme;
    },
    fixedSide() {
      const { fixedSide } = this.settings;
      return fixedSide;
    },
    theme() {
      const { theme } = this.settings;
      return theme;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta?.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebarOpened;
    },
    uniqueOpened() {
      return this.settings.uniqueOpened || false;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
  },
};
</script>
