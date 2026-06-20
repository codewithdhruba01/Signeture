export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-6 mt-16 text-center text-xs text-slate-500 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Signature Studio Corp. All rights reserved.</p>
        <div className="flex space-x-6">
          <span className="hover:text-slate-400 transition-colors">Component-Based Architecture</span>
          <span className="hover:text-slate-400 transition-colors">Inline CSS Free</span>
          <span className="hover:text-slate-400 transition-colors">CLI Integration</span>
        </div>
      </div>
    </footer>
  );
}
