import { FontOption, ColorPreset } from '../types';

export const FONTS: FontOption[] = [
  { key: 'alex', name: 'Alex Brush', className: 'font-alex', importName: 'Alex+Brush' },
  { key: 'greatvibes', name: 'Great Vibes', className: 'font-greatvibes', importName: 'Great+Vibes' },
  { key: 'allura', name: 'Allura', className: 'font-allura', importName: 'Allura' },
  { key: 'sacramento', name: 'Sacramento', className: 'font-sacramento', importName: 'Sacramento' },
  { key: 'pinyon', name: 'Pinyon Script', className: 'font-pinyon', importName: 'Pinyon+Script' },
  { key: 'monsieur', name: 'Monsieur La Doulaise', className: 'font-monsieur', importName: 'Monsieur+La+Doulaise' },
];

export const COLORS: ColorPreset[] = [
  { name: 'Pitch Black', class: 'text-slate-950', hex: '#020617' },
  { name: 'Royal Blue', class: 'text-blue-600', hex: '#2563eb' },
  { name: 'Emerald Teal', class: 'text-emerald-600', hex: '#059669' },
  { name: 'Crimson Red', class: 'text-rose-600', hex: '#e11d48' },
  { name: 'Sunset Amber', class: 'text-amber-500', hex: '#f59e0b' },
  { name: 'Indigo Dream', class: 'text-indigo-600', hex: '#4f46e5' },
  { name: 'Orchid Purple', class: 'text-purple-600', hex: '#9333ea' },
  { name: 'Silver Slate', class: 'text-slate-500', hex: '#64748b' },
];

export const SIZES = [
  { name: 'Small', class: 'text-4xl md:text-5xl' },
  { name: 'Medium', class: 'text-5xl md:text-7xl' },
  { name: 'Large', class: 'text-7xl md:text-8xl' },
  { name: 'Extra Large', class: 'text-8xl md:text-9xl' },
];

export const SPACINGS = [
  { name: 'Tight', class: 'tracking-tighter' },
  { name: 'Normal', class: 'tracking-normal' },
  { name: 'Wide', class: 'tracking-wider' },
  { name: 'Extra Wide', class: 'tracking-widest' },
];

export const SLANTS = [
  { name: 'Regular', class: 'not-italic' },
  { name: 'Italic (Slanted)', class: 'italic' },
];

export const ROTATIONS = [
  { name: '-6°', class: '-rotate-6' },
  { name: '-3°', class: '-rotate-3' },
  { name: '-1°', class: '-rotate-1' },
  { name: '0°', class: 'rotate-0' },
  { name: '1°', class: 'rotate-1' },
  { name: '3°', class: 'rotate-3' },
  { name: '6°', class: 'rotate-6' },
];
