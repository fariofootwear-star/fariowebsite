# 🚀 The Ultimate Deployment Guide for fario.in

Follow these **3 Simple Phases** whenever you make a change to your website.

---

## Phase 1: Test Your Changes Locally
*Before pushing anything to the internet, make sure it looks right on your computer.*

1. **Start the local server:**
   ```powershell
   npm run dev
   ```
2. **Open the link:** Click the `http://localhost:5173` link in your terminal.
3. **Verify:** Check your changes. If they look good, move to Phase 2.

---

## Phase 2: Save Your Code (Push to GitHub)
*This saves your "Raw Code" so you don't lose your work. This does **NOT** update the live website yet.*

1. **Prepare files:**
   ```powershell
   git add .
   ```
2. **Seal the folder with a message:**
   ```powershell
   git commit -m "Describe what you changed here"
   ```
3. **Push to GitHub Cloud:**
   ```powershell
   git push origin master -f
   ```

---

## Phase 3: Go Live! (Update fario.in)
*This builds your website and pushes it to the live domain.*

### Option A: The "One-Click" Method (Fastest)
Try this first:
```powershell
npm run deploy
```
*Wait 2 minutes and check [fario.in](http://fario.in). If it works, you are DONE!*

---

### Option B: The Manual Method (Use if Option A fails)
If `npm run deploy` gives an error, run these commands one by one:

1. **Build the production files:**
   ```powershell
   npm run build
   ```
2. **Enter the build folder:**
   ```powershell
   cd dist
   ```
3. **Reset the internal folder:**
   ```powershell
   git init
   git add -A
   git commit -m "Manual Deploy"
   ```
4. **Push to the Live Branch:**
   ```powershell
   git push -f https://github.com/fariofootwear-star/fariowebsite.git master:gh-pages
   ```
5. **Go back to your main folder:**
   ```powershell
   cd ..
   ```

---

## 🛠️ Troubleshooting (Common Fixes)

### 1. "White Page" Error
If [fario.in](http://fario.in) is just a white screen:
*   Open `vite.config.ts`.
*   Ensure the `base` line looks exactly like this: `base: "./",`

### 2. "Git Errors" or "node_modules" warnings
If `git add .` shows too many warnings:
*   It means it is trying to track files it shouldn't.
*   Run: `git rm -r --cached node_modules`
*   Then try Phase 2 again.

---

## 📝 Real-World Example Flow

Imagine you just changed the **"Contact Email"** in your code and want to go live. 

**Follow these exact steps in your terminal:**

1. **Check if it looks good locally:**
   - Look at `localhost:5173` in your browser.
   - *Everything looks correct?* Proceed to Step 2.

2. **Save your changes to GitHub:**
   ```powershell
   git add .
   git commit -m "update: fixed contact email"
   git push origin master -f
   ```

3. **Push the update to [fario.in](http://fario.in):**
   ```powershell
   npm run deploy
   ```

4. **Verification:**
   - Wait 60 seconds.
   - Open [fario.in](http://fario.in) and see your new email live!

---

## 💡 Pro Tip (The "Super Command")
If you are very confident, you can do Phase 2 and Phase 3 all at once with this single line:
```powershell
git add . ; git commit -m "Your Message" ; git push origin master -f ; npm run deploy
```
