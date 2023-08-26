const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "../src/_devTest/index.tsx"),
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "@babel/preset-env", [ "@babel/preset-react", { "runtime": "automatic" } ], "@babel/preset-typescript", ],
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/_devTest/index.html")
        }),
        new ReactRefreshWebpackPlugin(),
    ],
    devtool: "cheap-module-source-map",
    watchOptions: {
        stdin: true,
        ignored: /node_modules\/.*/,
        poll: true,
    },
    devServer: {
        host: "0.0.0.0",
        hot: true,
        open: true,
    },
};