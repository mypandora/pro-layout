<script>
import Logo from './Logo.vue';
import Topbar from './Topbar.vue';
import Mixbar from './Mixbar.vue';
import Breadcrumb from '../Breadcrumb';
import { getGrayReversedColor } from '../utils';

export default {
  name: 'NavBar',
  components: {
    Logo,
    Topbar,
    Mixbar,
    Breadcrumb,
  },
  inject: ['$computedProperty'],
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
  },
  methods: {
    setSidebarRoutes(routes) {
      this.$emit('setSidebarRoutes', routes);
    },
  },
  render() {
    const { rootProps } = this;
    const { $slots, sidebar, sideWidth, sideCollpaseWidth, device, settings } = rootProps;
    const { opened } = sidebar;
    const { theme, navMode, autoMenu, fixedHeader, showSide, showLogo } = settings;

    const rightMenu = $slots.rightMenu;

    const color = getGrayReversedColor(theme);
    const backgroundColor = theme;

    const style = { color, backgroundColor, width: '100%' };
    if (device === 'mobile') {
      style.width = '100%';
    } else if (navMode === 'side' && showSide && fixedHeader) {
      if (opened) {
        style.width = `calc(100% - ${sideWidth}px)`;
      } else {
        style.width = `calc(100% - ${sideCollpaseWidth}px)`;
      }
    }

    return (
      <header
        class={{
          header: true,
          header__fixed: fixedHeader || navMode === 'mix',
          'has-logo': showLogo && navMode !== 'side',
        }}
        style={style}
      >
        {navMode !== 'side' && showLogo && <logo />}
        {navMode === 'top' && <topbar />}
        {navMode === 'mix' && autoMenu && <mixbar vOn:setSidebarRoutes={this.setSidebarRoutes} />}
        {navMode === 'side' && <breadcrumb class="breadcrumb-container" />}
        {rightMenu}
      </header>
    );
  },
};
</script>
