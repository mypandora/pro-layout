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
    settings() {
      return this.rootProps.settings;
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
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
    convertHexToRGBA(hexCode, opacity = 1) {
      let hex = hexCode.replace('#', '');

      if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;
      }

      return `rgba(${r},${g},${b},${opacity})`;
    },
  },
  render() {
    const { rootProps, settings, activeMenu } = this;
    const { sidebar, sidebarRoutes } = rootProps;
    const { sideTheme, fixedSide, theme, uniqueOpened: unique, showLogo: show, navMode } = settings;
    const showLogo = show && navMode !== 'mix';
    const sidebarOpened = sidebar.opened;
    const isCollapse = !sidebarOpened;
    const uniqueOpened = unique || false;
    const isDark = sideTheme === 'theme-dark';

    const classObj = {
      'mypandora-layout-aside': true,
      'mypandora-layout-aside--dark': isDark,
      'mypandora-layout-aside--fixed': fixedSide,
    };

    const styleObj = {
      '--backgroundColor': isDark ? variables.menuBackground : variables.menuLightBackground,
      '--subBackgroundColor': isDark ? variables.subMenuBackground : variables.menuLightBackground,
    };

    const classMenuObj = {
      'mypandora-layout-aside__menu': true,
      'mypandora-layout-aside__menu--dark': isDark,
    };

    const lightTheme = isDark ? '#ffffff' : this.convertHexToRGBA(theme, 0.1);
    const styleMenuObj = {
      '--lightTheme': lightTheme,
    };
    // hack popper-menu
    document.documentElement.style.setProperty('--theme', theme);
    document.documentElement.style.setProperty('--lightTheme', lightTheme);

    const classHamburgerObj = {
      'mypandora-layout-aside__hamburger': true,
      'mypandora-layout-aside__hamburger--dark': isDark,
    };

    const elMenu = (
      <el-menu
        default-active={activeMenu}
        collapse={isCollapse}
        background-color={isDark ? variables.menuBackground : variables.menuLightBackground}
        text-color={isDark ? variables.menuColor : variables.menuLightColor}
        unique-opened={uniqueOpened}
        active-text-color={theme}
        collapse-transition={false}
        mode="vertical"
      >
        {sidebarRoutes.map((route, index) => (
          <sidebar-item key={route.path + index} item={route} base-path={route.path} />
        ))}
      </el-menu>
    );
    return (
      <aside class={classObj} style={styleObj}>
        <el-collapse-transition>{showLogo && <logo />}</el-collapse-transition>
        {fixedSide ? (
          <el-scrollbar class={classMenuObj} style={styleMenuObj} wrap-class="hidden-x">
            {elMenu}
          </el-scrollbar>
        ) : (
          <div class={classMenuObj} style={styleMenuObj}>
            {elMenu}
          </div>
        )}

        <hamburger class={classHamburgerObj} is-active={sidebarOpened} vOn:toggleClick={this.toggleSidebar} />
      </aside>
    );
  },
};
</script>
