<script>
import variables from '../assets/styles/variables.module.scss';

export default {
  name: 'SidebarLogo',
  inject: ['$computedProperty'],
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
    variables() {
      return variables;
    },
  },
  data() {
    return {};
  },
  render() {
    const { rootProps } = this;
    const { $slots, logoTitle, sidebar, settings } = rootProps;
    const collapse = !sidebar.opened;
    const { sideTheme } = settings;

    const className = {
      'sidebar-logo-container': true,
      collapse,
    };
    const style = {
      backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    };
    const titleStyle = {
      color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
    };

    const { logo } = $slots;

    return (
      <div class={className} style={style}>
        <router-link class="sidebar-logo-link" to="/">
          {logo}
          {!collapse && (
            <h1 class="sidebar-title" style={titleStyle}>
              {logoTitle}
            </h1>
          )}
        </router-link>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@keyframes pro-layout-title-hide {
  0% {
    display: none;
    opacity: 0;
  }

  80% {
    display: none;
    opacity: 0;
  }

  to {
    display: unset;
    opacity: 1;
  }
}

.sidebar-logo-container {
  display: flex;
  align-items: center;
  padding: 16px 8px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.collapse {
    padding: 16px 8px;
  }

  & .sidebar-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;

    & .sidebar-title {
      margin: 0 0 0 6px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      animation: pro-layout-title-hide 0.3s;
    }
  }
}
</style>
