<script>
import { getGrayReversedColor } from '../utils';
export default {
  name: 'NavbarLogo',
  inject: ['$computedProperty'],
  data() {
    return {};
  },
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
  },
  render() {
    const { rootProps } = this;
    const { $slots, logoTitle, settings } = rootProps;
    const { theme } = settings;

    const style = { backgroundColor: theme };
    const titleStyle = { color: getGrayReversedColor(theme) };

    const { logo, logoRender } = $slots;
    let content = null;

    if (logoRender) {
      content = logoRender;
    } else {
      content = (
        <router-link to="/">
          {logo}
          <h1 style={titleStyle}>{logoTitle}</h1>
        </router-link>
      );
    }

    return (
      <transition name="el-zoom-in-center">
        <div class="mypandora-layout-navbar-logo" style={style}>
          {content}
        </div>
      </transition>
    );
  },
};
</script>
