import React, { useState } from 'react';
import { Copy, Download, Code, Check, FileCode, Image } from 'lucide-react';
import { SignatureStyle } from '../types';
import { FONTS, COLORS } from '../constants';

interface ExportSectionProps {
  name: string;
  style: SignatureStyle;
}

export const ExportSection: React.FC<ExportSectionProps> = ({ name, style }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const cleanName = name.trim() || 'Signature';
  const selectedFont = FONTS.find((f) => f.key === style.fontKey) || FONTS[0];

  const getColorHex = () => {
    if (style.isCustomColor) return style.customColor;
    const preset = COLORS.find((c) => c.class === style.colorClass);
    return preset ? preset.hex : '#020617';
  };

  const colorHex = getColorHex();

  // 1. Generate SVG String
  const getSVGString = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${selectedFont.importName}&amp;display=swap');
      .sig-text {
        font-family: '${selectedFont.name}', cursive;
        font-size: 64px;
        fill: ${colorHex};
        text-anchor: middle;
        dominant-baseline: middle;
        ${style.slantClass === 'italic' ? 'font-style: italic;' : ''}
      }
    </style>
  </defs>
  <text x="250" y="100" class="sig-text">${cleanName}</text>
</svg>`;
  };

  // 2. Generate React Component TSX String
  const getReactComponentString = () => {
    // Generate valid React component name
    let componentName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    componentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
    if (!componentName || /^\d/.test(componentName)) componentName = 'Signature';

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
            {\`@import url('https://fonts.googleapis.com/css2?family=${selectedFont.importName}&display=swap');
            .sig-text-${selectedFont.key} {
              font-family: '${selectedFont.name}', cursive;
              font-size: 64px;
              fill: ${colorHex};
              text-anchor: middle;
              dominant-baseline: middle;
              ${style.slantClass === 'italic' ? 'font-style: italic;' : ''}
            }\`}
          </style>
        </defs>
        <text x="250" y="100" className="sig-text-${selectedFont.key}">
          ${cleanName}
        </text>
      </svg>
    </div>
  );
};

export default ${componentName};
`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadSVG = () => {
    const svgStr = getSVGString();
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `signature-${cleanName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply font loading delay safety
    const render = () => {
      const slantStyle = style.slantClass === 'italic' ? 'italic' : '';
      ctx.font = `${slantStyle} 128px "${selectedFont.name}", cursive`;
      ctx.fillStyle = colorHex;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw signature name
      ctx.fillText(cleanName, canvas.width / 2, canvas.height / 2);

      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `signature-${cleanName.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Ensure font is loaded before rendering
    if (document.fonts) {
      document.fonts.load(`128px "${selectedFont.name}"`).then(render).catch(() => render());
    } else {
      setTimeout(render, 100);
    }
  };

  return (
    <div className="bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_0_30px_rgba(255,255,255,0.02)]">
      <div>
        <h3 className="text-lg font-bold text-slate-100">Export & Download Options</h3>
        <p className="text-xs text-slate-400 mt-1">
          Export your signature into formats compatible with design tools, web pages, and documents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Copy SVG Code */}
        <button
          onClick={() => handleCopy(getSVGString(), 'svg')}
          className="group flex items-center justify-between p-4 bg-neutral-900 border border-zinc-800 hover:bg-neutral-900 hover:border-zinc-700 rounded-xl transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-lg group-hover:bg-zinc-800 group-hover:text-white transition-all">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Copy SVG Code</p>
              <p className="text-[10px] text-slate-400">Raw vector SVG tag</p>
            </div>
          </div>
          <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
            {copiedType === 'svg' ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Copy React TSX */}
        <button
          onClick={() => handleCopy(getReactComponentString(), 'react')}
          className="group flex items-center justify-between p-4 bg-neutral-900 border border-zinc-800 hover:bg-neutral-900 hover:border-zinc-700 rounded-xl transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-lg group-hover:bg-zinc-800 group-hover:text-white transition-all">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Copy React Component</p>
              <p className="text-[10px] text-slate-400">TSX / JSX Component file</p>
            </div>
          </div>
          <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
            {copiedType === 'react' ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Download SVG */}
        <button
          onClick={handleDownloadSVG}
          className="group flex items-center justify-between p-4 bg-neutral-900 border border-zinc-800 hover:bg-neutral-900 hover:border-zinc-700 rounded-xl transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-lg group-hover:bg-zinc-800 group-hover:text-white transition-all">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Download SVG</p>
              <p className="text-[10px] text-slate-400">Scalable vector image</p>
            </div>
          </div>
          <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
            <Download className="w-4 h-4" />
          </div>
        </button>

        {/* Download PNG */}
        <button
          onClick={handleDownloadPNG}
          className="group flex items-center justify-between p-4 bg-neutral-900 border border-zinc-800 hover:bg-neutral-900 hover:border-zinc-700 rounded-xl transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900 text-zinc-300 rounded-lg group-hover:bg-zinc-800 group-hover:text-white transition-all">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Download PNG</p>
              <p className="text-[10px] text-slate-400">High-res transparent PNG</p>
            </div>
          </div>
          <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
            <Download className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
