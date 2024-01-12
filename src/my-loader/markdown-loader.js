const marked = require('marked');

module.exports = (source) => {
  //方案一直接使用markdown-loader,在webpack中不需要用到html-loader
  console.log('1----', source);

  const html = marked.parse(source); // 使用marked插件将输入内容转换成html字符串
  console.log('----', html, '----');
  // return `module.exports = "${html}"` // 直接拼接的话，html中的换行符还有一些引号可能会造成语法错误
  return `module.exports = ${JSON.stringify(html)}`; // 使用JSON.Stringify将字符串中的引号和换行符转译过来,转换成js文件

  //方案二直接使用markdown-loader,在webpack中需要用到html-loader
  // const html = marked.parse(source); // 使用marked插件将输入内容转换成html字符串
  // return html; // 直接将html字符串返回 ,给到html-loader,再由html-loader转换成js文件
};
