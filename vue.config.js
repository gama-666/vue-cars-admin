module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : './', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist', // 打包文件存放目录(默认''dist''，构建之前会被清除)
    assetsDir: '', //放置打包生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    pages: {
        //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {
            //除了 entry 之外都是可选的
            entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
        }
    },
    chainWebpack: config => {
        // 设置svg
        const svgRule = config.module.rule("svg")
        svgRule.uses.clear()
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
                include: ["./src/icon"]
            })
    },
    configureWebpack: {
        //定义路径别名
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.js',
                'assets': '@/assets',
                'views': '@/views'
            }
        }
    },
    lintOnSave: false, // 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        }, // css预设器配置项
        requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files. (vue-cli 4.0已弃用vue.config.js中的“ css.modules”选项，请改用“ css.requireModuleExtension”。)
    },
    // 开发环境配置
    devServer: {
        open: false, // 启动服务后是否打开浏览器
        host: '0.0.0.0',//指定使用地址，默认localhost，0.0.0.0代表可以被外界访问
        port: 8080, // 服务端口
        hot: true,//开启热更新
        hotOnly: false,
        proxy: {  // 设置代理
            '/devapi': {
                /* 目标代理服务器地址 */
                target: 'http://www.web-jshtml.cn/productapi/token',
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            }
        },
        before: app => {
        }
    },
    pluginOptions: {
        // 第三方插件配置
        // ...
    }
}