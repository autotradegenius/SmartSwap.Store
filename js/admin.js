const ADMIN_EMAIL = (window.SWAPIO_ADMIN_EMAIL || 'admin@swapio.com').toLowerCase();
const productStoreKey = window.swapioData?.STORAGE_KEYS?.products || 'swapioAdminProducts';
let firebaseDb = null;

function showAdminMessage(message, isError = true){
  const msg = document.getElementById('adminLoginMsg');
  if(!msg) return;
  msg.textContent = message;
  msg.className = `form-msg ${isError ? 'err' : 'ok'}`;
}

function initializeFirebaseAuth(){
  return window.swapioData ? window.swapioData.initializeFirebaseAuth() : null;
}

async function signInAdminWithFirebase(email, password){
  if (window.swapioData && typeof window.swapioData.signInAdminWithFirebase === 'function') {
    return window.swapioData.signInAdminWithFirebase(email, password);
  }

  throw new Error('Firebase helper is not ready.');
}

function readProducts(){
  return window.swapioData ? window.swapioData.readProducts() : JSON.parse(localStorage.getItem(productStoreKey) || '[]');
}
function saveProducts(products){
  if (window.swapioData && typeof window.swapioData.saveProducts === 'function') {
    return window.swapioData.saveProducts(products);
  }
  localStorage.setItem(productStoreKey, JSON.stringify(products));
}
async function readSubmissions(){
  if(window.swapioData?.loadCustomerSubmissions) return window.swapioData.loadCustomerSubmissions();
  return [];
}

async function syncProductsToCloud(products) {
  if (window.swapioData && typeof window.swapioData.syncProductsToCloud === 'function') {
    return window.swapioData.syncProductsToCloud(products);
  }
  return false;
}

async function loadProductsFromCloud() {
  if (window.swapioData && typeof window.swapioData.loadProductsFromCloud === 'function') {
    return window.swapioData.loadProductsFromCloud();
  }
  return null;
}

async function syncInventoryToCloud(items) {
  if (window.swapioData && typeof window.swapioData.syncInventoryToCloud === 'function') {
    return window.swapioData.syncInventoryToCloud(items);
  }
  return false;
}

async function loadInventoryFromCloud() {
  if (window.swapioData && typeof window.swapioData.loadInventoryFromCloud === 'function') {
    return window.swapioData.loadInventoryFromCloud();
  }
  return null;
}

async function syncReturnsToCloud(items) {
  if (window.swapioData && typeof window.swapioData.syncReturnsToCloud === 'function') {
    return window.swapioData.syncReturnsToCloud(items);
  }
  return false;
}

