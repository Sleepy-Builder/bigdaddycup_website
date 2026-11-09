/**
 * BIG DADDY'S CUP (BDC) - CUSTOMER STORE & ORDER PORTAL SCRIPT
 * Requires customer login first, displays the full product catalog for ordering,
 * manages the live shopping cart & customization, and tracks real-time order status.
 */

// --- STORE BRANCHES DATABASE (WITH STOREFRONT IMAGES) ---
const STORE_BRANCHES = {
  'mnl-sta-mesa': {
    name: "Big Daddy's Cup - V. Mapa Sta. Mesa Branch",
    shortName: "V. Mapa Sta. Mesa Branch",
    address: "V. Mapa Blvd cor Ramon Magsaysay Blvd, Sta. Mesa, Manila",
    hours: "Open 24/7 (Daily)",
    phone: "+63 (02) 8711-2099",
    status: "🟢 Open 24/7",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
  },
  'mnl-morayta': {
    name: "Big Daddy's Cup - FEU / Morayta U-Belt",
    shortName: "FEU / Morayta Branch",
    address: "Nicanor Reyes St., Sampaloc, Manila",
    hours: "6:30 AM – 12:00 MN",
    phone: "+63 928 411 9302",
    status: "🟢 Open Now",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80"
  },
  'tac-paterno': {
    name: "Big Daddy's Cup - Flagship Paterno St.",
    shortName: "Flagship Paterno (Tacloban)",
    address: "Paterno Street, Downtown, Tacloban City, Leyte",
    hours: "7:00 AM – 11:00 PM (Daily)",
    phone: "+63 (053) 832-4412",
    status: "🟢 Open Now",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  'tac-sagkahan': {
    name: "Big Daddy's Cup - Sagkahan District",
    shortName: "Sagkahan Branch (Tacloban)",
    address: "Sagkahan District, near Astrodome, Tacloban City",
    hours: "8:00 AM – 10:00 PM",
    phone: "+63 917 554 9921",
    status: "🟢 Open Now",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80"
  },
  'cebu-talamban': {
    name: "Big Daddy's Cup - Talamban Univ. Corner",
    shortName: "Talamban Univ. (Cebu)",
    address: "Gov. M. Cuenco Ave, Talamban, Cebu City",
    hours: "8:00 AM – 11:00 PM",
    phone: "+63 (032) 410-8819",
    status: "🟢 Open Now",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  'bulacan-malolos': {
    name: "Big Daddy's Cup - Malolos Crossing",
    shortName: "Malolos Crossing (Bulacan)",
    address: "MacArthur Highway, Malolos City, Bulacan",
    hours: "8:00 AM – 10:00 PM",
    phone: "+63 915 220 1888",
    status: "🟢 Open Now",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80"
  }
};

// --- FULL STORE PRODUCTS CATALOG (16 SIGNATURE DISHES) ---
const STORE_PRODUCTS = [
  {
    id: 'bacsilog',
    name: 'BDC Bacsilog (Signature)',
    category: 'silog',
    badge: '👑 #1 Best Seller',
    price: 115,
    calories: '620 kcal',
    description: 'Crispy thick-cut honey-cured bacon strips, fragrant toasted garlic rice, sunny-side up runny egg, and generously smothered with our viral BDC cheese sauce.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    tags: ['Best Seller', 'Extra Cheesy', 'Crispy']
  },
  {
    id: 'tapsilog',
    name: 'BDC Tapsilog Prime',
    category: 'silog',
    badge: '🔥 Crowd Favorite',
    price: 129,
    calories: '640 kcal',
    description: 'Tender house-marinated beef tapa with garlic, calamansi & black pepper notes, served with golden sinangag, runny egg, and rich melted cheese drizzle.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    tags: ['Savory Beef', 'Garlic Loaded']
  },
  {
    id: 'katsulog',
    name: 'BDC Katsulog Supreme',
    category: 'silog',
    badge: '⭐ Crispy Crunch',
    price: 139,
    calories: '710 kcal',
    description: 'Deep-fried golden panko pork katsu cutlet sliced over hot garlic rice, sunny egg, paired with Big Daddy signature cheese and Japanese tonkatsu glaze.',
    image: 'https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=700&q=80',
    tags: ['Crispy Panko', 'Double Sauce']
  },
  {
    id: 'tocilog',
    name: 'BDC Sweet Tocilog',
    category: 'silog',
    badge: 'Sweet & Cheesy',
    price: 119,
    calories: '590 kcal',
    description: 'Caramelized tender pork tocino seared to perfection, paired with toasted garlic rice, farm fresh egg, and creamy golden cheese sauce.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80',
    tags: ['Sweet Caramelized', 'Pinoy Classic']
  },
  {
    id: 'hungariansilog',
    name: 'BDC Hungarian Sausage Silog',
    category: 'silog',
    badge: '🌶️ Spicy Kick',
    price: 139,
    calories: '680 kcal',
    description: 'Grilled premium smoked Hungarian sausage with a mild spicy pepper kick, cross-sliced and drenched in Big Daddy signature cheddar sauce with egg and rice.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=700&q=80',
    tags: ['Smoky', 'Spicy', 'Hearty']
  },
  {
    id: 'sisilog',
    name: 'BDC Cheesy Sisig Rice Bowl',
    category: 'rice-bowls',
    badge: '💥 Sizzling Hit',
    price: 135,
    calories: '730 kcal',
    description: 'Kapampangan-style crispy minced pork sisig with sautéed onions and red chili, topped with an egg and flooded with creamy BDC cheese dressing.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80',
    tags: ['Crispy Sisig', 'Spicy', 'Flavor Bomb']
  },
  {
    id: 'longsilog',
    name: 'BDC Lucban Longsilog',
    category: 'silog',
    badge: 'Traditional',
    price: 110,
    calories: '610 kcal',
    description: 'Savory garlicky local longganisa caramelized on the griddle, served with sinangag garlic rice, runny egg, and melted cheese dip.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=700&q=80',
    tags: ['Garlicky', 'Heritage']
  },
  {
    id: 'getsilog',
    name: 'BDC Getsilog (Nuggets Cup)',
    category: 'silog',
    badge: 'Kid & Budget Pick',
    price: 99,
    calories: '540 kcal',
    description: 'Crispy golden chicken nuggets served with garlic rice, sunny egg, and a generous tub of our signature Big Daddy cheese dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80',
    tags: ['Budget Friendly', 'Nuggets']
  },
  {
    id: 'burger-rice',
    name: 'BDC Quarter Pounder Burger Rice',
    category: 'burgers-mains',
    badge: '🍔 Patty Sizzle',
    price: 125,
    calories: '690 kcal',
    description: 'Flame-seared 100% pure beef patty over steaming garlic rice, layered with a fried egg and drenched in hot cheddar gravy cheese sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    tags: ['Juicy Beef', 'Cheese Lava']
  },
  {
    id: 'double-trouble',
    name: 'Double Trouble Cup (Bacon + Katsu)',
    category: 'rice-bowls',
    badge: '⚡ Double Meat',
    price: 179,
    calories: '890 kcal',
    description: 'Crispy bacon strips AND golden panko pork katsu, garlic rice, egg, and extra cheese drizzle.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=700&q=80',
    tags: ['Super Hungry', 'Double Protein']
  },
  {
    id: 'cheesy-fries',
    name: 'BDC Loaded Cheddar Crinkle Fries',
    category: 'sides',
    badge: '🍟 Irresistible',
    price: 89,
    calories: '480 kcal',
    description: 'Golden crinkle-cut fries seasoned with secret spices, smothered in molten BDC cheese sauce and topped with toasted bacon crunch.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    tags: ['Loaded Fries', 'Bacon Bits']
  },
  {
    id: 'cheese-corndog',
    name: 'Mozzarella Stretch Corndog',
    category: 'sides',
    badge: '🧀 Epic Cheese Pull',
    price: 79,
    calories: '420 kcal',
    description: 'Half mozzarella cheese block, half jumbo sausage coated in crispy panko batter, dusted with sugar and drizzled with BDC cheese sauce.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80',
    tags: ['Cheese Pull', 'Korean Style']
  },
  {
    id: 'cheese-sauce-solo',
    name: 'Extra Tub: Signature Cheese Sauce (4oz)',
    category: 'sides',
    badge: 'Secret Recipe',
    price: 45,
    calories: '180 kcal',
    description: 'Extra cup of our legendary signature BDC cheese sauce—rich, velvety, and made from real premium cheddar blend.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80',
    tags: ['Sauce Lover', 'Dip Everything']
  },
  {
    id: 'calamansi-tea',
    name: 'BDC Calamansi Cold Brew Iced Tea',
    category: 'drinks',
    badge: '🍋 Best Pair with Silog',
    price: 49,
    calories: '110 kcal',
    description: 'Fresh Philippine calamansi blended with brewed Ceylon black tea and a touch of wild honey. Crisp, citrusy, and cuts through the rich cheese.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=80',
    tags: ['Fresh Calamansi', 'Signature Drink']
  },
  {
    id: 'mango-cheesecake-shake',
    name: 'Cheesy Mango Graham Shake (16oz)',
    category: 'drinks',
    badge: '🥭 Decadent',
    price: 89,
    calories: '340 kcal',
    description: 'Sweet ripe Carabao mango puree blended with milk, crushed graham cracker crumbs, and topped with salted cream cheese froth.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=80',
    tags: ['Carabao Mango', 'Graham Crust']
  },
  {
    id: 'blue-lemonade',
    name: 'Big Daddy Neon Blue Lemonade',
    category: 'drinks',
    badge: 'Ice Cold',
    price: 45,
    calories: '120 kcal',
    description: 'Electrifying blue citrus lemonade with crushed ice and fresh mint sprig. Thirst-quenching and Instagrammable!',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    tags: ['Cold Refreshment', 'Citrus']
  }
];

// --- 5-STEP ORDER TRACKING DEFINITIONS ---
const TRACKER_STEPS = [
  {
    step: 1,
    icon: '📝',
    title: '1. Order Confirmed by Store',
    desc: 'Store received your order and queued your cup for the griddle.',
    eta: '15–18 mins'
  },
  {
    step: 2,
    icon: '🍳',
    title: '2. Sizzling on Griddle',
    desc: 'Toasting garlic sinangag rice, searing meats, and frying farm-fresh eggs.',
    eta: '10–14 mins'
  },
  {
    step: 3,
    icon: '🧀',
    title: '3. Smothering Signature Cheese Sauce',
    desc: 'Generously flooding your hot cup with Big Daddy velvety cheddar sauce!',
    eta: '6–9 mins'
  },
  {
    step: 4,
    icon: '🛵',
    title: '4. Out for Delivery / Ready for Pickup',
    desc: 'Your order is packed in a thermal box and on the way to you!',
    eta: '3–5 mins'
  },
  {
    step: 5,
    icon: '🎉',
    title: '5. Order Completed & Delivered',
    desc: 'Order arrived hot and fresh! Dig in and enjoy your Big Daddy Cup.',
    eta: 'Arrived!'
  }
];

// --- PORTAL STATE ---
let selectedBranchKey = localStorage.getItem('bdc_selected_store') || 'mnl-sta-mesa';
let currentCustomer = null;
let storeActiveCategory = 'all';
let storeSearchQuery = '';
let orderMode = 'delivery'; // 'delivery' | 'pickup'
let promoApplied = false;
let customizeProduct = null;
let customizeQty = 1;

// Load or initialize cart
let customerCart = [];
try {
  const savedCart = localStorage.getItem('bdc_customer_cart');
  if (savedCart) {
    customerCart = JSON.parse(savedCart);
  }
} catch (e) {
  customerCart = [];
}

// Default active order
let activeOrder = {
  id: '#BDC-89241',
  branchKey: selectedBranchKey,
  mode: 'delivery',
  statusStep: 3,
  placedAt: 'Just Now',
  payment: 'Cash on Delivery (COD)',
  address: 'Unit 402, Sta. Mesa, Manila (Near V. Mapa LRT2)',
  notes: 'Extra hot cheese sauce on the side.',
  items: [
    { name: 'BDC Bacsilog (Signature)', qty: 2, price: 115, options: 'Extra Cheesy • Runny Sunny' },
    { name: 'BDC Loaded Cheddar Crinkle Fries', qty: 1, price: 89, options: 'Classic Drizzle' },
    { name: 'BDC Calamansi Cold Brew Iced Tea', qty: 2, price: 49, options: '16oz Chilled' }
  ],
  subtotal: 417,
  fee: 49,
  discount: 0,
  total: 466
};

try {
  const savedActiveOrder = localStorage.getItem('bdc_active_order');
  if (savedActiveOrder) {
    activeOrder = JSON.parse(savedActiveOrder);
  }
} catch (e) {}

// Default order history
let orderHistory = [
  {
    id: '#BDC-77401',
    date: 'Oct 28, 2026',
    status: 'Delivered',
    branchName: "Big Daddy's Cup - V. Mapa Sta. Mesa Branch",
    summary: '2x BDC Bacsilog (Signature), 1x Mozzarella Stretch Corndog',
    total: 309,
    primaryItemId: 'bacsilog'
  },
  {
    id: '#BDC-61902',
    date: 'Oct 14, 2026',
    status: 'Delivered',
    branchName: "Big Daddy's Cup - V. Mapa Sta. Mesa Branch",
    summary: '1x BDC Tapsilog Prime, 1x Loaded Cheddar Crinkle Fries',
    total: 218,
    primaryItemId: 'tapsilog'
  },
  {
    id: '#BDC-55811',
    date: 'Sep 30, 2026',
    status: 'Delivered',
    branchName: "Big Daddy's Cup - Flagship Paterno St.",
    summary: '1x BDC Cheesy Sisig Rice Bowl, 2x Calamansi Cold Brew Iced Tea',
    total: 233,
    primaryItemId: 'sisilog'
  }
];

try {
  const savedHistory = localStorage.getItem('bdc_order_history');
  if (savedHistory) {
    orderHistory = JSON.parse(savedHistory);
  }
} catch (e) {}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initCustomerAuth();
  updateStoreDisplay(selectedBranchKey);
  renderStoreProducts();
  renderCustomerCart();
  renderActiveOrderView();
  renderOrderHistoryView();
});

