import React, { useState } from 'react';
import { LayoutGrid, CreditCard, Award, FileText, Sparkles, Eye } from 'lucide-react';
import { SignatureStyle, MockupType } from '../types';
import { FONTS } from '../constants';
import { DocumentMockup, CreditCardMockup, CertificateMockup } from './Mockups';

interface SignaturePreviewProps {
  name: string;
  style: SignatureStyle;
}

type BackgroundTheme = 'grid' | 'dark' | 'light' | 'gold';

export const SignaturePreview: React.FC<SignaturePreviewProps> = ({ name, style }) => {
  const [mockup, setMockup] = useState<MockupType>('none');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('grid');

  const selectedFont = FONTS.find((f) => f.key === style.fontKey) || FONTS[0];
  const fontClass = selectedFont.className;

  // Scoped style tag injection for custom colors (satisfies "no inline css" requirement)
  const getDynamicStyleTag = () => {
    if (style.isCustomColor) {
      return (
        <style>
          {`.signature-preview-text {
            color: ${style.customColor} !important;
            fill: ${style.customColor} !important;
          }`}
        </style>
      );
    }
    return null;
  };

  const getBackgroundClass = () => {
    switch (bgTheme) {
      case 'dark':
        return 'bg-slate-950 border-slate-800';
      case 'light':
        return 'bg-white border-slate-200 text-slate-900';
      case 'gold':
        return 'bg-gradient-to-tr from-amber-950 via-slate-900 to-indigo-950 border-amber-900/30';
      case 'grid':
      default:
        return 'bg-slate-950/40 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:24px_24px] border-slate-800';
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {getDynamicStyleTag()}

      {/* Tabs / Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Mockup Mode Selector */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-indigo-400" /> Preview Context
          </label>
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950 divide-x divide-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none max-w-full shadow-lg">
            <button
              onClick={() => setMockup('none')}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                mockup === 'none'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Canvas</span>
            </button>
            <button
              onClick={() => setMockup('document')}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                mockup === 'document'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Document</span>
            </button>
            <button
              onClick={() => setMockup('card')}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                mockup === 'card'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Credit Card</span>
            </button>
            <button
              onClick={() => setMockup('certificate')}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                mockup === 'certificate'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificate</span>
            </button>
          </div>
        </div>

        {/* Background Theme Selector (only visible in Canvas Mode) */}
        {mockup === 'none' && (
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Canvas Theme
            </label>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 space-x-1">
              <button
                onClick={() => setBgTheme('grid')}
                className={`w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                  bgTheme === 'grid'
                    ? 'border-zinc-700 bg-zinc-800 text-white'
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                title="Grid Backdrop"
              >
                #1
              </button>
              <button
                onClick={() => setBgTheme('dark')}
                className={`w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                  bgTheme === 'dark'
                    ? 'border-zinc-700 bg-zinc-800 text-white'
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                title="Dark Solid"
              >
                #2
              </button>
              <button
                onClick={() => setBgTheme('light')}
                className={`w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                  bgTheme === 'light'
                    ? 'border-zinc-700 bg-zinc-800 text-white'
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                title="Light Solid"
              >
                #3
              </button>
              <button
                onClick={() => setBgTheme('gold')}
                className={`w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                  bgTheme === 'gold'
                    ? 'border-zinc-700 bg-zinc-800 text-white'
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
                title="Gold Gradient"
              >
                #4
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Preview Container */}
      <div className="flex justify-center items-center w-full min-h-[360px] p-6 md:p-10 bg-slate-900/60 border border-slate-800/80 rounded-3xl relative overflow-hidden shadow-inner">
        {mockup === 'none' && (
          <div
            className={`w-full max-w-2xl h-64 border rounded-2xl flex items-center justify-center p-8 transition-all duration-500 ${getBackgroundClass()}`}
          >
            {name.trim() ? (
              <div
                className={`transition-all duration-300 transform select-none ${fontClass} ${style.sizeClass} ${style.spacingClass} ${style.slantClass} ${style.rotateClass} ${style.isCustomColor ? 'signature-preview-text' : style.colorClass}`}
              >
                {name}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                <span className="font-serif italic text-sm text-center">Write your name to see the signature preview</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600">Waiting for name input</span>
              </div>
            )}
          </div>
        )}

        {mockup === 'document' && <DocumentMockup name={name} style={style} />}
        {mockup === 'card' && <CreditCardMockup name={name} style={style} />}
        {mockup === 'certificate' && <CertificateMockup name={name} style={style} />}
      </div>
    </div>
  );
};