async function loadReturnsFromCloud() {
  if (window.swapioData && typeof window.swapioData.loadReturnsFromCloud === 'function') {
    return window.swapioData.loadReturnsFromCloud();
  }
  return null;
}
const defaultSellModels = [
  {id:'iphone-13',name:'iPhone 13',spec:'128GB · Apple',price:'28500'},
  {id:'iphone-11',name:'iPhone 11',spec:'64GB · Apple',price:'16200'},
  {id:'galaxy-s21',name:'Galaxy S21',spec:'128GB · Samsung',price:'14200'},
  {id:'galaxy-m32',name:'Galaxy M32',spec:'64GB · Samsung',price:'6300'},
  {id:'oneplus-9',name:'OnePlus 9',spec:'128GB · OnePlus',price:'11800'},
  {id:'oneplus-nord-2',name:'OnePlus Nord 2',spec:'128GB · OnePlus',price:'9300'},
  {id:'redmi-note-11-pro',name:'Redmi Note 11 Pro',spec:'128GB · Xiaomi',price:'6900'},
  {id:'pixel-6a',name:'Pixel 6a',spec:'128GB · Google',price:'13500'}
];
function readSellModels(){
  const overrides = JSON.parse(localStorage.getItem('swapioSellModels') || '{}');
  return defaultSellModels.map(model => ({...model, ...(overrides[model.id] || {})}));
}
function saveSellModels(models){
  localStorage.setItem('swapioSellModels', JSON.stringify(Object.fromEntries(models.map(model => [model.id, model]))));
}
const defaultBuyModels = [
  {id:'iphone-12',name:'iPhone 12',spec:'128GB · Apple',price:'32999',oldPrice:'52000',grade:'Superb',warranty:'30-day'},
  {id:'galaxy-s21-fe',name:'Galaxy S21 FE',spec:'128GB · Samsung',price:'21499',oldPrice:'34000',grade:'Good',warranty:'30-day'},
  {id:'oneplus-9r',name:'OnePlus 9R',spec:'128GB · OnePlus',price:'17999',oldPrice:'28000',grade:'Superb',warranty:'30-day'},
  {id:'iphone-se-2022',name:'iPhone SE (2022)',spec:'64GB · Apple',price:'18499',oldPrice:'29000',grade:'Good',warranty:'30-day'},
  {id:'redmi-note-12',name:'Redmi Note 12',spec:'128GB · Xiaomi',price:'9999',oldPrice:'15500',grade:'Fair',warranty:'15-day'},
  {id:'pixel-7',name:'Pixel 7',spec:'128GB · Google',price:'29999',oldPrice:'45000',grade:'Superb',warranty:'30-day'},
  {id:'galaxy-a54',name:'Galaxy A54',spec:'128GB · Samsung',price:'15999',oldPrice:'24000',grade:'Good',warranty:'30-day'},
  {id:'iphone-13',name:'iPhone 13',spec:'128GB · Apple',price:'41999',oldPrice:'62000',grade:'Superb',warranty:'30-day'}
];
function readBuyModels(){
  const overrides = JSON.parse(localStorage.getItem('swapioBuyModels') || '{}');
  return defaultBuyModels.map(model => ({...model, ...(overrides[model.id] || {})}));
}
function saveBuyModels(models){
  localStorage.setItem('swapioBuyModels', JSON.stringify(Object.fromEntries(models.map(model => [model.id, model]))));
}
const inventoryKey = window.swapioData?.STORAGE_KEYS?.inventory || 'swapioInventory';
const returnsKey = window.swapioData?.STORAGE_KEYS?.returns || 'swapioReturns';
function readInventory(){
  return window.swapioData ? window.swapioData.readInventory() : JSON.parse(localStorage.getItem(inventoryKey) || '[]');
}
function saveInventory(items){
  if (window.swapioData && typeof window.swapioData.saveInventory === 'function') {
    return window.swapioData.saveInventory(items);
  }
  localStorage.setItem(inventoryKey, JSON.stringify(items));
}
function readReturns(){
  return window.swapioData ? window.swapioData.readReturns() : JSON.parse(localStorage.getItem(returnsKey) || '[]');
}
function saveReturns(items){
  if (window.swapioData && typeof window.swapioData.saveReturns === 'function') {
    return window.swapioData.saveReturns(items);
  }
  localStorage.setItem(returnsKey, JSON.stringify(items));
}
function saleIsLocked(item){
  if(item.status !== 'sold' || !item.saleDate) return false;
  return Date.now() - new Date(`${item.saleDate}T00:00:00`).getTime() >= 48 * 60 * 60 * 1000;
}
function seedInventory(){
  if(localStorage.getItem(inventoryKey) !== null) return;
  const today = new Date().toISOString().slice(0, 10);
  const sellStock = defaultSellModels.map((model, index) => ({model:model.name, imei:`DEMO-${String(index + 1).padStart(3, '0')}`, purchasePrice:Math.round(Number(model.price) * 0.72), purchaseDate:today, seller:'Demo seller', status:'in-stock', salePrice:'', paymentMethod:'', saleDate:'', buyer:''}));
  const demoSold = [
    {model:'Galaxy S21 FE', imei:'DEMO-SOLD-01', purchasePrice:'14500', purchaseDate:today, seller:'Demo seller', status:'sold', salePrice:'21499', paymentMethod:'online', saleDate:today, buyer:'Demo buyer'},
    {model:'iPhone SE (2022)', imei:'DEMO-SOLD-02', purchasePrice:'12000', purchaseDate:today, seller:'Demo seller', status:'sold', salePrice:'18499', paymentMethod:'cash', saleDate:today, buyer:'Demo buyer'}
  ];
  saveInventory([...sellStock, ...demoSold]);
}
function csvValue(value){ return `"${String(value ?? '').replace(/"/g, '""')}"`; }
function inventoryCsv(items){
  const columns = ['model','imei','purchasePrice','purchaseDate','seller','status','salePrice','paymentMethod','saleDate','buyer'];
  return [columns.join(','), ...items.map(item => columns.map(column => csvValue(item[column])).join(','))].join('\n');
}
function returnsCsv(items){
  const columns = ['model','customer','buyDate','returnDate','reason','notes'];
  return [columns.join(','), ...items.map(item => columns.map(column => csvValue(item[column])).join(','))].join('\n');
}
function downloadInventoryCsv(){
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([inventoryCsv(readInventory())], {type:'text/csv'}));
  link.download = 'swapio-inventory.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}
