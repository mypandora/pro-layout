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
    variables() {
      return variables;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
  },
  render() {
    const { rootProps, settings, activeMenu } = this;
    const { sideWidth, sideCollpaseWidth, sidebar, sidebarRoutes } = rootProps;
    const { sideTheme, fixedSide, theme, uniqueOpened: unique, showLogo: show, navMode } = settings;
    const showLogo = show && navMode !== 'mix';
    const sidebarOpened = sidebar.opened;
    const isCollapse = !sidebarOpened;
    const uniqueOpened = unique || false;

    const classObj = {
      'mypandora-layout-side': true,
      'mypandora-layout-side-dark': sideTheme === 'theme-dark',
      'mypandora-layout-side-light': sideTheme === 'theme-light',
      'mypandora-layout-side-fixed': fixedSide,
    };

    const classHamburgerObj = {
      'mypandora-layout-side-hamburger': true,
      'mypandora-layout-side-hamburger-dark': sideTheme === 'theme-dark',
    };

    const styleObj = {
      width: `${sidebarOpened ? sideWidth : sideCollpaseWidth}px`,
      paddingTop: settings.navMode === 'mix' ? '60px' : 0,
      '--color': sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
      '--backgroundColor': sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
      '--subBackgroundColor': sideTheme === 'theme-dark' ? variables.subMenuBackground : variables.menuLightBackground,
    };

    const elMenu = (
      <el-menu
        default-active={activeMenu}
        collapse={isCollapse}
        background-color={sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground}
        text-color={sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor}
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
          <el-scrollbar class="mypandora-layout-side-menu" wrap-class="hidden-x">
            {elMenu}
          </el-scrollbar>
        ) : (
          <div class="mypandora-layout-side-menu">{elMenu}</div>
        )}

        <hamburger class={classHamburgerObj} is-active={sidebarOpened} vOn:toggleClick={this.toggleSidebar} />
      </aside>
    );
  },
};
</script>
