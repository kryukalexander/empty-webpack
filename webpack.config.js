const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
                            options: { sourceMap: true, url: false }
                        },

                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },
                        
                        {
                          loader: 'resolve-url-loader'
                        },

                        {
                            loader: 'sass-loader?sourceMap',
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
                    }
                ]
            },

            {
                test: /\.pug$/,
                use: "pug-loader?pretty=true"
            },


            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [ path.resolve('images', 'icons-svg'), path.resolve('images', 'images-sprite'), path.resolve('fonts')],
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
                template: 'templates/index.pug',
                filename: './index.html',
            }
        ),

        new HtmlWebpackPlugin(
            {
                template: 'templates/copy.pug',
                filename: './copy.html'

            }
        ),

        new ExtractTextPlugin('css/style.css'),

        new CopyWebpackPlugin([
            {
                from: './fonts',
                to: './fonts'
            },

            {
                from: './images/sprite.png',
                to: './images/sprite.png'
            },
        ]),
    ]
};

//todo svg sprite loader
//todo split config
//todo font loader

module.exports = config;