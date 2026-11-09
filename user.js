/**
 * BIG DADDY'S CUP (BDC) - CUSTOMER PORTAL SCRIPT
 * Customer-only account view: Selected store display, active order tracking,
 * and past orders history.
 */

// --- STORE BRANCHES DATABASE ---
const STORE_BRANCHES = {
  'mnl-sta-mesa': {
    name: "Big Daddy's Cup - V. Mapa Sta. Mesa Branch",
    address: "V. Mapa Blvd cor Ramon Magsaysay Blvd, Sta. Mesa, Manila",
    hours: "Open 24/7 (Daily)",
    phone: "+63 (02) 8711-2099",
    status: "🟢 Open Now"
  },
  'mnl-morayta': {
    name: "Big Daddy's Cup - FEU / Morayta U-Belt",
    address: "Nicanor Reyes St., Sampaloc, Manila",
    hours: "6:30 AM – 12:00 MN",
    phone: "+63 928 411 9302",
    status: "🟢 Open Now"
  },
  'tac-paterno': {
    name: "Big Daddy's Cup - Flagship Paterno St.",
    address: "Paterno Street, Downtown, Tacloban City, Leyte",
    hours: "7:00 AM – 11:00 PM (Daily)",
    phone: "+63 (053) 832-4412",
    status: "🟢 Open Now"
  },
  'tac-sagkahan': {
    name: "Big Daddy's Cup - Sagkahan District",
    address: "Sagkahan District, near Astrodome, Tacloban City",
    hours: "8:00 AM – 10:00 PM",
    phone: "+63 917 554 9921",
    status: "🟢 Open Now"
  },
  'bulacan-malolos': {
    name: "Big Daddy's Cup - Malolos Crossing",
    address: "MacArthur Highway, Malolos City, Bulacan",
    hours: "8:00 AM – 10:00 PM",
    phone: "+63 915 220 1888",
    status: "🟢 Open Now"
  },
  'cebu-talamban': {
    name: "Big Daddy's Cup - Talamban Univ. Corner",
    address: "Gov. M. Cuenco Ave, Talamban, Cebu City",
    hours: "8:00 AM – 11:00 PM",
    phone: "+63 (032) 410-8819",
    status: "🟢 Open Now"
  }
};

// --- INITIAL STATE ---
let selectedBranchKey = localStorage.getItem('bdc_selected_store') || 'mnl-sta-mesa';
let currentCustomer = null;

// --- INITIALIZATION & AUTH GUARD ---
document.addEventListener('DOMContentLoaded', () => {
  initCustomerAuth();
  updateStoreDisplay(selectedBranchKey);
});

function initCustomerAuth() {
  const storedUser = localStorage.getItem('bdc_user');
  const lockedView = document.getElementById('customer-locked-screen');
  const portalView = document.getElementById('customer-portal-screen');
  const logoutBtn = document.getElementById('portal-logout-btn');

  if (!storedUser) {
    if (lockedView) lockedView.classList.remove('hidden');
    if (portalView) portalView.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    return;
  }

  try {
    currentCustomer = JSON.parse(storedUser);
  } catch (e) {
    localStorage.removeItem('bdc_user');
    if (lockedView) lockedView.classList.remove('hidden');
    if (portalView) portalView.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    return;
  }

  // Customer is authenticated
  if (lockedView) lockedView.classList.add('hidden');
  if (portalView) portalView.classList.remove('hidden');
  if (logoutBtn) logoutBtn.classList.remove('hidden');

  renderCustomerInfo();
}

function renderCustomerInfo() {
  if (!currentCustomer) return;
  const nameEl = document.getElementById('cust-account-name');
  const detailsEl = document.getElementById('cust-account-details');

  if (nameEl) {
    nameEl.innerText = currentCustomer.name || 'Customer Account';
  }

  if (detailsEl) {
    const contact = currentCustomer.phone || currentCustomer.email || 'Customer Account';
    detailsEl.innerText = `${contact} • Verified Customer Account`;
  }
}

// --- DIRECT LOGIN FROM CUSTOMER PAGE (No sample credentials) ---
function handleCustomerLoginDirect(e) {
  e.preventDefault();
  const idInput = document.getElementById('direct-login-identifier');
  const identifier = idInput ? idInput.value.trim() : '';

  if (!identifier) {
    showToast('Please enter your mobile number or email ✍️');
    return;
  }

  let displayName = 'Customer';
  if (identifier.includes('@')) {
    const part = identifier.split('@')[0];
    displayName = part.charAt(0).toUpperCase() + part.slice(1);
  } else if (/^\+?\d+$/.test(identifier.replace(/[\s-]/g, ''))) {
    displayName = `Customer (${identifier.slice(-4)})`;
  } else {
    displayName = identifier;
  }

  currentCustomer = {
    name: displayName,
    phone: identifier.includes('@') ? '' : identifier,
    email: identifier.includes('@') ? identifier : '',
    role: 'Customer'
  };

  localStorage.setItem('bdc_user', JSON.stringify(currentCustomer));
  showToast(`Signed in successfully as ${currentCustomer.name}! 🧀`);
  initCustomerAuth();
}

