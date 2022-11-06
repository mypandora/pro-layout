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

    const { logo } = $slots;

    return (
      <div class="mypandora-navbar-logo" style={style}>
        <router-link class="logo-link" to="/">
          {logo}
          <h1 class="logo-title" style={titleStyle}>
            {logoTitle}
          </h1>
        </router-link>
      </div>
    );
  },
};
</script>
