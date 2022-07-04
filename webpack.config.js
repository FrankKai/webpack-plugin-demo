const path = require("path");
const { FileListPlugin } = require("./plugin/file-list-plugin.js");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new FileListPlugin()],
};
