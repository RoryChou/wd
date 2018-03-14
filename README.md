# lvmama weshop webapp


## 前期准备
* npm i 安装依赖


## 说明
   本架构是基于vue脚手架（webpack）改造，现开发、生产构建都是通过build.js完成，如果是开发阶段，配合dev-server，同样能实现监听文件改变以及热重载功能。单元测试都是通过jest完成。
   主文件包含index.html（模板文件） 和 main.js(入口文件)

## 命令相关

- npm start/npm run devWeshop
开发模式下启动命令

- npm run buildWeshop
测试环境打包命令

- npm run prodWeshop
生产环境打包命令

## 配置相关
待补充

## eslint相关
构建的时候很可能会出现eslint报错信息，如果使用vscode编辑器，建议装ESLint插件，它会检测.eslinttrc配置文件，当不符合规则的时候，会有提示。