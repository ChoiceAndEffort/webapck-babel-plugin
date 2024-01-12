const archiver = require('archiver');
const fs = require('fs');

class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tap('MyPlugin', (compilation) => {
      console.log('beforeRun---------', '在 Webpack 开始执行编译之前触发');
    });
    compiler.hooks.run.tap('MyPlugin', (compilation) => {
      console.log('run---------', '在 Webpack 开始执行编译时触发。');
    });

    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      console.log('emit---------', '在生成资源并输出到目录之前触发');
    });

    compiler.hooks.afterEmit.tap('MyPlugin', (compilation) => {
      console.log('afterEmit---------', '在生成资源并输出到目录之后触发。');

      //主要利用node archiver来生成zip文件
      const { sourceDir, outputFilename } = this.options;

      const inputDirPath = sourceDir; // 将此处替换为实际的输入目录路径
      const outputFileName = outputFilename; // 将此处替换为实际的输出ZIP文件名

      // 创建写入流来写入ZIP文件
      const outputStream = fs.createWriteStream(outputFileName);

      // 创建Archive对象
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.pipe(outputStream);

      // 向Archive对象添加需要打包到ZIP文件中的文件或目录
      archive.directory(inputDirPath, false).finalize();
    });

    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('compilation---------', '开始一个新的编译过程时触发。');
    });

    compiler.hooks.done.tap('MyPlugin', (compilation) => {
      console.log('done---------', '编译完成时触发，包括成功或失败。');
    });
  }
}
module.exports = MyPlugin;
