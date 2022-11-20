<script>
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
    const { $slots, logoTitle } = rootProps;

    const { logo, logoRender } = $slots;
    let content = null;

    if (logoRender) {
      content = logoRender;
    } else {
      content = (
        <router-link to="/" class="text-a">
          {logo}
          <h1>{logoTitle}</h1>
        </router-link>
      );
    }

    return (
      <transition name="el-zoom-in-center">
        <div class="mypandora-layout-header__logo">{content}</div>
      </transition>
    );
  },
};
</script>