// --- AUTHENTICATION GUARD ---
function initCustomerAuth() {
  const storedUser = localStorage.getItem('bdc_user');
  const lockedView = document.getElementById('customer-locked-screen');
  const portalView = document.getElementById('customer-portal-screen');
  const logoutBtn = document.getElementById('portal-logout-btn');
  const headerCartBtn = document.getElementById('header-cart-btn');

  if (!storedUser) {
    if (lockedView) lockedView.classList.remove('hidden');
    if (portalView) portalView.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (headerCartBtn) headerCartBtn.classList.add('hidden');
    return;
  }

  try {
    currentCustomer = JSON.parse(storedUser);
  } catch (e) {
    localStorage.removeItem('bdc_user');
    if (lockedView) lockedView.classList.remove('hidden');
    if (portalView) portalView.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (headerCartBtn) headerCartBtn.classList.add('hidden');
    return;
  }

  // Authenticated
  if (lockedView) lockedView.classList.add('hidden');
  if (portalView) portalView.classList.remove('hidden');
  if (logoutBtn) logoutBtn.classList.remove('hidden');
  if (headerCartBtn) {
    headerCartBtn.classList.remove('hidden');
    headerCartBtn.classList.add('flex');
  }

  renderCustomerInfo();
  checkPendingItemFromLanding();
}

