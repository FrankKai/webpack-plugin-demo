class FileListPlugin {
  static defaultOptions = {
    outputFile: "assets.md",
  };

  // 所有的options都要传到插件的constructor
  // （这是你的插件的公共API部分）

  constructor(options = {}) {
    // 用户定义的options覆盖默认options
    // 与默认options合并，从而给插件的method使用
    // 你需要在这里验证options
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name;

    // webpack模块实例，可以从compiler对象上解构下来
    // 这可以确保模块的正确部分被使用
    // (不要通过require / import或者其他方式引入webpack)
    const { webpack } = compiler;

    // compilation对象可以给我们一些常用常量的引用
    const { Compilation } = webpack;

    // RawSource用来在编译时代表资源class
    const { RawSource } = webpack.sources;

    // 使用thisCompilation hook使得构建处于较早的阶段
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // 在指定阶段进入到静态资源的流水线
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // 靠后一点的阶段，确保所有资源能被加入到插件的编译中
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          // assets是包含所有静态资源的对象
          // 在编译阶段，对象的键是assets的路径，对象的值是assets的文件内容

          // 遍历所有静态文件，生成markdown文件
          const content =
            "# In this build:\n\n" +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join("\n");
          // 把资源添加给compilation，从而自动由webpack生成到目标目录
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}

module.exports = { FileListPlugin };
