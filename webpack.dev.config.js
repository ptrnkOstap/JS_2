const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./public/js/vuejs.js"]
    },


    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlugin({
            template: 'public/cart.html',
            filename: 'cart.html',
            excludeChunks: ['server']
        })
    ]
};
