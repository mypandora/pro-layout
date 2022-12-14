<script>
import { getGrayReversedColor } from '../utils';
import TopbarItem from './TopbarItem';

export default {
  name: 'TopBar',
  components: { TopbarItem },
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
      const width = Math.max(len * 120, Number.parseInt(styleWrapper?.width));
      const offset = offsetIndex * 120;
      const style = {};
      if (Number.isSafeInteger(width)) {
        style.width = `${width}px`;
      }
      if (Number.isSafeInteger(offset)) {
        style.transform = `translate(${offset}px)`;
        style.transition = 'all 0.3s ease';
      }

      return style;
    },
  },
  updated() {
    setTimeout(() => {
      this.checkLeftBtn();
      this.checkRightBtn();
    }, 1000);
  },
  mounted() {
    const resizeObserver = new ResizeObserver(() => this.handlerResize());
    resizeObserver.observe(document.querySelector('.mypandora-layout-header__menu'));
  },
  methods: {
    handlerResize() {
      this.getWrapperWidth();
      this.checkLeftBtn();
      this.checkRightBtn();
    },
    // 计算包装菜单的 div 的宽度，方便使用左右箭头
    getWrapperWidth() {
      const ele = document.querySelector('.mypandora-layout-header__menu');
      const eleRect = ele?.getBoundingClientRect();
      let width = 0;
      if (eleRect) {
        width = eleRect.width - 30 - 30 || 0;
      }

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
  render() {
    const { showLeftBtn, showRightBtn, styleWrapper, styleOffset, activeMenu, backgroundColor, textColor, menuRoutes } =
      this;
    return (
      <div class="mypandora-layout-header__menu">
        <div ref="leftRef" class="top-menu-btn" style="left: 0px" vOn:click={this.scrollLeft}>
          {showLeftBtn && <i class="el-icon el-icon-arrow-left" />}
        </div>
        <div class="top-menu-wrapper" style={styleWrapper}>
          <el-menu
            ref="topmenuRef"
            default-active={activeMenu}
            background-color={backgroundColor}
            text-color={textColor}
            unique-opened={true}
            active-text-color={textColor}
            collapse-transition={false}
            mode="horizontal"
            style={styleOffset}
          >
            {menuRoutes.map((route, index) => (
              <topbar-item key={route.path + index} item={route} base-path={route.path} />
            ))}
          </el-menu>
        </div>
        <div ref="rightRef" class="top-menu-btn" style="right: 0px" vOn:click={this.scrollRight}>
          {showRightBtn && <i class="el-icon el-icon-arrow-right" />}
        </div>
      </div>
    );
  },
};
</script>
