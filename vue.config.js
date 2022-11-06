// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
'use strict';
const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    historyApiFallback: true,
  },
  css: {
    extract: false,
  },
  // webpack相关
  configureWebpack: {
    name: '布局',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),
    ],
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    if (process.env.NODE_ENV === 'production') {
      config.output = Object.assign(config.output, {
        libraryExport: 'default',
      });
    } else {
      // 为开发环境修改配置...
    }
  },
};
