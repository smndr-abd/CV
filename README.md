# CV Builder

A clean, editorial-style résumé builder built with React.

---

## Project Structure

```
cv-builder/
├── public/
│   └── index.html              # HTML shell — React mounts into #root
├── src/
│   ├── index.jsx               # Entry point
│   ├── App.jsx                 # Root component — owns all state
│   ├── components/
│   │   ├── EntryForm.jsx       # Reusable form (used by Education & Experience)
│   │   ├── GeneralSection.jsx  # Personal info sidebar panel
│   │   ├── EducationSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   └── CVPreview.jsx       # Live preview panel (right side)
│   └── styles/
│       ├── global.css          # CSS variables, body reset
│       ├── layout.css          # Two-column grid
│       ├── sidebar.css         # Dark sidebar styles
│       ├── form.css            # Input / button styles
│       └── preview.css         # CV paper / typography styles
└── package.json
```

---

## How to Run Locally

### 1. Prerequisites

Make sure you have **Node.js** installed (v16 or newer).  
Download from: https://nodejs.org

Check your version:
```bash
node -v   # should print v16.x or higher
npm -v    # should print 8.x or higher
```

### 2. Install dependencies

Open a terminal in the `cv-builder` folder and run:

```bash
npm install
```

This downloads React and all required packages into a `node_modules/` folder.

### 3. Start the development server

```bash
npm start
```

Your browser will open automatically at **http://localhost:3000**.  
The page hot-reloads whenever you save a file — no manual refresh needed.

### 4. Stop the server

Press `Ctrl + C` in the terminal.

---

## How to Build for Production

```bash
npm run build
```

This creates an optimised `build/` folder with minified HTML, CSS, and JS.  
You can host that folder on any static hosting service.

---

## How to Deploy

### Option A — Netlify (easiest, free)

1. Go to https://netlify.com and sign up (free).
2. In your terminal:
   ```bash
   npm run build
   ```
3. Drag the `build/` folder onto the Netlify dashboard.  
   Your site is live instantly with a `.netlify.app` URL.

**Or** connect your GitHub repo for automatic deploys on every push:
- Push this project to GitHub.
- In Netlify → "Add new site" → "Import from Git".
- Build command: `npm run build`
- Publish directory: `build`

### Option B — Vercel (also free, great DX)

```bash
npm install -g vercel   # install once
vercel                  # follow the prompts
```

Vercel auto-detects Create React App and deploys in ~30 seconds.

### Option C — GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/cv-builder",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then:
```bash
npm run deploy
```

---

## Making Changes

| What you want to change | File to edit |
|-------------------------|--------------|
| CV paper layout / typography | `src/styles/preview.css` |
| Sidebar colours / dark theme | `src/styles/sidebar.css` |
| Add a new form field | Edit the `FIELDS` array in `EducationSection.jsx` or `ExperienceSection.jsx` |
| Add a new section (e.g. Skills) | Copy `EducationSection.jsx`, rename it, add state in `App.jsx` |
| Global colours (CSS variables) | `src/styles/global.css` — edit the `:root` block |
