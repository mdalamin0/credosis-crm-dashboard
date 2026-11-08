# Credosis CRM - Financial Overview Dashboard

An ultra-modern, highly responsive, and high-performance Single-Page SaaS Financial Dashboard built as part of the Credosis Frontend Engineer Intern recruitment evaluation. The project focuses on pristine UI/UX, robust client-side interaction, optimized Next.js rendering architecture, and clean TypeScript implementation.

## ✨ Features

- **Dynamic Invoice Management:** In-app generative billing modal built with modular state tracking to seamlessly create client receipts in real-time.
- **Ultra-Modern Bento Grid Layout:** Interactive floating calculation widgets with micro-interactions, responsive aspect constraints, and dedicated brand-color accents.
- **Real-time Revenue Analytics:** Beautiful glowing Area Chart utilizing dynamic code-splitting (`next/dynamic`) to map paid revenue milestones without hydration cascades.
- **Client Search & Invoices Directory:** Advanced analytical table interface integrating structural multi-vector text filters and isolated granular modal wrappers.
- **Native Vector PDF Exporter:** Client-side document parser rendering lightweight high-precision vector receipts directly to device storage via custom native coordinate geometry.

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server-First Layout Shell)
- **Language:** TypeScript (Strict Type Safety & Interfaces)
- **Styling:** Tailwind CSS (Utility-First Responsive UI Framework)
- **Component Primitives:** Shadcn UI Ecosystem (Dialog, Table, Input, Button, Select)
- **Data Visualization:** Recharts (Dynamic Client Component Analytics Vector Layer)
- **Document Engine:** jsPDF (Client-Side Vector Engine Execution Layer)
- **Icons:** Lucide React

## 📂 Project Structure

```text
src/
├── app/
│   ├── globals.css      # Core global CSS with modern oklch tokens
│   ├── layout.tsx       # Root layout layer
│   └── page.tsx         # Pure Server Component serving as entry shell
├── components/
│   ├── ui/              # Shadcn primitive atomic building blocks
│   ├── DashboardShell.tsx  # Dynamic Client Core encapsulating system state
│   ├── InvoiceModal.tsx    # Modal form layer powered by modern select primitives
│   ├── InvoicePreviewModal.tsx  # Lightweight native PDF canvas preview container
│   ├── StatCards.tsx       # Bento metrics framework utilizing compound color maps
│   └── TableView.tsx       # Search abstraction index holding actions column
└── data/
    └── mockData.ts      # Strictly typed mockup array model definitions
```

## 🚀 Getting Started

Follow these steps to set up and run the dashboard locally:

### 1. Clone the Repository
```bash
git clone https://github.com/mdalamin0/credosis-crm-dashboard.git
cd credosis-crm-dashboard
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Initialize Primitive Component Assets
Ensure you have downloaded all necessary design tokens and primitives via the ecosystem CLI:
```bash
npx shadcn@latest add dialog table input button select
```

### 4. Boot Up the Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application interface.

## 📦 Production Deployment & Validation

The application contains strict hydration barriers and modular state containment. To compile and check for compilation errors, execute:

```bash
npm run build
```
The codebase compiles cleanly under strict constraints. Live builds are successfully served via serverless distribution targets (Vercel/Netlify).

## 📄 Recruitment Evaluation License
This codebase is developed and submitted explicitly for Phase 02 of the Credosis Internship Program recruitment process evaluation.
