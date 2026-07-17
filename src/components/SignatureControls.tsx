import React from 'react';
import { Type, SlidersHorizontal, Palette, CaseSensitive, Sparkles, X } from 'lucide-react';
import { SignatureStyle } from '../types';
import { FONTS, COLORS, SIZES, SPACINGS, SLANTS, ROTATIONS } from '../constants';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SignatureControlsProps {
  name: string;
  setName: (name: string) => void;
  style: SignatureStyle;
  setStyle: React.Dispatch<React.SetStateAction<SignatureStyle>>;
}

export const SignatureControls: React.FC<SignatureControlsProps> = ({
  name,
  setName,
  style,
  setStyle,
}) => {
  const updateStyle = <K extends keyof SignatureStyle>(key: K, value: SignatureStyle[K]) => {
    setStyle((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_0_30px_rgba(255,255,255,0.02)]">
      {/* 1. Name Input */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-400" /> 1. Enter Your Name
        </label>
        <div className="relative">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name here..."
            maxLength={32}
            className="pr-10 py-3.5"
          />
          {name && (
            <Button
              onClick={() => setName('')}
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 h-8 w-8 rounded-md transition-colors"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 2. Font Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <CaseSensitive className="w-4 h-4 text-indigo-400" /> 2. Choose Signature Font
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FONTS.map((font) => (
            <button
              key={font.key}
              onClick={() => updateStyle('fontKey', font.key)}
              className={`flex flex-col justify-between items-start p-3 bg-slate-950 border rounded-xl hover:border-zinc-700 hover:bg-zinc-900/10 text-left transition-all relative overflow-hidden group ${
                style.fontKey === font.key
                  ? 'border-zinc-700 bg-zinc-800 text-white ring-1 ring-zinc-700 shadow-lg'
                  : 'border-zinc-805 border-zinc-800'
              }`}
            >
              <span className="text-[10px] text-slate-500 font-semibold group-hover:text-slate-400 transition-colors">
                {font.name}
              </span>
              <span
                className={`text-lg sm:text-xl leading-none mt-2 truncate w-full transition-all text-slate-200 group-hover:text-slate-100 ${font.className}`}
              >
                {name.trim() || 'Signature'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Color Palette */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" /> 3. Select Signature Color
        </label>
        
        {/* Preset Colors Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setStyle((prev) => ({
                  ...prev,
                  colorClass: color.class,
                  isCustomColor: false,
                }));
              }}
              className={`w-full aspect-square rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                !style.isCustomColor && style.colorClass === color.class
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-slate-800/60'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {!style.isCustomColor && style.colorClass === color.class && (
                <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
              )}
            </button>
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <Button
            onClick={() => {
              setStyle((prev) => ({
                ...prev,
                isCustomColor: true,
              }));
            }}
            variant={style.isCustomColor ? 'default' : 'outline'}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 w-full sm:w-auto h-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Hex</span>
          </Button>
          {style.isCustomColor && (
            <div className="flex items-center bg-slate-950 border border-zinc-800 rounded-xl px-3 py-1.5 flex-1 w-full">
              <input
                type="color"
                value={style.customColor}
                onChange={(e) => updateStyle('customColor', e.target.value)}
                className="w-6 h-6 border-0 bg-transparent cursor-pointer rounded p-0 flex-shrink-0"
              />
              <input
                type="text"
                value={style.customColor}
                onChange={(e) => updateStyle('customColor', e.target.value)}
                placeholder="#000000"
                className="bg-transparent border-0 outline-none text-xs text-slate-300 font-mono w-full ml-2 uppercase"
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Fine-Tuning Styling Controls */}
      <div className="space-y-5 pt-4 border-t border-slate-800/80">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> 4. Custom Styling & Slant
        </label>

        {/* Size Preset Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Font Sizing</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
            {SIZES.map((size) => (
              <Button
                key={size.name}
                onClick={() => updateStyle('sizeClass', size.class)}
                variant={style.sizeClass === size.class ? 'default' : 'outline'}
                className="py-2 px-2 text-[10px] sm:text-xs h-auto rounded-lg"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Spacing Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Letter Spacing</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
            {SPACINGS.map((spacing) => (
              <Button
                key={spacing.name}
                onClick={() => updateStyle('spacingClass', spacing.class)}
                variant={style.spacingClass === spacing.class ? 'default' : 'outline'}
                className="py-2 px-2 text-[10px] sm:text-xs h-auto rounded-lg"
              >
                {spacing.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Slant Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Font Slant</span>
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
            {SLANTS.map((slant) => (
              <Button
                key={slant.name}
                onClick={() => updateStyle('slantClass', slant.class)}
                variant={style.slantClass === slant.class ? 'default' : 'outline'}
                className="py-2 px-2 text-[10px] sm:text-xs h-auto rounded-lg"
              >
                {slant.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Angle / Rotation Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rotation Angle</span>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
            {ROTATIONS.map((rotation) => (
              <Button
                key={rotation.name}
                onClick={() => updateStyle('rotateClass', rotation.class)}
                variant={style.rotateClass === rotation.class ? 'default' : 'outline'}
                className="py-2 rounded-lg text-[10px] sm:text-xs h-auto rounded-lg"
              >
                {rotation.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
