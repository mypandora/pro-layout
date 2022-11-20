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
    const { rootProps } = this;
    const { $slots, settings } = rootProps;
    const { theme, navMode, autoMenu, fixedHeader, showLogo } = settings;

    const rightMenu = $slots.rightMenu;
    const color = getGrayReversedColor(theme);
    const lightColor = this.convertHexToRGBA(color, 0.1);

    return (
      <header
        class={{
          'mypandora-layout-header': true,
          'mypandora-layout-header--fixed': fixedHeader || navMode === 'mix',
        }}
        style={{
          '--color': color,
          '--lightColor': lightColor,
          '--backgroundColor': theme,
        }}
      >
        {navMode !== 'aside' && showLogo && <logo />}
        {navMode === 'top' && <topbar />}
        {navMode === 'mix' && autoMenu && <mixbar vOn:setSidebarRoutes={this.setSidebarRoutes} />}
        {navMode === 'aside' && <breadcrumb class="breadcrumb-container" />}
        <div class="mypandora-layout-header__right">{rightMenu}</div>
      </header>
    );
  },
};
</script>
