# CourseVault — Cross-Device Deployment & Sync Guide

CourseVault is a privacy-first, local-first online course tracker with Google Sheets cloud synchronization and PWA (Progressive Web App) mobile support.

---

## What Has Been Prepared

Your project is now fully configured and production-ready:

- **`index.html`**: The complete application, optimized for smartphones, tablets, and laptops. Includes responsive mobile controls, safe-area support, and dark mode.
- **`manifest.json`**: Enables mobile browsers to install CourseVault as an app on your home screen.
- **`sw.js`**: Service Worker that caches app files so CourseVault loads instantly even when offline.
- **`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `icon.svg`**: High-resolution branded app icons.
- **`google-apps-script.js`**: Clean backend script ready to paste into Google Sheets for instant cloud sync.

---

## What Is Needed From Your Side

To get CourseVault live on the internet and syncing across all your devices, follow these 3 quick steps:

---

### Step 1: Make It Live (1–2 minutes)

Choose **Option A** or **Option B**:

#### Option A: Drag & Drop with Netlify (Easiest & Fastest — No terminal needed)
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop this entire `Course Vault` folder onto the webpage.
3. Netlify will instantly provide a free, live HTTPS URL (e.g. `https://course-vault-abc.netlify.app`).

#### Option B: GitHub Pages (Permanent custom URL)
1. Create a free repository on [GitHub](https://github.com) named `course-vault`.
2. Upload the files from this folder (`index.html`, `manifest.json`, `sw.js`, `icons`, etc.).
3. In your repo, go to **Settings → Pages**.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. Your app is live at `https://<your-username>.github.io/course-vault/`.

---

### Step 2: Set Up Cross-Device Cloud Sync (3 minutes)

Because CourseVault is local-first, connecting a Google Sheet enables automatic synchronization between your phone, tablet, and laptop:

1. Open **[Google Sheets](https://sheets.new)** and create a new blank sheet.
2. In the top menu, go to **Extensions → Apps Script**.
3. Erase whatever is in the editor, and paste the code from **`google-apps-script.js`**.
4. Near line 24, change:
   ```javascript
   const SECRET_TOKEN = 'change-this-to-your-secret-passphrase';
   ```
   to your own private passphrase (e.g., `'my-vault-pass-2026'`).
5. Click **Deploy → New deployment**:
   - Click the gear icon next to "Select type" and pick **Web app**.
   - Description: `CourseVault API`
   - Execute as: **Me** (`your_email@gmail.com`)
   - Who has access: **Anyone**
6. Click **Deploy**, authorize permissions with your Google account, and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).
7. Open your live CourseVault website:
   - Click **Cloud Sync** in the top navigation bar.
   - Paste your **Web App URL** and **Secret Token**.
   - Ensure **Auto-sync** is checked, then click **Save & Connect**.
8. Repeat Step 7 on your phone or any other device using the same URL and Secret Token!

---

### Step 3: Install on Your Mobile Device (Home Screen App)

#### On iPhone / iPad (Safari)
1. Open your live CourseVault URL in **Safari**.
2. Tap the **Share** button (box with an arrow pointing up at the bottom).
3. Scroll down and tap **Add to Home Screen**.
4. CourseVault will appear on your home screen with its custom icon and run without the browser search bar.

#### On Android (Chrome)
1. Open your live CourseVault URL in **Chrome**.
2. Tap the three dots (menu) in the top-right corner.
3. Tap **Install app** or **Add to Home screen**.
