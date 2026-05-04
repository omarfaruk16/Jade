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

      // Only process files in components/home
      if (!fullPath.includes('components/home')) continue;

      // We want to replace `padding: Xrem 5%;` with `padding: Xrem 10%;` globally (for PC)
      // BUT NOT inside @media (max-width: 768px) or 1024px
      
      // Let's manually do it for the base classes
      const lines = content.split('\n');
      let inMedia = false;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('@media')) {
          inMedia = true;
        }
        if (lines[i].includes('}')) {
          // crude, but we can assume end of block. Media query has nested {} so this might be tricky.
          // Let's just use regex on the whole content.
        }
      }

      // Instead, we can safely replace `padding: <num>rem 5%;` if it is at the root level?
      // CSS regex to replace 5% with 10% when it's not in a media query
      // A better way is to find `padding:` followed by 5%, then check if we are in a media block.
      
      // Alternatively, let's just parse the CSS. Or simpler: Replace ALL `padding: X 5%;` with `padding: X 10%;`.
      // Then replace `padding: X 10%;` BACK to `padding: X 5%;` inside @media blocks.
      
      let newContent = content.replace(/padding:\s*([0-9.]+rem)\s+5%;/g, 'padding: $1 10%;');
      newContent = newContent.replace(/padding:\s*([0-9.]+rem)\s+5%\s+([0-9.]+rem)\s+5%;/g, 'padding: $1 10% $2 10%;');
      
      // Now fix inside @media
      const mediaRegex = /@media\s*\([^)]+\)\s*\{([\s\S]*?)\n\}/g;
      newContent = newContent.replace(mediaRegex, (match, inner) => {
        let newInner = inner.replace(/padding:\s*([0-9.]+rem)\s+10%;/g, 'padding: $1 5%;');
        newInner = newInner.replace(/padding:\s*([0-9.]+rem)\s+10%\s+([0-9.]+rem)\s+10%;/g, 'padding: $1 5% $2 5%;');
        return match.replace(inner, newInner);
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Fixed PC padding:', fullPath);
      }
    }
  }
}

processDir('./src/components/home');
console.log('Done fixing home padding.');
