# 🧀 Big Daddy's Cup (BDC) — Separated Landing & User Pages

A professional, modern, and mouth-watering web application for **Big Daddy's Cup (BDC)** — the viral Filipino fast-casual food brand and franchise celebrated nationwide for their legendary **cheese-drowned silog bowls, Bacsilog cups, and comfort food favorites**.

---

## 🏗️ Architecture: Separated Landing & User Portal

The codebase is split into dedicated, modular pages with auth enforcement:

```
big daddys cup/
├── index.html        # Public Restaurant Storefront & Landing Page
├── landing.js        # Landing page logic (Menu, Cart, Builder, Login modal)
├── user.html         # Private User Account & Live Orders Hub (Auth Protected)
├── user.js           # User portal logic (Live Order Tracker, History, Rewards, Addresses)
├── style.css         # Unified light-theme brand stylesheet (Relaxed typography)
├── server.js         # Zero-dependency local Node.js server
└── README.md         # Documentation & guide
```

---

## 🔒 User Authentication & Order Privacy

To access their orders and account, **users must log in**:
* **On Storefront (`index.html`)**:
  - Clicking **"Login"** or **"🛵 My Orders"** displays the Login Modal.
  - Users can sign in with their Philippine Mobile Number (+63), Email, or click **"⚡ Fast Login (Demo)"**.
  - Once signed in, user session is stored securely in `localStorage` and they are navigated to **`user.html`**.
* **On User Hub (`user.html`)**:
  - Features an **Auth Guard**: If an unauthenticated guest visits `user.html` directly, a locked screen is presented requiring them to sign in.
  - Once authenticated, it reveals the customer dashboard, live orders, and loyalty wallet.
  - Clicking **"Log Out"** clears their credentials and returns to `index.html`.

---

## 🌟 Key Features

### 1. 🌟 Landing Page (`index.html` + `landing.js`)
* **Hero Experience:** High-impact typography, animated dripping cheese, live foodie stats (1.8M+ cups served, 40+ branches nationwide, 4.9★ rating).
* **The Cheese Obsession Spotlight:** Interactive cheese pour slider ("Drag to Drown Your Bowl in Cheese") and the 4 pillars of every BDC Cup (Garlic Sinangag, Searing Meats, Runny Farm Eggs, Secret Cheddar Blend).
* **Interactive Signature Menu (Light Theme):**
  - Real authentic menu items in Philippine Peso (**₱**):
    - *BDC Bacsilog (Signature #1 Best Seller - ₱115)*
    - *BDC Tapsilog Prime (Garlicky Marinated Beef Tapa - ₱129)*
    - *BDC Katsulog Supreme (Crispy Golden Panko Pork Cutlet - ₱139)*
    - *BDC Sizzling Sisig Rice Bowl (₱135)*
    - *BDC Hungarian Sausage Silog (Spicy Pepper Kick - ₱139)*
    - *BDC Quarter Pounder Burger Rice (₱125)*
    - *Loaded Cheddar Crinkle Fries (₱89) & Mozzarella Corndog (₱79)*
    - *Calamansi Cold Brew Iced Tea (₱49) & Cheesy Mango Graham Shake (₱89)*
  - Live category filters, search bar, and custom cheese level modal (+₱0 Regular, +₱20 Extra Cheesy, +₱35 Cheese Niagara).
* **Interactive "Build Your Own Daddy Cup" Configurator:**
  - Real-time SVG visual layer rendering (Rice base -> Protein -> Egg style -> Cheese pour -> Extras) with live price calculator and instant add-to-cart.
* **Store Branch Locator:**
  - Complete directory across Tacloban, Metro Manila (Sta. Mesa V. Mapa, Morayta), Cebu (Talamban), and Bulacan with operating hours and delivery badges.
* **Franchise Opportunity & ROI Calculator:**
  - Interactive projected daily cup sales slider that dynamically calculates monthly revenue, food cost, crew wages, net profit, and payback period in months.
* **Shopping Cart & Checkout:** Slide-out cart drawer with promo codes (`CHEESYFIRST`, `BIGDADDY`, `FREESHIP`) and multi-payment checkout.

---

### 2. 👤 User Portal (`user.html` + `user.js`)
* **Live Simulated Order Tracker (`#BDC-89241`):**
  - 5-step visual progress: Order Confirmed ➔ Sizzling on Griddle ➔ Drizzling Signature Cheese Sauce (Live) ➔ Out with Rider ➔ Delivered!
  - Active rider card: *Kuya Junjun M. • Honda Click 125 • 7 mins away • Call Rider action*.
  - Simulated live route map mockup with moving delivery scooter.
* **Order History & 1-Click Re-Order:**
  - View previous meals, order breakdowns, and refill your cart instantly.
* **Daddy Cheesy Rewards Wallet:**
  - Points balance (480 pts) with VIP Tier status (*Big Daddy Gold VIP*).
  - 1-Click claimable vouchers (e.g. *Free Extra Cheese Drizzle*, *Free Calamansi Tea*, *₱50 Off Silog Meal*).
* **Saved Addresses & Preferences:**
  - Manage Home, University, and Office delivery locations with default cheese preference storage.

---

## 🚀 How to Run Locally

### Option A: Local Node.js Server (Running on Port 3000)
Run the zero-dependency built-in Node server:
```powershell
node server.js
```
Then open:
- 👉 Landing Page: **`http://localhost:3000`**
- 👉 User Hub: **`http://localhost:3000/user.html`**

### Option B: Direct File Open
You can also directly double-click `index.html` or `user.html` in File Explorer.
