import fs from 'fs';
import path from 'path';

function generateTreeDir(baseDir, prefix = '') {
    const files = fs.readdirSync(baseDir);
    let treeStructure = '';

    files.forEach((file, index) => {
        const filePath = path.join(baseDir, file);
        const stats = fs.statSync(filePath);
        
        // 忽略 node_modules 和 .git 目录
        if ([ 'node_modules','.gitee','dist','.husky','.idea','.git'].includes(file)) {
            return;
        }

        const isLast = index === files.length - 1;

        treeStructure += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;

        if (stats.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            treeStructure += generateTreeDir(filePath, newPrefix); // 递归调用
        }
    });

    return treeStructure;
}

// 替换为你的实际Vue项目目录路径
const projectDir = path.join(process.cwd(), './'); // 或使用绝对路径
// const projectDir = '/Users/a1234/vica/coding/vue-project'; // 示例绝对路径

const treeStructure = generateTreeDir(projectDir);

fs.writeFileSync('DIRECTORY_STRUCTURE.txt', treeStructure, 'utf8');
console.log('树形结构目录已生成：DIRECTORY_STRUCTURE.txt');
