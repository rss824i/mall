// 配置，cli3会将这里的配置和默认的配置合并


const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  // 配置webpack的config
  chainWebpack: config => {
    // 设置快捷路径(别名)， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('@/assets'))
      .set('components', resolve('@/components'))
      .set('views', resolve('@/views'));
    //排除icons目录中svg文件处理
  },
} 

/* const path = require('path')
function resolve(dir) {
    console.log(dir); 
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('base', resolve('src/base'))
            .set('views',resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
    }
} */
