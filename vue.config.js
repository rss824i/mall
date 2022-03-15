// 配置，cli3会将这里的配置和默认的配置合并
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  // 配置webpack的config
  chainWebpack: config => {
    // 设置快捷路径(别名)， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));
    //排除icons目录中svg文件处理
  },
} 


