const path = require('path');

const webpack = require('webpack');

const proxy = require('http-proxy-middleware');

// 在内存中生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
//处理字体的插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const VueLoaderPlugin = require('vue-loader');

let config = {
    mode: 'development',
    entry: {
        main: path.join(__dirname, './src/main.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './dist')
    },
    devServer: { //启用开发服务器
        contentBase: './dist', //告诉服务器从哪提供内容，只有在想要提供静态文件时才需要
        compress: true, //一切服务都启用gzip 压缩
        // host: '192.168.23.143', //指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止。默认localhost。
        // host: '192.168.23.102', //指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止。默认localhost。
        // host: '0.0.0.0',
        port: '8081', //指定端口号，如省略，默认为”8080“
        hot: true, //启用模块热替换特性
        inline: true, //启用内联模式，一段处理实时重载的脚本被插入到bundle中，并且构建消息会出现在浏览器控制台
        //historyApiFallback: true, //开发单页应用时有用，依赖于HTML5 history API，设为true时所有跳转将指向index.html
        // proxy: {
        //     '/api': {
        //         target: 'http://yiapi.xinli001.com/', //目标服务器地址
        //         changeOrigin: true, //启用跨域
        //         pathRewrite: {
        //             '^/api': '/'
        //         }
        //     }
        // },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //webpack内置的热更新插件
        new HtmlWebpackPlugin({
            //  filename: 'index.html', //指定生成页面的名称
            template: path.join(__dirname, './src/index.html'), //指定模版的页面， 会根据指定的页面路径生成内存中的页面
            inject: true //设为 true 表示把JS文件注入到body结尾，CSS文件注入到head中；
            // minify: {
            //     removeComments: true  表示删除模版中的注释
            //   }
        }),
        new VueLoaderPlugin(),
        // new ExtractTextPlugin({
        //     filename: "[name].min.css",
        //     allChunks: false
        // })
    ],
    //用于配置所有的第三方模块加载器
    module: {
        //所有第三方模块的配配规则
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader' // 处理以.vue结尾的文件
        },
        {
            test: /.ejs$/,
            use: ['ejs-loader']
        },
        {
            test: /.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /.(jpg|jpeg|png|gif|svg)$/,
            use: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]',
            // use: [
            //     options: {
            //         name: '[name]-[hash:8].[ext]', //图片格式和大小
            //         limit: 1024 //小于这个值图片会被转成base64 大于在这个值不会转
            //     }
            // ]
        },
        {
            test: /.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ]
        },
        {
            test: /.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.(eot|woff2|woff|ttf|svg)$/,
            use: [{
                loader: "url-loader",
                // options: {
                //     name: "[name]-[hash:5].min.[ext]",
                //     limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                //     publicPath: "fonts/",
                //     outputPath: "fonts/"
                // }
            }]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader', //讲es 6，7，8，9...等转化成es5
            exclude: /node_modules/ //排除掉node_modules中的js包
        }
        ]
    },
    resolve: {
        alias: { //修改vue被导入时 包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}

module.exports = config