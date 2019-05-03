var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const WebpackShellPlugin = require('webpack-shell-plugin');
//const devMode = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    zindex: false
                },
            }),
            new UglifyJsPlugin({
                sourceMap: false,
                extractComments: {
                    condition: /^\**!|@preserve|@license|@cc_on/i,
                    filename: 'site/extracted-comments.js',
                    banner(licenseFile) {
                        return `License information can be found in ${licenseFile}`;
                    },
                },
            }),


        ],
        /*
        splitChunks: {
            chunks: 'async',
            minSize: 0,
            maxSize: 200000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        }
        */

    },

    entry: {
        app: ["./src/js/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        publicPath: "",
        filename: "site/app.js"
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "/site/packimg/[name].[ext]"
                    },
                }, ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=image/svg+xml',
                options: {
                    name: "/site/fonts/[name].[ext]"
                }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
                options: {
                    name: "/site/fonts/[name].[ext]"
                }
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
                options: {
                    name: "/site/fonts/[name].[ext]"
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/octet-stream",
                options: {
                    name: "/site/fonts/[name].[ext]"
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "/site/fonts/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin([{
                from: 'public/site/images',
                to: 'site/images'
            }, {
                from: 'public/favicon.ico',
                to: './'
            },
            {
                from: 'public/index.html',
                to: '../resources/views/layoutsite/home.blade.php'
            },
            {
                from: 'public/en/index.html',
                to: '../resources/views/layoutsite/en/home.blade.php'
            },
            {
                from: 'public/index.html',
                to: './'
            },
            {
                from: 'public/robots.txt',
                to: './'
            },
            {
                from: 'public/en',
                to: './en'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'site/app.css',
            chunkFilename: '[id].css',
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Custom template',
        //     template: '../public/index.html'
        // })

    ],

};