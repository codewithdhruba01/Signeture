import { GithubIcon, XIcon } from './icons/SocialIcons';

export function Navbar() {
  return (
    <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
            <img src="/favicon-96x96.png" alt="Signature Studio Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Signature Studio</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/codewithdhruba01/Signeture"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon size="18" className="!stroke-slate-400 hover:!stroke-slate-200 transition-colors" />
          </a>
          <a
            href="https://x.com/codewithdhruba"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 transition-all"
            aria-label="Twitter / X"
          >
            <XIcon size="18" className="!fill-slate-400 hover:!fill-slate-200 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
}