function downloadReturnsCsv(){
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([returnsCsv(readReturns())], {type:'text/csv'}));
  link.download = 'swapio-returns.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}
function parseCsvLine(line){
  const values = []; let value = ''; let quoted = false;
  for(let index = 0; index < line.length; index++){
    const character = line[index];
    if(character === '"' && line[index + 1] === '"'){ value += '"'; index++; }
    else if(character === '"') quoted = !quoted;
    else if(character === ',' && !quoted){ values.push(value); value = ''; }
    else value += character;
  }
  values.push(value); return values;
}
function paymentLabel(method){
  if(method === 'cash') return 'Cash';
  if(method === 'online') return 'Online';
  return '';
}
function renderInventory(){
  const items = readInventory();
  const counts = items.reduce((result, item) => { result[item.status] = (result[item.status] || 0) + 1; return result; }, {});
  document.getElementById('inventorySummary').textContent = `Total: ${items.length} · In stock: ${counts['in-stock'] || 0} · Sold: ${counts.sold || 0} · In repair: ${counts.repair || 0}`;
  document.getElementById('inventoryList').innerHTML = items.length ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Buy date</th><th>Seller</th><th>Status</th><th>Sale details</th><th></th></tr></thead><tbody>${items.map((item, index) => { const locked = saleIsLocked(item); const paymentTag = paymentLabel(item.paymentMethod); return `<tr class="${locked ? 'inventory-locked' : ''}"><td><strong>${item.model}</strong><small>${item.imei || 'No IMEI'}</small></td><td>₹${Number(item.purchasePrice || 0).toLocaleString('en-IN')}<small>${item.purchaseDate || '-'}</small></td><td>${item.seller || '-'}</td><td><span class="pill pill-${item.status === 'sold' ? 'green' : 'gold'}">${item.status}</span>${locked ? '<small>Locked after 48h</small>' : ''}</td><td>${item.salePrice ? `₹${Number(item.salePrice).toLocaleString('en-IN')}${paymentTag ? ` · <span class="pill pill-${item.paymentMethod === 'cash' ? 'gold' : 'green'}">${paymentTag}</span>` : ''}` : '-'}<small>${item.buyer || item.saleDate || ''}</small></td><td>${locked ? (item.status === 'sold' ? `<button class="btn btn-ghost" data-return-inventory="${index}">Mark return</button>` : '') : `<button class="btn btn-ghost" data-edit-inventory="${index}">Edit</button>`}<button class="btn btn-ghost" data-delete-inventory="${index}">Remove</button></td></tr>`; }).join('')}</tbody></table>` : '<p class="admin-empty">No inventory records yet. Add a phone above or import a CSV file.</p>';
}
function renderReturns(){
  const list = document.getElementById('returnList');
  const items = readReturns();
  list.innerHTML = items.length ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Customer</th><th>Buy date</th><th>Return date</th><th>Reason</th><th>Notes</th><th></th></tr></thead><tbody>${items.map((item, index) => `<tr><td><strong>${item.model}</strong></td><td>${item.customer || '-'}</td><td>${item.buyDate || '-'}</td><td>${item.returnDate}</td><td>${item.reason}</td><td>${item.notes || '-'}</td><td><button class="btn btn-ghost" data-delete-return="${index}">Delete</button></td></tr>`).join('')}</tbody></table>` : '<p class="admin-empty">No returns recorded yet.</p>';
}
function setupInventory(){
  const form = document.getElementById('inventoryForm');
  if(!form) return;
  const fields = form.elements;
  const reset = () => { form.reset(); fields.inventoryIndex.value = ''; form.querySelector('button[type="submit"]').textContent = 'Add inventory'; document.getElementById('cancelInventoryEdit').hidden = true; };
  form.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form).entries()); const index = data.inventoryIndex; delete data.inventoryIndex; const items = readInventory(); if(index === '') items.unshift(data); else items[Number(index)] = data; saveInventory(items); reset(); renderInventory(); downloadInventoryCsv(); });
  document.getElementById('cancelInventoryEdit').addEventListener('click', reset);
  document.getElementById('inventoryList').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit-inventory]');
    const returned = event.target.closest('[data-return-inventory]');
    const remove = event.target.closest('[data-delete-inventory]');
    const items = readInventory();
    if(edit){ const item = items[Number(edit.dataset.editInventory)]; Object.keys(item).forEach(key => { if(fields[key]) fields[key].value = item[key]; }); fields.inventoryIndex.value = edit.dataset.editInventory; form.querySelector('button[type="submit"]').textContent = 'Update inventory'; document.getElementById('cancelInventoryEdit').hidden = false; form.scrollIntoView({behavior:'smooth', block:'center'}); }
    if(returned){ const item = items[Number(returned.dataset.returnInventory)]; const reason = window.prompt('Return reason?'); if(!reason) return; const returnDate = new Date().toISOString().slice(0, 10); item.status = 'returned'; saveInventory(items); const returns = readReturns(); returns.unshift({model:item.model, customer:item.buyer || '', buyDate:item.purchaseDate || '', returnDate, reason, notes:'Linked from inventory'}); saveReturns(returns); renderInventory(); renderReturns(); downloadInventoryCsv(); }
    if(remove){ const index = Number(remove.dataset.deleteInventory); if(!window.confirm(`Remove "${items[index].model}" from inventory?`)) return; items.splice(index, 1); saveInventory(items); renderInventory(); }
  });
  document.getElementById('exportInventory').addEventListener('click', downloadInventoryCsv);
  document.getElementById('exportReturns').addEventListener('click', downloadReturnsCsv);
  document.getElementById('importInventory').addEventListener('change', event => { const file = event.target.files[0]; if(!file) return; const reader = new FileReader(); reader.onload = () => { const lines = String(reader.result).trim().split(/\r?\n/); const columns = parseCsvLine(lines.shift()); const imported = lines.filter(Boolean).map(line => Object.fromEntries(parseCsvLine(line).map((value, index) => [columns[index], value]))); saveInventory([...imported, ...readInventory()]); renderInventory(); downloadInventoryCsv(); event.target.value = ''; }; reader.readAsText(file); });
  seedInventory();
  renderInventory();
  renderReturns();
}

