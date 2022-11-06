<script>
import path from 'path';
import AppItem from './Item';
import AppLink from './Link';
import { isExternal } from '../utils';

export default {
  name: 'TopbarItem',
  components: { AppItem, AppLink },
  props: {
    device: {
      type: String,
      default: 'desktop',
    },
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
    const { item, hasOneShowingChild, resolvePath, device } = this;
    const { hidden, meta = {}, path, children, alwaysShow, menuType } = item;

    const hasOne = hasOneShowingChild(children, item);
    const { onlyOneChild } = this;

    const only =
      (hasOne && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !alwaysShow) || menuType === 'C';

    if (hidden) {
      return <span></span>;
    }

    if (only) {
      return (
        onlyOneChild.meta && (
          <el-menu-item index={resolvePath(onlyOneChild.path)}>
            <app-link to={resolvePath(onlyOneChild.path, onlyOneChild.query)}>
              <div>
                <app-item
                  icon={onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                  title={onlyOneChild.meta.title}
                />
              </div>
            </app-link>
          </el-menu-item>
        )
      );
    }

    const childrenItem = children.map((child) => (
      <topbar-item key={child.path} is-nest={true} item={child} base-path={resolvePath(child.path)} device={device} />
    ));
    return (
      <el-submenu ref="topSubMenu" index={resolvePath(path)} popper-append-to-body={false}>
        <div slot="title">{meta && <app-item title={item.meta.title} />}</div>
        {childrenItem}
      </el-submenu>
    );
  },
};
</script>
