const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/game.js",
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "assets"),
      },
      client: {
        overlay: false,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename           : "index.html",
        template           : "./src/index.html",
        inlineSource: ".(js|css)$",
      }),
        new CopyPlugin({
            patterns: [
                { from: "assets", to: "assets"},
            ],
        }),
    ],
};
