import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SignatureStyle } from '../types';
import { FONTS } from '../constants';

interface StyleShowcaseItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  fontKey: string;
  slantClass: string;
  rotateClass: string;
  spacingClass: string;
  sizeClass: string;
  colorClass: string;
  placeholderName: string;
  hasUnderline?: boolean;
}

interface SignatureStyleShowcaseProps {
  name: string;
  onApplyStyle: (style: Partial<SignatureStyle>) => void;
}

const SHOWCASE_STYLES: StyleShowcaseItem[] = [
  {
    id: 'classic',
    title: 'Classic Script',
    badge: 'Classic Script',
    description: 'Elegant, timeless design with fluid, cursive strokes for a sophisticated look.',
    fontKey: 'greatvibes',
    slantClass: 'not-italic',
    rotateClass: 'rotate-0',
    spacingClass: 'tracking-normal',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Raven',
  },
  {
    id: 'modern',
    title: 'Modern Minimalist Script',
    badge: 'Modern Minimalist Script',
    description: 'Simple, clean lines that create a sleek, contemporary signature appearance.',
    fontKey: 'sacramento',
    slantClass: 'not-italic',
    rotateClass: 'rotate-0',
    spacingClass: 'tracking-normal',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Selene',
  },
  {
    id: 'cursive',
    title: 'Cursive Signature',
    badge: 'Cursive Signature',
    description: 'Flowing, artistic handwriting that adds a personal and stylish flair to your signature.',
    fontKey: 'alex',
    slantClass: 'italic',
    rotateClass: 'rotate-1',
    spacingClass: 'tracking-normal',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Adrian',
  },
  {
    id: 'bold',
    title: 'Bold Signature',
    badge: 'Bold Signature',
    description: 'Thick, dramatic, and expressive brush script style that captures attention.',
    fontKey: 'monsieur',
    slantClass: 'not-italic',
    rotateClass: 'rotate-3',
    spacingClass: 'tracking-wider',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Sebastian',
  },
  {
    id: 'underlined',
    title: 'Underlined Signature',
    badge: 'Underlined Signature',
    description: 'A formal script design coupled with a stylish underline decoration for an authentic finish.',
    fontKey: 'pinyon',
    slantClass: 'not-italic',
    rotateClass: 'rotate-0',
    spacingClass: 'tracking-normal',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Brooklyn',
    hasUnderline: true,
  },
  {
    id: 'italic',
    title: 'Italic Signature',
    badge: 'Italic Signature',
    description: 'Expressive, slanted script that conveys motion, grace, and contemporary elegance.',
    fontKey: 'allura',
    slantClass: 'italic',
    rotateClass: 'rotate-3',
    spacingClass: 'tracking-wide',
    sizeClass: 'text-4xl md:text-5xl',
    colorClass: 'text-white',
    placeholderName: 'Aurora',
  },
];

export const SignatureStyleShowcase: React.FC<SignatureStyleShowcaseProps> = ({
  name,
  onApplyStyle,
}) => {
  return (
    <div className="text-slate-100 space-y-10 mt-28 border-t border-slate-900 pt-16">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Meet the Signature Styles You Can Try with AI
        </h3>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SHOWCASE_STYLES.map((item) => {
          const font = FONTS.find((f) => f.key === item.fontKey) || FONTS[0];
          const displayName = name.trim() || item.placeholderName;

          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 hover:border-slate-700 transition-all duration-300"
            >
              {/* Cursive Pad Mockup */}
              <div className="w-full bg-slate-950 rounded-2xl aspect-[1.78/1] flex flex-col justify-between p-5 shadow-inner relative overflow-hidden select-none border border-slate-800/60">
                {/* Signature Display Center */}
                <div className="flex-grow flex items-center justify-center relative">
                  <div className="relative">
                    <span
                      className={`text-slate-100 transition-all duration-300 transform inline-block text-center leading-none ${font.className} ${item.sizeClass} ${item.spacingClass} ${item.slantClass} ${item.rotateClass}`}
                    >
                      {displayName}
                    </span>
                    
                    {/* Underline SVG */}
                    {item.hasUnderline && (
                      <svg
                        className="absolute -bottom-2.5 left-0 w-full h-3 text-indigo-400"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 2 5 Q 35 1, 65 4 T 98 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Badge (bottom-left) */}
                <div className="z-10">
                  <span className="bg-slate-900 border border-slate-800/80 text-slate-400 text-[9px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 px-1 text-left">
                <h4 className="text-base font-bold text-slate-200">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.description}</p>
              </div>

              {/* Apply Style Button */}
              <button
                onClick={() =>
                  onApplyStyle({
                    fontKey: item.fontKey,
                    slantClass: item.slantClass,
                    rotateClass: item.rotateClass,
                    spacingClass: item.spacingClass,
                  })
                }
                className="w-full py-3 bg-slate-950 hover:bg-indigo-600 hover:text-white border border-slate-800 hover:border-indigo-600 text-slate-300 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Apply to Designer</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