function renderCustomerInfo() {
  if (!currentCustomer) return;
  const nameEl = document.getElementById('cust-account-name');
  const detailsEl = document.getElementById('cust-account-details');
  const addressInput = document.getElementById('checkout-address');

  if (nameEl) {
    nameEl.innerText = currentCustomer.name || 'Customer';
  }
  if (detailsEl) {
    const contact = currentCustomer.phone || currentCustomer.email || 'Verified Customer';
    detailsEl.innerText = `• ${contact}`;
  }
  if (addressInput && currentCustomer.defaultAddress) {
    addressInput.value = currentCustomer.defaultAddress;
  }
}

// Check if customer clicked "Order Now" on a product on index.html before logging in
function checkPendingItemFromLanding() {
  const pendingItemId = localStorage.getItem('bdc_pending_item');
  if (!pendingItemId) return;

  localStorage.removeItem('bdc_pending_item');
  const product = STORE_PRODUCTS.find(p => p.id === pendingItemId);
  if (product) {
    switchPortalTab('store');
    quickAddProductToCart(product.id);
    setTimeout(() => {
      openCustomizeModal(product.id);
    }, 250);
  }
}

function handleCustomerLoginDirect(e) {
  e.preventDefault();
  const nameInput = document.getElementById('direct-login-name');
  const idInput = document.getElementById('direct-login-identifier');
  const identifier = idInput ? idInput.value.trim() : '';
  const customName = nameInput ? nameInput.value.trim() : '';

  if (!identifier) {
    showToast('Please enter your mobile number or email ✍️');
    return;
  }

  let displayName = customName;
  if (!displayName) {
    if (identifier.includes('@')) {
      const part = identifier.split('@')[0];
      displayName = part.charAt(0).toUpperCase() + part.slice(1);
    } else if (/^\+?\d+$/.test(identifier.replace(/[\s-]/g, ''))) {
      displayName = `Customer (${identifier.slice(-4)})`;
    } else {
      displayName = identifier;
    }
  }

  currentCustomer = {
    name: displayName,
    phone: identifier.includes('@') ? '' : identifier,
    email: identifier.includes('@') ? identifier : '',
    role: 'Customer',
    defaultAddress: 'Unit 402, Sta. Mesa, Manila (Near V. Mapa LRT2)'
  };

  localStorage.setItem('bdc_user', JSON.stringify(currentCustomer));
  showToast(`Welcome, ${currentCustomer.name}! You can now place your order 🧀`);
  initCustomerAuth();
}

