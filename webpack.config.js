const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './src/js/index.js',
    output: {
        filename: 'app.bundle.js',
        clean: true
    },
    optimization:{
        minimizer: [
            new CssMinimizerPlugin(), 
            new TerserPlugin()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/css", to: "css/" },
            ]
        }),
    ]
}