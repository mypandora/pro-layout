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
    const { $slots, logoTitle, sidebar, settings } = rootProps;
    const collapse = !sidebar.opened;
    const { theme, sideTheme } = settings;

    const classObj = {
      'mypandora-layout-aside__logo': true,
      'mypandora-layout-aside__logo--collapse': collapse,
    };

    const styleObj = {
      '--color': sideTheme === 'theme-light' ? theme : '#ffffff',
    };

    const { logo, logoRender } = $slots;
    let content = null;

    if (logoRender) {
      if (collapse) {
        content = logo;
      } else {
        content = logoRender;
      }
    } else {
      content = (
        <router-link to="/" class="text-a">
          {logo}
          {!collapse && <h1>{logoTitle}</h1>}
        </router-link>
      );
    }

    return (
      <div class={classObj} style={styleObj}>
        {content}
      </div>
    );
  },
};
</script>
