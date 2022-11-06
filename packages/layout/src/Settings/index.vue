<template>
  <el-drawer
    size="280px"
    :visible="settings.showSettings"
    :with-header="false"
    :append-to-body="true"
    :show-close="false"
  >
    <div class="drawer-container">
      <h3 class="drawer-title">整体风格设置</h3>
      <div class="drawer-item">
        <el-tooltip effect="dark" content="亮色菜单风格" placement="top">
          <div
            class="block-checkbox-item block-checkbox-item-light fl"
            @click="handleSetting('sideTheme', 'theme-light')"
          >
            <i v-show="settings.sideTheme === 'theme-light'" class="block-checkbox-item-check"></i>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="暗色菜单风格" placement="top">
          <div class="block-checkbox-item block-checkbox-item-dark" @click="handleSetting('sideTheme', 'theme-dark')">
            <i v-show="settings.sideTheme === 'theme-dark'" class="block-checkbox-item-check"></i>
          </div>
        </el-tooltip>
      </div>

      <h3 class="drawer-title">
        <el-tooltip
          class="item"
          effect="dark"
          content="当启用导航栏背景图片时，主题颜色选择将禁用。"
          placement="top-start"
        >
          <span>
            <el-icon class="el-icon-info"></el-icon>
            主题颜色
          </span>
        </el-tooltip>
      </h3>
      <div class="drawer-item">
        <theme-picker @change="handleSetting" />
      </div>

      <h3 class="drawer-title">导航模式</h3>
      <el-tooltip effect="dark" content="侧边菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-dark fl" @click="handleSetting('navMode', 'side')">
          <i v-show="settings.navMode === 'side'" class="block-checkbox-item-check"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="顶部菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-top fl" @click="handleSetting('navMode', 'top')">
          <i v-show="settings.navMode === 'top'" class="block-checkbox-item-check"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="混合菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-mix" @click="handleSetting('navMode', 'mix')">
          <i v-show="settings.navMode === 'mix'" class="block-checkbox-item-check"></i>
        </div>
      </el-tooltip>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-if="settings.navMode === 'mix'" :value="true" disabled @change="handleFixedHeader" class="fr" />
        <el-switch v-else :value="settings.fixedHeader" @change="handleFixedHeader" class="fr" />
      </div>
      <div class="drawer-item">
        <span>固定侧边菜单</span>
        <el-switch
          :value="settings.fixedSide"
          :disabled="settings.navMode === 'top'"
          @change="handleFixedSide"
          class="fr"
        />
      </div>
      <div class="drawer-item">
        <span>自动分割菜单</span>
        <el-switch
          :value="settings.autoMenu"
          :disabled="settings.navMode !== 'mix'"
          @change="handleAutoMenu"
          class="fr"
        />
      </div>

      <h3 class="drawer-title">内容区域</h3>
      <div class="drawer-item">
        <span>顶栏</span>
        <el-switch :value="settings.showHeader" @change="handleShowHeader" class="fr" />
      </div>
      <div class="drawer-item">
        <span>菜单</span>
        <el-switch
          :value="settings.showSide"
          :disabled="settings.navMode === 'top'"
          @change="handleShowSide"
          class="fr"
        />
      </div>
      <div class="drawer-item">
        <span>显示 Logo</span>
        <el-switch :value="settings.showLogo" @change="handleShowLogo" class="fr" />
      </div>
      <div class="drawer-item">
        <span>显示页签</span>
        <el-switch :value="settings.showTagsView" @change="handleShowTagsView" class="fr" />
      </div>

      <el-divider />
      <el-button size="small" type="primary" plain icon="el-icon-document-add" @click="saveSetting">保存配置</el-button>
      <el-button size="small" plain icon="el-icon-refresh" @click="resetSetting">重置配置</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { Loading } from 'element-ui';
import ThemePicker from '../ThemePicker';

