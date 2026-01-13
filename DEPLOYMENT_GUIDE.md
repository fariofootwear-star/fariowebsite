# 🚀 The Ultimate Deployment Guide for fario.in

Follow these **2 Simple Phases** whenever you make a change to your website.

> **✨ NEW: Automated Deployment via GitHub Actions**  
> Your site now uses GitHub Actions for deployment. This means **you no longer need to manually run `npm run deploy`** or push to the `gh-pages` branch. Just push to `master` and GitHub will automatically build and deploy your site!

---

## Phase 1: Test Your Changes Locally
*Before pushing anything to the internet, make sure it looks right on your computer.*

1. **Start the local server:**
   ```powershell
   npm run dev
   ```
2. **Open the link:** Click the `http://localhost:3000` link in your terminal.
3. **Verify:** Check your changes. If they look good, move to Phase 2.

---

## Phase 2: Deploy to Live Site (fario.in)
*This saves your code AND automatically deploys it to the live website.*

1. **Prepare files:**
   ```powershell
   git add .
   ```
2. **Commit with a message:**
   ```powershell
   git commit -m "Describe what you changed here"
   ```
3. **Push to GitHub:**
   ```powershell
   git push origin master
   ```

**That's it!** 🎉 GitHub Actions will automatically:
- Build your website
- Optimize it for production
- Deploy it to fario.in

**Timeline:**
- Your code is saved to GitHub: **Immediately**
- GitHub Actions starts building: **Within 10 seconds**
- Your site is live at fario.in: **1-2 minutes after push**

---

## 📊 How to Monitor Deployment

After pushing to `master`, you can watch the deployment progress:

1. **Go to Actions tab:**
   - Visit: https://github.com/fariofootwear-star/fariowebsite/actions
   
2. **Check the latest run:**
   - You'll see "Deploy to GitHub Pages" workflow
   - Status will show: 🟡 In Progress → ✅ Success
   
3. **Verify live site:**
   - Once you see the green checkmark ✅
   - Visit [fario.in](https://fario.in) to see your changes live!

---

## 🛠️ Troubleshooting

### 1. Deployment Failed (Red X)
If the GitHub Action shows a red ❌:
- Click on the failed run to see error details
- Common fixes:
  - Make sure `npm run build` works locally
  - Check that all dependencies are in `package.json`

### 2. Changes Not Showing on fario.in
- **Wait 2-3 minutes** after the green checkmark
- **Hard refresh** your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- **Check version number** in the footer to confirm deployment

### 3. "White Page" Error
If [fario.in](http://fario.in) shows a white screen:
- Open `vite.config.ts`
- Ensure the `base` line looks like: `base: "/",`

---

## 📝 Real-World Example Flow

Imagine you just changed the **"Contact Email"** in your code and want to go live.

**Follow these exact steps in your terminal:**

1. **Check if it looks good locally:**
   ```powershell
   npm run dev
   ```
   - Open `localhost:3000` in your browser
   - *Everything looks correct?* Proceed to Step 2.

2. **Deploy to fario.in:**
   ```powershell
   git add .
   git commit -m "update: fixed contact email"
   git push origin master
   ```

3. **Monitor deployment:**
   - Go to: https://github.com/fariofootwear-star/fariowebsite/actions
   - Wait for green checkmark ✅ (1-2 minutes)

4. **Verification:**
   - Open [fario.in](https://fario.in) and see your new email live!

---

## 💡 Pro Tip (The "Super Command")

If you are very confident and want to do everything in one line:
```powershell
git add . ; git commit -m "Your Message" ; git push origin master
```

Then just wait 1-2 minutes and check fario.in!

---

## 🔄 Old Deployment Method (Deprecated)

> **⚠️ NOTE:** The old manual deployment methods (`npm run deploy` and manual `gh-pages` push) are **no longer needed** and may cause conflicts. The GitHub Actions workflow handles everything automatically now.

If you need to use the old method for any reason:
- You must first **disable GitHub Actions** in Settings > Pages
- Change Source back to "Deploy from a branch"
- Then use the old commands

**However, this is NOT recommended** as it will bring back the 10-minute timeout issues.

---

## ✅ Summary: New vs Old Workflow

### Old Workflow (Deprecated):
1. Test locally
2. Push to master
3. **Manually run `npm run deploy`** ❌
4. Wait and hope it doesn't timeout

### New Workflow (Current):
1. Test locally
2. Push to master ✅
3. **Done!** GitHub Actions handles the rest automatically 🎉

---

**Questions?** Check the [walkthrough.md](file:///C:/Users/Tharun/.gemini/antigravity/brain/876f4112-f801-43d2-b99e-17aefc194bf7/walkthrough.md) for more details on the GitHub Actions setup.
