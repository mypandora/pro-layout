<script>
export default {
  name: 'SidebarLogo',
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
    const { $slots, logoTitle, sidebar } = rootProps;
    const collapse = !sidebar.opened;

    const classObj = {
      'mypandora-layout-side-logo': true,
      'mypandora-layout-side-logo-collapse': collapse,
    };

    const { logo, logoRender } = $slots;
    let content = null;

    if (logoRender) {
      content = logoRender;
    } else {
      content = (
        <router-link to="/">
          {logo}
          <transition name="el-zoom-in-center">{!collapse && <h1>{logoTitle}</h1>}</transition>
        </router-link>
      );
    }

    return <div class={classObj}>{content}</div>;
  },
};
</script>
