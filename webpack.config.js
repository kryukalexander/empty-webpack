const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './app.js'
    },

    devServer: {
        // contentBase: path.resolve(__dirname, './dist')
    },

    devtool: 'inline-source-map',

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ['env'] }

                }
            },

            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src', 'css'),
                use: ExtractTextPlugin.extract({
                    use: [

                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },

                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },

                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ],

                    fallback: 'style-loader'

                })
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    },
                    {
                        loader: 'posthtml-loader',
                    }

                ]
            },


            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [ path.resolve('images', 'icons-svg'), path.resolve('images', 'images-sprite')],
                use: [
                    'url-loader?limit=1500&name=[path][name].[ext]',
                    'img-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin(
            {
                template: 'templates/index.html',
                filename: './index.html'
            }
        ),

        new HtmlWebpackPlugin(
            {
                template: 'templates/copy.html',
                filename: './copy.html'

            }
        ),

        new ExtractTextPlugin('style.css'),
    ]
};

//todo postcss addons
//todo svg sprite loader
//todo split config
//todo font loader

module.exports = config;