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

      try {
        // 解析JSON
        const article = JSON.parse(content);
        
        // 检查是否存在ACL字段
        if (article.hasOwnProperty('ACL')) {
          // 删除ACL字段
          delete article.ACL;
          
          // 写回文件
          const updatedContent = JSON.stringify(article, null, 2);
          fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
            if (err) {
              console.error(`写入文件 ${file} 失败:`, err);
              return;
            }
            console.log(`已删除文件 ${file} 中的ACL字段`);
          });
        } else {
          console.log(`文件 ${file} 中不存在ACL字段`);
        }
      } catch (parseError) {
        console.error(`解析文件 ${file} 失败:`, parseError);
      }
    });
  });
});