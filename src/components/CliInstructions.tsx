import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Command } from 'lucide-react';
import { SignatureStyle } from '../types';

interface CliInstructionsProps {
  name: string;
  style: SignatureStyle;
}

export const CliInstructions: React.FC<CliInstructionsProps> = ({ name, style }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const cleanName = name.trim() || 'Your Name';
  const hexColor = style.customColor || '#020617';

  // Construct command strings
  const wizardCommand = 'node cli.js';
  const directCommand = `node cli.js --name "${cleanName}" --font "${style.fontKey}" --color "${hexColor}" --out "./src/components/Signature.tsx"`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
            Website Integration via CLI
          </h3>
          <p className="text-xs text-slate-400">
            Automatically generate and insert this signature directly into your codebase.
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="flex gap-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 text-xs leading-relaxed text-indigo-300">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          We have included a pre-built CLI script (<code className="bg-indigo-500/10 px-1 py-0.5 rounded font-mono text-[11px] text-indigo-200">cli.js</code>) in this repository. You can execute it inside this project, or copy <code className="bg-indigo-500/10 px-1 py-0.5 rounded font-mono text-[11px] text-indigo-200">cli.js</code> into your target website repository and run it there!
        </p>
      </div>

      {/* Instructions Tabs */}
      <div className="space-y-4">
        {/* Method 1: Interactive Wizard */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Command className="w-3.5 h-3.5 text-slate-400" /> Method 1: Interactive Wizard Mode
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-medium">
              Recommended
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Launches an interactive question-and-answer prompt to customize your signature.
          </p>
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono text-sm text-slate-300">
            <span className="overflow-x-auto whitespace-nowrap scrollbar-none">{wizardCommand}</span>
            <button
              onClick={() => copyToClipboard(wizardCommand, 'wizard')}
              className="text-slate-400 hover:text-slate-200 ml-3 p-1 rounded hover:bg-slate-800/50 transition-colors"
              title="Copy to clipboard"
            >
              {copied === 'wizard' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Method 2: Direct Flag Mode */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Command className="w-3.5 h-3.5 text-slate-400" /> Method 2: Direct CLI Flag Mode
          </span>
          <p className="text-xs text-slate-400">
            Instantly generates and outputs the customized signature matching your current selections.
          </p>
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono text-xs text-slate-300">
            <span className="overflow-x-auto whitespace-nowrap scrollbar-none py-1">{directCommand}</span>
            <button
              onClick={() => copyToClipboard(directCommand, 'direct')}
              className="text-slate-400 hover:text-slate-200 ml-3 p-1.5 rounded hover:bg-slate-800/50 transition-colors flex-shrink-0"
              title="Copy to clipboard"
            >
              {copied === 'direct' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Integration Tips */}
      <div className="border-t border-slate-800/80 pt-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">How to import in your code:</h4>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 overflow-x-auto leading-relaxed">
          <p className="text-slate-500">// 1. Import the generated component</p>
          <p><span className="text-indigo-400">import</span> Signature <span className="text-indigo-400">from</span> <span className="text-emerald-400">'./components/Signature'</span>;</p>
          <br />
          <p className="text-slate-500">// 2. Use it inside any page or card</p>
          <p><span className="text-indigo-400">const</span> <span className="text-amber-400">App</span> = () =&gt; &#123;</p>
          <p>&nbsp;&nbsp;<span className="text-indigo-400">return</span> (</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">div</span> <span className="text-amber-400">className</span>=<span className="text-emerald-400">"flex flex-col items-center p-6 bg-slate-900"</span>&gt;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">h2</span>&gt;Welcome to My Portfolio&lt;/<span className="text-rose-400">h2</span>&gt;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-300">Signature</span> <span className="text-amber-400">className</span>=<span className="text-emerald-400">"w-48 h-20 text-slate-200"</span> /&gt;</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-rose-400">div</span>&gt;</p>
          <p>&nbsp;&nbsp;);</p>
          <p>&#125;;</p>
        </div>
      </div>
    </div>
  );
};
