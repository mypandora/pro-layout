<script>
import path from 'path';
import AppItem from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';
import { isExternal } from '../utils';

export default {
  name: 'SidebarItem',
  components: { AppItem, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath, routeQuery) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      if (routeQuery) {
        const query = JSON.parse(routeQuery);
        return { path: path.resolve(this.basePath, routePath), query };
      }
      return path.resolve(this.basePath, routePath);
    },
  },
  render() {
    const { item, isNest } = this;

    if (item.hidden) {
      return;
    }

    const only =
      (this.hasOneShowingChild(item.children, item) &&
        (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
        !item.alwaysShow) ||
      item.menuType === 'C';

    if (only) {
      const index = this.resolvePath(this.onlyOneChild.path);
      return (
        this.onlyOneChild.meta && (
          <div>
            <el-menu-item index={index} class={{ 'submenu-title-noDropdown': !isNest }}>
              <app-link to={this.resolvePath(this.onlyOneChild.path, this.onlyOneChild.query)}>
                <span>
                  <app-item
                    icon={this.onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                    title={this.onlyOneChild.meta.title}
                  />
                </span>
              </app-link>
            </el-menu-item>
          </div>
        )
      );
    }

    return (
      <div>
        <el-submenu
          ref="subMenu"
          index={this.resolvePath(item.path)}
          popper-class="mypandora-layout-aside__popper-menu"
          popper-append-to-body
        >
          {item.meta && <app-item slot="title" icon={item.meta && item.meta.icon} title={item.meta.title} />}
          {item.children.map((child) => (
            <sidebar-item key={child.path} is-nest={true} item={child} base-path={this.resolvePath(child.path)} />
          ))}
        </el-submenu>
      </div>
    );
  },
};
</script>
