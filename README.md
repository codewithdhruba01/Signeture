# Signature Studio

An interactive, digital signature generator designed to help you create professional, elegant cursive handwriting signatures instantly, customize styling, preview in realistic mockups, and integrate them seamlessly into your websites.

It features a premium **web application UI** built with React, Vite, TypeScript, and Tailwind CSS, coupled with a robust **Node.js Command Line Interface (CLI)** tool to export and generate components directly in your terminal.

---

## Features

- **Interactive Web Designer:** Fine-tune your signature with sliders for sizing, letter spacing, slant, and rotation.
- **Custom Font Styles:** Choose from 6 curated cursive calligraphy fonts (Alex Brush, Allura, Great Vibes, Sacramento, Pinyon Script, Monsieur La Doulaise).
- **Advanced Color Customization:** Choose from a set of beautiful presets or pick a custom Hex color that matches your brand.
- **Live Preview Canvas:** Get instant feedback on how the signature looks on light and dark backgrounds.
- **Multiple Formats Export:**
  - **SVG:** Scalable Vector Graphic suitable for websites.
  - **PNG:** High-resolution transparent raster graphic.
  - **React TSX:** Complete, self-contained TypeScript React Component.
- **Node.js CLI Tool:** Create and save signatures directly from your terminal using interactive prompts (Wizard mode) or command-line flags (Direct mode).

---

## 🛠️ Tech Stack

- **Frontend:** [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/), Vanilla CSS utilities
- **Icons:** [Lucide React](https://lucide.dev/)
- **CLI Utility:** Node.js Native API (`readline`, `fs`, `path`)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Web Development Server

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codewithdhruba01/Signeture.git
   cd Signeture
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

4. **Production Build:**
   ```bash
   npm run build
   ```

5. **Linting & Typechecking:**
   ```bash
   # Run linter
   npm run lint

   # Run TypeScript compiler checks
   npm run typecheck
   ```

---

## CLI Integration Tool

The project includes a CLI helper script (`cli.js`) to generate and write signature files (.svg or .tsx React components) directly into any target directory.

### Method 1: Interactive Wizard Mode (Recommended)

Simply execute the script in your terminal and follow the interactive prompts:

```bash
node cli.js
```

### Method 2: Direct CLI Flag Mode

Instantly generate a signature without going through the step-by-step wizard by providing parameters directly:

```bash
node cli.js --name "Dhrubaraj Pati" --font "greatvibes" --color "#2563eb" --out "./src/components/Signature.tsx"
```


## 🤝 Socials & Contact

- **GitHub Repository:** [codewithdhruba01/Signeture](https://github.com/codewithdhruba01/Signeture)
- **Twitter / X:** [@codewithdhruba](https://x.com/codewithdhruba)

Enjoy using **Signature Studio**! 🚀
