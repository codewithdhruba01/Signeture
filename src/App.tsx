import { useState } from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { SignatureStyle } from './types';
import { SignatureControls } from './components/SignatureControls';
import { SignaturePreview } from './components/SignaturePreview';
import { ExportSection } from './components/ExportSection';
import { CliInstructions } from './components/CliInstructions';
import { SignatureStyleShowcase } from './components/SignatureStyleShowcase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const [name, setName] = useState<string>('Dhrubaraj Pati');
  const [style, setStyle] = useState<SignatureStyle>({
    fontKey: 'greatvibes',
    colorClass: 'text-blue-600',
    customColor: '#2563eb',
    isCustomColor: false,
    sizeClass: 'text-5xl md:text-7xl',
    spacingClass: 'tracking-normal',
    slantClass: 'not-italic',
    rotateClass: 'rotate-0',
  });

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col justify-between selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pt-32 md:pb-12 z-10">
        {/* Banner Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Signature Designer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Design & Integrate Your Digital Signature
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Create professional cursive handwriting signatures instantly, customize styling, preview in mockups, and automatically export or add them to your website via our custom CLI wizard.
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-5">
            <SignatureControls
              name={name}
              setName={setName}
              style={style}
              setStyle={setStyle}
            />
          </div>

          {/* Preview & Actions Column (Right) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Preview Panel */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-slate-400">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Preview Canvas</span>
              </div>
              <SignaturePreview name={name} style={style} />
            </div>

            {/* Export Options */}
            <ExportSection name={name} style={style} />

            {/* CLI Instructions */}
            <div id="cli-section">
              <CliInstructions name={name} style={style} />
            </div>
          </div>
        </div>
        <SignatureStyleShowcase
          name={name}
          onApplyStyle={(partialStyle: Partial<SignatureStyle>) =>
            setStyle((prev) => ({
              ...prev,
              ...partialStyle,
            }))
          }
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
