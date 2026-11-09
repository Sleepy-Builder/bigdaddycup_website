/**
 * BIG DADDY'S CUP (BDC) - LANDING PAGE SCRIPT
 * Handles storefront interactions: Menu filtering, custom cup builder,
 * shopping cart, franchise calculator, and login/auth redirection.
 */

// --- MENU DATABASE ---
const MENU_ITEMS = [
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

// --- STORE BRANCH LOCATIONS ---
const BRANCHES = [
  {
    id: 'tac-paterno',
    city: 'Tacloban City',
    tagline: 'Flagship Store & Dine-In',
    name: 'BDC Flagship - Paterno St.',
    address: 'Paterno Street, Downtown, Tacloban City, Leyte',
    hours: '7:00 AM – 11:00 PM (Daily)',
    phone: '+63 (053) 832-4412',
    delivery: ['Foodpanda', 'GrabFood', 'Store Direct'],
    status: 'Open Now',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Paterno+Street+Downtown+Tacloban+City+Leyte'
  },
  {
    id: 'tac-sagkahan',
    city: 'Tacloban City',
    tagline: 'Astrodome Hub & Takeout',
    name: 'BDC Sagkahan Branch',
    address: 'Sagkahan District, near Astrodome, Tacloban City',
    hours: '8:00 AM – 10:00 PM',
    phone: '+63 917 554 9921',
    delivery: ['Foodpanda', 'Direct Takeout'],
    status: 'Open Now',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Sagkahan+District+Tacloban+City'
  },
  {
    id: 'mnl-sta-mesa',
    city: 'Metro Manila',
    tagline: '24/7 U-Belt Chill Hub',
    name: 'BDC V. Mapa Sta. Mesa (University Belt)',
    address: 'V. Mapa Blvd cor Ramon Magsaysay Blvd, Sta. Mesa, Manila',
    hours: '24 Hours (7 Days)',
    phone: '+63 (02) 8711-2099',
    delivery: ['Foodpanda', 'GrabFood', 'Lalamove Pickup'],
    status: 'Open 24/7',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=V.+Mapa+Blvd+Sta.+Mesa+Manila'
  },
  {
    id: 'mnl-morayta',
    city: 'Metro Manila',
    tagline: 'Near FEU Main Gate',
    name: 'BDC FEU / Morayta U-Belt',
    address: 'Nicanor Reyes St., Sampaloc, Manila',
    hours: '6:30 AM – 12:00 MN',
    phone: '+63 928 411 9302',
    delivery: ['Foodpanda', 'GrabFood'],
    status: 'Open Now',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Nicanor+Reyes+St+Sampaloc+Manila'
  },
  {
    id: 'cebu-talamban',
    city: 'Cebu',
    tagline: 'USC Talamban Food Strip',
    name: 'BDC Talamban University Corner',
    address: 'Gov. M. Cuenco Ave, Talamban, Cebu City',
    hours: '8:00 AM – 11:00 PM',
    phone: '+63 (032) 410-8819',
    delivery: ['Foodpanda', 'Maxim', 'Store Pickup'],
    status: 'Open Now',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Gov+M+Cuenco+Ave+Talamban+Cebu+City'
  },
  {
    id: 'bulacan-malolos',
    city: 'Bulacan',
    tagline: 'MacArthur Highway Pitstop',
    name: 'BDC Malolos Crossing',
    address: 'MacArthur Highway, Malolos City, Bulacan',
    hours: '8:00 AM – 10:00 PM',
    phone: '+63 915 220 1888',
    delivery: ['Foodpanda', 'GrabFood'],
    status: 'Open Now',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=MacArthur+Highway+Malolos+Bulacan'
  }
];

// --- LANDING STATE ---
const LandingState = {
  cart: [],
  orderType: 'delivery',
  appliedPromo: null,
  activeFilter: 'all',
  searchQuery: '',
  selectedProduct: null,
  customCup: {
    rice: 'garlic',
    protein: 'bacon',
    egg: 'sunny',
    cheeseLevel: 'generous',
    addons: []
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderBranches();
  updateCartBadge();
  setupEventListeners();
  updateCustomCupPreview();
  initFranchiseCalculator();
  checkAuthStatus();

  // If redirected with ?login=true, auto-open login modal
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('login') === 'true') {
    openLoginModal();
  }
});

// --- AUTHENTICATION & LOGIN ---
function checkAuthStatus() {
  const storedUser = localStorage.getItem('bdc_user');
  const loginBtn = document.getElementById('nav-login-btn');
  const userPill = document.getElementById('nav-user-pill');
  const navUserName = document.getElementById('nav-user-name');

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (loginBtn) loginBtn.classList.add('hidden');
      if (userPill) {
        userPill.classList.remove('hidden');
        userPill.classList.add('flex');
      }
      if (navUserName) {
        navUserName.innerText = user.name.split(' ')[0];
      }
    } catch (e) {
      localStorage.removeItem('bdc_user');
    }
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (userPill) {
      userPill.classList.add('hidden');
      userPill.classList.remove('flex');
    }
  }
}

function openLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function switchAuthTab(tab) {
  const signinBtn = document.getElementById('auth-tab-signin');
  const signupBtn = document.getElementById('auth-tab-signup');
  if (tab === 'signin') {
    signinBtn.classList.add('bg-amber-500', 'text-slate-950', 'font-black');
    signinBtn.classList.remove('text-slate-600');
    signupBtn.classList.remove('bg-amber-500', 'text-slate-950', 'font-black');
    signupBtn.classList.add('text-slate-600');
  } else {
    signupBtn.classList.add('bg-amber-500', 'text-slate-950', 'font-black');
    signupBtn.classList.remove('text-slate-600');
    signinBtn.classList.remove('bg-amber-500', 'text-slate-950', 'font-black');
    signinBtn.classList.add('text-slate-600');
    showToast('New Customer Registration active — enter details below! 📝');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const identifier = document.getElementById('login-identifier')?.value.trim();
  if (!identifier) {
    showToast('Please enter your mobile number or email ✍️');
    return;
  }

  // Determine customer display name cleanly
  let displayName = 'Customer';
  if (identifier.includes('@')) {
    const userPart = identifier.split('@')[0];
    displayName = userPart.charAt(0).toUpperCase() + userPart.slice(1);
  } else if (/^\+?\d+$/.test(identifier.replace(/[\s-]/g, ''))) {
    displayName = `Customer (${identifier.slice(-4)})`;
  } else {
    displayName = identifier;
  }

  const user = {
    name: displayName,
    phone: identifier.includes('@') ? '' : identifier,
    email: identifier.includes('@') ? identifier : '',
    role: 'Customer',
    defaultAddress: 'Sta. Mesa, Manila (Near V. Mapa)'
  };

  localStorage.setItem('bdc_user', JSON.stringify(user));
  closeLoginModal();
  showToast(`Welcome, ${user.name}! Opening your customer account... 🧀`);

  setTimeout(() => {
    window.location.href = 'user.html';
  }, 500);
}

function quickDemoLogin() {
  const user = {
    name: 'Juan Dela Cruz (Demo)',
    phone: '+63 917 882 1045',
    email: 'demo@bigdaddyscup.ph',
    role: 'Customer',
    defaultAddress: 'Unit 402, Sta. Mesa, Manila (Near V. Mapa LRT2)'
  };

  localStorage.setItem('bdc_user', JSON.stringify(user));
  closeLoginModal();
  showToast('Logged in as Juan Dela Cruz (Demo Account)! Opening Customer Store... 🧀');

  setTimeout(() => {
    window.location.href = 'user.html';
  }, 350);
}

function logoutUser() {
  localStorage.removeItem('bdc_user');
  checkAuthStatus();
  showToast('Logged out of Big Daddy\'s Cup. See you soon! 👋');
}

function goToUserPageOrLogin() {
  const storedUser = localStorage.getItem('bdc_user');
  if (storedUser) {
    window.location.href = 'user.html';
  } else {
    showToast('Please log in first to view your orders & loyalty account 🔒');
    openLoginModal();
  }
}

// --- MENU RENDERING ---
function renderMenu() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  let items = MENU_ITEMS;
  if (LandingState.activeFilter !== 'all') {
    items = items.filter(i => i.category === LandingState.activeFilter);
  }
  if (LandingState.searchQuery.trim() !== '') {
    const q = LandingState.searchQuery.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-white rounded-3xl border border-amber-200 p-8 shadow-clean">
        <div class="text-5xl mb-3">🧀🍳</div>
        <h4 class="text-xl font-black text-slate-900">No cheesy meals found!</h4>
        <p class="text-slate-500 text-sm mt-1">Try another search or browse all categories.</p>
        <button onclick="clearMenuFilters()" class="mt-4 px-6 py-2.5 rounded-xl btn-cheese text-xs font-black">
          View All Items
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="food-card flex flex-col justify-between group">
      <div>
        <div class="relative overflow-hidden aspect-[4/3] rounded-t-2xl border-b border-amber-100">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"></div>
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1">
            <span class="px-2.5 py-1 text-xs font-black rounded-lg shadow-sm bg-amber-400 text-slate-950">
              ${item.badge}
            </span>
          </div>

          <div class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-800 shadow-sm border border-amber-200">
            ${item.calories}
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <h3 class="font-display text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
              ${item.name}
            </h3>
            <span class="font-display text-xl font-black text-amber-600 shrink-0">
              ₱${item.price}
            </span>
          </div>

          <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
            ${item.description}
          </p>

          <div class="flex flex-wrap gap-1.5 pt-3 border-t border-amber-100">
            ${item.tags.map(tag => `
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                ${tag}
              </span>
            `).join('')}
          </div>

          <button 
            type="button"
            onclick="handleLandingOrderClick('${item.id}')"
            class="w-full mt-4 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>🧀 Order Now</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleLandingOrderClick(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (item) {
    localStorage.setItem('bdc_pending_item', item.id);
  }
  const storedUser = localStorage.getItem('bdc_user');
  if (!storedUser) {
    showToast(`Please log in first to order ${item ? item.name : 'from our menu'}! 🔒🧀`);
    openLoginModal();
  } else {
    showToast(`Opening Customer Store to order ${item ? item.name : ''}... 🧀`);
    setTimeout(() => {
      window.location.href = 'user.html';
    }, 300);
  }
}

