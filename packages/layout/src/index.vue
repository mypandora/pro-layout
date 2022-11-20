<template>
  <div :class="classObj" :style="{ '--theme': settings.theme }">
    <!-- 移动模式下背景色 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="mypandora-layout--drawer-bg" @click="handleClickOutside" />

    <!-- 左侧菜单栏及固定状态下它的占位符 -->
    <transition name="mypandora-ltf">
      <sidebar v-show="showSide" @toggleSidebar="toggleSidebar" :style="styleSidebarObj" />
    </transition>
    <div
      v-if="settings.fixedSide && showSide"
      class="mypandora-layout-aside--placeholder"
      :style="styleSidebarObj"
    ></div>

    <section class="mypandora-layout-container">
      <transition name="el-zoom-in-top">
        <navbar v-if="settings.showHeader" @setSidebarRoutes="setSidebarRoutes" :style="styleHeaderObj" />
      </transition>
      <div
        v-if="(settings.fixedHeader || settings.navMode === 'mix') && settings.showHeader"
        class="mypandora-layout-header--placeholder"
        :style="styleHeaderObj"
      ></div>

      <slot></slot>
    </section>

    <settings @changeSetting="handleSetting" @setSidebarRoutes="setSidebarRoutes" />

    <!-- 隐藏顶部时 -->
    <div v-if="!settings.showHeader" class="mypandora-layout__setting" @click.stop="handleClick">
      <i class="el-icon-setting"></i>
    </div>

    <!-- mobile 时 -->
    <hamburger
      v-if="device === 'mobile' && !sidebar.opened && settings.navMode !== 'top'"
      class="mypandora-layout__hamburger"
      :class="{ 'theme-dark': settings.sideTheme === 'theme-dark' }"
      @toggleClick="toggleSidebar"
    />
  </div>
</template>

<script>
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
    headerHeight: {
      type: Number,
      default: 60,
    },
    sideWidth: {
      type: Number,
      default: 208,
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
      default: () => ({
        showSettings: false, // 显示配置项

        sideTheme: 'theme-light', // 整体风格设置：亮色菜单风格、暗色菜单风格
        theme: '#2E59A7', // 主题色

        navMode: 'mix', // 导航模式：侧边菜单布局、顶部菜单布局、混合菜单布局
        fixedHeader: true, // 固定Header
        fixedSide: true, // 固定侧边菜单
        autoMenu: true, // 自动分割菜单

        showHeader: true, // 显示顶栏
        showSide: true, // 显示菜单，即显示侧边菜单
        showLogo: true, // 显示Logo
      }),
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
        headerHeight,
        menuRoutes,
        sidebarRoutes,
        predefine,
        settings,
      } = this;
      return {
        $slots,
        sidebar,
        device,
        logoTitle,
        sideWidth,
        sideCollpaseWidth,
        headerHeight,
        menuRoutes,
        sidebarRoutes,
        predefine,
        settings,
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
        'mypandora-pro-layout': true,
        'mypandora-pro-layout--aside': navMode === 'aside',
        'mypandora-pro-layout--top': navMode === 'top',
        'mypandora-pro-layout--mix': navMode === 'mix',
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
    styleSidebarObj() {
      const { sideWidth, sideCollpaseWidth, settings, headerHeight, sidebar, device } = this;
      const { navMode } = settings;

      let paddingTop = 0;
      if (device === 'mobile') {
        paddingTop = 0;
      } else {
        paddingTop = navMode === 'mix' ? `${headerHeight}px` : 0;
      }

      return {
        '--width': `${sidebar.opened ? sideWidth : sideCollpaseWidth}px`,
        '--paddingTop': paddingTop,
      };
    },
    styleHeaderObj() {
      const { settings, sidebar, sideWidth, sideCollpaseWidth, device, headerHeight } = this;
      const { navMode, fixedHeader, showSide } = settings;
      const { opened } = sidebar;

      if (device === 'mobile') {
        return { width: '100%' };
      }

      if (navMode === 'aside' && showSide && fixedHeader) {
        if (opened) {
          return { width: `calc(100% - ${sideWidth}px)` };
        } else {
          return { width: `calc(100% - ${sideCollpaseWidth}px)` };
        }
      }

      return { '--width': '100%', '--height': `${headerHeight}px` };
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
      if (navMode === 'aside' || (navMode === 'mix' && !autoMenu)) {
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
      const { settings } = this;
      const { navMode, autoMenu } = settings;

      if (navMode === 'mix') {
        if (autoMenu && Array.isArray(routes)) {
          this.sidebarRoutes = routes;
        } else {
          this.sidebarRoutes = this.menuRoutes;
        }
      } else if (navMode === 'aside') {
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
