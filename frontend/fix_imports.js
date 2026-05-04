const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'admin' || entry.name === 'layout' || entry.name === 'shared') continue;
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      if (fullPath.includes('src/app') || fullPath.includes('src/components/home') || fullPath.includes('src/components/blog')) {
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;
        
        if (fullPath.includes('layout.tsx')) continue;

        let needsTitleRevealImport = false;
        let needsSectionRevealImport = false;

        // If my previous script broke it, it might have added <TitleReveal> without importing.
        // Let's check if <TitleReveal> is in the file but not imported.
        if (content.includes('<TitleReveal>') && !content.includes('import TitleReveal')) {
          needsTitleRevealImport = true;
        }

        if (content.includes('<SectionReveal>') && !content.includes('import SectionReveal')) {
          needsSectionRevealImport = true;
        }

        if (needsTitleRevealImport) {
          const importStr = "import TitleReveal from '@/components/layout/TitleReveal';\n";
          const importRegex = /^import.*?;?\s*$/gm;
          let lastMatch = null;
          let match;
          while ((match = importRegex.exec(content)) !== null) {
            lastMatch = match;
          }
          if (lastMatch) {
            content = content.slice(0, lastMatch.index + lastMatch[0].length) + '\n' + importStr + content.slice(lastMatch.index + lastMatch[0].length);
          } else {
            content = importStr + content;
          }
        }

        if (needsSectionRevealImport) {
          const importStr = "import SectionReveal from '@/components/layout/SectionReveal';\n";
          const importRegex = /^import.*?;?\s*$/gm;
          let lastMatch = null;
          let match;
          while ((match = importRegex.exec(content)) !== null) {
            lastMatch = match;
          }
          if (lastMatch) {
            content = content.slice(0, lastMatch.index + lastMatch[0].length) + '\n' + importStr + content.slice(lastMatch.index + lastMatch[0].length);
          } else {
            content = importStr + content;
          }
        }

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Added missing imports in: ${fullPath}`);
        }
      }
    }
  }
}

processDir('./src/app');
processDir('./src/components');
console.log('Finished fixing imports.');