function renderAdminProducts(){
  const list = document.getElementById('adminProducts');
  if(!list) return;
  const products = readProducts();
  list.innerHTML = products.length ? products.map((product, index) => `
    <article class="admin-item">
      ${(product.frontImage || product.photos?.[0]) ? `<div class="admin-thumb-stack"><img src="${product.frontImage || product.photos[0]}" alt="${product.name} front">${product.backImage ? `<img src="${product.backImage}" alt="${product.name} back">` : ''}</div>` : '<div class="admin-thumb">PHONE</div>'}
      <div><h4>${product.name}</h4><p>${product.brand} · ₹${Number(product.price).toLocaleString('en-IN')} · ${product.visible ? 'Visible' : 'Hidden'}</p><small>${product.details || 'No extra details'}</small></div>
      <button class="btn btn-ghost" data-edit-product="${index}">Edit</button>
      <button class="btn btn-ghost" data-toggle-product="${index}">${product.visible ? 'Hide' : 'Show'}</button>
      <button class="btn btn-ghost" data-delete-product="${index}">Delete</button>
    </article>`).join('') : '<p class="admin-empty">No admin products added yet.</p>';
}

async function renderAdminSubmissions(){
  const list = document.getElementById('adminSubmissions');
  const submissions = await readSubmissions();
  list.innerHTML = submissions.length ? submissions.map(item => `
    <article class="admin-item submission-item"><div><span class="pill pill-coral">${item.type}</span><h4>${item.name || 'Customer'}</h4><p>${item.phone || item.email || 'No contact'} · ${item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Unknown date'}</p><small>${item.model || item.issue || item.details || 'No details'}${item.price ? ` · ${item.price}` : ''}${item.payment ? ` · ${item.payment}` : ''}${item.utr ? ` · UTR: ${item.utr}` : ''}${item.paymentStatus ? ` · ${item.paymentStatus}` : ''}</small></div><div class="admin-photos">${(item.photos || []).map(photo => `<img src="${photo}" alt="Customer upload">`).join('')}</div></article>`).join('') : '<p class="admin-empty">No customer submissions yet.</p>';
}

