const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/, // This regex matches .ts files
        exclude: /node_modules/,
        use: [
          "ts-loader", // Use ts-loader to transpile TypeScript files
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
      filename: "./index.html", // Output filename
    }),
  ],
};
