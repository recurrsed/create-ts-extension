const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.ts",
    popup: "./src/popup.ts"
  },
  devtool: "source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/manifest.json", to: "./manifest.json" },
        { from: "./src/popup.html", to: "./popup.html" },
        { from: "./src/assets/", to: "./assets" }
      ],
    })
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    },{
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: true
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  }
};