function logoutCustomer() {
  localStorage.removeItem('bdc_user');
  showToast('Logged out of customer account. 👋');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

// --- STORE DISPLAY & SWITCHER ("it must display the store") ---
function changeSelectedStore(branchKey) {
  if (!STORE_BRANCHES[branchKey]) return;
  selectedBranchKey = branchKey;
  localStorage.setItem('bdc_selected_store', branchKey);
  updateStoreDisplay(branchKey);
  showToast(`Store branch changed to ${STORE_BRANCHES[branchKey].name} 📍`);
}

function updateStoreDisplay(branchKey) {
  const store = STORE_BRANCHES[branchKey];
  if (!store) return;

  const nameEl = document.getElementById('store-name-display');
  const addressEl = document.getElementById('store-address-display');
  const hoursEl = document.getElementById('store-hours-display');
  const phoneEl = document.getElementById('store-phone-display');
  const badgeEl = document.getElementById('store-status-badge');
  const selectorEl = document.getElementById('store-selector');
  const orderStoreTag = document.getElementById('active-order-store-tag');

  if (nameEl) nameEl.innerText = store.name;
  if (addressEl) addressEl.innerHTML = `<span>📍</span><span>${store.address}</span>`;
  if (hoursEl) hoursEl.innerText = store.hours;
  if (phoneEl) phoneEl.innerText = store.phone;
  if (badgeEl) badgeEl.innerText = store.status;
  if (selectorEl) selectorEl.value = branchKey;
  if (orderStoreTag) orderStoreTag.innerText = `Fulfilling from: ${store.name}`;
}

// --- VIEW ORDERS ("can view orders") ---
function switchOrdersView(view) {
  const activeTabBtn = document.getElementById('tab-btn-active');
  const historyTabBtn = document.getElementById('tab-btn-history');
  const activeView = document.getElementById('view-active-order');
  const historyView = document.getElementById('view-order-history');

  if (view === 'active') {
    activeTabBtn.classList.add('border-amber-500', 'text-amber-800', 'font-black');
    activeTabBtn.classList.remove('border-transparent', 'text-slate-500', 'font-bold');
    historyTabBtn.classList.remove('border-amber-500', 'text-amber-800', 'font-black');
    historyTabBtn.classList.add('border-transparent', 'text-slate-500', 'font-bold');

    activeView.classList.remove('hidden');
    historyView.classList.add('hidden');
  } else {
    historyTabBtn.classList.add('border-amber-500', 'text-amber-800', 'font-black');
    historyTabBtn.classList.remove('border-transparent', 'text-slate-500', 'font-bold');
    activeTabBtn.classList.remove('border-amber-500', 'text-amber-800', 'font-black');
    activeTabBtn.classList.add('border-transparent', 'text-slate-500', 'font-bold');

    historyView.classList.remove('hidden');
    activeView.classList.add('hidden');
  }
}

function openQuickOrderModal() {
  const modal = document.getElementById('quick-order-modal');
  const storeLabel = document.getElementById('modal-store-name');
  const store = STORE_BRANCHES[selectedBranchKey];
  if (storeLabel && store) {
    storeLabel.innerText = `Cooked fresh & delivered from ${store.name}`;
  }
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeQuickOrderModal() {
  const modal = document.getElementById('quick-order-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function placeDirectStoreOrder(dishName, price) {
  closeQuickOrderModal();
  const store = STORE_BRANCHES[selectedBranchKey] || STORE_BRANCHES['mnl-sta-mesa'];
  const newOrderId = '#BDC-' + Math.floor(10000 + Math.random() * 90000);
  
  // Update Active Order UI
  const orderIdEl = document.getElementById('active-order-id');
  const orderStoreTag = document.getElementById('active-order-store-tag');
  if (orderIdEl) orderIdEl.innerText = newOrderId;
  if (orderStoreTag) orderStoreTag.innerText = `Fulfilling from: ${store.name}`;

  // Switch to active order view
  switchOrdersView('active');
  showToast(`Order ${newOrderId} placed successfully! Sizzling at ${store.name} 🍳`);
}

function reorderCustomerOrder(dishName) {
  const store = STORE_BRANCHES[selectedBranchKey] || STORE_BRANCHES['mnl-sta-mesa'];
  const newOrderId = '#BDC-' + Math.floor(10000 + Math.random() * 90000);
  
  const orderIdEl = document.getElementById('active-order-id');
  const orderStoreTag = document.getElementById('active-order-store-tag');
  if (orderIdEl) orderIdEl.innerText = newOrderId;
  if (orderStoreTag) orderStoreTag.innerText = `Fulfilling from: ${store.name}`;

  switchOrdersView('active');
  showToast(`Re-ordered ${dishName}! Placed as ${newOrderId} with ${store.name} 🧀`);
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
