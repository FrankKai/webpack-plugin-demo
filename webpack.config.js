const path = require("path");
const { FileListPlugin } = require("./plugin/file-list-plugin.js");
// const { CopyRenameWebpackPlugin } = require("./plugin/copy-rename-webpack-plugin.js");
const CopyRenameWebpackPlugin = require("copy-rename-webpack-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new FileListPlugin(),
    new CopyRenameWebpackPlugin({
      entry: "main.js",
      output: ["../build/cn/daily/main-cn-daily.js", "../build/cn/pre/main-cn-pre.js"],
    }),
  ],
};
