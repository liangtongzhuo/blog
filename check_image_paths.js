const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'data', 'articles');

// 读取articles目录下的所有JSON文件
fs.readdir(articlesDir, (err, files) => {
  if (err) {
    console.error('读取目录失败:', err);
    return;
  }

  // 过滤出JSON文件
  const jsonFiles = files.filter(file => path.extname(file) === '.json');

  let hasError = false;

  jsonFiles.forEach(file => {
    const filePath = path.join(articlesDir, file);
    
    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(`读取文件 ${file} 失败:`, err);
        return;
      }

      // 检查是否包含错误的图片路径格式
      const regex = /data\/data\/data\/data\/files\//g;
      const matches = content.match(regex);
      
      if (matches) {
        console.log(`文件 ${file} 中存在错误的图片路径: ${matches.length} 处`);
        hasError = true;
      }

      // 检查是否包含以/开头的路径
      const absolutePathRegex = /src="\/data\//g;
      const absoluteMatches = content.match(absolutePathRegex);
      
      if (absoluteMatches) {
        console.log(`文件 ${file} 中存在绝对路径: ${absoluteMatches.length} 处`);
        hasError = true;
      }

      // 当所有文件检查完成后
      if (files.indexOf(file) === files.length - 1) {
        if (!hasError) {
          console.log('所有文件的图片路径都正确');
        }
      }
    });
  });
});