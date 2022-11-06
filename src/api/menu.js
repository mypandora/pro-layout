// 获取路由
export const getRoutes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: 'System',
          path: '/system',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: { title: '系统管理', icon: 'system', noCache: false, link: null },
          children: [
            {
              name: 'Dept',
              path: 'dept',
              hidden: false,
              component: 'demo',
              meta: {
                title: '部门管理',
                icon: 'tree',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'User',
              path: 'user',
              hidden: false,
              component: 'demo',
              meta: {
                title: '用户管理',
                icon: 'user',
                noCache: false,
                link: null,
              },
            },
            {
              name: 'Role',
              path: 'role',
              hidden: false,
              component: 'demo',
              meta: { title: '角色管理', icon: 'peoples', noCache: false, link: null },
            },
            {
              name: 'Menu',
              path: 'menu',
              hidden: false,
              component: 'demo',
              meta: { title: '菜单管理', icon: 'tree-table', noCache: false, link: null },
            },
            {
              name: 'Post',
              path: 'post',
              hidden: false,
              component: 'demo',
              meta: { title: '岗位管理', icon: 'post', noCache: false, link: null },
            },
            {
              name: 'Dict',
              path: 'dict',
              hidden: false,
              component: 'demo',
              meta: { title: '字典管理', icon: 'dict', noCache: false, link: null },
            },
            {
              name: 'Log',
              path: 'log',
              hidden: false,
              redirect: 'noRedirect',
              component: 'demo',
              alwaysShow: true,
              meta: { title: '日志查询', icon: 'log', noCache: false, link: null },
              children: [
                {
                  name: 'Operlog',
                  path: 'operlog',
                  hidden: false,
                  component: 'demo',
                  meta: { title: '操作日志', icon: 'form', noCache: false, link: null },
                },
                {
                  name: 'Logininfor',
                  path: 'logininfor',
                  hidden: false,
                  component: 'demo',
                  meta: { title: '登录日志', icon: 'logininfor', noCache: false, link: null },
                },
              ],
            },
          ],
        },
        {
          name: 'Monitor',
          path: '/monitor',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: { title: '系统监控', icon: 'monitor', noCache: false, link: null },
          children: [
            {
              name: 'Online',
              path: 'online',
              hidden: false,
              component: '404',
              meta: { title: '在线用户', icon: 'online', noCache: false, link: null },
            },
            {
              name: 'Job',
              path: 'job',
              hidden: false,
              component: 'monitor/job/index',
              meta: { title: '定时任务', icon: 'job', noCache: false, link: null },
            },
          ],
        },
        {
          name: 'Tool',
          path: '/tool',
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: true,
          meta: { title: '系统工具', icon: 'tool', noCache: false, link: null },
          children: [
            {
              name: 'Build',
              path: 'build',
              hidden: false,
              component: '404',
              meta: { title: '表单构建', icon: 'build', noCache: false, link: null },
            },
          ],
        },
      ]);
    }, 500);
  });
};
