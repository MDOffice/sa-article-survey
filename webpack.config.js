const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: './index.css'
        }),
    ]
};
