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

  jsonFiles.forEach(file => {
    const filePath = path.join(articlesDir, file);
    
    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(`读取文件 ${file} 失败:`, err);
        return;
      }

      // 检查是否包含图片路径
      if (content.includes('src="data/files/')) {
        // 修复路径，将 data/files/ 替换为 ../data/files/
        // 这样当在 atricle.html 页面访问时，路径会正确解析
        const fixedContent = content.replace(/src="data\/files\//g, 'src="../data/files/');

        // 写回文件
        fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
          if (err) {
            console.error(`写入文件 ${file} 失败:`, err);
            return;
          }
          console.log(`已修复文件 ${file} 中的图片路径`);
        });
      }

      // 检查是否包含 src="/data/files/ 格式的路径
      if (content.includes('src="/data/files/')) {
        // 修复路径，将 /data/files/ 替换为 ../data/files/
        const fixedContent = content.replace(/src="\/data\/files\//g, 'src="../data/files/');

        // 写回文件
        fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
          if (err) {
            console.error(`写入文件 ${file} 失败:`, err);
            return;
          }
          console.log(`已修复文件 ${file} 中的绝对路径`);
        });
      }
    });
  });
});