function filterCategory(cat, element) {
  LandingState.activeFilter = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('bg-amber-500', 'text-slate-950', 'font-black');
    btn.classList.add('bg-white', 'text-slate-700', 'border-amber-200');
  });
  if (element) {
    element.classList.remove('bg-white', 'text-slate-700', 'border-amber-200');
    element.classList.add('bg-amber-500', 'text-slate-950', 'font-black');
  }
  renderMenu();
}

function handleSearch(e) {
  LandingState.searchQuery = e.target.value;
  renderMenu();
}

function clearMenuFilters() {
  LandingState.activeFilter = 'all';
  LandingState.searchQuery = '';
  const searchInput = document.getElementById('menu-search');
  if (searchInput) searchInput.value = '';
  const allBtn = document.querySelector('.cat-pill');
  if (allBtn) filterCategory('all', allBtn);
  renderMenu();
}

// --- ITEM CUSTOMIZATION MODAL ---
let modalQtyCount = 1;
function openItemModal(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  LandingState.selectedProduct = item;
  modalQtyCount = 1;
  const modal = document.getElementById('product-modal');
  const container = document.getElementById('product-modal-content');

  container.innerHTML = `
    <div class="relative bg-white">
      <div class="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl border-b border-amber-200">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
        <button 
          onclick="closeItemModal()" 
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-slate-950 border border-amber-200 shadow font-bold"
        >
          ✕
        </button>
        <div class="absolute bottom-4 left-6 right-6">
          <span class="inline-block px-3 py-1 text-xs font-black rounded-lg bg-amber-400 text-slate-950 mb-2 shadow-sm">
            ${item.badge}
          </span>
          <h2 class="text-2xl font-black font-display text-white">${item.name}</h2>
          <p class="text-xl font-black text-amber-300 mt-1">₱${item.price}</p>
        </div>
      </div>

      <div class="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
        <p class="text-sm text-slate-600 leading-relaxed font-medium">${item.description}</p>

        <div class="bg-amber-50 border border-amber-300 rounded-2xl p-4">
          <label class="block text-sm font-black text-amber-950 mb-2 flex items-center gap-2">
            <span>🧀 Drown in Cheese Sauce Level</span>
            <span class="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">BDC Signature</span>
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2" id="modal-cheese-options">
            <label class="cursor-pointer border-2 border-amber-500 bg-white rounded-xl p-3 flex flex-col items-start gap-1 shadow-sm">
              <input type="radio" name="modal-cheese" value="Classic Drizzle" checked class="text-amber-500" onchange="updateModalPrice()">
              <span class="text-xs font-black text-slate-900 mt-1">Classic Drizzle</span>
              <span class="text-[11px] text-slate-500 font-medium">+₱0</span>
            </label>
            <label class="cursor-pointer border border-amber-200 bg-white rounded-xl p-3 flex flex-col items-start gap-1 hover:border-amber-400">
              <input type="radio" name="modal-cheese" value="Extra Cheese" class="text-amber-500" onchange="updateModalPrice()">
              <span class="text-xs font-black text-amber-700 mt-1">Extra Cheesy</span>
              <span class="text-[11px] text-amber-600 font-bold">+₱20 (Double pour)</span>
            </label>
            <label class="cursor-pointer border border-amber-200 bg-white rounded-xl p-3 flex flex-col items-start gap-1 hover:border-amber-400">
              <input type="radio" name="modal-cheese" value="Cheese Niagara" class="text-amber-500" onchange="updateModalPrice()">
              <span class="text-xs font-black text-amber-800 mt-1">Cheese Flood</span>
              <span class="text-[11px] text-amber-700 font-bold">+₱35 (Overflow)</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-black text-slate-900 mb-2">🍳 Egg Cooking Preference</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <label class="cursor-pointer border-2 border-amber-500 bg-amber-50/60 p-2.5 rounded-xl flex items-center gap-2 shadow-sm">
              <input type="radio" name="modal-egg" value="Sunny-Side Runny" checked class="text-amber-500" onchange="updateModalPrice()">
              <span class="font-bold text-slate-900">Runny Sunny</span>
            </label>
            <label class="cursor-pointer border border-slate-200 bg-white p-2.5 rounded-xl flex items-center gap-2 hover:border-amber-300">
              <input type="radio" name="modal-egg" value="Well Done Fried" class="text-amber-500" onchange="updateModalPrice()">
              <span class="font-semibold text-slate-700">Well Done</span>
            </label>
            <label class="cursor-pointer border border-slate-200 bg-white p-2.5 rounded-xl flex items-center gap-2 hover:border-amber-300">
              <input type="radio" name="modal-egg" value="Scrambled" class="text-amber-500" onchange="updateModalPrice()">
              <span class="font-semibold text-slate-700">Scrambled</span>
            </label>
            <label class="cursor-pointer border border-slate-200 bg-white p-2.5 rounded-xl flex items-center gap-2 hover:border-amber-300">
              <input type="radio" name="modal-egg" value="Double Egg" class="text-amber-500" onchange="updateModalPrice()">
              <span class="font-bold text-amber-700">Double (+₱20)</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-black text-slate-900 mb-1.5">Special Notes</label>
          <input 
            type="text" 
            id="modal-notes" 
            placeholder="e.g. Extra garlic, chili on the side" 
            class="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-semibold"
          />
        </div>

        <div class="flex items-center gap-4 pt-3 border-t border-amber-200">
          <div class="flex items-center border-2 border-amber-300 rounded-xl bg-white shadow-sm">
            <button onclick="decrementModalQty()" class="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold">−</button>
            <span id="modal-qty" class="w-8 text-center text-sm font-black text-slate-900">1</span>
            <button onclick="incrementModalQty()" class="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold">+</button>
          </div>
          <button 
            onclick="addCustomizedToCart()" 
            class="flex-1 py-3 px-6 rounded-xl btn-cheese font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cheese"
          >
            <span>Add to Cart • </span>
            <span id="modal-total-btn-price">₱${item.price}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function incrementModalQty() {
  modalQtyCount++;
  document.getElementById('modal-qty').innerText = modalQtyCount;
  updateModalPrice();
}

function decrementModalQty() {
  if (modalQtyCount > 1) {
    modalQtyCount--;
    document.getElementById('modal-qty').innerText = modalQtyCount;
    updateModalPrice();
  }
}

function updateModalPrice() {
  if (!LandingState.selectedProduct) return;
  let base = LandingState.selectedProduct.price;
  
  const cheeseRadios = document.querySelector('input[name="modal-cheese"]:checked');
  if (cheeseRadios && cheeseRadios.value === 'Extra Cheese') base += 20;
  if (cheeseRadios && cheeseRadios.value === 'Cheese Niagara') base += 35;

  const eggRadios = document.querySelector('input[name="modal-egg"]:checked');
  if (eggRadios && eggRadios.value === 'Double Egg') base += 20;

  const total = base * modalQtyCount;
  const btnPrice = document.getElementById('modal-total-btn-price');
  if (btnPrice) btnPrice.innerText = `₱${total}`;
}

function closeItemModal() {
  modalQtyCount = 1;
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function addCustomizedToCart() {
  if (!LandingState.selectedProduct) return;

  const cheese = document.querySelector('input[name="modal-cheese"]:checked')?.value || 'Classic Drizzle';
  const egg = document.querySelector('input[name="modal-egg"]:checked')?.value || 'Runny Sunny';
  const notes = document.getElementById('modal-notes')?.value || '';

  let finalPrice = LandingState.selectedProduct.price;
  if (cheese === 'Extra Cheese') finalPrice += 20;
  if (cheese === 'Cheese Niagara') finalPrice += 35;
  if (egg === 'Double Egg') finalPrice += 20;

  const cartItem = {
    cartId: 'item-' + Date.now(),
    productId: LandingState.selectedProduct.id,
    name: LandingState.selectedProduct.name,
    image: LandingState.selectedProduct.image,
    price: finalPrice,
    quantity: modalQtyCount,
    options: `${cheese} • ${egg}${notes ? ' • ' + notes : ''}`
  };

  LandingState.cart.push(cartItem);
  closeItemModal();
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added ${cartItem.quantity}x ${cartItem.name} to your cup! 🧀`);
}

function quickAddToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const existing = LandingState.cart.find(c => c.productId === itemId && c.options === 'Classic Drizzle • Runny Sunny');
  if (existing) {
    existing.quantity += 1;
  } else {
    LandingState.cart.push({
      cartId: 'item-' + Date.now(),
      productId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
      options: 'Classic Drizzle • Runny Sunny'
    });
  }

  updateCartBadge();
  renderCartDrawer();
  showToast(`Added ${item.name} to cart! 🍳`);
}

// --- CART DRAWER & CHECKOUT ---
function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer.classList.contains('translate-x-full')) {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    renderCartDrawer();
  } else {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
  }
}

function updateCartBadge() {
  const count = LandingState.cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const badge = document.getElementById('cart-badge');
  const navTotal = document.getElementById('nav-cart-total');

  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  const subtotal = LandingState.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  if (navTotal) {
    navTotal.innerText = `₱${subtotal}`;
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const deliveryFeeEl = document.getElementById('cart-delivery-fee');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount-amount');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (!container) return;

  if (LandingState.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20 px-6">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-sm">
          🥣
        </div>
        <h4 class="font-display font-black text-lg text-slate-900">Your Cup is Empty</h4>
        <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto font-medium">
          Explore our signature Bacsilog and cheesy bowls to fill your cravings!
        </p>
        <button onclick="toggleCart()" class="mt-6 px-6 py-2.5 rounded-xl btn-cheese text-xs font-black">
          Explore Menu
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = '₱0';
    if (grandTotalEl) grandTotalEl.innerText = '₱0';
    return;
  }

  container.innerHTML = LandingState.cart.map(item => `
    <div class="flex gap-3 bg-amber-50/60 border border-amber-200 p-3 rounded-2xl items-center shadow-sm">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl shrink-0 border border-amber-100">
      
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-black text-slate-900 truncate">${item.name}</h5>
        <p class="text-[11px] text-amber-800 truncate mt-0.5 font-semibold">${item.options}</p>
        <p class="text-xs font-black text-amber-600 mt-1">₱${item.price}</p>
      </div>

      <div class="flex flex-col items-end gap-2 shrink-0">
        <button onclick="removeCartItem('${item.cartId}')" class="text-slate-400 hover:text-red-500 text-xs font-bold">
          ✕
        </button>
        <div class="flex items-center border border-amber-300 rounded-lg bg-white shadow-sm">
          <button onclick="changeCartQty('${item.cartId}', -1)" class="w-6 h-6 flex items-center justify-center text-xs text-slate-700 font-bold hover:text-slate-950">−</button>
          <span class="w-6 text-center text-xs font-black text-slate-900">${item.quantity}</span>
          <button onclick="changeCartQty('${item.cartId}', 1)" class="w-6 h-6 flex items-center justify-center text-xs text-slate-700 font-bold hover:text-slate-950">+</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = LandingState.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = LandingState.orderType === 'delivery' ? (subtotal > 0 ? 49 : 0) : 0;
  
  let discount = 0;
  if (LandingState.appliedPromo) {
    if (LandingState.appliedPromo.type === 'percent') {
      discount = Math.round(subtotal * LandingState.appliedPromo.value);
    } else if (LandingState.appliedPromo.type === 'fixed') {
      discount = LandingState.appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  if (subtotalEl) subtotalEl.innerText = `₱${subtotal}`;
  if (deliveryFeeEl) deliveryFeeEl.innerText = LandingState.orderType === 'delivery' ? `₱${deliveryFee}` : 'FREE (Pickup)';
  
  if (discountRow) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.innerText = `-₱${discount}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (grandTotalEl) grandTotalEl.innerText = `₱${grandTotal}`;
}

function changeCartQty(cartId, delta) {
  const item = LandingState.cart.find(c => c.cartId === cartId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    LandingState.cart = LandingState.cart.filter(c => c.cartId !== cartId);
  }
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(cartId) {
  LandingState.cart = LandingState.cart.filter(c => c.cartId !== cartId);
  updateCartBadge();
  renderCartDrawer();
  showToast('Item removed from cart');
}

function setOrderType(type) {
  LandingState.orderType = type;
  const deliveryBtn = document.getElementById('order-type-delivery');
  const pickupBtn = document.getElementById('order-type-pickup');

  if (type === 'delivery') {
    deliveryBtn?.classList.add('btn-cheese');
    deliveryBtn?.classList.remove('text-slate-600');
    pickupBtn?.classList.remove('btn-cheese');
    pickupBtn?.classList.add('text-slate-600');
  } else {
    pickupBtn?.classList.add('btn-cheese');
    pickupBtn?.classList.remove('text-slate-600');
    deliveryBtn?.classList.remove('btn-cheese');
    deliveryBtn?.classList.add('text-slate-600');
  }

  renderCartDrawer();
}

function applyPromoCode() {
  const input = document.getElementById('promo-input');
  const code = input?.value.trim().toUpperCase();

  if (!code) {
    showToast('Please enter a voucher code');
    return;
  }

  if (code === 'CHEESYFIRST' || code === 'FIRST15') {
    LandingState.appliedPromo = { code, type: 'percent', value: 0.15 };
    showToast('Success! 15% discount applied! 🎉');
  } else if (code === 'BIGDADDY' || code === 'BIGDADDY50') {
    LandingState.appliedPromo = { code, type: 'fixed', value: 50 };
    showToast('Success! ₱50 discount applied! 🧀');
  } else if (code === 'FREESHIP') {
    LandingState.appliedPromo = { code, type: 'fixed', value: 49 };
    showToast('Free delivery coupon activated! 🛵');
  } else {
    showToast('Invalid coupon. Try "CHEESYFIRST" or "BIGDADDY"');
  }

  renderCartDrawer();
}

function proceedToCheckout() {
  if (LandingState.cart.length === 0) {
    showToast('Your cart is empty! Add some cheesy meals first.');
    return;
  }
  const checkoutModal = document.getElementById('checkout-modal');
  toggleCart();
  checkoutModal.classList.remove('hidden');
  checkoutModal.classList.add('flex');
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.classList.add('hidden');
  checkoutModal.classList.remove('flex');
}

function confirmOrder() {
  const orderNum = 'BDC-' + Math.floor(10000 + Math.random() * 90000);
  
  const newOrder = {
    id: orderNum,
    createdAt: 'Just now',
    items: [...LandingState.cart],
    total: document.getElementById('cart-grand-total')?.innerText || '₱320',
    statusStep: 1,
    rider: {
      name: 'Kuya Arnel Santos',
      vehicle: 'Yamaha Mio 125 (Plate: 402-KRT)',
      phone: '+63 917 555 8192',
      rating: '4.98 ★ (2,100 deliveries)',
      etaMinutes: 20
    }
  };

  localStorage.setItem('bdc_active_order', JSON.stringify(newOrder));
  
  // Ensure user profile exists
  let user = localStorage.getItem('bdc_user');
  if (!user) {
    user = {
      name: 'Customer',
      phone: '',
      email: 'customer@bigdaddyscup.ph',
      role: 'Customer',
      defaultAddress: 'Sta. Mesa, Manila (Near V. Mapa)'
    };
    localStorage.setItem('bdc_user', JSON.stringify(user));
  }

  LandingState.cart = [];
  updateCartBadge();
  closeCheckoutModal();

  const successModal = document.getElementById('order-success-modal');
  const successOrderNum = document.getElementById('success-order-id');
  if (successOrderNum) successOrderNum.innerText = orderNum;

  successModal.classList.remove('hidden');
  successModal.classList.add('flex');
  showToast(`Order #${orderNum} placed successfully! 🧀`);
}

function closeSuccessModalAndTrack() {
  window.location.href = 'user.html';
}

// --- "BUILD YOUR OWN DADDY CUP" CONFIGURATOR ---
function updateCustomCupOption(category, value) {
  LandingState.customCup[category] = value;
  updateCustomCupPreview();
}

function updateCustomCupPreview() {
  let basePrice = 99;
  if (LandingState.customCup.rice === 'kimchi') basePrice += 15;
  if (LandingState.customCup.protein === 'tapa' || LandingState.customCup.protein === 'katsu') basePrice += 30;
  if (LandingState.customCup.protein === 'hungarian' || LandingState.customCup.protein === 'sisig') basePrice += 35;
  if (LandingState.customCup.protein === 'bacon') basePrice += 20;
  if (LandingState.customCup.egg === 'double') basePrice += 20;
  if (LandingState.customCup.cheeseLevel === 'generous') basePrice += 20;
  if (LandingState.customCup.cheeseLevel === 'niagara') basePrice += 35;

  const total = basePrice;
  const priceDisplay = document.getElementById('builder-total-price');
  if (priceDisplay) priceDisplay.innerText = `₱${total}`;

  const riceDesc = document.getElementById('builder-rice-summary');
  const meatDesc = document.getElementById('builder-meat-summary');
  const cheeseDesc = document.getElementById('builder-cheese-summary');
  const previewSauceDrip = document.getElementById('builder-svg-cheese-drip');

  if (riceDesc) {
    const riceNames = { garlic: 'Toasted Garlic Sinangag', butter: 'Golden Butter Rice', kimchi: 'Spicy Kimchi Rice' };
    riceDesc.innerText = riceNames[LandingState.customCup.rice];
  }

  if (meatDesc) {
    const meatNames = {
      bacon: 'Crispy Honey Bacon',
      tapa: 'Marinated Beef Tapa',
      katsu: 'Crispy Pork Katsu',
      hungarian: 'Smoked Hungarian Sausage',
      sisig: 'Crispy Sizzling Sisig',
      nuggets: 'Golden Chicken Nuggets'
    };
    meatDesc.innerText = meatNames[LandingState.customCup.protein];
  }

  if (cheeseDesc) {
    const cheeseNames = {
      regular: 'Standard Cheddar Drizzle',
      generous: 'Extra Cheesy Lava (Double Pour)',
      niagara: 'Cheesy Niagara Falls (Total Immersion)'
    };
    cheeseDesc.innerText = cheeseNames[LandingState.customCup.cheeseLevel];
  }

  if (previewSauceDrip) {
    if (LandingState.customCup.cheeseLevel === 'regular') {
      previewSauceDrip.style.opacity = '0.75';
      previewSauceDrip.style.transform = 'scaleY(0.7)';
    } else if (LandingState.customCup.cheeseLevel === 'generous') {
      previewSauceDrip.style.opacity = '0.95';
      previewSauceDrip.style.transform = 'scaleY(1.0)';
    } else {
      previewSauceDrip.style.opacity = '1';
      previewSauceDrip.style.transform = 'scaleY(1.35)';
    }
  }
}

function addCustomCupToCart() {
  const meatNames = {
    bacon: 'Bacon',
    tapa: 'Beef Tapa',
    katsu: 'Pork Katsu',
    hungarian: 'Hungarian Sausage',
    sisig: 'Sisig',
    nuggets: 'Nuggets'
  };

  const totalStr = document.getElementById('builder-total-price')?.innerText.replace('₱', '') || '139';
  const price = parseInt(totalStr);

  const customItem = {
    cartId: 'custom-' + Date.now(),
    productId: 'custom-cup',
    name: `Custom Daddy Cup (${meatNames[LandingState.customCup.protein]})`,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    price: price,
    quantity: 1,
    options: `${LandingState.customCup.rice} rice • ${LandingState.customCup.egg} egg • ${LandingState.customCup.cheeseLevel} cheese`
  };

  LandingState.cart.push(customItem);
  updateCartBadge();
  renderCartDrawer();
  toggleCart();
  showToast('Custom Daddy Cup added to your order! 🧀🏆');
}

// --- BRANCH LOCATOR ---
function renderBranches() {
  const grid = document.getElementById('branches-grid');
  if (!grid) return;

  grid.innerHTML = BRANCHES.map(b => `
    <div data-city="${b.city}" class="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 snap-start bg-white border border-amber-200/90 hover:border-amber-400 rounded-2xl overflow-hidden shadow-clean hover:shadow-cheese transition-all duration-300 flex flex-col group">
      <!-- Store Image & Floating Badges -->
      <div class="relative h-48 w-full overflow-hidden bg-amber-100">
        <img 
          src="${b.image}" 
          alt="${b.name}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'"
        >
        <!-- Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30 pointer-events-none"></div>

        <!-- City Badge (Top Left) -->
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
            <svg class="w-3 h-3 text-slate-950" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
            ${b.city}
          </span>
        </div>

        <!-- Open Status Badge (Top Right) -->
        <div class="absolute top-3 right-3">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm text-emerald-800 shadow-md flex items-center gap-1.5 border border-emerald-300">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ${b.status}
          </span>
        </div>

        <!-- Tagline & Google Maps Button (Bottom Over Image) -->
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span class="text-[11px] font-bold text-amber-200 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-amber-400/30 truncate">
            ${b.tagline}
          </span>
          <a 
            href="${b.mapUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="shrink-0 text-[10px] font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow transition-all"
            title="Open in Google Maps"
          >
            <span>Map</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>

      <!-- Store Details & Action Buttons -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 class="font-display font-black text-base sm:text-lg text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
            ${b.name}
          </h4>
          <p class="text-xs text-slate-600 mt-2 flex items-start gap-2 font-medium">
            <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
            <span class="line-clamp-2">${b.address}</span>
          </p>
        </div>

        <!-- Hours & Contact Info -->
        <div class="text-xs text-slate-600 space-y-1.5 font-medium bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
          <div class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${b.hours}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <a href="tel:${b.phone.replace(/[^0-9+]/g, '')}" class="font-bold text-slate-800 hover:text-amber-700 transition-colors">${b.phone}</a>
          </div>
        </div>

        <div>
          <!-- Delivery Partners -->
          <div class="flex flex-wrap items-center gap-1.5 pt-3 border-t border-amber-100">
            <span class="text-[10px] text-slate-500 font-semibold mr-1">Delivery:</span>
            ${b.delivery.map(d => `
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100/70 text-amber-900 border border-amber-200">
                ${d}
              </span>
            `).join('')}
          </div>

          <!-- Order from this branch button -->
          <button 
            type="button"
            onclick="selectBranchForOrdering('${b.id}')"
            class="w-full mt-3.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span>🧀 Order From This Branch</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function scrollBranchRow(direction) {
  const grid = document.getElementById('branches-grid');
  if (!grid) return;
  const cardWidth = 380;
  grid.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

function filterBranchCity(city, btn) {
  if (btn) {
    const buttons = document.querySelectorAll('#branch-filters button');
    buttons.forEach(b => {
      b.className = 'px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50 font-bold transition-all';
    });
    btn.className = 'px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black shadow-sm transition-all';
  }

  const cards = document.querySelectorAll('#branches-grid > div');
  cards.forEach(card => {
    if (city === 'all') {
      card.style.display = 'flex';
    } else {
      const cardCity = card.getAttribute('data-city') || '';
      const match = cardCity.toLowerCase().includes(city.toLowerCase()) || 
                    card.innerText.toLowerCase().includes(city.toLowerCase());
      card.style.display = match ? 'flex' : 'none';
    }
  });

  const grid = document.getElementById('branches-grid');
  if (grid) {
    grid.scrollTo({ left: 0, behavior: 'smooth' });
  }
}

function selectBranchForOrdering(branchId) {
  const branch = BRANCHES.find(b => b.id === branchId);
  if (!branch) return;
  localStorage.setItem('bdc_selected_store', branchId);
  
  const storedUser = localStorage.getItem('bdc_user');
  if (!storedUser) {
    showToast(`Selected ${branch.name}! Please log in first before you can order 🔒🧀`);
    openLoginModal();
  } else {
    showToast(`Selected ${branch.name}! Opening Customer Store... 🧀`);
    setTimeout(() => {
      window.location.href = 'user.html';
    }, 300);
  }
}

// --- FRANCHISE ROI CALCULATOR ---
function initFranchiseCalculator() {
  const slider = document.getElementById('cups-sold-slider');
  const countDisplay = document.getElementById('cups-count-display');
  const monthlyRevenue = document.getElementById('roi-revenue');
  const monthlyNet = document.getElementById('roi-net-profit');
  const paybackTime = document.getElementById('roi-payback');

  if (!slider) return;

  const updateROI = () => {
    const cupsPerDay = parseInt(slider.value);
    if (countDisplay) countDisplay.innerText = `${cupsPerDay} cups / day`;

    const avgPrice = 125;
    const foodCostRatio = 0.38;
    const daysInMonth = 30;

    const grossRevenue = cupsPerDay * avgPrice * daysInMonth;
    const foodCost = grossRevenue * foodCostRatio;
    const overhead = 35000;
    const netProfit = grossRevenue - foodCost - overhead;

    const franchiseCost = 280000;
    const paybackMonths = Math.max(2.5, (franchiseCost / Math.max(10000, netProfit))).toFixed(1);

    if (monthlyRevenue) monthlyRevenue.innerText = `₱${grossRevenue.toLocaleString()}`;
    if (monthlyNet) monthlyNet.innerText = `₱${netProfit.toLocaleString()}`;
    if (paybackTime) paybackTime.innerText = `${paybackMonths} Months`;
  };

  slider.addEventListener('input', updateROI);
  updateROI();
}

function submitFranchiseInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('franchise-name')?.value;
  const location = document.getElementById('franchise-location')?.value;
  showToast(`Thank you ${name}! Our franchise manager will contact you about the ${location} branch opportunity within 24 hours. 📈`);
  e.target.reset();
}

// --- CHEESE POUR SLIDER ---
function setupCheeseSlider() {
  const slider = document.getElementById('cheese-pour-range');
  const label = document.getElementById('cheese-pour-label');
  const visualSauce = document.getElementById('cheese-pour-graphic');

  if (!slider) return;

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (val < 33) {
      if (label) label.innerText = 'Subtle Cheddar Drizzle (A light golden touch)';
      if (visualSauce) visualSauce.style.transform = 'scale(0.85)';
    } else if (val < 75) {
      if (label) label.innerText = 'Big Daddy Signature Pour (Generously smothered!)';
      if (visualSauce) visualSauce.style.transform = 'scale(1.05)';
    } else {
      if (label) label.innerText = 'Cheesy Niagara Falls! (Total cheese indulgence!)';
      if (visualSauce) visualSauce.style.transform = 'scale(1.25)';
    }
  });
}

// --- NEWSLETTER VIP CLUB ---
function submitNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput?.value;
  if (!email) return;
  showToast(`Welcome to the Cheesy VIP Fam! Use code "CHEESYFIRST" for 15% off your next order. 💛`);
  emailInput.value = '';
}

// --- TOAST NOTIFICATION UTILITY ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast flex items-center gap-3 bg-white border-2 border-amber-400 text-slate-900 px-4 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-bold';
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">🧀</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- SOUND EFFECTS ---
let soundEnabled = false;
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔊 Sound On' : '🔇 Sizzle Muted';
    btn.classList.toggle('text-amber-700', soundEnabled);
  }
  showToast(soundEnabled ? 'Sizzling sound effects enabled 🍳' : 'Sound muted');
}

function setupEventListeners() {
  const searchInput = document.getElementById('menu-search');
  if (searchInput) searchInput.addEventListener('input', handleSearch);
  setupCheeseSlider();
}