function quickDemoCustomerLogin() {
  currentCustomer = {
    name: 'Juan Dela Cruz',
    phone: '+63 917 882 1045',
    email: 'juan@bigdaddyscup.ph',
    role: 'Customer',
    defaultAddress: 'Unit 402, Sta. Mesa, Manila (Near V. Mapa LRT2)'
  };

  localStorage.setItem('bdc_user', JSON.stringify(currentCustomer));
  showToast('Signed in as Juan Dela Cruz! Ready to order 🧀');
  initCustomerAuth();
}

function logoutCustomer() {
  localStorage.removeItem('bdc_user');
  showToast('Logged out of customer account. 👋');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

// --- STORE DISPLAY & SWITCHER ---
function changeSelectedStore(branchKey) {
  if (!STORE_BRANCHES[branchKey]) return;
  selectedBranchKey = branchKey;
  localStorage.setItem('bdc_selected_store', branchKey);
  updateStoreDisplay(branchKey);
  showToast(`Ordering store switched to ${STORE_BRANCHES[branchKey].name} 📍`);
}

function updateStoreDisplay(branchKey) {
  const store = STORE_BRANCHES[branchKey] || STORE_BRANCHES['mnl-sta-mesa'];
  if (!store) return;

  const nameEl = document.getElementById('store-name-display');
  const addressEl = document.getElementById('store-address-display');
  const hoursEl = document.getElementById('store-hours-display');
  const phoneEl = document.getElementById('store-phone-display');
  const badgeEl = document.getElementById('store-status-badge');
  const imgEl = document.getElementById('store-image-display');
  const selectorEl = document.getElementById('store-selector');
  const cartSubtitle = document.getElementById('cart-store-subtitle');

  if (nameEl) nameEl.innerText = store.name;
  if (addressEl) addressEl.innerHTML = `<span>📍</span><span>${store.address}</span>`;
  if (hoursEl) hoursEl.innerText = store.hours;
  if (phoneEl) phoneEl.innerText = store.phone;
  if (badgeEl) badgeEl.innerText = store.status;
  if (imgEl && store.image) imgEl.src = store.image;
  if (selectorEl) selectorEl.value = branchKey;
  if (cartSubtitle) cartSubtitle.innerText = store.shortName;
}

// --- PORTAL NAVIGATION TABS ---
function switchPortalTab(tab) {
  const tabs = ['store', 'active', 'history'];
  const views = {
    store: document.getElementById('view-store-menu'),
    active: document.getElementById('view-active-order'),
    history: document.getElementById('view-order-history')
  };
  const btns = {
    store: document.getElementById('tab-btn-store'),
    active: document.getElementById('tab-btn-active'),
    history: document.getElementById('tab-btn-history')
  };

  tabs.forEach(t => {
    if (views[t]) {
      if (t === tab) {
        views[t].classList.remove('hidden');
      } else {
        views[t].classList.add('hidden');
      }
    }
    if (btns[t]) {
      if (t === tab) {
        btns[t].classList.add('border-amber-500', 'text-amber-800', 'font-black');
        btns[t].classList.remove('border-transparent', 'text-slate-500', 'font-bold');
      } else {
        btns[t].classList.remove('border-amber-500', 'text-amber-800', 'font-black');
        btns[t].classList.add('border-transparent', 'text-slate-500', 'font-bold');
      }
    }
  });
}

// --- STORE PRODUCT CATALOG RENDERING & FILTERING ---
function renderStoreProducts() {
  const grid = document.getElementById('user-products-grid');
  if (!grid) return;

  let filtered = STORE_PRODUCTS;
  if (storeActiveCategory !== 'all') {
    filtered = filtered.filter(p => p.category === storeActiveCategory);
  }
  if (storeSearchQuery.trim() !== '') {
    const q = storeSearchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white border border-amber-200 rounded-3xl p-10 text-center space-y-3 shadow-clean">
        <div class="text-4xl">🧀🔍</div>
        <h4 class="font-display text-lg font-black text-slate-900">No Matching Dishes Found</h4>
        <p class="text-xs text-slate-500">Try clearing your search filter or browsing all categories.</p>
        <button onclick="resetStoreFilters()" class="px-5 py-2 rounded-xl btn-cheese text-xs font-black">
          Show All 16 Dishes
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="bg-white border border-amber-200/90 hover:border-amber-400 rounded-2xl overflow-hidden shadow-clean hover:shadow-cheese transition-all flex flex-col justify-between group">
      <div>
        <!-- Product Image -->
        <div class="relative h-44 w-full overflow-hidden bg-amber-100 border-b border-amber-100">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
          
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm">
            ${item.badge}
          </span>

          <span class="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-amber-900 border border-amber-200 shadow-sm">
            ${item.calories}
          </span>
        </div>

        <!-- Product Info -->
        <div class="p-4">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-display text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
              ${item.name}
            </h4>
            <span class="font-display text-lg font-black text-amber-600 shrink-0">
              ₱${item.price}
            </span>
          </div>

          <p class="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-medium">
            ${item.description}
          </p>

          <div class="flex flex-wrap gap-1 mt-3">
            ${item.tags.map(t => `
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="px-4 pb-4 pt-2 border-t border-amber-100 flex items-center gap-2">
        <button 
          type="button"
          onclick="openCustomizeModal('${item.id}')" 
          class="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all"
          title="Customize Cheese & Egg"
        >
          ⚙️ Customize
        </button>
        <button 
          type="button"
          onclick="quickAddProductToCart('${item.id}')" 
          class="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all"
        >
          <span>+ Add to Cup</span>
        </button>
      </div>
    </div>
  `).join('');
}

function filterStoreCategory(cat, btn) {
  storeActiveCategory = cat;
  const pills = document.querySelectorAll('.store-cat-pill');
  pills.forEach(p => {
    p.className = 'store-cat-pill shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-amber-200 hover:bg-amber-50 transition-all';
  });
  if (btn) {
    btn.className = 'store-cat-pill shrink-0 px-3.5 py-2 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-sm transition-all';
  }
  renderStoreProducts();
}

function handleStoreSearch(val) {
  storeSearchQuery = val;
  renderStoreProducts();
}

function resetStoreFilters() {
  storeActiveCategory = 'all';
  storeSearchQuery = '';
  const searchInput = document.getElementById('store-search-input');
  if (searchInput) searchInput.value = '';
  const firstPill = document.querySelector('.store-cat-pill');
  if (firstPill) filterStoreCategory('all', firstPill);
  renderStoreProducts();
}

// --- PRODUCT CUSTOMIZATION MODAL ---
function openCustomizeModal(itemId) {
  const item = STORE_PRODUCTS.find(p => p.id === itemId);
  if (!item) return;

  customizeProduct = item;
  customizeQty = 1;

  const modal = document.getElementById('customize-modal');
  const content = document.getElementById('customize-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative bg-white">
      <div class="relative h-52 w-full overflow-hidden bg-amber-100 border-b border-amber-200">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
        <button 
          type="button"
          onclick="closeCustomizeModal()" 
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 text-slate-800 hover:text-slate-950 flex items-center justify-center font-bold text-sm shadow"
        >
          ✕
        </button>
        <div class="absolute bottom-3 left-5 right-5 text-white">
          <span class="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">${item.badge}</span>
          <h3 class="font-display text-xl font-black mt-1">${item.name}</h3>
          <p class="text-amber-300 font-black text-base">Base Price: ₱${item.price}</p>
        </div>
      </div>

      <div class="p-5 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
        <p class="text-slate-600 font-medium">${item.description}</p>

        <!-- Cheese Sauce Level -->
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2">
          <label class="font-black text-amber-950 block">🧀 Signature Cheese Sauce Level</label>
          <div class="grid grid-cols-3 gap-2">
            <label class="cursor-pointer bg-white border border-amber-300 rounded-xl p-2.5 flex flex-col gap-0.5">
              <input type="radio" name="cust-cheese" value="Classic Drizzle" data-extra="0" checked onchange="updateCustomizePrice()">
              <span class="font-black text-slate-900 mt-1">Classic</span>
              <span class="text-[10px] text-slate-500">+₱0</span>
            </label>
            <label class="cursor-pointer bg-white border border-amber-300 rounded-xl p-2.5 flex flex-col gap-0.5">
              <input type="radio" name="cust-cheese" value="Extra Cheesy" data-extra="20" onchange="updateCustomizePrice()">
              <span class="font-black text-amber-800 mt-1">Extra Pour</span>
              <span class="text-[10px] text-amber-700 font-bold">+₱20</span>
            </label>
            <label class="cursor-pointer bg-white border border-amber-300 rounded-xl p-2.5 flex flex-col gap-0.5">
              <input type="radio" name="cust-cheese" value="Cheese Flood" data-extra="35" onchange="updateCustomizePrice()">
              <span class="font-black text-red-600 mt-1">Overload</span>
              <span class="text-[10px] text-red-600 font-bold">+₱35</span>
            </label>
          </div>
        </div>

        <!-- Egg Style -->
        <div class="space-y-2">
          <label class="font-black text-slate-900 block">🍳 Egg &amp; Add-On Preference</label>
          <div class="grid grid-cols-2 gap-2">
            <label class="cursor-pointer bg-amber-50/50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
              <input type="radio" name="cust-egg" value="Runny Sunny Egg" data-extra="0" checked onchange="updateCustomizePrice()">
              <span class="font-bold text-slate-800">Runny Sunny (+₱0)</span>
            </label>
            <label class="cursor-pointer bg-amber-50/50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
              <input type="radio" name="cust-egg" value="Well-Done Egg" data-extra="0" onchange="updateCustomizePrice()">
              <span class="font-bold text-slate-800">Well-Done (+₱0)</span>
            </label>
            <label class="cursor-pointer bg-amber-50/50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
              <input type="radio" name="cust-egg" value="Scrambled Egg" data-extra="0" onchange="updateCustomizePrice()">
              <span class="font-bold text-slate-800">Scrambled (+₱0)</span>
            </label>
            <label class="cursor-pointer bg-amber-50/50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
              <input type="radio" name="cust-egg" value="Double Egg Upgrade" data-extra="20" onchange="updateCustomizePrice()">
              <span class="font-bold text-amber-800">Double Egg (+₱20)</span>
            </label>
          </div>
        </div>

        <!-- Quantity & Confirm -->
        <div class="flex items-center gap-3 pt-3 border-t border-amber-200">
          <div class="flex items-center border-2 border-amber-300 rounded-xl bg-white">
            <button type="button" onclick="changeCustomizeQty(-1)" class="w-9 h-9 font-black text-slate-700 hover:text-slate-950">−</button>
            <span id="customize-qty-display" class="w-8 text-center font-black text-sm text-slate-900">1</span>
            <button type="button" onclick="changeCustomizeQty(1)" class="w-9 h-9 font-black text-slate-700 hover:text-slate-950">+</button>
          </div>

          <button 
            type="button"
            onclick="confirmCustomizedItem()" 
            class="flex-1 py-3 px-4 rounded-xl btn-cheese font-black text-xs uppercase tracking-wider shadow-cheese flex items-center justify-center gap-1.5"
          >
            <span>Add to My Cup •</span>
            <span id="customize-total-price">₱${item.price}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCustomizeModal() {
  const modal = document.getElementById('customize-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function changeCustomizeQty(delta) {
  customizeQty = Math.max(1, customizeQty + delta);
  const qtyEl = document.getElementById('customize-qty-display');
  if (qtyEl) qtyEl.innerText = customizeQty;
  updateCustomizePrice();
}

function updateCustomizePrice() {
  if (!customizeProduct) return;
  let unitPrice = customizeProduct.price;

  const cheeseEl = document.querySelector('input[name="cust-cheese"]:checked');
  if (cheeseEl) unitPrice += parseInt(cheeseEl.getAttribute('data-extra') || '0', 10);

  const eggEl = document.querySelector('input[name="cust-egg"]:checked');
  if (eggEl) unitPrice += parseInt(eggEl.getAttribute('data-extra') || '0', 10);

  const totalEl = document.getElementById('customize-total-price');
  if (totalEl) totalEl.innerText = `₱${unitPrice * customizeQty}`;
}

function confirmCustomizedItem() {
  if (!customizeProduct) return;

  const cheeseEl = document.querySelector('input[name="cust-cheese"]:checked');
  const eggEl = document.querySelector('input[name="cust-egg"]:checked');

  const cheeseVal = cheeseEl ? cheeseEl.value : 'Classic Drizzle';
  const cheeseExtra = cheeseEl ? parseInt(cheeseEl.getAttribute('data-extra') || '0', 10) : 0;

  const eggVal = eggEl ? eggEl.value : 'Runny Sunny Egg';
  const eggExtra = eggEl ? parseInt(eggEl.getAttribute('data-extra') || '0', 10) : 0;

  const unitPrice = customizeProduct.price + cheeseExtra + eggExtra;
  const optionsText = `${cheeseVal} • ${eggVal}`;

  addItemToCustomerCart({
    id: customizeProduct.id,
    name: customizeProduct.name,
    image: customizeProduct.image,
    price: unitPrice,
    qty: customizeQty,
    options: optionsText
  });

  closeCustomizeModal();
}

// --- SHOPPING CART & CHECKOUT MANAGEMENT ---
function quickAddProductToCart(itemId) {
  const item = STORE_PRODUCTS.find(p => p.id === itemId);
  if (!item) return;

  addItemToCustomerCart({
    id: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    qty: 1,
    options: 'Classic Drizzle • Standard'
  });
}

function addItemToCustomerCart(newItem) {
  const existing = customerCart.find(
    c => c.id === newItem.id && c.options === newItem.options
  );

  if (existing) {
    existing.qty += newItem.qty;
  } else {
    customerCart.push({
      cartItemId: 'ci-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      ...newItem
    });
  }

  saveCustomerCart();
  renderCustomerCart();
  showToast(`Added ${newItem.qty}x ${newItem.name} to your Order Cup! 🧀`);
}

function updateCartItemQty(cartItemId, delta) {
  const idx = customerCart.findIndex(c => c.cartItemId === cartItemId);
  if (idx === -1) return;

  customerCart[idx].qty += delta;
  if (customerCart[idx].qty <= 0) {
    customerCart.splice(idx, 1);
  }

  saveCustomerCart();
  renderCustomerCart();
}

function clearCustomerCart() {
  if (customerCart.length === 0) return;
  customerCart = [];
  promoApplied = false;
  saveCustomerCart();
  renderCustomerCart();
  showToast('Order cup cleared! 🥣');
}

function saveCustomerCart() {
  localStorage.setItem('bdc_customer_cart', JSON.stringify(customerCart));
}

function setOrderMode(mode) {
  orderMode = mode;
  const delBtn = document.getElementById('mode-btn-delivery');
  const pickBtn = document.getElementById('mode-btn-pickup');
  const addrGroup = document.getElementById('delivery-address-group');

  if (mode === 'delivery') {
    if (delBtn) delBtn.className = 'py-2 rounded-lg bg-amber-500 text-slate-950 font-black shadow-sm transition-all';
    if (pickBtn) pickBtn.className = 'py-2 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition-all';
    if (addrGroup) addrGroup.classList.remove('hidden');
  } else {
    if (pickBtn) pickBtn.className = 'py-2 rounded-lg bg-amber-500 text-slate-950 font-black shadow-sm transition-all';
    if (delBtn) delBtn.className = 'py-2 rounded-lg text-slate-600 hover:text-slate-900 font-bold transition-all';
    if (addrGroup) addrGroup.classList.add('hidden');
  }

  renderCustomerCart();
}

function applyCustomerPromo() {
  const input = document.getElementById('checkout-promo');
  const code = input ? input.value.trim().toUpperCase() : '';

  if (!code) {
    showToast('Enter a promo code like CHEESY15 🏷️');
    return;
  }

  if (code === 'CHEESY15' || code === 'BDCVIP' || code === 'DADDY15') {
    promoApplied = true;
    renderCustomerCart();
    showToast('Promo code applied! You got 15% OFF your order 🎉🧀');
  } else {
    showToast('Invalid promo code. Try CHEESY15 for 15% off! 💡');
  }
}

function renderCustomerCart() {
  const container = document.getElementById('user-cart-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const feeEl = document.getElementById('checkout-delivery-fee');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountEl = document.getElementById('checkout-discount');
  const totalEl = document.getElementById('checkout-grand-total');

  const headerCount = document.getElementById('header-cart-count');
  const headerTotal = document.getElementById('header-cart-total');

  const totalCount = customerCart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = customerCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fee = customerCart.length > 0 ? (orderMode === 'delivery' ? 49 : 0) : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const grandTotal = Math.max(0, subtotal + fee - discount);

  if (headerCount) headerCount.innerText = totalCount;
  if (headerTotal) headerTotal.innerText = `• ₱${grandTotal}`;

  if (!container) return;

  if (customerCart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 px-4 bg-amber-50/40 rounded-2xl border border-dashed border-amber-300">
        <div class="text-3xl mb-1.5">🥣</div>
        <p class="text-xs font-black text-slate-800">Your Order Cup is Empty</p>
        <p class="text-[11px] text-slate-500 mt-0.5">Click "+ Add to Cup" on any dish on the left to start your cheesy order!</p>
      </div>
    `;
  } else {
    container.innerHTML = customerCart.map(item => `
      <div class="flex items-center gap-3 bg-amber-50/60 border border-amber-200 p-2.5 rounded-2xl">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-amber-200">
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-black text-slate-900 truncate">${item.name}</h5>
          <p class="text-[10px] text-amber-800 font-semibold truncate">${item.options}</p>
          <span class="text-xs font-black text-amber-600">₱${item.price * item.qty}</span>
        </div>
        <div class="flex items-center border border-amber-300 rounded-lg bg-white shrink-0">
          <button type="button" onclick="updateCartItemQty('${item.cartItemId}', -1)" class="w-6 h-6 text-xs font-black text-slate-700 hover:text-slate-950">−</button>
          <span class="w-5 text-center text-xs font-black text-slate-900">${item.qty}</span>
          <button type="button" onclick="updateCartItemQty('${item.cartItemId}', 1)" class="w-6 h-6 text-xs font-black text-slate-700 hover:text-slate-950">+</button>
        </div>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.innerText = `₱${subtotal}`;
  if (feeEl) feeEl.innerText = orderMode === 'delivery' ? (customerCart.length > 0 ? '₱49' : '₱0') : 'FREE (Pickup)';
  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountRow.classList.add('flex');
      discountEl.innerText = `-₱${discount}`;
    } else {
      discountRow.classList.add('hidden');
      discountRow.classList.remove('flex');
    }
  }
  if (totalEl) totalEl.innerText = `₱${grandTotal}`;
}

function scrollToCheckoutPanel() {
  switchPortalTab('store');
  const el = document.getElementById('checkout-panel-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- SUBMIT ORDER & TRANSITION TO LIVE TRACKER ---
function submitCustomerOrder() {
  if (customerCart.length === 0) {
    showToast('Please add at least one dish to your Order Cup first! 🧀');
    return;
  }

  const addressInput = document.getElementById('checkout-address');
  const paymentSelect = document.getElementById('checkout-payment');
  const notesInput = document.getElementById('checkout-notes');
  const store = STORE_BRANCHES[selectedBranchKey] || STORE_BRANCHES['mnl-sta-mesa'];

  const addressVal = orderMode === 'delivery'
    ? (addressInput && addressInput.value.trim() ? addressInput.value.trim() : 'Sta. Mesa, Manila')
    : `Store Pickup at ${store.name}`;

  const paymentVal = paymentSelect ? paymentSelect.value : 'Cash on Delivery (COD)';
  const notesVal = notesInput && notesInput.value.trim()
    ? notesInput.value.trim()
    : 'Freshly cooked with signature hot cheddar pour.';

  const subtotal = customerCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fee = orderMode === 'delivery' ? 49 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal + fee - discount);

  const newOrderId = '#BDC-' + Math.floor(10000 + Math.random() * 90000);
  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  activeOrder = {
    id: newOrderId,
    branchKey: selectedBranchKey,
    mode: orderMode,
    statusStep: 1,
    placedAt: `Today at ${nowStr}`,
    payment: paymentVal,
    address: addressVal,
    notes: notesVal,
    items: customerCart.map(c => ({
      name: c.name,
      qty: c.qty,
      price: c.price,
      options: c.options
    })),
    subtotal,
    fee,
    discount,
    total
  };

  localStorage.setItem('bdc_active_order', JSON.stringify(activeOrder));

  // Also add to order history
  const summaryText = customerCart.map(c => `${c.qty}x ${c.name}`).join(', ');
  orderHistory.unshift({
    id: newOrderId,
    date: 'Today • Just Placed',
    status: 'In Progress',
    branchName: store.name,
    summary: summaryText,
    total: total,
    primaryItemId: customerCart[0].id
  });
  localStorage.setItem('bdc_order_history', JSON.stringify(orderHistory));

  // Clear cart
  customerCart = [];
  promoApplied = false;
  saveCustomerCart();
  renderCustomerCart();
  renderActiveOrderView();
  renderOrderHistoryView();

  // Switch to Live Order Status tab
  switchPortalTab('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`Order ${newOrderId} confirmed! Sending to ${store.shortName} kitchen 🍳🧀`);
}

// --- ACTIVE ORDER STATUS TRACKER RENDERING ---
function renderActiveOrderView() {
  if (!activeOrder) return;
  const store = STORE_BRANCHES[activeOrder.branchKey] || STORE_BRANCHES[selectedBranchKey] || STORE_BRANCHES['mnl-sta-mesa'];

  const idEl = document.getElementById('active-order-id');
  const modePill = document.getElementById('active-order-mode-pill');
  const storeTag = document.getElementById('active-order-store-tag');
  const etaEl = document.getElementById('active-order-eta');
  const timeEl = document.getElementById('active-order-time');
  const summaryEl = document.getElementById('active-status-summary');
  const stepsContainer = document.getElementById('tracker-steps-container');

  const itemCountEl = document.getElementById('active-order-item-count');
  const itemsListEl = document.getElementById('active-order-items-list');
  const subtotalEl = document.getElementById('active-order-subtotal');
  const feeEl = document.getElementById('active-order-fee');
  const paymentEl = document.getElementById('active-order-payment');
  const totalEl = document.getElementById('active-order-total');
  const addressEl = document.getElementById('active-order-address');
  const notesEl = document.getElementById('active-order-notes');

  const currentStepObj = TRACKER_STEPS.find(s => s.step === activeOrder.statusStep) || TRACKER_STEPS[0];

  if (idEl) idEl.innerText = activeOrder.id;
  if (modePill) {
    modePill.innerText = activeOrder.mode === 'pickup' ? '🥡 Store Pickup' : '🛵 Delivery';
  }
  if (storeTag) storeTag.innerText = `Fulfilling from: ${store.name}`;
  if (etaEl) etaEl.innerText = currentStepObj.eta;
  if (timeEl) timeEl.innerText = activeOrder.placedAt || 'Placed Today';
  if (summaryEl) {
    summaryEl.innerText = `Step ${activeOrder.statusStep} of 5 • ${currentStepObj.title.replace(/^\d+\.\s*/, '')}`;
  }

  // Render 5-step tracker
  if (stepsContainer) {
    stepsContainer.innerHTML = TRACKER_STEPS.map(s => {
      const isCompleted = s.step < activeOrder.statusStep;
      const isCurrent = s.step === activeOrder.statusStep;

      let circleClasses = 'w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-100 text-slate-400';
      let titleClasses = 'text-sm font-bold text-slate-700';
      let rowOpacity = 'opacity-45';
      let badgeHtml = '';

      if (isCompleted) {
        circleClasses = 'w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-400 text-slate-950 shadow-sm';
        titleClasses = 'text-sm font-bold text-slate-900';
        rowOpacity = '';
        badgeHtml = '<span class="ml-2 text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Done</span>';
      } else if (isCurrent) {
        circleClasses = 'w-10 h-10 rounded-full border-2 border-red-500 bg-red-600 text-white shadow-md animate-pulse';
        titleClasses = 'text-sm font-black text-amber-800';
        rowOpacity = 'bg-amber-50/80 border border-amber-300 p-3 rounded-2xl';
        badgeHtml = '<span class="ml-2 text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">In Progress</span>';
      }

      return `
        <div class="flex items-start gap-4 transition-all ${rowOpacity}">
          <div class="${circleClasses} flex items-center justify-center font-bold text-sm shrink-0">
            ${isCompleted ? '✓' : s.icon}
          </div>
          <div class="flex-1">
            <div class="flex flex-wrap items-center">
              <h5 class="${titleClasses}">${s.title}</h5>
              ${badgeHtml}
            </div>
            <p class="text-xs text-slate-500 font-medium mt-0.5">${s.desc}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render ordered items
  const totalCount = activeOrder.items.reduce((sum, i) => sum + i.qty, 0);
  if (itemCountEl) itemCountEl.innerText = `${totalCount} Item${totalCount === 1 ? '' : 's'}`;

  if (itemsListEl) {
    itemsListEl.innerHTML = activeOrder.items.map(item => `
      <div class="flex items-center justify-between text-xs py-2 border-b border-amber-100 last:border-none">
        <div>
          <span class="font-bold text-slate-900">${item.qty}x ${item.name}</span>
          <p class="text-[11px] text-amber-800 font-semibold">${item.options || 'Standard'}</p>
        </div>
        <span class="font-black text-slate-900">₱${item.price * item.qty}</span>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.innerText = `₱${activeOrder.subtotal}`;
  if (feeEl) feeEl.innerText = activeOrder.fee > 0 ? `₱${activeOrder.fee}` : 'FREE';
  if (paymentEl) paymentEl.innerText = activeOrder.payment;
  if (totalEl) totalEl.innerText = `₱${activeOrder.total}`;
  if (addressEl) addressEl.innerText = activeOrder.address;
  if (notesEl) notesEl.innerText = `Note: ${activeOrder.notes}`;
}

function advanceOrderStatusStep() {
  if (!activeOrder) return;
  if (activeOrder.statusStep < 5) {
    activeOrder.statusStep += 1;
  } else {
    activeOrder.statusStep = 1;
  }

  // Update history status if step 5 reached
  if (activeOrder.statusStep === 5 && orderHistory.length > 0) {
    const match = orderHistory.find(h => h.id === activeOrder.id);
    if (match) {
      match.status = 'Delivered';
      localStorage.setItem('bdc_order_history', JSON.stringify(orderHistory));
      renderOrderHistoryView();
    }
  }

  localStorage.setItem('bdc_active_order', JSON.stringify(activeOrder));
  renderActiveOrderView();

  const stepObj = TRACKER_STEPS.find(s => s.step === activeOrder.statusStep);
  if (stepObj) {
    showToast(`Order ${activeOrder.id}: ${stepObj.title} ${stepObj.icon}`);
  }
}

// --- ORDER HISTORY RENDERING & RE-ORDER ---
function renderOrderHistoryView() {
  const listEl = document.getElementById('order-history-list');
  const countBadge = document.getElementById('history-count-badge');

  if (countBadge) countBadge.innerText = orderHistory.length;
  if (!listEl) return;

  listEl.innerHTML = orderHistory.map(order => `
    <div class="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-clean">
      <div class="space-y-1.5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-black text-amber-700 font-mono">${order.id}</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'} font-bold">
            ${order.status}
          </span>
          <span class="text-xs text-slate-400">• ${order.date}</span>
        </div>
        <h5 class="text-sm font-bold text-slate-900">${order.summary}</h5>
        <p class="text-xs text-slate-500 font-medium">
          Fulfilled by: ${order.branchName} • Total: <span class="font-black text-slate-900">₱${order.total}</span>
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button 
          type="button"
          onclick="reorderFromHistory('${order.primaryItemId || 'bacsilog'}')" 
          class="px-4 py-2.5 rounded-xl btn-cheese text-xs font-black shadow-sm"
        >
          🧀 Re-Order Meal
        </button>
      </div>
    </div>
  `).join('');
}

function reorderFromHistory(itemId) {
  switchPortalTab('store');
  quickAddProductToCart(itemId);
  scrollToCheckoutPanel();
}

// --- OFFICIAL RECEIPT MODAL ---
function openReceiptModal() {
  const modal = document.getElementById('receipt-modal');
  const storeNameEl = document.getElementById('receipt-store-name');
  const orderIdEl = document.getElementById('receipt-order-id');
  const itemsBody = document.getElementById('receipt-items-body');
  const totalEl = document.getElementById('receipt-total');
  const paymentEl = document.getElementById('receipt-payment');

  const store = STORE_BRANCHES[activeOrder.branchKey] || STORE_BRANCHES['mnl-sta-mesa'];

  if (storeNameEl) storeNameEl.innerText = store.name;
  if (orderIdEl) orderIdEl.innerText = `${activeOrder.id} • ${activeOrder.placedAt}`;
  if (itemsBody) {
    itemsBody.innerHTML = activeOrder.items.map(i => `
      <div class="flex justify-between py-1 border-b border-amber-100">
        <span>${i.qty}x ${i.name} <span class="text-slate-400">(${i.options})</span></span>
        <span class="font-bold">₱${i.price * i.qty}</span>
      </div>
    `).join('');
  }
  if (totalEl) totalEl.innerText = `₱${activeOrder.total}`;
  if (paymentEl) paymentEl.innerText = `Payment: ${activeOrder.payment} • ${activeOrder.address}`;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeReceiptModal() {
  const modal = document.getElementById('receipt-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast flex items-center gap-3 bg-white border-2 border-amber-400 text-slate-900 px-4 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-bold';
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">🧀</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
