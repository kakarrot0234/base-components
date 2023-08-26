const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "../src/index.tsx"),
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
                },
            },
            {
              test: /\.css$/,
              use: [
                { loader: MiniCSSExtractPlugin.loader, },
                { loader: "css-loader", },
              ]
            },
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/app/index.html")
        }),
        new MiniCSSExtractPlugin(),
    ],
    devtool: "source-map",
};