# 🚀 End-to-End Deployment Guide (fario.in)

This guide explains how to push your code updates and deploy them live to your custom domain.

## 1. Quick Deployment (Recommended)

After you have finished making changes to your code, run the following command to move your updates live:

```bash
npm run deploy
```

*This script automatically builds your project and pushes it to the `gh-pages` branch for you.*

---

## 2. Step-by-Step Manual Deployment

If you prefer to run the steps manually (or if the automated script fails), use this workflow:

### Step A: Push Source Code to Master
This saves your actual code files (src, public, config) to GitHub.
```bash
git add .
git commit -m "Update: [Brief description of what you changed]"
git push origin master -f
```

### Step B: Build and Push to gh-pages
This moves the production files (the `dist` folder) to the live site.
```bash
# 1. Build the project
npm run build

# 2. Go into the build folder
cd dist

# 3. Initialize and Push
git init
git add -A
git commit -m "Deploy: Updated website"
git push -f https://github.com/fariofootwear-star/fariowebsite.git master:gh-pages

# 4. Go back to main folder
cd ..
```

---

## 🛠️ Custom Domain Fix (Important)

If you see a **White Page** on `fario.in`, check these two critical settings:

1. **Relative Paths**: In `vite.config.ts`, make sure the base path is relative:
   ```typescript
   base: "./", 
   ```
2. **CNAME File**: Ensure `public/CNAME` exists and contains only `fario.in`.

---

## 📝 Example Strategy

If you just updated the **Hero Section Text**:

1. Run `git add .`
2. Run `git commit -m "update: changed hero text"`
3. Run `git push origin master -f`
4. Run `npm run deploy`
5. Wait 2 minutes and check [fario.in](http://fario.in)