export default {
  name: 'LayoutSettings',
  components: { ThemePicker },
  inject: ['$computedProperty'],
  data() {
    return {};
  },
  computed: {
    rootProps() {
      return this.$computedProperty();
    },
    settings() {
      return this.rootProps.settings;
    },
  },
  methods: {
    handleSetting(key, value) {
      this.$emit('changeSetting', {
        key,
        value,
      });

      if (key === 'navMode' && (value === 'side' || value === 'top' || value === 'mix')) {
        switch (value) {
          case 'side':
            this.$emit('setSidebarRoutes');
            if (this.settings.autoMenu) {
              this.$emit('changeSetting', {
                key: 'autoMenu',
                value: false,
              });
            }
            break;
          case 'top':
            if (this.settings.autoMenu) {
              this.$emit('changeSetting', {
                key: 'autoMenu',
                value: false,
              });
            }
            break;
          case 'mix':
            this.$emit('setSidebarRoutes');
            break;
          default:
            break;
        }
      }
    },
    handleFixedHeader(val) {
      this.$emit('changeSetting', {
        key: 'fixedHeader',
        value: val,
      });
    },
    handleFixedSide(val) {
      this.$emit('changeSetting', {
        key: 'fixedSide',
        value: val,
      });
    },
    handleAutoMenu(val) {
      this.$emit('changeSetting', {
        key: 'autoMenu',
        value: val,
      });
      // TODO 记住当前点击的路由
    },
    handleShowHeader(val) {
      this.$emit('changeSetting', {
        key: 'showHeader',
        value: val,
      });
    },
    handleShowSide(val) {
      this.$emit('changeSetting', {
        key: 'showSide',
        value: val,
      });
    },
    handleShowLogo(val) {
      this.$emit('changeSetting', {
        key: 'showLogo',
        value: val,
      });
    },
    handleShowTagsView(val) {
      this.$emit('changeSetting', {
        key: 'showTagsView',
        value: val,
      });
    },

    saveSetting() {
      const loadingInstance = Loading.service({
        lock: true,
        text: '正在保存到本地，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      localStorage.setItem(
        'layout-setting',
        `{
            "sideTheme":"${this.settings.sideTheme}",
            "theme":"${this.settings.theme}",

            "navMode":"${this.settings.navMode}",

            "fixedHeader":${this.settings.fixedHeader},
            "fixedSide":${this.settings.fixedSide},
            "autoMenu":${this.settings.autoMenu},

            "showHeader":${this.settings.showHeader},
            "showSide":${this.settings.showSide},
            "showLogo":${this.settings.showLogo},
            "showTagsView":${this.settings.showTagsView},

          }`,
      );
      setTimeout(loadingInstance.close(), 1000);
    },
    resetSetting() {
      Loading.service({
        lock: true,
        text: '正在清除设置缓存并刷新，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      localStorage.removeItem('layout-setting');
      setTimeout(() => window.location.reload(), 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-drawer-content {
  .setting-drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
  }
}

.drawer-container {
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .fr {
    float: right;
  }

  .fl {
    float: left;
  }
}

.block-checkbox-item {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;

  &-light:before {
    background-color: #fff;
    content: '';
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    content: '';
  }

  &-light:after {
    background-color: #fff;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
    content: '';
  }

  &-dark:before,
  &-side:before {
    z-index: 1;
    background-color: #001529;
    content: '';
  }

  &-dark:after,
  &-side:after {
    background-color: #fff;
  }

  &-top:before {
    background-color: transparent;
    content: '';
  }
  &-top:after {
    background-color: #001529;
  }

  &-mix:before {
    background-color: #fff;
    content: '';
  }
  &-mix:after {
    background-color: #001529;
  }

  &-check {
    position: absolute;
    width: 12px;
    height: 5px;
    bottom: 9px;
    right: 5px;
    display: inline-block;
    border: 1px solid #242425;
    border-width: 0 0 2px 2px;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    vertical-align: baseline;
  }
}
</style>
