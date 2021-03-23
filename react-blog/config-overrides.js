const { override, addWebpackAlias, } = require('customize-cra');
const path = require('path');
module.exports = override(
  // fixBabelImports({
  //   libraryName: 'antd',
  //   libraryDirectory: 'es',
  //   style: true
  // }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
)
