# 🚀 Nicesly - AI-driven Skuldhantering

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open: http://localhost:5173

## 🏗️ Build

```bash
npm run build
```

Output: `dist/` folder

## 📦 Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/nicesly.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Vercel auto-detects Vite settings
6. Click "Deploy"
7. Done! Your site is live

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (super fast!)
- **Tailwind CSS** - Styling
- **Lucide Icons** - Beautiful icons
- **React Router** - Navigation

## 📂 Project Structure

```
nicesly/
├── src/
│   ├── components/
│   │   └── App.jsx              # Main website component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global CSS + Tailwind
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js               # Vite config
├── tailwind.config.js           # Tailwind config
└── postcss.config.js            # PostCSS config
```

## 🎨 Features

- ✅ Beautiful gradient design (cyan → blue → purple)
- ✅ 3 pricing tiers with hover effects
- ✅ BankID integration flow
- ✅ David AI animated showcase
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Fast loading with Vite
- ✅ Optimized for production

## 🔧 Configuration

### Tailwind CSS

All Tailwind classes are configured in `tailwind.config.js`. Custom animations and fonts are defined there.

### Vite

Build settings in `vite.config.js`. Dev server runs on port 5173.

## 🐛 Troubleshooting

### Issue: No styling (white page with black text)

**Solution:** Make sure `src/index.css` has `@tailwind` directives at the top:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: "Cannot find module 'lucide-react'"

**Solution:**
```bash
npm install lucide-react
```

### Issue: Build fails in Vercel

**Solution:** Check that all dependencies are in `package.json` and run `npm install` locally first to test.

## 📚 Documentation

Check the `/docs` folder for:
- `COMPLETE_PROJECT_STRUCTURE.md` - Full project structure guide
- `NICESLY_SPEED_SECURITY_TRUST.md` - Cloudflare optimization guide
- `DAVID_AI_GUARDIAN.md` - David AI Guardian feature docs
- `STRIPE_CHECKOUT_IMPLEMENTATION.md` - Payment integration guide

## 🎉 Ready to Launch!

This project is production-ready! Just:
1. Run `npm install`
2. Test with `npm run dev`
3. Push to GitHub
4. Deploy to Vercel
5. Add your domain (nicesly.se)
6. Go live! 🚀

## 📞 Support

For questions or issues, check the documentation in the `/docs` folder.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
