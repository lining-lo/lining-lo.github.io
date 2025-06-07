const fs = require('fs');
const path = require('path');

function generateSidebar(dir, basePath = '', level = 0) {
  const files = fs.readdirSync(dir);
  
  let sidebarContent = '';
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    const relativePath = path.join(basePath, file);
    
    if (stat.isDirectory()) {
      // 如果是目录且不是隐藏目录
      if (!file.startsWith('.')) {
        sidebarContent += `${'  '.repeat(level)}- ${file}\n`;
        sidebarContent += generateSidebar(fullPath, relativePath, level + 1);
      }
    } else if (stat.isFile() && file.endsWith('.md') && file !== 'README.md') {
      // 如果是Markdown文件且不是README.md
      const fileName = file.replace('.md', '');
      sidebarContent += `${'  '.repeat(level)}- [${fileName}](${encodeURI(relativePath)})\n`;
    }
  });
  
  return sidebarContent;
}

const sidebarContent = generateSidebar('./');

fs.writeFileSync('./_sidebar.md', sidebarContent);
console.log('_sidebar.md 生成成功！');