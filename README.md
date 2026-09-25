# 💖 Happy Birthday Surprise Web App — Setup & Customization Guide

This is a **mobile-first, romantic web application** built with deep love, luxury aesthetics, glassmorphism, 3D interactive elements, and ambient background music — designed especially for your girlfriend's birthday in a long-distance relationship.

---

## 🚀 How to Preview It Right Now

1. **Option A (Instant in VS Code / Antigravity):**
   - If you have the "Live Server" extension, right-click [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html) and select **"Open with Live Server"**.
   - Or open a terminal and run:
     ```bash
     npx serve .
     ```
2. **Option B (Direct Browser):**
   - Double-click [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html) to open it in Chrome, Safari, or Edge.

---

## 🎨 How to Customize in 5 Minutes

All dummy data is clearly labeled and ready for your personal touch:

### 1. Her Name & Nickname
Open [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html):
- **Line 33:** Change `<h1 class="gate-title">To My Sweetheart</h1>` to her real name or pet name.
- **Line 77:** Change `<span class="highlight-name" id="displayGirlfriendName">My Motiii ❤️</span>` to her name.
- **Line 268:** Change `<div class="letter-stamp">❤️ MOTIII</div>` on the love letter.

### 2. Long Distance Cities & Distance
In [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html):
- **Line 90:** Change `<span class="city-name" id="cityA">My City</span>` (e.g. *Mumbai*, *Delhi*, *New York*).
- **Line 99:** Change `<span id="ldrDistanceText">1,240 km</span>` to your actual distance.
- **Line 105:** Change `<span class="city-name" id="cityB">Her City</span>` (e.g. *Bangalore*, *London*, *Paris*).

### 3. Adding Her Photos & Your Photos
In [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html):
- **Her Solo Photos (Lines 180–240):** 
  - Replace the Unsplash URLs in the `<img src="..." />` tags with your own image paths or URLs!
  - If saving locally, create an `assets/` folder and put your images there (e.g. `<img src="assets/her1.jpg" />`).
- **Couple Photos (Lines 245–285):**
  - Replace the images in the "Our Sweetest Moments" section with pictures of both of you, video call screenshots, or hand-holding moments.
  - Edit the captions (`data-title` and `data-caption`) to match your actual memories!

### 4. Personalizing The Love Letter
In [`index.html`](file:///f:/Projects/Motiii_birthday_v3/index.html), lines 270–300:
- Find `<div class="letter-content" id="letterContent">`.
- Edit the text inside the `<p>` tags with your own personal thoughts, memories, inside jokes, and promises.

---

## 🌐 How to Send It to Her Phone (Free 1-Click Hosting)

To let her open the link on her phone like a real website:
1. **Netlify Drop (Easiest - takes 30 seconds):**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop this entire `Motiii_birthday_v3` folder into the browser.
   - Netlify will instantly give you a free live URL (e.g., `https://happy-birthday-motiii.netlify.app`) to send to her WhatsApp/iMessage!
2. **GitHub Pages:**
   - Push this repo to GitHub, go to `Settings > Pages`, and select `main` branch root.
3. **Vercel:**
   - Run `npx vercel` in this folder or import from GitHub.

---

## ❤️ Features Included:
- ✨ **Golden Gate Entrance**: Romantic entrance modal with particle burst.
- 🕯️ **Interactive Birthday Cake**: Tap to blow the candle flame, watch smoke rise, and burst celebratory confetti!
- 💖 **Reasons I Love You**: Touch-swipeable polaroid cards.
- 📸 **Polaroid Photo Galleries**: Realistic paper, tape stickers, tilt angles, and full-screen Lightbox zoom.
- 💌 **3D Wax-Sealed Surprise Letter**: Realistic wax seal break, envelope unfolding, and emotional letter sliding out.
- 🌌 **Ambient Canvas**: Continuous floating glowing hearts and twinkling stars.
