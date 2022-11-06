import { ParentView, InnerLink } from '../../packages/layout/index';
import Layout from './index.vue';

/**
 * 实例化路由信息为路由组件。
 * 后台获取到的路由还是一段字符串，在这里我们用一个实例组件代替相应的字符串。
 * @param {*} route
 */
function initializeRoute(route) {
  if (route.component) {
    // Layout ParentView InnerLink 组件特殊处理
    if (route.component === 'Layout') {
      route.component = Layout;
    } else if (route.component === 'ParentView') {
      route.component = ParentView;
    } else if (route.component === 'InnerLink') {
      route.component = InnerLink;
    } else {
      route.component = loadView(route.component);
    }
  }
}

/**
 * 拼接路径？
 * @param {*} childrenMap
 * @param {*} lastRouter
 * @returns
 */
function absoluteRoutePath(childrenMap, lastRouter = false) {
  let children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path;
          if (c.children && c.children.length) {
            children = children.concat(absoluteRoutePath(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

// 实例化并且拼接 path
function initializeAndPathRoute(routes, lastRouter = false, type = false) {
  return routes.filter((route) => {
    if (type && route.children) {
      route.children = absoluteRoutePath(route.children);
    }
    initializeRoute(route);
    if (route.children !== null && route.children && route.children.length) {
      route.children = initializeAndPathRoute(route.children, route, type);
    } else {
      delete route.children;
      delete route.redirect;
    }
    return true;
  });
}

// 开发模式下添加的测试路由
export function filterDevRoutes(routes) {
  const res = [];
  // 在开发模式下添加图标路由。
  if (process.env.NODE_ENV === 'development') {
    routes.forEach((route) => {
      res.push(route);
    });
  }
  return res;
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
};

export { initializeAndPathRoute };
