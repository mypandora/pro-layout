<template>
  <div :class="classObj" class="mypandora-pro-layout" :style="{ '--theme': settings.theme }">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="mypandora-pro-layout-drawer-bg"
      @click="handleClickOutside"
    />
    <transition name="mypandora-ltf">
      <sidebar v-show="showSide" @toggleSidebar="toggleSidebar" />
    </transition>
    <div
      v-if="settings.fixedSide && showSide"
      class="sidebar-placeholder"
      :style="{
        width: `${sidebar.opened ? sideWidth : sideCollpaseWidth}px`,
      }"
    ></div>

    <section :class="{ fixedHeader: settings.fixedHeader }" class="mypandora-layout-container">
      <transition name="el-zoom-in-top">
        <navbar v-if="settings.showHeader" @setSidebarRoutes="setSidebarRoutes" />
      </transition>
      <div
        v-if="(settings.fixedHeader || settings.navMode === 'mix') && settings.showHeader"
        class="header-placeholder"
        :style="{ height: settings.fixedHeader || settings.navMode === 'mix' ? '60px' : 0 }"
      ></div>
      <transition name="el-zoom-in-top">
        <slot v-if="settings.showTagsView" name="tagsView"></slot>
      </transition>
      <app-main :tagsView="tagsView" />
    </section>

    <settings
      :predefine="predefine"
      :settings="settings"
      @changeSetting="handleSetting"
      @setSidebarRoutes="setSidebarRoutes"
    />

    <!-- 隐藏顶部时 -->
    <div v-if="!settings.showHeader" class="mypandora-pro-layout-setting" @click.stop="handleClick">
      <i class="el-icon-setting"></i>
    </div>

    <!-- mobile 时 -->
    <hamburger
      v-if="device === 'mobile' && !sidebar.opened && settings.navMode !== 'top'"
      class="mypandora-pro-layout-hamburger"
      :class="{ 'theme-dark': settings.sideTheme === 'theme-dark' }"
      @toggleClick="toggleSidebar"
    />
  </div>
</template>

<script>
import AppMain from './AppMain.vue';
import Navbar from './Navbar/index.vue';
import Sidebar from './Sidebar';
import Settings from './Settings';
import Hamburger from './Hamburger';
import './assets/styles/index.scss';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  name: 'ProLayout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    Settings,
    Hamburger,
  },
  provide() {
    return {
      $computedProperty: () => this.computedProperty,
    };
  },
  props: {
    // 设备：桌面(desktop)、移动(mobile)
    device: {
      type: String,
      default: 'desktop',
    },
    logoTitle: {
      type: String,
      default: '',
    },
    sideWidth: {
      type: Number,
      default: 200,
    },
    sideCollpaseWidth: {
      type: Number,
      default: 48,
    },
    menuRoutes: {
      type: Array,
      default: () => [],
    },
    predefine: {
      type: Array,
      default: () => ['#2e59a7', '#80d1c8', '#0095b6', '#ff770f', '#1a7bb0'],
    },
    settings: {
      type: Object,
      default: () => ({}),
    },
    tagsView: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      sidebarRoutes: this.menuRoutes,
      // 侧边栏
      sidebar: {
        opened: true,
        withoutAnimation: true,
      },
    };
  },
  computed: {
    computedProperty() {
      const {
        $slots,
        sidebar,
        device,
        logoTitle,
        sideWidth,
        sideCollpaseWidth,
        menuRoutes,
        sidebarRoutes,
        predefine,
        settings,
        tagsView,
      } = this;
      return {
        $slots,
        sidebar,
        device,
        logoTitle,
        sideWidth,
        sideCollpaseWidth,
        menuRoutes,
        sidebarRoutes,
        predefine,
        settings,
        tagsView,
      };
    },
    classObj() {
      const { device, settings, showSide, sidebar } = this;
      const { navMode } = settings;
      const { opened, withoutAnimation } = sidebar;

      let closeSidebar;
      let mobile = false;
      // 手机模式下，hideSidebar 与 openSidebar 相反
      // 电脑模式下，closeSidebar 与 openSidebar 相反
      if (device === 'mobile') {
        mobile = true;
        closeSidebar = false;
      } else {
        closeSidebar = !opened && showSide;
      }

      const openSidebar = opened && showSide;
      const hideSidebar = !showSide;

      return {
        'mypandora-pro-layout-side': navMode === 'side',
        'mypandora-pro-layout-top': navMode === 'top',
        'mypandora-pro-layout-mix': navMode === 'mix',
        closeSidebar,
        openSidebar,
        hideSidebar,
        withoutAnimation,
        mobile,
      };
    },
    /**
     * showSide: false，无论如何不显示左侧菜单。
     * showSide: true，这时候要分2种情况：
     * 1，device === 'desktop'，原样返回，即返回 true；
     * 2，device === 'mobile'，返回 sidebar.opened 的值。
     */
    showSide() {
      const { settings, device, sidebar } = this;
      const { showSide, navMode } = settings;
      const { opened } = sidebar;

      if (showSide === false) {
        return false;
      }

      if (navMode === 'top') {
        return false;
      }

      if (device === 'mobile') {
        return opened;
      }

      // 为 desktop 模式下
      return true;
    },
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.closeSidebar({ withoutAnimation: false });
      }
    },
    menuRoutes() {
      this.init();
    },
  },
  methods: {
    /**
     * 初始化操作
     */
    init() {
      const { autoMenu, navMode } = this.settings;
      if (navMode === 'side' || (navMode === 'mix' && !autoMenu)) {
        this.sidebarRoutes = this.menuRoutes;
      }
    },
    // 侧边栏相关方法
    toggleSidebar() {
      const { sidebar, settings } = this;
      const { opened } = sidebar;
      const { showSide } = settings;

      if (!showSide) {
        return false;
      }
      this.sidebar.opened = !opened;
      this.sidebar.withoutAnimation = false;
    },
    closeSidebar({ withoutAnimation }) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    setSidebarRoutes(routes) {
      // 如果没有路由信息，就使用默认的全部。
      // 当模式为 mix 时，启用自动分割菜单的话，把非一级菜单设置为左侧菜单列。
      if (Array.isArray(routes)) {
        this.sidebarRoutes = routes;
      } else {
        // 当模式为 side，mix但不为自动分割菜单的话，使用所有。
        this.sidebarRoutes = this.menuRoutes;
      }
    },
    handleClick() {
      this.$emit('changeSetting', { key: 'showSettings', value: true });
    },
    // 配置相关方法
    handleSetting(obj) {
      this.$emit('changeSetting', obj);
    },
    handleClickOutside() {
      this.closeSidebar({ withoutAnimation: false });
    },
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        const device = isMobile ? 'mobile' : 'desktop';
        this.$emit('onDevice', device);

        if (isMobile) {
          this.closeSidebar({ withoutAnimation: true });
        }
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.$emit('onDevice', 'mobile');
      this.handleSetting({ key: 'fixedHeader', value: true });

      this.closeSidebar({ withoutAnimation: true });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
};
</script>