function renderAdminSellModels(){
  const list = document.getElementById('adminSellModels');
  list.innerHTML = readSellModels().map((model, index) => `
    <details class="admin-model-item"><summary><span>${model.name}</span><span class="model-chevron">+</span></summary><div class="admin-model-detail"><p>${model.spec} · Up to ₹${Number(model.price).toLocaleString('en-IN')}</p><button class="btn btn-ghost" data-edit-sell="${index}">Edit</button></div></details>`).join('');
}
function renderAdminBuyModels(){
  const list = document.getElementById('adminBuyModels');
  const customProducts = readProducts().map((product, index) => ({...product, customIndex:index, custom:true, image:product.frontImage || product.photos?.[0], spec:product.details || `${product.brand} · Added phone`, price:product.price, grade:product.grade || 'Superb', warranty:product.warranty || '30-day'}));
  const models = [...readBuyModels(), ...customProducts];
  list.innerHTML = models.map((model, index) => `
    <details class="admin-model-item"><summary><span>${model.name}</span><span class="model-chevron">+</span></summary><div class="admin-model-detail"><p>${model.spec} · ₹${Number(model.price).toLocaleString('en-IN')} · ${model.grade} · ${model.warranty} warranty${model.custom && model.visible === false ? ' · Hidden' : ''}</p><button class="btn btn-ghost" ${model.custom ? `data-edit-custom="${model.customIndex}"` : `data-edit-buy="${index}"`}>Edit</button>${model.custom ? `<button class="btn btn-ghost" data-toggle-product="${model.customIndex}">${model.visible ? 'Hide' : 'Show'}</button><button class="btn btn-ghost" data-delete-product="${model.customIndex}">Delete</button>` : ''}</div></details>`).join('');
}

async function loadAllDataFromCloud() {
  const cloudProducts = await loadProductsFromCloud();
  const cloudInventory = await loadInventoryFromCloud();
  const cloudReturns = await loadReturnsFromCloud();
  
  if (cloudProducts !== null) {
    localStorage.setItem(productStoreKey, JSON.stringify(cloudProducts));
  }
  if (cloudInventory !== null) {
    localStorage.setItem(inventoryKey, JSON.stringify(cloudInventory));
  }
  if (cloudReturns !== null) {
    localStorage.setItem(returnsKey, JSON.stringify(cloudReturns));
  }
}

