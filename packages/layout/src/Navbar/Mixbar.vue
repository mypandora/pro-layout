<script>
import AppItem from './Item.vue';
import { getGrayReversedColor } from '../utils';
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile'];

export default {
  name: 'MixNav',
  components: { AppItem },
  inject: ['$computedProperty'],
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 5,
      // 当前激活菜单的 index
      currentIndex: undefined,
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
    // 顶部显示菜单
    mixMenus() {
      const mixMenus = [];
      this.menuRoutes.forEach((menu) => {
        if (menu.hidden !== true) {
          // 兼容顶部栏一级菜单内部跳转
          if (menu.path === '/') {
            mixMenus.push(menu.children[0]);
          } else {
            mixMenus.push(menu);
          }
        }
      });
      return mixMenus;
    },
    // 设置子路由
    childrenMenus() {
      const childrenMenus = [];
      this.menuRoutes.forEach((router) => {
        for (const item in router.children) {
          if (router.children[item].parentPath === undefined) {
            if (router.path === '/') {
              router.children[item].path = '/' + router.children[item].path;
            } else {
              if (!this.ishttp(router.children[item].path)) {
                router.children[item].path = router.path + '/' + router.children[item].path;
              }
            }
            router.children[item].parentPath = router.path;
          }
          childrenMenus.push(router.children[item]);
        }
      });
      return childrenMenus;
    },
    // 默认激活的菜单
    activeMenu() {
      const path = this.$route.path;
      let activePath = path;
      if (path !== undefined && path.lastIndexOf('/') > 0 && hideList.indexOf(path) === -1) {
        const tmpPath = path.substring(1, path.length);
        activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'));
      } else if (!this.children) {
        activePath = path;
      }
      return activePath;
    },
  },
  watch: {
    activeMenu: {
      handler: function (val, oldVal) {
        this.activeRoutes(val);
      },
    },
  },
  mounted() {
    const resizeObserver = new ResizeObserver(() => this.setVisibleNumber());
    resizeObserver.observe(document.querySelector('.mypandora-layout-header__menu'));
  },
  methods: {
    // 根据宽度计算设置显示栏数
    setVisibleNumber() {
      const width = document.querySelector('.mypandora-layout-header__menu')?.getBoundingClientRect().width || 0;
      this.visibleNumber = Math.floor(width / 120) - 2;
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      const route = this.menuRoutes.find((item) => item.path === key);
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, '_blank');
      } else if (!route || !route.children) {
        // 没有子路由路径内部打开
        this.$router.push({ path: key });
      } else {
        // 显示左侧联动菜单
        this.activeRoutes(key);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      const routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.forEach((item) => {
          if (key === item.parentPath || (key === 'index' && item.path === '')) {
            routes.push(item);
          }
        });
      }
      this.$emit('setSidebarRoutes', routes);
    },
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
    },
  },
  render() {
    const { mixMenus, activeMenu, visibleNumber, backgroundColor, textColor } = this;
    return (
      <div class="mypandora-layout-header__menu">
        <el-menu
          default-active={activeMenu}
          background-color={backgroundColor}
          text-color={textColor}
          mode="horizontal"
          vOn:select={this.handleSelect}
        >
          {mixMenus.map(
            (item, index) =>
              index < visibleNumber && (
                <el-menu-item key={index} index={item.path} disabled={!item.children}>
                  {item.meta && <app-item icon={item.meta.icon} title={item.meta.title} />}
                </el-menu-item>
              ),
          )}

          {mixMenus.length > visibleNumber && (
            <el-submenu popper-class="mypandora-layout-header__popper-menu" index="more">
              <template slot="title">更多菜单</template>
              {mixMenus.map(
                (item, index) =>
                  index >= visibleNumber && (
                    <el-menu-item key={index} index={item.path}>
                      {item.meta && <app-item icon={item.meta.icon} title={item.meta.title} />}
                    </el-menu-item>
                  ),
              )}
            </el-submenu>
          )}
        </el-menu>
      </div>
    );
  },
};
</script>
