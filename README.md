# 布局

### 依赖

Vue 2.6.14+

Vue-Router 3.5.4+

Element-UI 2.15.8+

### 安装

```
npm install @mypandora/pro-layout
```

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| device | 显示模式：手机、电脑 | String | desktop | desktop |
| logoTitle | layout 的左上角 的 title | String | - | '' |
| headerHeight | 顶部导航高度 | Number | - | 60 |
| sideWidth | 左侧菜单栏宽度 | Number | - | 200 |
| sideCollpaseWidth | 左侧菜单栏收缩宽度 | Number | - | 48 |
| menuRoutes | 路由数组 | Array | - | [] |
| predefine | 预设颜色 | Array | - | ['#2e59a7', '#80d1c8', '#0095b6', '#ff770f', '#1a7bb0'] |
| settings | 布局配置 | Object | - | - |
| tagsView | 页签配置 | Object | - | - |

### menuRoutes

| 参数        | 说明                     | 类型    | 可选值      | 默认值     |
| ----------- | ------------------------ | ------- | ----------- | ---------- |
| path        | 路由路径                 | String  |             |            |
| name        | 路由的名字               | String  |             |            |
| component   | 路由组件                 | Vue     |             |            |
| hiddren     | 路由是否隐藏             | Boolean | false, true | false      |
| alwaysShow  | 路由是否总是显示         | Boolean | false, true | true       |
| redirect    | 在面包屑导航中是否可点击 | String  |             | noRedirect |
| query       | 默认传递参数             | String  |             |            |
| roles       | 访问路由的角色权限       | Array   |             |            |
| permissions | 访问路由的菜单权限       | Array   |             |            |
| meta        | 路由元数据信息           | Object  |             |            |

### settings

| 参数         | 说明             | 类型    | 可选值                  | 默认值      |
| ------------ | ---------------- | ------- | ----------------------- | ----------- |
| showSettings | 是否显示配置     | Boolean | true, false             | false       |
| sideTheme    | 侧边栏风格       | String  | theme-dark, theme-light | theme-light |
| theme        | 主题色           | String  | -                       | #2E59A7     |
| navMode      | 导航模式         | String  | aside, top, mix         | mix         |
| fixedHeader  | 是否固定顶部导航 | Boolean | true, false             | true        |
| fixedSide    | 是否固定侧边菜单 | Boolean | true, false             | true        |
| autoMenu     | 是否自动分割菜单 | Boolean | true, false             | true        |
| showHeader   | 是否显示顶栏     | Boolean | true, false             | true        |
| showSide     | 是否显示菜单     | Boolean | true, false             | true        |
| showLogo     | 是否显示 Logo    | Boolean | true, false             | true        |
| showTagsView | 是否启用页签     | Boolean | true, false             | true        |

### 插槽

| 名称       | 说明                 |
| ---------- | -------------------- |
| logo       | layout 的左上角 logo |
| logoRender | layout 的左上角      |
| rightMenu  | 导航栏最右侧菜单区域 |
| tagsView   | 页签插槽             |
