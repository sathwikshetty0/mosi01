const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  if (content.includes('#232528')) {
    content = content.replace(/#232528/g, '#1C2434');
    updated = true;
  }
  if (content.includes('#F9FCE8')) {
    content = content.replace(/#F9FCE8/g, '#F4F7FE');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