function setupAdmin(){
  // Force clear any old session data from demo password era
  sessionStorage.removeItem('swapioAdminLoggedIn');
  sessionStorage.removeItem('swapioAdminEmail');
  
  const login = document.getElementById('adminLogin');
  const dashboard = document.getElementById('adminDashboard');
  const loginForm = document.getElementById('adminLoginForm');
  const emailInput = document.getElementById('adminEmail');
  const passwordInput = document.getElementById('adminPassword');
  const auth = initializeFirebaseAuth();

  if(auth){
    auth.onAuthStateChanged(async user => {
      if(!user){
        if(sessionStorage.getItem('swapioAdminLoggedIn') === 'true') sessionStorage.removeItem('swapioAdminLoggedIn');
        login.hidden = false;
        dashboard.hidden = true;
        return;
      }

      const token = await user.getIdTokenResult(true);
      const isAdmin = token.claims.admin === true || user.email?.toLowerCase() === ADMIN_EMAIL;

      if(!isAdmin){
        await auth.signOut();
        showAdminMessage('This account is not allowed to access the admin dashboard.');
        login.hidden = false;
        dashboard.hidden = true;
        return;
      }

      sessionStorage.setItem('swapioAdminLoggedIn', 'true');
      login.hidden = true; dashboard.hidden = false;
      
      // Load cloud data from Firestore
      await loadAllDataFromCloud();
      
      renderAdminProducts(); renderAdminBuyModels(); renderAdminSellModels(); renderAdminSubmissions();
    });
  } else {
    login.hidden = false;
    dashboard.hidden = true;
  }


  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    showAdminMessage('');

    if(!email || !password){
      showAdminMessage('Please enter the admin email and password.');
      return;
    }

    if(!auth){
      showAdminMessage('Firebase Auth is not configured. Please set up Firebase for admin login.');
      return;
    }

    try {
      const user = await signInAdminWithFirebase(email, password);
      sessionStorage.setItem('swapioAdminLoggedIn', 'true');
      sessionStorage.setItem('swapioAdminEmail', user.email || email);
      
      // Load cloud data from Firestore
      await loadAllDataFromCloud();
      
      login.hidden = true; dashboard.hidden = false; renderAdminProducts(); renderAdminBuyModels(); renderAdminSellModels(); renderAdminSubmissions();
    } catch (error) {
      showAdminMessage(error.message || 'Admin login failed.');
    }
  });

  document.getElementById('adminLogout').addEventListener('click', async () => {
    if(auth){
      await auth.signOut();
    }
    sessionStorage.removeItem('swapioAdminLoggedIn');
    sessionStorage.removeItem('swapioAdminEmail');
    location.reload();
  });
  const productForm = document.getElementById('adminProductForm');
  const productFormTitle = document.getElementById('productFormTitle');
  const cancelEdit = document.getElementById('cancelEdit');

  function resetProductForm(){
    productForm.reset();
    productForm.elements.editIndex.value = '';
    productFormTitle.textContent = 'Add phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Add phone';
    cancelEdit.hidden = true;
  }

  cancelEdit.addEventListener('click', resetProductForm);
  productForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const editIndex = data.editIndex;
    delete data.editIndex;
    const readImage = file => file ? new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); }) : Promise.resolve('');
    const frontImage = await readImage(form.elements.frontPhoto.files[0]);
    const backImage = await readImage(form.elements.backPhoto.files[0]);
    const products = readProducts();
    if(editIndex.startsWith('custom:')){
      const productIndex = Number(editIndex.slice(7));
      const product = products[productIndex];
      data.frontImage = frontImage || product.frontImage || product.photos?.[0] || '';
      data.backImage = backImage || product.backImage || '';
      data.visible = product.visible;
      products[productIndex] = data;
      saveProducts(products);
    } else if(editIndex.startsWith('buy:')){
      const buyModels = readBuyModels();
      const buyId = editIndex.slice(4);
      const buyModel = buyModels.find(model => model.id === buyId);
      buyModel.name = data.name;
      buyModel.spec = data.details || data.brand;
      buyModel.price = data.price;
      buyModel.oldPrice = data.oldPrice;
      buyModel.grade = data.grade;
      buyModel.warranty = data.warranty;
      buyModel.image = frontImage || buyModel.image || '';
      buyModel.backImage = backImage || buyModel.backImage || '';
      saveBuyModels(buyModels);
    } else if(editIndex.startsWith('sell:')){
      const sellModels = readSellModels();
      const sellId = editIndex.slice(5);
      const sellModel = sellModels.find(model => model.id === sellId);
      sellModel.name = data.name;
      sellModel.spec = data.details || data.brand;
      sellModel.price = data.price;
      sellModel.image = frontImage || sellModel.image || '';
      sellModel.backImage = backImage || sellModel.backImage || '';
      saveSellModels(sellModels);
    } else if(editIndex !== ''){
      const oldProduct = products[Number(editIndex)];
      data.frontImage = frontImage || oldProduct.frontImage || oldProduct.photos?.[0] || '';
      data.backImage = backImage || oldProduct.backImage || '';
      data.visible = oldProduct.visible;
      products[Number(editIndex)] = data;
    } else {
      data.frontImage = frontImage;
      data.backImage = backImage;
      data.visible = true;
      products.unshift(data);
    }
    saveProducts(products); resetProductForm(); renderAdminProducts(); renderAdminBuyModels(); renderAdminSellModels();
  });
  document.getElementById('adminBuyModels').addEventListener('click', event => {
    const editCustom = event.target.closest('[data-edit-custom]');
    const editBuy = event.target.closest('[data-edit-buy]');
    const toggle = event.target.closest('[data-toggle-product]');
    const remove = event.target.closest('[data-delete-product]');
    if(toggle || remove){ const products = readProducts(); if(toggle) products[Number(toggle.dataset.toggleProduct)].visible = !products[Number(toggle.dataset.toggleProduct)].visible; if(remove) products.splice(Number(remove.dataset.deleteProduct), 1); saveProducts(products); renderAdminBuyModels(); return; }
    if(editCustom){
      const product = readProducts()[Number(editCustom.dataset.editCustom)];
      productForm.elements.name.value = product.name; productForm.elements.brand.value = product.brand; productForm.elements.price.value = product.price; productForm.elements.details.value = product.details || ''; productForm.elements.editIndex.value = `custom:${editCustom.dataset.editCustom}`;
      productForm.elements.frontPhoto.value = ''; productForm.elements.backPhoto.value = '';
      productFormTitle.textContent = 'Edit phone'; productForm.querySelector('button[type="submit"]').textContent = 'Update phone'; cancelEdit.hidden = false; productForm.scrollIntoView({behavior:'smooth', block:'center'});
    } else if(editBuy){
      const model = readBuyModels()[Number(editBuy.dataset.editBuy)];
      productForm.elements.name.value = model.name; productForm.elements.brand.value = model.spec; productForm.elements.price.value = model.price; productForm.elements.details.value = model.spec; productForm.elements.oldPrice.value = model.oldPrice; productForm.elements.grade.value = model.grade; productForm.elements.warranty.value = model.warranty; productForm.elements.editIndex.value = `buy:${model.id}`;
      productForm.elements.frontPhoto.value = ''; productForm.elements.backPhoto.value = '';
      productFormTitle.textContent = 'Edit buy phone'; productForm.querySelector('button[type="submit"]').textContent = 'Update buy phone'; cancelEdit.hidden = false; productForm.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
  document.getElementById('adminSellModels').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit-sell]');
    if(!edit) return;
    const model = readSellModels()[Number(edit.dataset.editSell)];
    productForm.elements.name.value = model.name;
    productForm.elements.brand.value = model.spec;
    productForm.elements.price.value = model.price;
    productForm.elements.details.value = model.spec;
    productForm.elements.frontPhoto.value = '';
    productForm.elements.backPhoto.value = '';
    productForm.elements.editIndex.value = `sell:${model.id}`;
    productFormTitle.textContent = 'Edit sell phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Update sell phone';
    cancelEdit.hidden = false;
    productForm.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('adminBuyModels').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit-buy]');
    if(!edit) return;
    const model = readBuyModels()[Number(edit.dataset.editBuy)];
    productForm.elements.name.value = model.name;
    productForm.elements.brand.value = model.spec;
    productForm.elements.price.value = model.price;
    productForm.elements.details.value = model.spec;
    productForm.elements.oldPrice.value = model.oldPrice;
    productForm.elements.grade.value = model.grade;
    productForm.elements.warranty.value = model.warranty;
    productForm.elements.frontPhoto.value = '';
    productForm.elements.backPhoto.value = '';
    productForm.elements.editIndex.value = `buy:${model.id}`;
    productFormTitle.textContent = 'Edit buy phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Update buy phone';
    cancelEdit.hidden = false;
    productForm.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('refreshSubmissions').addEventListener('click', renderAdminSubmissions);
  document.querySelectorAll('[data-admin-tab]').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('[data-admin-tab]').forEach(item => item.classList.remove('active')); tab.classList.add('active'); document.getElementById('adminCatalogTab').hidden = tab.dataset.adminTab !== 'catalog'; document.getElementById('adminInventoryTab').hidden = tab.dataset.adminTab !== 'inventory'; document.getElementById('adminReturnsTab').hidden = tab.dataset.adminTab !== 'returns'; }));
  const returnForm = document.getElementById('returnForm');
  const returnReason = document.getElementById('returnReason');
  const customReturnReason = document.getElementById('customReturnReason');
  returnReason.addEventListener('change', () => { customReturnReason.hidden = returnReason.value !== 'other'; customReturnReason.required = returnReason.value === 'other'; if(returnReason.value !== 'other') customReturnReason.value = ''; });
  returnForm.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget).entries()); if(data.reason === 'other') data.reason = data.customReason; delete data.customReason; const returns = readReturns(); returns.unshift(data); saveReturns(returns); renderReturns(); event.currentTarget.reset(); customReturnReason.hidden = true; customReturnReason.required = false; });
  document.getElementById('returnList').addEventListener('click', event => { const remove = event.target.closest('[data-delete-return]'); if(!remove) return; const returns = readReturns(); returns.splice(Number(remove.dataset.deleteReturn), 1); saveReturns(returns); renderReturns(); });
  setupInventory();
}

document.addEventListener('DOMContentLoaded', setupAdmin);
