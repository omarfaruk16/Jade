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

      // Replace standard .container definition
      const containerRegex = /\.container\s*\{[^}]+\}/g;
      content = content.replace(containerRegex, (match) => {
        // Only modify if it looks like a main container
        if (match.includes('margin: 0 auto') || match.includes('max-width') || match.includes('padding: 0 5%')) {
          changed = true;
          return `.container {
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
}`;
        }
        return match;
      });

      // Replace mobile container definition in media queries
      const mediaRegex = /@media\s*\([^)]+\)\s*\{([^}]+)\}/g;
      content = content.replace(/@media\s*\([^{]+\{\s*\.container\s*\{[^}]+\}\s*\}/g, (match) => {
        if(match.includes('.container')) {
           changed = true;
           return match.replace(/\.container\s*\{[^}]+\}/, `.container { width: 90%; max-width: 100%; padding: 0; }`);
        }
        return match;
      });

      // Handle jade-shared.css specifically
      if (file === 'jade-shared.css') {
        content = content.replace(/\.jade-container\s*\{[^}]+\}/g, `.jade-container {\n  width: 80%;\n  margin: 0 auto;\n}`);
        content = content.replace(/@media\s*\([^)]+\)\s*\{\s*\.jade-container\s*\{[^}]+\}/g, `@media (max-width: 768px) {\n  .jade-container {\n    width: 90%;`);
        changed = true;
      }

      // Handle sections that use padding for width like ProcessSection
      const sectionRegex = /\.section\s*\{\s*padding:\s*[0-9]+[a-z]*\s+5%;?[^}]*\}/g;
      content = content.replace(sectionRegex, (match) => {
         changed = true;
         return match.replace(/padding:\s*([0-9]+[a-z]*)\s+5%/, "padding: $1 10%");
      });

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDir('./src');
console.log('Done fixing widths.');
