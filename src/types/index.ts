export interface FontOption {
  key: string;
  name: string;
  className: string;
  importName: string;
}

export interface ColorPreset {
  name: string;
  class: string;
  hex: string;
}

export interface SignatureStyle {
  fontKey: string;
  colorClass: string;
  customColor: string;
  isCustomColor: boolean;
  sizeClass: string;
  spacingClass: string;
  slantClass: string;
  rotateClass: string;
}

export type MockupType = 'none' | 'document' | 'card' | 'certificate';
