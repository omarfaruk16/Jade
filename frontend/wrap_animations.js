const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip admin directory
      if (entry.name === 'admin' || entry.name === 'layout' || entry.name === 'shared') continue;
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      // Only target specific folders (pages and sections)
      if (fullPath.includes('src/app') || fullPath.includes('src/components/home') || fullPath.includes('src/components/blog')) {
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;
        
        // Skip files that seem too complex or already have many animations to prevent breaking
        if (fullPath.includes('layout.tsx')) continue;

        let needsTitleRevealImport = false;
        let needsSectionRevealImport = false;

        // Wrap headings with <TitleReveal>
        // Use a regex that finds <h1, <h2, <h3. 
        // We ensure we don't wrap if it's already inside a TitleReveal or similar wrapper, 
        // but simple regex is easier: replace <hX...>...</hX> with <TitleReveal><hX...>...</hX></TitleReveal>
        // We must avoid matching self-closing tags (though headings shouldn't be self-closing).
        // And we avoid matching headings that are already wrapped.
        
        const headingRegex = /(?<!<TitleReveal>\s*)<h([123])([^>]*)>([\s\S]*?)<\/h\1>(?!\s*<\/TitleReveal>)/g;
        
        content = content.replace(headingRegex, (match) => {
          needsTitleRevealImport = true;
          return `<TitleReveal>${match}</TitleReveal>`;
        });

        // Add imports if needed
        if (needsTitleRevealImport && !content.includes('TitleReveal')) {
          const importStr = "import TitleReveal from '@/components/layout/TitleReveal';\n";
          // Add after the last import
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

        // SectionReveal logic: Many pages already use SectionReveal on `<section>` elements or component calls like `<AboutSection />`.
        // I won't attempt to automatically wrap every `<section>` because some layouts might break (e.g. grids).
        // The user says "every section will come from bottom when scrolling". 
        // On pages like /app/page.tsx, components are wrapped in <SectionReveal>. 
        // I will do a basic replacement: replace `<section className={` with `<SectionReveal><section className={`
        // But only if it's not already wrapped!
        const sectionRegex = /(?<!<SectionReveal>\s*)<section([^>]*)>([\s\S]*?)<\/section>(?!\s*<\/SectionReveal>)/g;
        content = content.replace(sectionRegex, (match) => {
          needsSectionRevealImport = true;
          return `<SectionReveal>\n${match}\n</SectionReveal>`;
        });
        
        if (needsSectionRevealImport && !content.includes('SectionReveal')) {
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
          console.log(`Updated animations in: ${fullPath}`);
        }
      }
    }
  }
}

processDir('./src/app');
processDir('./src/components');
console.log('Finished updating animations.');
