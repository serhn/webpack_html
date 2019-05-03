var path = require('path');
//const VueLoaderPlugin = require('vue-loader/lib/plugin')
var laravelBladeCompiler = require('laravel-blade-compiler');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
var compiledHTML = laravelBladeCompiler({
    folder: './resources/views',
    path: './resources/views/home.blade.php'
});
const fs = require('fs');
fs.writeFile("./public/index.html", compiledHTML, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
console.log(compiledHTML);
*/
module.exports = {
    //...
    target: "web",
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        //hot: true,
        //inline: true,
        progress: true,
        watchContentBase: true
    },
    entry: {
        app: ["./src/js/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            },
            {
                loader: "css-loader" // translates CSS into CommonJS
            },
            {
                loader: "sass-loader" // compiles Sass to CSS
            },
            {
                loader: "postcss-loader"
            }
            ]
        },
       /* {
            test: /\.(html)$/,
            include: path.join(__dirname, 'src/html/inc'),
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            }
        },*/
        {
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
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {},
            },],
        },

        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?mimetype=image/svg+xml'
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/font-woff"
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/font-woff"
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/octet-stream"
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        },
        ]
    },

    plugins: [new HtmlWebpackPlugin({
    //    inject: false,
        //templateContent: laravelBladeCompiler({
        //    folder: './src/html/',
        //    path: './src/html/home.blade.php'
        //})
        //alwaysWriteToDisk: true,
        template: './src/html/index.html'
    })]

};