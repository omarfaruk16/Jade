const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // We need to find @media (max-width: 768px) blocks and ensure .container inside them is 90%
      // A simple regex might be hard, but let's replace `width: 80%;` with `width: 90%;` inside the mobile media queries.
      
      const mediaBlockRegex = /@media\s*\([^)]+768px[^)]*\)\s*\{([\s\S]*?)\n\}/g;
      content = content.replace(mediaBlockRegex, (match, inner) => {
        let newInner = inner.replace(/\.container\s*\{\s*width:\s*80%;/g, '.container {\n    width: 90%;');
        newInner = newInner.replace(/\.jade-container\s*\{\s*width:\s*80%;/g, '.jade-container {\n    width: 90%;');
        
        if (inner !== newInner) {
          changed = true;
          return match.replace(inner, newInner);
        }
        return match;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed mobile width:', fullPath);
      }
    }
  }
}

processDir('./src');
console.log('Done fixing mobile widths.');
