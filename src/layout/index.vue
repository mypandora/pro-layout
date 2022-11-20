<template>
  <pro-layout
    :device="device"
    :logoTitle="logoTitle"
    :menuRoutes="menuRoutes"
    :settings="settings"
    @changeSetting="handleSetting"
    @onDevice="handleDevice"
  >
    <template v-slot:logo>
      <img :src="logoSrc" />
    </template>

    <template v-slot:rightMenu>
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" />

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <el-tooltip content="布局大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <svg-icon icon-class="user" class="user-avatar"></svg-icon>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="showSettings = true">
              <span>布局设置</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>

    <main>
      <router-view />
    </main>
  </pro-layout>
</template>

<script>
import ProLayout from '../../packages/layout/index';
import router, { constantRoutes } from '@/router';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import { getRoutes } from '@/api/menu.js';
import logoImg from '@/assets/logo/logo.png';
import { initializeAndPathRoute } from './utils';

export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    Screenfull,
    SizeSelect,
    Search,
  },
  data() {
    return {
      // logo
      logoSrc: logoImg,
      logoTitle: 'logo 文字测试',
      // 路由菜单
      menuRoutes: [],
      // 预设颜色
      predefine: [],
      // 配置
      settings: {
        showSettings: false, // 显示配置项

        sideTheme: 'theme-light', // 整体风格设置：亮色菜单风格、暗色菜单风格
        theme: '#2E59A7', // 主题色

        navMode: 'aside', // 导航模式：侧边菜单布局、顶部菜单布局、混合菜单布局
        fixedHeader: false, // 固定Header
        fixedSide: false, // 固定侧边菜单
        autoMenu: false, // 自动分割菜单

        showHeader: true, // 显示顶栏
        showSide: true, // 显示菜单，即显示侧边菜单
        showLogo: true, // 显示Logo
      },
      device: 'desktop',
    };
  },
  computed: {
    showSettings: {
      get() {
        return this.settings.showSettings;
      },
      set(val) {
        this.settings.showSettings = val;
      },
    },
  },
  methods: {
    /**
     * 获取后台保存的路由
     */
    getData() {
      getRoutes().then((res) => {
        // 一些初始化操作
        const asyncRoutes = JSON.parse(JSON.stringify(res));
        initializeAndPathRoute(asyncRoutes);
        this.menuRoutes = constantRoutes.concat(asyncRoutes);
        // 目录包含菜单，菜单包含按钮
        const rdata = JSON.parse(JSON.stringify(res));
        const rewriteRoutes = initializeAndPathRoute(rdata, false, true);
        rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true });

        // 注册路由
        (rewriteRoutes || []).forEach((route) => router.addRoute(route));
      });
    },
    handleSetting(obj) {
      const { key, value } = obj;
      this.settings[key] = value;
    },
    handleDevice(device) {
      this.device = device;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.right-menu {
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    padding: 0 8px;
    font-size: 14px;
    color: #ffffff;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    .avatar-wrapper {
      position: relative;

      .user-avatar {
        cursor: pointer;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
      }
    }
  }
}
</style>
