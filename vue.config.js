const path = require("path");
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
  themeVariables: ['@primary-color'],
  generateOnce: false,
  mainLessFile: "",

}

const themePlugin = new AntDesignThemePlugin(options);
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭保存检查语法
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
          },
          javascriptEnabled: true,
          // 兼容 less-loader 3.x
          math: "always",
        }
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:99',
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          } /* else if (process.env.MOCK !== "none") {
            console.log(req.path);
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          } */
        },
      },
    },
  },
});
