#!/usr/bin/env node

/**
 * Signature Studio CLI Tool
 * Allows generating signatures in SVG or React TSX format directly from the terminal
 * and adding them to any website project.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const FONTS = {
  alex: { name: 'Alex Brush', importName: 'Alex+Brush' },
  allura: { name: 'Allura', importName: 'Allura' },
  greatvibes: { name: 'Great Vibes', importName: 'Great+Vibes' },
  sacramento: { name: 'Sacramento', importName: 'Sacramento' },
  pinyon: { name: 'Pinyon Script', importName: 'Pinyon+Script' },
  monsieur: { name: 'Monsieur La Doulaise', importName: 'Monsieur+La+Doulaise' }
};

// Helper for CLI coloring (standard ANSI escape codes)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function printBanner() {
  console.log(`
${colors.cyan}${colors.bright}┌──────────────────────────────────────────────┐
│             SIGNATURE STUDIO CLI             │
│      Convert names to digital signatures     │
└──────────────────────────────────────────────┘${colors.reset}
`);
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = args[i + 1];
      if (val && !val.startsWith('--')) {
        options[key] = val;
        i++;
      } else {
        options[key] = true;
      }
    }
  }
  return options;
}

// Generate the SVG code string
function getSVGContent(name, fontKey, colorHex) {
  const font = FONTS[fontKey] || FONTS.alex;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${font.importName}&amp;display=swap');
      .sig-text-${fontKey} {
        font-family: '${font.name}', cursive;
        font-size: 64px;
        fill: ${colorHex};
        text-anchor: middle;
        dominant-baseline: middle;
      }
    </style>
  </defs>
  <text x="250" y="100" class="sig-text-${fontKey}">${name}</text>
</svg>`;
}

// Generate the React Component code string
function getReactComponentContent(name, fontKey, colorHex, componentName = 'Signature') {
  const font = FONTS[fontKey] || FONTS.alex;
  return `import React from 'react';

interface ${componentName}Props {
  className?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  className = '',
  width = '100%',
  height = '100%',
  style = {}
}) => {
  return (
    <div className={className} style={{ width, height, ...style, display: 'inline-block' }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 500 200" 
        width="100%" 
        height="100%"
      >
        <defs>
          <style>
            {\`@import url('https://fonts.googleapis.com/css2?family=${font.importName}&display=swap');
            .sig-text-${fontKey} {
              font-family: '${font.name}', cursive;
              font-size: 64px;
              fill: ${colorHex};
              text-anchor: middle;
              dominant-baseline: middle;
            }\`}
          </style>
        </defs>
        <text x="250" y="100" className="sig-text-${fontKey}">
          ${name}
        </text>
      </svg>
    </div>
  );
};

export default ${componentName};
`;
}

// Interactive prompt wizard
function runWizard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  (async () => {
    printBanner();
    
    // 1. Get signature name
    let name = '';
    while (!name.trim()) {
      name = await question(`${colors.bright}✍️ Enter the Name for the Signature: ${colors.reset}`);
      if (!name.trim()) {
        console.log(`${colors.red}Name cannot be empty!${colors.reset}`);
      }
    }

    // 2. Select Font
    console.log(`\n${colors.bright}🔤 Select a Font Style:${colors.reset}`);
    const keys = Object.keys(FONTS);
    keys.forEach((key, index) => {
      console.log(`  ${index + 1}) ${FONTS[key].name}`);
    });
    
    let fontChoice = '';
    let selectedFontKey = 'alex';
    while (true) {
      fontChoice = await question(`${colors.bright}Choose (1-${keys.length}) [default: 1]: ${colors.reset}`);
      if (!fontChoice.trim()) {
        selectedFontKey = keys[0];
        break;
      }
      const index = parseInt(fontChoice, 10) - 1;
      if (index >= 0 && index < keys.length) {
        selectedFontKey = keys[index];
        break;
      }
      console.log(`${colors.red}Invalid choice. Select between 1 and ${keys.length}.${colors.reset}`);
    }

    // 3. Select Color
    console.log(`\n${colors.bright}🎨 Select Color (Hex code or CSS color name):${colors.reset}`);
    console.log(`  Presets: #000000 (Black), #2563eb (Royal Blue), #059669 (Emerald), #dc2626 (Red), #d97706 (Amber)`);
    let color = await question(`${colors.bright}Color [default: #000000]: ${colors.reset}`);
    if (!color.trim()) {
      color = '#000000';
    }

    // 4. Select Output Type
    console.log(`\n${colors.bright}📁 Select Output Format:${colors.reset}`);
    console.log(`  1) SVG Image File (.svg)`);
    console.log(`  2) React TSX Component (.tsx)`);
    let formatChoice = await question(`${colors.bright}Choose (1-2) [default: 1]: ${colors.reset}`);
    const isReact = formatChoice.trim() === '2';

    // 5. Select Output Path
    const defaultPath = isReact ? './Signature.tsx' : './signature.svg';
    console.log(`\n${colors.bright}💾 Enter destination path for saving:${colors.reset}`);
    let destPath = await question(`${colors.bright}Path [default: ${defaultPath}]: ${colors.reset}`);
    if (!destPath.trim()) {
      destPath = defaultPath;
    }

    // Write file
    try {
      const absolutePath = path.resolve(destPath);
      const dir = path.dirname(absolutePath);
      
      // Create directories if they don't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      let content = '';
      if (isReact) {
        // Extract component name from file name
        const filename = path.basename(destPath, '.tsx');
        let compName = filename.charAt(0).toUpperCase() + filename.slice(1);
        // Sanitize component name to be valid JS variable
        compName = compName.replace(/[^a-zA-Z0-9]/g, '');
        if (!compName || /^\d/.test(compName)) compName = 'Signature';
        
        content = getReactComponentContent(name, selectedFontKey, color, compName);
      } else {
        content = getSVGContent(name, selectedFontKey, color);
      }

      fs.writeFileSync(absolutePath, content);
      
      console.log(`\n${colors.green}${colors.bright}🚀 Success! Signature has been created successfully.${colors.reset}`);
      console.log(`📍 Saved to: ${colors.cyan}${absolutePath}${colors.reset}`);
      console.log(`🎉 Feel free to import it into your website!\n`);
    } catch (err) {
      console.error(`${colors.red}Error writing file: ${err.message}${colors.reset}`);
    }

    rl.close();
  })();
}

// Run direct argument mode
function runDirect(options) {
  const name = options.name;
  const fontKey = options.font || 'alex';
  const color = options.color || '#000000';
  const out = options.out;

  if (!name) {
    console.error(`${colors.red}Error: --name parameter is required in direct mode.${colors.reset}`);
    process.exit(1);
  }

  if (!out) {
    console.error(`${colors.red}Error: --out path parameter is required in direct mode.${colors.reset}`);
    process.exit(1);
  }

  if (!FONTS[fontKey]) {
    console.warn(`${colors.yellow}Warning: Font "${fontKey}" not recognized. Defaulting to Alex Brush. Available: ${Object.keys(FONTS).join(', ')}${colors.reset}`);
  }

  const isReact = out.endsWith('.tsx') || out.endsWith('.jsx');
  let content = '';

  if (isReact) {
    const filename = path.basename(out).split('.')[0];
    let compName = filename.charAt(0).toUpperCase() + filename.slice(1);
    compName = compName.replace(/[^a-zA-Z0-9]/g, '');
    if (!compName || /^\d/.test(compName)) compName = 'Signature';
    
    content = getReactComponentContent(name, fontKey, color, compName);
  } else {
    content = getSVGContent(name, fontKey, color);
  }

  try {
    const absolutePath = path.resolve(out);
    const dir = path.dirname(absolutePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(absolutePath, content);
    console.log(`${colors.green}Success! Created signature for "${name}" at "${out}".${colors.reset}`);
  } catch (err) {
    console.error(`${colors.red}Error saving signature: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

// Main execution entry point
const options = parseArgs();

if (options.help || options.h) {
  console.log(`
${colors.bright}Signature Studio CLI Options:${colors.reset}
  --name "Your Name"      Text to convert to signature (required for non-interactive mode)
  --font "font_key"       Font styles: alex, allura, greatvibes, sacramento, pinyon, monsieur (default: alex)
  --color "#hexcolor"     Signature drawing color in hex format (default: #000000)
  --out "./path/file"     Output file path (e.g. ./sig.svg or ./SigComponent.tsx) (required for non-interactive)
  --help                  Show this help menu

${colors.bright}Example usage:${colors.reset}
  node cli.js --name "John Doe" --font "greatvibes" --color "#2563eb" --out "./src/Signature.tsx"
  
${colors.bright}Wizard mode (interactive):${colors.reset}
  node cli.js
`);
  process.exit(0);
}

if (options.name || options.out) {
  runDirect(options);
} else {
  runWizard();
}
