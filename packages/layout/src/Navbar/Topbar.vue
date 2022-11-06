<template>
  <div class="topmenu-container" :style="{ '--theme': backgroundColor }">
    <div ref="leftRef" class="top-menu-btn" style="left: 0px" @click="scrollLeft">
      <i v-show="showLeftBtn" class="el-icon el-icon-arrow-left" />
    </div>
    <div class="topmenu-wrapper" :style="styleWrapper">
      <el-menu
        ref="topmenuRef"
        :default-active="activeMenu"
        :background-color="backgroundColor"
        :text-color="textColor"
        :unique-opened="true"
        :active-text-color="textColor"
        :collapse-transition="false"
        mode="horizontal"
        :style="styleOffset"
      >
        <template v-for="(item, index) in topMenus">
          <el-submenu
            v-if="!item.hidden"
            :key="item.path + index"
            :index="item.path"
            :disabled="!item.children"
            :style="{ '--theme': backgroundColor }"
          >
            <template slot="title">
              <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
            </template>
            <topbar-item
              v-for="(route, index) in item.children"
              :key="route.path + index"
              :item="route"
              :base-path="route.path.includes(item.path) ? route.path : item.path + '/' + route.path"
              :device="device"
            />
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div ref="rightRef" class="top-menu-btn" style="right: 0px" @click="scrollRight">
      <i v-show="showRightBtn" class="el-icon el-icon-arrow-right" />
    </div>
  </div>
</template>

<script>
import { getGrayReversedColor } from '../utils';
import TopbarItem from './TopbarItem';
import Item from './Item.vue';

export default {
  name: 'TopBar',
  components: { Item, TopbarItem },
  inject: ['$computedProperty'],
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 5,
      styleWrapper: {},
      offsetIndex: 0, // 偏移量
      showLeftBtn: false, // 显示左按钮
      showRightBtn: false, // 显示右按钮
    };
  },
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
    device() {
      return this.rootProps.device;
    },
    backgroundColor() {
      return this.rootProps.settings.theme;
    },
    menuRoutes() {
      return this.rootProps.menuRoutes;
    },
    textColor() {
      return getGrayReversedColor(this.backgroundColor);
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
    // 顶部显示菜单
    topMenus() {
      const topMenus = [];
      this.menuRoutes.forEach((menu) => {
        if (menu.hidden !== true) {
          // 兼容顶部栏一级菜单内部跳转
          if (menu.path === '/') {
            topMenus.push(menu.children[0]);
          } else {
            topMenus.push(menu);
          }
        }
      });
      return topMenus;
    },

    styleOffset() {
      const { topMenus, offsetIndex, styleWrapper } = this;
      const len = topMenus.length;
      const width = `${Math.max(len * 130, styleWrapper?.width)}px`;
      const offset = `${offsetIndex * 130}px`;

      return { width, transform: `translate(${offset})`, transition: '0.3s ease' };
    },
  },
  updated() {
    setTimeout(() => {
      this.checkLeftBtn();
      this.checkRightBtn();
    }, 1000);
  },
  beforeMount() {
    window.addEventListener('resize', this.handlerResize);
  },
  mounted() {
    this.getWrapperWidth();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handlerResize);
  },
  methods: {
    handlerResize() {
      this.getWrapperWidth();
      this.$nextTick(() => {
        this.checkLeftBtn();
        this.checkRightBtn();
      });
    },
    // 计算包装菜单的 div 的宽度，方便使用左右箭头
    getWrapperWidth() {
      const ele = document.querySelector('.topmenu-container');
      const eleRect = ele?.getBoundingClientRect();
      const width = eleRect.width - 30 - 30;

      const style = { width: `${width}px` };
      this.styleWrapper = style;
    },
    // 判断是否显示左按钮
    checkLeftBtn() {
      const menuEle = this.$refs.topmenuRef?.$el;
      const menuRect = menuEle?.getBoundingClientRect();

      const navLogoEle = this.$refs.leftRef;
      const navLogoRect = navLogoEle?.getBoundingClientRect();

      if (navLogoRect?.right > menuRect?.left) {
        this.showLeftBtn = true;
      } else {
        this.showLeftBtn = false;
      }
    },
    // 判断是否显示右按钮
    checkRightBtn() {
      const menuEle = this.$refs.topmenuRef?.$el;
      const menuRect = menuEle?.getBoundingClientRect();

      const navRightEle = this.$refs.rightRef;
      const navRightRect = navRightEle?.getBoundingClientRect();

      // console.log(navRightRect.left, menuRect.right);
      if (navRightRect?.left < menuRect?.right) {
        this.showRightBtn = true;
      } else {
        this.showRightBtn = false;
      }
    },
    // 左滑动逻辑
    scrollLeft() {
      if (this.showLeftBtn) {
        this.offsetIndex += 1;
        this.checkRightBtn();
      }
    },
    // 右滑动逻辑
    scrollRight() {
      if (this.showRightBtn) {
        this.offsetIndex -= 1;
        this.checkLeftBtn();
      }
    },
  },
};
</script>
