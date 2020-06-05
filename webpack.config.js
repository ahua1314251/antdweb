
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');//用于自动生成html入口文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将CSS代码提取为独立文件的插件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");//CSS模块资源优化插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports={
    mode: 'production',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx",".js"]
    },
    entry:{
        index:'./src/index.tsx'
        // vendor: ['react','react-dom','react-router-dom']
    },
    output: {
        path: __dirname + '/dists',
        filename: "bundle.js"
    },

    module:{
        rules:[
            {test:/\.css$/,
             exclude: /node_modules/,
             use: 'happypack/loader?id=cssLoader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=urlLoader'
            },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,  
             exclude: /node_modules/,
             use: 'happypack/loader?id=urlLoader'
            },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
             exclude: /node_modules/,
             use: 'happypack/loader?id=urlLoader'
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
             exclude: /node_modules/,
             use: 'happypack/loader?id=urlLoader'},
            {
             test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
             exclude: /node_modules/,
             use: 'happypack/loader?id=urlLoader'
            },
            {test: /\.ts(x?)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [ {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                      happyPackMode:true
                    }
                  }] },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]},
    plugins:[
        new HappyPack({
            id: 'urlLoader',
            loaders: ['url-loader'],
            threadPool: happyThreadPool,
            verbose: true
          }),
          new HappyPack({
            id: 'cssLoader',
            loaders: ['style-loader','css-loader'],
            threadPool: happyThreadPool,
            verbose: true
          }),
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin(),//生成入口html文件
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })//为抽取出的独立的CSS文件设置配置参数
        ,
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            filename:"index.html",
            favicon: path.resolve('./public/favicon.ico')
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                cache:true,
                parallel:true,
                sourceMap: true,
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true

                },
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false
                }
            }
        })
    ],
    devServer: {
        contentBase:__dirname + '/dists',
        compress: true,
        port: 9000
    },
    optimization: {
        splitChunks: {
            chunks: "all",//在做代码分割时，只对异步代码生效，写成all的话，同步异步代码都会分割
            minSize: 250000, //引入的包大于500KB才做代码分割
            maxSize: 350000,
            minChunks: 2, //当一个包至少被用了多少次的时候才进行代码分割
            maxAsyncRequests: 3, //同时加载的模块数最多是5个
            maxInitialRequests: 3, //入口文件做代码分割最多能分成3个js文件
            automaticNameDelimiter: '~',//文件生成时的连接符
            name: true,//让cacheGroups里设置的名字有效
            cacheGroups: {//当打包同步代码时,上面的参数生效
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                  },
                commom: {
                    priority: -20,
                    reuseExistingChunk: true,//如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
                    filename: 'common.js',
                    test: /[\\/]node_modules[\\/]/ //检测引入的库是否在node_modlues目录下的

                }
            }
        }
        //以上是默认配置

        //无论是同步还是异步代码分割，上面的配置都会生效
        //都需要用到SplitChunkPlugin这个插件
    }
,externals: {
  
    // 'react': 'window.React',
    // 'reactDOM': 'window.ReactDOM'
}
}


