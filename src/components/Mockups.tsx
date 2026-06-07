import React from 'react';
import { SignatureStyle } from '../types';
import { FONTS } from '../constants';

interface MockupProps {
  name: string;
  style: SignatureStyle;
}

export const DocumentMockup: React.FC<MockupProps> = ({ name, style }) => {
  const selectedFont = FONTS.find((f) => f.key === style.fontKey);
  const fontClass = selectedFont?.className || 'font-alex';

  // Map sizing for document layout (smaller size to fit signature box)
  const sizeMap: Record<string, string> = {
    'text-4xl md:text-5xl': 'text-xl md:text-2xl',
    'text-5xl md:text-7xl': 'text-2xl md:text-3xl',
    'text-7xl md:text-8xl': 'text-3xl md:text-4xl',
    'text-8xl md:text-9xl': 'text-4xl md:text-5xl',
  };
  const sizeClass = sizeMap[style.sizeClass] || 'text-2xl md:text-3xl';

  return (
    <div className="w-full max-w-2xl bg-white text-slate-800 p-8 md:p-12 rounded-xl shadow-2xl border border-slate-100 flex flex-col space-y-6 relative overflow-hidden transition-all duration-300 hover:shadow-slate-500/10">
      {/* Decorative watermark / stamp */}
      <div className="absolute top-12 right-12 w-24 h-24 border-4 border-slate-200/50 rounded-full flex items-center justify-center select-none pointer-events-none transform rotate-12">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">
          OFFICIAL<br />COPY
        </span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Employment & Service Agreement</h2>
        <p className="text-[11px] text-slate-400 mt-1 font-mono">DOC ID: #ESA-2026-9941</p>
      </div>

      {/* Contract Body */}
      <div className="space-y-3 text-[11px] leading-relaxed text-slate-600 text-justify">
        <p>
          This Agreement is entered into and made effective as of the date of execution by and between the signing Officer and the Corporation. The undersigned party hereby acknowledges, warrants, and agrees that all terms, representations, clauses, and stipulations listed in the sections above have been read, understood, and agreed to in full.
        </p>
        <p>
          Furthermore, the signing party authorizes the transaction and affirms that the digital signature applied below is the legal equivalent of a handwritten signature for all intent, purposes, and statutory enforcement. Any alterations to this document post-execution shall invalidate the covenants herein contained.
        </p>
      </div>

      {/* Signature Area */}
      <div className="pt-8 flex justify-between items-end">
        <div className="flex flex-col">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Prepared By</p>
          <p className="text-xs font-bold text-slate-700">Signature Studio Corp</p>
          <div className="w-32 h-[1px] bg-slate-300 mt-4"></div>
          <span className="text-[9px] text-slate-400 mt-1">Authorized Representative</span>
        </div>

        <div className="flex flex-col items-center">
          {/* Dynamic Signature */}
          <div className="h-16 flex items-center justify-center relative min-w-[150px] px-2 select-none">
            {name.trim() ? (
              <div
                className={`transition-all duration-300 transform ${fontClass} ${sizeClass} ${style.spacingClass} ${style.slantClass} ${style.rotateClass} ${style.isCustomColor ? 'signature-preview-text' : style.colorClass}`}
              >
                {name}
              </div>
            ) : (
              <span className="text-[10px] text-slate-300 italic">No signature name</span>
            )}
          </div>
          <div className="w-48 h-[1px] bg-slate-400"></div>
          <span className="text-[9px] text-slate-500 mt-1 font-medium uppercase tracking-wider">
            Signature of {name || 'the Applicant'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const CreditCardMockup: React.FC<MockupProps> = ({ name, style }) => {
  const selectedFont = FONTS.find((f) => f.key === style.fontKey);
  const fontClass = selectedFont?.className || 'font-alex';

  // Sizing for Credit Card signature panel
  const sizeMap: Record<string, string> = {
    'text-4xl md:text-5xl': 'text-sm md:text-base',
    'text-5xl md:text-7xl': 'text-base md:text-lg',
    'text-7xl md:text-8xl': 'text-lg md:text-xl',
    'text-8xl md:text-9xl': 'text-xl md:text-2xl',
  };
  const sizeClass = sizeMap[style.sizeClass] || 'text-base md:text-lg';

  return (
    <div className="w-full max-w-md aspect-[1.586/1] bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between border border-slate-800/80 relative overflow-hidden select-none">
      {/* Background card pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Top Bar */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">BLACK CARD</span>
          <h3 className="text-sm font-semibold text-slate-200">Signature Edition</h3>
        </div>
        <div className="w-10 h-8 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-center justify-center">
          {/* SIM chip icon */}
          <div className="w-6 h-5 border border-amber-500/30 rounded bg-amber-500/20 grid grid-cols-3 grid-rows-3 gap-[1px] p-[2px]">
            <div className="bg-amber-500/40 rounded-[1px]"></div>
            <div className="bg-amber-500/40 rounded-[1px]"></div>
            <div className="bg-amber-500/40 rounded-[1px]"></div>
            <div className="bg-amber-500/40 rounded-[1px] col-span-2"></div>
            <div className="bg-amber-500/40 rounded-[1px]"></div>
            <div className="bg-amber-500/40 rounded-[1px]"></div>
            <div className="bg-amber-500/40 rounded-[1px] col-span-2"></div>
          </div>
        </div>
      </div>

      {/* Signature Panel (Back Panel Style but placed on Front for Demo) */}
      <div className="space-y-2 z-10">
        <span className="text-[8px] uppercase tracking-wider text-slate-400 font-medium block">Authorized Signature</span>
        <div className="w-full h-10 bg-slate-100/95 rounded flex items-center justify-between px-3 border border-slate-200">
          {/* Signature Rendering */}
          <div className="h-full flex items-center justify-start max-w-[70%]">
            {name.trim() ? (
              <div
                className={`transition-all duration-300 transform select-none ${fontClass} ${sizeClass} ${style.spacingClass} ${style.slantClass} ${style.rotateClass} ${style.isCustomColor ? 'signature-preview-text' : style.colorClass}`}
              >
                {name}
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 italic">Signature required</span>
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-600 font-semibold tracking-wider">347</span>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex justify-between items-end z-10">
        <div className="space-y-1">
          <p className="text-xs font-mono tracking-widest text-slate-300">••••  ••••  ••••  8824</p>
          <div className="flex space-x-4">
            <div>
              <p className="text-[7px] uppercase tracking-widest text-slate-400">Cardholder</p>
              <p className="text-[10px] font-semibold text-slate-200">{name || 'VALUED MEMBER'}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-widest text-slate-400">Expires</p>
              <p className="text-[10px] font-semibold text-slate-200">08/31</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {/* Visa / MasterCard mock logo */}
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-rose-500/80"></div>
            <div className="w-5 h-5 rounded-full bg-amber-500/80"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CertificateMockup: React.FC<MockupProps> = ({ name, style }) => {
  const selectedFont = FONTS.find((f) => f.key === style.fontKey);
  const fontClass = selectedFont?.className || 'font-alex';

  // Sizing for Certificate layout
  const sizeMap: Record<string, string> = {
    'text-4xl md:text-5xl': 'text-xl md:text-2xl',
    'text-5xl md:text-7xl': 'text-2xl md:text-3xl',
    'text-7xl md:text-8xl': 'text-3xl md:text-4xl',
    'text-8xl md:text-9xl': 'text-4xl md:text-5xl',
  };
  const sizeClass = sizeMap[style.sizeClass] || 'text-2xl md:text-3xl';

  return (
    <div className="w-full max-w-2xl bg-amber-50/20 border-8 border-double border-amber-200/50 p-6 md:p-10 rounded-xl flex flex-col items-center justify-between text-slate-200 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-amber-500/5">
      {/* Certificate Background Graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Ornamental Corners */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/30"></div>
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500/30"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500/30"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/30"></div>

      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-amber-400 uppercase">Certificate of Excellence</span>
        <h2 className="text-xl md:text-2xl font-serif text-slate-100 font-bold">HONORARY ACHIEVEMENT</h2>
        <div className="w-16 h-[2px] bg-amber-500/40 mx-auto my-2"></div>
      </div>

      {/* Text Body */}
      <div className="text-center space-y-4 my-6">
        <p className="text-xs italic text-slate-400">This certificate is proudly presented to</p>
        <h3 className="text-lg md:text-xl font-bold tracking-wide text-amber-100">{name || '______________________'}</h3>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed">
          For demonstrating exemplary leadership, creative excellence, and dedication to building premium web experiences in the field of design and technology.
        </p>
      </div>

      {/* Footer / Signatures */}
      <div className="w-full flex justify-between items-end mt-4 px-4">
        {/* Left Seal */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 border border-amber-500/40 rounded-full flex items-center justify-center bg-amber-500/5 rotate-12">
            <span className="text-[7px] font-bold text-amber-400 tracking-wider">SEAL</span>
          </div>
          <div className="text-left">
            <p className="text-[8px] text-slate-400">Date Issued</p>
            <p className="text-[9px] font-semibold text-slate-300">June 7, 2026</p>
          </div>
        </div>

        {/* Right Signature Box */}
        <div className="flex flex-col items-center">
          <div className="h-10 flex items-center justify-center relative min-w-[120px] px-2 select-none">
            {name.trim() ? (
              <div
                className={`transition-all duration-300 transform ${fontClass} ${sizeClass} ${style.spacingClass} ${style.slantClass} ${style.rotateClass} ${style.isCustomColor ? 'signature-preview-text' : style.colorClass}`}
              >
                {name}
              </div>
            ) : (
              <span className="text-[10px] text-slate-500 italic">Unsigned</span>
            )}
          </div>
          <div className="w-32 h-[1px] bg-amber-500/30"></div>
          <span className="text-[8px] text-amber-500/70 mt-1 uppercase tracking-wider font-semibold">Authorized Signature</span>
        </div>
      </div>
    </div>
  );
};
