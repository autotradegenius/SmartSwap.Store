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
  const defaults = Array.isArray(window.DEFAULT_MODELS) && window.DEFAULT_MODELS.length ? window.DEFAULT_MODELS : defaultSellModels;
  const seeds = defaults.map(model => ({...model, domain:'sell'}));
  const models = window.swapioData?.readCatalog ? window.swapioData.readCatalog('sell', seeds) : seeds;
  const naturalNameOrder = new Intl.Collator(undefined, {numeric:true, sensitivity:'base'});
  return models
    .map(model => ({...model, ...(overrides[model.id] || {})}))
    .sort((first, second) => naturalNameOrder.compare(String(first.name || ''), String(second.name || '')));
}
function saveSellModels(models){
  const uniqueSellModels = uniqueModels(models);
  localStorage.setItem('swapioSellModels', JSON.stringify(Object.fromEntries(uniqueSellModels.map(model => [model.id, model]))));
  if(window.swapioData?.saveCatalog) window.swapioData.saveCatalog('sell', uniqueSellModels);
  else saveSellCatalog(uniqueSellModels);
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
  const allModels = [...defaultBuyModels];
  (Array.isArray(window.BUY_MASTER_MODELS) ? window.BUY_MASTER_MODELS : []).forEach(model => {
    if (!allModels.some(entry => entry.id === model.id)) allModels.push({...model});
  });
  const seeds = allModels.map(model => ({...model, domain:'buy'}));
  const models = window.swapioData?.readCatalog ? window.swapioData.readCatalog('buy', seeds) : seeds;
  const compareModelNames = (firstName, secondName) => {
    const first = String(firstName || ''), second = String(secondName || '');
    const firstNumber = first.match(/\d+/), secondNumber = second.match(/\d+/);
    if(firstNumber && secondNumber && Number(firstNumber[0]) !== Number(secondNumber[0])) return Number(firstNumber[0]) - Number(secondNumber[0]);
    if(firstNumber && !secondNumber) return -1;
    if(!firstNumber && secondNumber) return 1;
    return first.localeCompare(second, undefined, {numeric:true, sensitivity:'base'});
  };
  return models
    .map(model => ({...model, ...(overrides[model.id] || {})}))
    .sort((first, second) => String(first.brand || '').localeCompare(String(second.brand || ''), undefined, {sensitivity:'base'}) || compareModelNames(first.name, second.name));
}
function saveBuyModels(models){
  const uniqueBuyModels = uniqueModels(models);
  localStorage.setItem('swapioBuyModels', JSON.stringify(Object.fromEntries(uniqueBuyModels.map(model => [model.id, model]))));
  if (window.swapioData?.saveCatalog) window.swapioData.saveCatalog('buy', uniqueBuyModels).catch(error => console.warn('Buy catalog cloud sync failed.', error));
  else if (window.swapioData?.saveBuyCatalog) window.swapioData.saveBuyCatalog(uniqueBuyModels).catch(error => console.warn('Buy catalog cloud sync failed.', error));
}
const inventoryKey = window.swapioData?.STORAGE_KEYS?.inventory || 'swapioInventory';
const returnsKey = window.swapioData?.STORAGE_KEYS?.returns || 'swapioReturns';
const billsKey = window.swapioData?.STORAGE_KEYS?.bills || 'swapioBills';
const catalogKey = 'swapioPhoneCatalog';
const sellCatalogKey = 'swapioSellCatalog';
const repairCatalogKey = 'swapioRepairCatalog';
function modelIdentity(value, brand) {
  const normalizedBrand = String(brand || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  let normalizedName = String(value || '').trim().toLowerCase();
  const brandPrefix = new RegExp(`^${String(brand || '').trim()}[\\s-]+`, 'i');
  normalizedName = normalizedName.replace(brandPrefix, '').replace(/[^a-z0-9]+/g, '');
  return `${normalizedBrand}:${normalizedName}`;
}
function hasDuplicateModel(models, model, ignoredId = '') {
  const identity = modelIdentity(model.name, model.brand);
  return models.some(existing => existing.id !== ignoredId && !existing.hidden && !existing.deleted && existing.enabled !== false && modelIdentity(existing.name, existing.brand) === identity);
}
function uniqueModels(models) {
  const unique = new Map();
  models.forEach(model => {
    const identity = modelIdentity(model.name, model.brand);
    const current = unique.get(identity);
    if (!current) { unique.set(identity, model); return; }
    const currentInactive = current.hidden === true || current.deleted === true || current.enabled === false;
    const candidateInactive = model.hidden === true || model.deleted === true || model.enabled === false;
    if ((currentInactive && !candidateInactive) || Number(model.updatedAt || 0) >= Number(current.updatedAt || 0)) unique.set(identity, model);
  });
  return [...unique.values()];
}
function readSellCatalog(){
  return JSON.parse(localStorage.getItem(sellCatalogKey) || '[]');
}
function saveSellCatalog(items){
  const uniqueItems = uniqueModels(items);
  localStorage.setItem(sellCatalogKey, JSON.stringify(uniqueItems));
  if (window.swapioData?.saveSellCatalog) window.swapioData.saveSellCatalog(uniqueItems).catch(error => console.warn('Sell catalog cloud sync failed.', error));
}

function readInventory(){
  return window.swapioData ? window.swapioData.readInventory() : JSON.parse(localStorage.getItem(inventoryKey) || '[]');
}
function saveInventory(items){
  if (window.swapioData && typeof window.swapioData.saveInventory === 'function') {
    return window.swapioData.saveInventory(items);
  }
  localStorage.setItem(inventoryKey, JSON.stringify(items));
}
function readBills(){
  return window.swapioData ? (window.swapioData.readBills ? window.swapioData.readBills() : JSON.parse(localStorage.getItem(billsKey) || '[]')) : JSON.parse(localStorage.getItem(billsKey) || '[]');
}
function saveBills(items){
  if (window.swapioData && typeof window.swapioData.saveBills === 'function') {
    return window.swapioData.saveBills(items);
  }
  localStorage.setItem(billsKey, JSON.stringify(items));
}

function isRepairServiceRecord(item){
  return item.isService === true || (!item.brand && !item.model);
}
function readRepairCatalog(){
  if(window.swapioData?.readRepairCatalog) return window.swapioData.readRepairCatalog();
    return JSON.parse(localStorage.getItem(repairCatalogKey) || '[]');
}
function saveRepairCatalog(items){
  const serviceItems = items.filter(isRepairServiceRecord);
  const priceItems = uniqueRepairPriceItems(items.filter(item => !isRepairServiceRecord(item)));
  const records = [...serviceItems, ...priceItems];
  if(window.swapioData?.saveRepairCatalog) return window.swapioData.saveRepairCatalog(records);
  localStorage.setItem(repairCatalogKey, JSON.stringify(records));
}
function repairPriceIdentity(item){
  return [item.brand, item.model, item.service].map(value => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '')).join(':');
}
function uniqueRepairPriceItems(items){
  const unique = new Map();
  items.forEach(item => {
    const key = repairPriceIdentity(item);
    const current = unique.get(key);
    if(!current || Number(item.updatedAt || 0) >= Number(current.updatedAt || 0)) unique.set(key, item);
  });
  return [...unique.values()];
}
const defaultRepairServices = [
  {id:'repair-service-screen-replacement', service:'Screen Replacement', isService:true, description:'Original-grade display and touch panel replacement.', price:1499, time:'45 min'},
  {id:'repair-service-battery-replacement', service:'Battery Replacement', isService:true, description:'Restore full-day battery life with a certified cell.', price:999, time:'30 min'},
  {id:'repair-service-camera-repair', service:'Camera Repair', isService:true, description:'Front or rear camera module diagnosis and replacement.', price:1199, time:'40 min'},
  {id:'repair-service-charging-port-fix', service:'Charging Port Fix', isService:true, description:'Loose or unresponsive charging port repair.', price:799, time:'35 min'},
  {id:'repair-service-water-damage-recovery', service:'Water Damage Recovery', isService:true, description:'Full diagnostic clean and component-level repair.', price:1999, time:'Same day'},
  {id:'repair-service-software-performance', service:'Software & Performance', isService:true, description:'OS issues, slow performance, boot loops, and more.', price:499, time:'20 min'}
];
function readRepairServices(){
  if(window.swapioData?.readCatalog) return window.swapioData.readCatalog('repair', defaultRepairServices).filter(item => isRepairServiceRecord(item) && !item.deleted);
  return [...defaultRepairServices];
}
function saveRepairServices(items){
  if(window.swapioData?.saveCatalog) return window.swapioData.saveCatalog('repair', [...readRepairCatalog().filter(item => !isRepairServiceRecord(item)), ...items]);
    return saveRepairCatalog([...readRepairCatalog().filter(item => !isRepairServiceRecord(item)), ...items]);
}
function renderRepairServices(){
  const list = document.getElementById('repairServiceList');
  if(!list) return;
  const items = readRepairServices();
  list.innerHTML = `<table class="inventory-table"><thead><tr><th>Repair part</th><th>Description</th><th>Starting price</th><th>Time</th><th>Action</th></tr></thead><tbody>${items.map((item, index) => { const defaults = repairServiceDefaults(item.service); return `<tr><td>${item.service}</td><td>${item.description || defaults.description || '-'}</td><td>${formatCurrency(item.price || defaults.price)}</td><td>${repairTimeLabel(item.time, defaults.time) || '-'}</td><td><button class="btn btn-ghost" type="button" data-edit-repair-service="${index}">Edit</button><button class="btn btn-ghost" type="button" data-delete-repair-service="${index}">Delete</button></td></tr>`; }).join('')}</tbody></table>`;
}
function repairServiceDefaults(service){
  const item = readRepairServices().find(entry => String(entry.service).toLowerCase() === String(service || '').toLowerCase());
  const fallback = defaultRepairServices.find(entry => String(entry.service).toLowerCase() === String(service || '').toLowerCase());
  return {...fallback, ...item};
}
function repairTimeLabel(value, fallback = ''){
  const text = String(value || fallback || '').trim();
  return /^\d+(?:\.\d+)?$/.test(text) ? `${text} min` : text;
}
function renderRepairCatalog(){
  const list = document.getElementById('repairCatalogList');
  if(!list) return;
  const items = uniqueRepairPriceItems(readRepairCatalog().filter(item => !isRepairServiceRecord(item)));
  list.innerHTML = items.length ? `<table class="inventory-table"><thead><tr><th>Service</th><th>Brand</th><th>Model</th><th>Description</th><th>Price</th><th>Time</th><th>Action</th></tr></thead><tbody>${items.map((item, index) => { const defaults = repairServiceDefaults(item.service); return `<tr><td>${item.service}</td><td>${item.brand}</td><td>${item.model}</td><td>${item.description || defaults.description || '-'}</td><td>${formatCurrency(item.price)}</td><td>${repairTimeLabel(item.time, defaults.time) || '-'}</td><td><button class="btn btn-ghost" type="button" data-edit-repair="${index}">Edit</button><button class="btn btn-ghost" type="button" data-delete-repair="${index}">Delete</button></td></tr>`; }).join('')}</tbody></table>` : '<p class="admin-empty">No repair prices added yet.</p>';
}
function setupRepairCatalogManagement(){
  const form = document.getElementById('repairCatalogForm');
  const list = document.getElementById('repairCatalogList');
  const serviceForm = document.getElementById('repairServiceForm');
  const serviceList = document.getElementById('repairServiceList');
  if(!form || !list) return;
  const brandSelect = form.elements.brand;
  const modelSelect = form.elements.model;
  const models = [];
  [...(window.DEFAULT_MODELS || []), ...readSellCatalog(), ...readPhoneCatalog()].forEach(model => {
    if (!model?.brand || !model?.name) return;
    const key = `${String(model.brand).toLowerCase()}:${String(model.name).toLowerCase()}`;
    if (!models.some(existing => existing.key === key)) models.push({ key, brand: String(model.brand).trim(), name: String(model.name).trim() });
  });
  const brands = [...new Map(models.map(model => [model.brand.toLowerCase(), model.brand])).values()].sort((a, b) => a.localeCompare(b));
  brandSelect.innerHTML = '<option value="">Select brand first</option>' + brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
  const updateModels = selectedModel => {
    const matches = models.filter(model => model.brand.toLowerCase() === brandSelect.value.toLowerCase());
    modelSelect.innerHTML = '<option value="">Select model</option>' + matches.map(model => `<option value="${model.name}" ${model.name === selectedModel ? 'selected' : ''}>${model.name}</option>`).join('');
    modelSelect.disabled = !brandSelect.value;
  };
  brandSelect.addEventListener('change', () => updateModels());
  const reset = () => { form.reset(); form.elements.repairIndex.value = ''; updateModels(); form.querySelector('button[type="submit"]').textContent = 'Add repair price'; document.getElementById('cancelRepairEdit').hidden = true; };
  form.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form).entries()); data.updatedAt = Date.now(); data.time = repairTimeLabel(data.time); const index = data.repairIndex; delete data.repairIndex; const existing = readRepairCatalog(); const items = uniqueRepairPriceItems(existing.filter(item => !isRepairServiceRecord(item))); const duplicateIndex = items.findIndex((item, itemIndex) => (index === '' || itemIndex !== Number(index)) && repairPriceIdentity(item) === repairPriceIdentity(data)); if(duplicateIndex >= 0){ window.alert('This repair part already exists for this brand and model. Edit the existing row instead.'); return; } if(index === '') items.unshift(data); else items[Number(index)] = {...items[Number(index)], ...data}; Promise.resolve(saveRepairCatalog([...existing.filter(isRepairServiceRecord), ...items])).catch(error => console.warn('Repair catalog cloud sync failed.', error)); reset(); renderRepairCatalog(); });
  document.getElementById('cancelRepairEdit').addEventListener('click', reset);
  list.addEventListener('click', event => {
    const edit = event.target.closest('[data-edit-repair]');
    const remove = event.target.closest('[data-delete-repair]');
    const items = uniqueRepairPriceItems(readRepairCatalog().filter(item => !isRepairServiceRecord(item)));
    if(edit){ const index = Number(edit.dataset.editRepair); const item = items[index]; brandSelect.value = item.brand || ''; updateModels(item.model); modelSelect.value = item.model || ''; Object.keys(item).forEach(key => { if(form.elements[key] && key !== 'brand' && key !== 'model') form.elements[key].value = item[key]; }); form.elements.repairIndex.value = index; form.querySelector('button[type="submit"]').textContent = 'Update repair price'; document.getElementById('cancelRepairEdit').hidden = false; form.scrollIntoView({behavior:'smooth', block:'center'}); }
    if(remove){ const index = Number(remove.dataset.deleteRepair); if(!window.confirm(`Delete ${items[index].service} price for ${items[index].model}?`)) return; items.splice(index, 1); Promise.resolve(saveRepairCatalog([...readRepairCatalog().filter(isRepairServiceRecord), ...items])).catch(error => console.warn('Repair catalog cloud sync failed.', error)); renderRepairCatalog(); }
  });
  if(serviceForm && serviceList){
    const resetService = () => { serviceForm.reset(); serviceForm.elements.serviceIndex.value = ''; serviceForm.querySelector('button[type="submit"]').textContent = 'Add repair part'; document.getElementById('cancelRepairServiceEdit').hidden = true; };
    serviceForm.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(serviceForm).entries()); data.updatedAt = Date.now(); const index = data.serviceIndex; delete data.serviceIndex; const items = readRepairServices(); data.id = index === '' ? `repair-service-${Date.now()}` : items[Number(index)].id; data.price = Number(data.price); data.isService = true; if(index === '') items.unshift(data); else items[Number(index)] = data; Promise.resolve(saveRepairServices(items)).catch(error => console.warn('Repair service cloud sync failed.', error)); resetService(); renderRepairServices(); });
    document.getElementById('cancelRepairServiceEdit').addEventListener('click', resetService);
    serviceList.addEventListener('click', event => { const edit = event.target.closest('[data-edit-repair-service]'); const remove = event.target.closest('[data-delete-repair-service]'); const items = readRepairServices(); if(edit){ const item = items[Number(edit.dataset.editRepairService)]; Object.keys(item).forEach(key => { if(serviceForm.elements[key]) serviceForm.elements[key].value = item[key]; }); serviceForm.elements.serviceIndex.value = edit.dataset.editRepairService; serviceForm.querySelector('button[type="submit"]').textContent = 'Update repair part'; document.getElementById('cancelRepairServiceEdit').hidden = false; serviceForm.scrollIntoView({behavior:'smooth', block:'center'}); } if(remove){ const index = Number(remove.dataset.deleteRepairService); if(!window.confirm(`Delete ${items[index].service}?`)) return; items[index].deleted = true; Promise.resolve(saveRepairServices(items)).catch(error => console.warn('Repair service cloud sync failed.', error)); renderRepairServices(); } });
  }
  renderRepairCatalog();
  renderRepairServices();
}

const recyclePriceRecordId = 'recycle-global-price-per-gb';
const defaultRecyclePricePerGb = 5;
const recycleMemoryPrices = {'32 GB':299, '64 GB':399, '128 GB':599, '256 GB':899, '512 GB':1299};
function readRecycleCatalog(){
  if(window.swapioData?.readCatalog) return window.swapioData.readCatalog('recycle', [{id: recyclePriceRecordId, prices: recycleMemoryPrices, pricePerGb: defaultRecyclePricePerGb, type: 'global'}]);
  return JSON.parse(localStorage.getItem('swapioRecycleCatalog') || '[]');
}
function saveRecycleCatalog(items){
  if(window.swapioData?.saveCatalog) return window.swapioData.saveCatalog('recycle', items);
  localStorage.setItem('swapioRecycleCatalog', JSON.stringify(items));
}
function renderRecycleCatalog(){
  const form = document.getElementById('recycleCatalogForm');
  if(!form) return;
  const priceRecord = readRecycleCatalog().find(item => item.id === recyclePriceRecordId || item.type === 'global');
  const prices = priceRecord?.prices || Object.fromEntries(Object.entries(recycleMemoryPrices).map(([memory, price]) => [memory, Math.round(Number(priceRecord?.pricePerGb ?? defaultRecyclePricePerGb) * Number.parseFloat(memory))]));
  form.elements.price32.value = prices['32 GB'];
  form.elements.price64.value = prices['64 GB'];
  form.elements.price128.value = prices['128 GB'];
  form.elements.price256.value = prices['256 GB'];
  form.elements.price512.value = prices['512 GB'];
}
function setupRecycleCatalogManagement(){
  const form = document.getElementById('recycleCatalogForm');
  if(!form) return;
  form.addEventListener('submit', event => { event.preventDefault(); const prices = {'32 GB':Number(form.elements.price32.value), '64 GB':Number(form.elements.price64.value), '128 GB':Number(form.elements.price128.value), '256 GB':Number(form.elements.price256.value), '512 GB':Number(form.elements.price512.value)}; const items = readRecycleCatalog().filter(item => item.id !== recyclePriceRecordId && item.type !== 'global'); items.unshift({id: recyclePriceRecordId, type: 'global', prices, domain: 'recycle', updatedAt: Date.now()}); Promise.resolve(saveRecycleCatalog(items)).catch(error => console.warn('Recycle pricing cloud sync failed.', error)); renderRecycleCatalog(); });
  renderRecycleCatalog();
}

// ========== BRAND-AWARE PHONE CATALOG (still used to feed brand pages / Other Brands on the public site) ==========
function readPhoneCatalog(){
  return JSON.parse(localStorage.getItem(catalogKey) || '[]');
}
function savePhoneCatalog(phones){
  localStorage.setItem(catalogKey, JSON.stringify(phones));
}
function getPhonesByBrand(brand){
  const all = readPhoneCatalog();
  return all.filter(phone => (phone.brand || '').toLowerCase() === (brand || '').toLowerCase());
}
function getOtherBrandPhones(){
  const all = readPhoneCatalog();
  const mainBrands = ['apple', 'samsung', 'xiaomi', 'vivo', 'oneplus', 'poco', 'motorola', 'oppo', 'nokia'];
  return all.filter(phone => !mainBrands.includes((phone.brand || '').toLowerCase()));
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
function formatCurrency(value){
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}
function numberToIndianWords(value){
  const num = Math.abs(Number(value || 0));
  if (num === 0) return 'Zero';
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'lakh', 'crore'];

  function belowHundred(n){
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const t = Math.floor(n / 10);
    const r = n % 10;
    return (r === 0 ? tens[t] : `${tens[t]} ${ones[r]}`);
  }

  function belowThousand(n){
    if (n < 100) return belowHundred(n);
    const h = Math.floor(n / 100);
    const r = n % 100;
    return r === 0 ? `${ones[h]} hundred` : `${ones[h]} hundred ${belowHundred(r)}`;
  }

  let result = '';
  let index = 0;
  let remaining = num;
  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const chunkText = belowThousand(chunk);
      const scale = scales[index];
      result = chunkText + (scale ? ` ${scale}` : '') + (result ? ` ${result}` : '')
    }
    remaining = Math.floor(remaining / 1000);
    index += 1;
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}
function getInventoryStatus(item){
  return String(item.status || 'in-stock').toLowerCase();
}
function getInventoryByStatus(statusList){
  const items = readInventory();
  return items.filter(item => statusList.includes(getInventoryStatus(item)));
}
function renderInventory(){
  const items = readInventory();
  const currentItems = getInventoryByStatus(['in-stock', 'reserved']);
  const soldItems = getInventoryByStatus(['sold']);
  const counts = items.reduce((result, item) => { result[item.status] = (result[item.status] || 0) + 1; return result; }, {});
  const stockTable = currentItems.length ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Buy date</th><th>Seller</th><th>Status</th><th>Sale details</th><th></th></tr></thead><tbody>${currentItems.map((item, index) => { const originalIndex = items.findIndex(entry => entry === item); const locked = saleIsLocked(item); const paymentTag = paymentLabel(item.paymentMethod); const actionButtons = [
      `<button class="btn btn-ghost" data-edit-inventory="${originalIndex}">Edit</button>`,
      locked && item.status === 'sold' ? `<button class="btn btn-ghost" data-return-inventory="${originalIndex}">Mark return</button>` : '',
      `<button class="btn btn-ghost" data-delete-inventory="${originalIndex}">Remove</button>`
    ].filter(Boolean).join('');
    return `<tr class="${locked ? 'inventory-locked' : ''}"><td><strong>${item.model}</strong><small>${item.imei || 'No IMEI'}</small></td><td>₹${Number(item.purchasePrice || 0).toLocaleString('en-IN')}<small>${item.purchaseDate || '-'}</small></td><td>${item.seller || '-'}</td><td><span class="pill pill-${item.status === 'sold' ? 'green' : 'gold'}">${item.status}</span>${locked ? '<small>Locked after 48h</small>' : ''}</td><td>${item.salePrice ? `₹${Number(item.salePrice).toLocaleString('en-IN')}${paymentTag ? ` · <span class="pill pill-${item.paymentMethod === 'cash' ? 'gold' : 'green'}">${paymentTag}</span>` : ''}` : '-'}<small>${item.buyer || item.saleDate || ''}</small></td><td>${actionButtons}</td></tr>`; }).join('')}</tbody></table>` : '<p class="admin-empty">No current stock available.</p>';

  const soldTable = soldItems.length ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Buy date</th><th>Seller</th><th>Sell date</th><th>Sale price</th><th>Buyer</th></tr></thead><tbody>${soldItems.map(item => `<tr><td><strong>${item.model}</strong><small>${item.imei || 'No IMEI'}</small></td><td>${item.purchaseDate || '-'}<small>₹${Number(item.purchasePrice || 0).toLocaleString('en-IN')}</small></td><td>${item.seller || '-'}</td><td>${item.saleDate || '-'}</td><td>${item.salePrice ? `₹${Number(item.salePrice).toLocaleString('en-IN')}` : '-'}</td><td>${item.buyer || '-'}</td></tr>`).join('')}</tbody></table>` : '<p class="admin-empty">No sold phones recorded yet.</p>';

  document.getElementById('inventorySummary').textContent = `Total: ${items.length} · In stock: ${counts['in-stock'] || 0} · Sold: ${counts.sold || 0} · In repair: ${counts.repair || 0}`;
  document.getElementById('inventoryList').innerHTML = `
    <div class="inventory-ledger-block">
      <h3 class="inventory-ledger-title">Current stock</h3>
      ${stockTable}
    </div>
    <div class="inventory-ledger-block" style="margin-top:20px;">
      <h3 class="inventory-ledger-title">Sold phones</h3>
      ${soldTable}
    </div>
  `;
}
function renderFinanceDashboard(){
  const items = readInventory();
  const soldItems = items.filter(item => getInventoryStatus(item) === 'sold');
  const availableItems = items.filter(item => ['in-stock', 'reserved'].includes(getInventoryStatus(item)));
  const totalPurchaseValue = items.reduce((sum, item) => sum + Number(item.purchasePrice || 0), 0);
  const totalSaleValue = soldItems.reduce((sum, item) => sum + Number(item.salePrice || 0), 0);
  const totalCostOfSold = soldItems.reduce((sum, item) => sum + Number(item.purchasePrice || 0), 0);
  const totalProfit = totalSaleValue - totalCostOfSold;
  const totalAvailableUnits = availableItems.length;
  const totalAvailableValue = availableItems.reduce((sum, item) => sum + Number(item.purchasePrice || 0), 0);
  const monthlyMap = new Map();

  items.forEach(item => {
    const month = (item.saleDate || item.purchaseDate || new Date().toISOString().slice(0, 10)).slice(0, 7);
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, { month, bought: 0, sold: 0, soldUnits: 0, boughtUnits: 0, profit: 0, available: 0 });
    }
    const bucket = monthlyMap.get(month);
    const purchase = Number(item.purchasePrice || 0);
    const sale = Number(item.salePrice || 0);

    if (item.purchaseDate && item.purchaseDate.startsWith(month)) {
      bucket.bought += purchase;
      bucket.boughtUnits += 1;
    }

    if (getInventoryStatus(item) === 'sold' && item.saleDate && item.saleDate.startsWith(month)) {
      bucket.sold += sale;
      bucket.soldUnits += 1;
      bucket.profit += (sale - purchase);
    }

    if (['in-stock', 'reserved'].includes(getInventoryStatus(item))) {
      bucket.available += 1;
    }
  });

  const monthlyRows = Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month));
  const financeSummary = document.getElementById('financeSummary');
  const financeOverview = document.getElementById('financeOverview');
  const financeMonthlyReport = document.getElementById('financeMonthlyReport');
  const financeList = document.getElementById('financeList');

  if (financeSummary) {
    financeSummary.textContent = `Bought: ${items.length} mobile(s) · Sold: ${soldItems.length} · Available: ${totalAvailableUnits} · Profit: ${formatCurrency(totalProfit)}`;
  }

  if (financeOverview) {
    financeOverview.innerHTML = `
      <div class="admin-model-item"><div class="admin-model-detail"><p>Total buy amount</p><h3>${formatCurrency(totalPurchaseValue)}</h3></div></div>
      <div class="admin-model-item"><div class="admin-model-detail"><p>Total sold amount</p><h3>${formatCurrency(totalSaleValue)}</h3></div></div>
      <div class="admin-model-item"><div class="admin-model-detail"><p>Net profit</p><h3>${formatCurrency(totalProfit)}</h3></div></div>
      <div class="admin-model-item"><div class="admin-model-detail"><p>Available stock value</p><h3>${formatCurrency(totalAvailableValue)}</h3></div></div>
    `;
  }

  if (financeMonthlyReport) {
    financeMonthlyReport.innerHTML = monthlyRows.length
      ? `<table class="inventory-table"><thead><tr><th>Month</th><th>Buy value</th><th>Sold value</th><th>Sold units</th><th>Profit</th><th>Available</th></tr></thead><tbody>${monthlyRows.map(row => `
          <tr>
            <td><strong>${row.month}</strong></td>
            <td>${formatCurrency(row.bought)}</td>
            <td>${formatCurrency(row.sold)}</td>
            <td>${row.soldUnits}</td>
            <td>${formatCurrency(row.profit)}</td>
            <td>${row.available}</td>
          </tr>`).join('')}</tbody></table>`
      : '<p class="admin-empty">No monthly activity yet.</p>';
  }

  if (financeList) {
    financeList.innerHTML = items.length
      ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Buy date</th><th>Sell date</th><th>Buy price</th><th>Sell price</th><th>Status</th></tr></thead><tbody>${items.map(item => `
          <tr>
            <td><strong>${item.model || '-'}</strong><small>${item.imei || 'No IMEI'}</small></td>
            <td>${item.purchaseDate || '-'}</td>
            <td>${item.saleDate || '-'}</td>
            <td>${formatCurrency(item.purchasePrice)}</td>
            <td>${item.salePrice ? formatCurrency(item.salePrice) : '-'}</td>
            <td><span class="pill pill-${getInventoryStatus(item) === 'sold' ? 'green' : 'gold'}">${item.status || 'in-stock'}</span></td>
          </tr>`).join('')}</tbody></table>`
      : '<p class="admin-empty">No inventory rows available.</p>';
  }
}
function paymentLabel(method){
  if(method === 'cash') return 'Cash';
  if(method === 'online') return 'Online';
  return '';
}
function readPhoneCatalog(){
  if (window.swapioData && typeof window.swapioData.readPhoneCatalog === 'function') {
    return window.swapioData.readPhoneCatalog();
  }
  return JSON.parse(localStorage.getItem(catalogKey) || '[]');
}
function savePhoneCatalog(phones){
  if (window.swapioData && typeof window.swapioData.savePhoneCatalog === 'function') {
    return window.swapioData.savePhoneCatalog(phones);
  }
  localStorage.setItem(catalogKey, JSON.stringify(phones));
}
function renderReturns(){
  const list = document.getElementById('returnList');
  const items = readReturns();
  list.innerHTML = items.length ? `<table class="inventory-table"><thead><tr><th>Model</th><th>Customer</th><th>Buy date</th><th>Return date</th><th>Reason</th><th>Notes</th><th></th></tr></thead><tbody>${items.map((item, index) => `<tr><td><strong>${item.model}</strong></td><td>${item.customer || '-'}</td><td>${item.buyDate || '-'}</td><td>${item.returnDate}</td><td>${item.reason}</td><td>${item.notes || '-'}</td><td><button class="btn btn-ghost" data-delete-return="${index}">Delete</button></td></tr>`).join('')}</tbody></table>` : '<p class="admin-empty">No returns recorded yet.</p>';
}
function generateBillHtml(bill, saveState = {}){
  const singleItem = {
    description: bill.model || 'iPhone 13, 128GB',
    hsn: '85171300',
    qty: Number(bill.quantity || 1),
    unit: 'Pcs',
    rate: Number(bill.salePrice || 0),
    amount: Number(bill.salePrice || 0) * Number(bill.quantity || 1),
    imei: bill.imei || '',
    purchasePrice: Number(bill.purchasePrice || 0)
  };
  const invoiceItems = Array.isArray(bill.items) && bill.items.length ? bill.items : [singleItem];
  const totals = invoiceItems.reduce((acc, item) => {
    const qty = Number(item.qty || bill.quantity || 1);
    const unitRate = Number(item.rate || item.amount || 0);
    const lineAmount = unitRate * qty;
    const itemGst = Math.round(lineAmount * 0.18);
    acc.taxableValue += lineAmount;
    acc.gstValue += itemGst;
    acc.total += lineAmount + itemGst;
    return acc;
  }, { taxableValue: 0, gstValue: 0, total: 0 });
  const cgst = Math.round(totals.gstValue / 2);
  const sgst = totals.gstValue - cgst;
  const firebaseSaved = saveState.firebase !== false;
  const localSaved = saveState.local !== false;
  const driveSaved = !!saveState.drive;
  const invoiceNumberRaw = String(bill.billNumber || '0000').replace(/^BILL[-\s]*/i, '').replace(/[^\d]/g, '');
  const invoiceNumber = invoiceNumberRaw ? String(Number(invoiceNumberRaw)).padStart(3, '0') : '001';
  const customerAddressText = bill.customerAddress || '42, Lajpat Nagar, New Delhi, 110024';
  const amountInWords = numberToIndianWords(Math.round(totals.total));

  return `
    <style>
      @page { size: A4; margin: 12mm; }
      .bill-sheet { font-family: 'Inter', Arial, sans-serif; color: #111827; max-width: 820px; margin: 0 auto; background: #fff; border: 2px solid #1f1f1f; padding: 18px 20px 10px; box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06); }
      .bill-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 10px; }
      .bill-title { margin: 0; font-size: 17px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #1a1a1a; }
      .bill-head-meta { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
      .hsn-header { margin-top: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4b5563; }
      .bill-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .bill-action-btn { border: 1px solid #d1d5db; background: #fff; color: #111827; border-radius: 8px; padding: 9px 14px; font-size: 14px; font-weight: 600; cursor: pointer; }
      .bill-action-btn.primary { background: #ef6a38; border-color: #ef6a38; color: #fff; }
      .shop-wrap { display: grid; grid-template-columns: 1.4fr 0.8fr; gap: 16px; padding-top: 8px; }
      .shop-name { font-size: 30px; line-height: 1.1; font-weight: 800; letter-spacing: -0.04em; margin: 0 0 8px; text-align: center; }
      .shop-line { font-size: 14px; color: #374151; margin: 3px 0; text-align: center; }
      .invoice-box { display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-start; }
      .small-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; font-weight: 700; margin-bottom: 2px; }
      .bill-no { font-size: 16px; font-weight: 800; letter-spacing: -0.02em; margin: 0; line-height: 1.2; }
      .date-box { margin-top: 6px; font-size: 12px; color: #374151; text-align: right; }
      .meta-divider { height: 2px; background: #111827; margin: 12px 0 14px; }
      .info-row { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: flex-start; margin-bottom: 12px; }
      .label-tag { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; font-weight: 800; margin-bottom: 8px; }
      .customer-name { font-size: 28px; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.04em; }
      .customer-address { font-size: 14px; line-height: 1.7; color: #374151; }
      .mode-block { display: flex; justify-content: flex-end; align-items: center; gap: 10px; }
      .payment-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 74px; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #e7f8ee; color: #1f7a4d; }
      .items-table { width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed; }
      .items-table th, .items-table td { border: 1px solid #1f1f1f; padding: 8px 6px; text-align: left; vertical-align: top; }
      .items-table th { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #1f1f1f; font-weight: 800; background: #fff; }
      .items-table td { font-size: 10.5px; line-height: 1.35; color: #111827; word-break: break-word; overflow-wrap: anywhere; white-space: normal; }
      .items-table td:nth-child(2) { padding-right: 8px; }
      .items-table th:nth-child(1), .items-table td:nth-child(1) { width: 5%; }
      .items-table th:nth-child(2), .items-table td:nth-child(2) { width: 26%; }
      .items-table th:nth-child(3), .items-table td:nth-child(3) { width: 14%; }
      .items-table th:nth-child(4), .items-table td:nth-child(4) { width: 6%; }
      .items-table th:nth-child(5), .items-table td:nth-child(5) { width: 10%; }
      .items-table th:nth-child(6), .items-table td:nth-child(6) { width: 11%; }
      .items-table th:nth-child(7), .items-table td:nth-child(7) { width: 9%; }
      .items-table th:nth-child(8), .items-table td:nth-child(8) { width: 9%; }
      .items-table th:nth-child(9), .items-table td:nth-child(9) { width: 10%; }
      .money-col { text-align: right; }
      .totals-box { display: flex; justify-content: flex-end; margin-top: 18px; }
      .totals-table { width: 290px; }
      .total-row { display: flex; justify-content: space-between; font-size: 15px; padding: 5px 0; }
      .total-row.total { border-top: 2px solid #111827; margin-top: 4px; padding-top: 9px; font-size: 18px; font-weight: 800; }
      .notes-block { margin-top: 18px; border-top: 1px solid #e5e7eb; padding-top: 16px; }
      .amount-words { font-size: 15px; margin: 0 0 14px; color: #374151; }
      .bank-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px; }
      .bank-card { font-size: 14px; color: #374151; line-height: 1.8; }
      .terms-box { margin-top: 16px; border-top: 1px solid #e5e7eb; padding-top: 14px; }
      .terms-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #374151; margin-bottom: 8px; }
      .terms-text { font-size: 13px; line-height: 1.6; color: #374151; }
      .sign-box { display: flex; justify-content: flex-end; margin-top: 18px; font-size: 14px; color: #374151; }
      .save-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
      .save-tag { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 999px; font-weight: 700; font-size: 12px; }
      .save-tag.success { background: #ecfdf5; color: #1f7a4d; border: 1px solid #b9ebcf; }
      .save-tag.warning { background: #fff7ed; color: #ad5d00; border: 1px solid #f7d7a6; }
      .save-tag.pending { background: #f3f4f6; color: #4b5563; border: 1px solid #dfe3ea; }
      @media print {
        @page { margin: 8mm; }
        html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
        body * { visibility: hidden !important; }
        #billingPrintPreview, #billingPrintPreview * { visibility: visible !important; }
        #billingPrintPreview {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          background: #fff !important;
          box-shadow: none !important;
        }
        .bill-sheet { box-shadow: none !important; border: none !important; border-radius: 0 !important; max-width: none !important; width: 100% !important; }
        .bill-action-btn, .save-row { display: none !important; }
      }
    </style>
    <div class="bill-sheet">
      <div class="bill-head">
        <div class="bill-head-meta">
          <div class="bill-title">TAX INVOICE</div>
          <div class="hsn-header">HSN: 8517</div>
        </div>
        <div class="bill-actions">
          <button class="bill-action-btn" type="button" onclick="window.print()">Print</button>
          <button class="bill-action-btn" type="button" onclick="saveCurrentBillAsPdf()">Save as PDF</button>
          <button class="bill-action-btn primary" type="button" onclick="navigator.share ? navigator.share({ title: 'SmartSwap Invoice', text: 'Invoice ${invoiceNumber}', url: location.href }) : alert('Share not supported in this browser.')">Share</button>
        </div>
      </div>
      <div class="shop-wrap">
        <div>
          <div class="shop-name">SmartSwap.Store</div>
          <div class="shop-line">Shop No. 3, Duggal Colony Gate No. 1, Near Burger King, Deoli Main Road, New Delhi — 110080</div>
          <div class="shop-line">GSTIN: 07ABCD1234F1Z5  |  Phone: +91 98111 22334  |  Email: hello@smartswap.store</div>
        </div>
        <div class="invoice-box">
          <div class="small-label">Invoice no.</div>
          <div class="bill-no">${invoiceNumber}</div>
          <div class="date-box">Invoice date<br>${bill.saleDate || '02-09-2026'}</div>
        </div>
      </div>
      <div class="meta-divider"></div>
      <div class="info-row">
        <div>
          <div class="label-tag">Bill to:</div>
          <div class="customer-name">${bill.customerName || 'Rahul Sharma'}</div>
          <div class="customer-address">${customerAddressText}<br>Contact: ${bill.customerPhone || '+91 98765 43210'}</div>
        </div>
        <div class="mode-block">
          <div>
            <div class="label-tag" style="text-align:right;">Payment mode</div>
            <div style="display:flex; justify-content:flex-end; margin-top:6px;"><span class="payment-pill">${String(bill.paymentMethod || 'UPI').toUpperCase()}</span></div>
          </div>
        </div>
      </div>
      <table class="items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>IMEI No.</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th class="money-col">Final Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceItems.map((item, index) => {
            const qty = Number(item.qty || bill.quantity || 1);
            const lineRate = Number(item.rate || item.amount || 0);
            const lineAmount = lineRate * qty;
            const gst = Math.round(lineAmount * 0.18);
            const cgstRow = Math.round(gst / 2);
            const sgstRow = gst - cgstRow;
            const finalAmount = lineAmount + gst;
            const imeiValue = item.imei || bill.imei || '';
            const description = item.description || item.model || 'Phone';
            const refinedDescription = `${description}${description.toLowerCase().includes('iphone') || description.toLowerCase().includes('phone') ? '' : ' — Refurbished'}`;
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${refinedDescription}</td>
                <td>${imeiValue || '-'}</td>
                <td>${qty}</td>
                <td>${formatCurrency(lineRate)}</td>
                <td>${formatCurrency(lineAmount)}</td>
                <td>${formatCurrency(cgstRow)}</td>
                <td>${formatCurrency(sgstRow)}</td>
                <td class="money-col">${formatCurrency(finalAmount)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="notes-block">
        <div class="amount-words">Amount in words:<br><strong>${amountInWords} rupees only</strong></div>
        <div class="totals-box">
          <div class="totals-table">
            <div class="total-row"><span>Taxable value</span><strong>${formatCurrency(totals.taxableValue)}</strong></div>
            <div class="total-row"><span>CGST @ 9%</span><strong>${formatCurrency(cgst)}</strong></div>
            <div class="total-row"><span>SGST @ 9%</span><strong>${formatCurrency(sgst)}</strong></div>
            <div class="total-row total"><span>Final amount</span><strong>${formatCurrency(totals.total)}</strong></div>
          </div>
        </div>
      </div>
      <div class="terms-box">
        <div class="terms-title">Terms & conditions</div>
        <div class="terms-text">30-day warranty against manufacturing defects only. Physical or liquid damage not covered. IMEI verified and recorded at time of sale. Goods once sold will not be exchanged.<br><br><strong>Margin scheme note:</strong> Taxed under Rule 32(5), CGST Rules 2017. GST charged only on the dealer's margin, not the full sale value, since no ITC was claimed on purchase of this used phone.</div>
      </div>
      <div class="sign-box">Authorised signatory<br><strong>For SmartSwap.Store</strong></div>
      <div class="save-row">
        <span class="save-tag ${firebaseSaved ? 'success' : 'warning'}">${firebaseSaved ? '✓ Saved to Firebase' : '⚠ Firebase save failed'}</span>
        <span class="save-tag ${localSaved ? 'success' : 'warning'}">${localSaved ? '✓ Backed up on PC' : '⚠ PC backup failed'}</span>
        <span class="save-tag ${driveSaved ? 'success' : 'pending'}">${driveSaved ? '✓ Copied to Drive + emailed to admin' : '⏳ Drive + Gmail pending'}</span>
      </div>
    </div>
  `;
}
function showBillPreview(bill){
  const preview = document.getElementById('billingPrintPreview');
  if (!preview) return;
  preview.innerHTML = generateBillHtml(bill, bill.saveStatus || { firebase: true, local: true, drive: false });
  preview.style.display = 'block';
}
function printCurrentBill(){
  const preview = document.getElementById('billingPrintPreview');
  if (!preview || !preview.innerHTML.trim()) return;
  const previousTitle = document.title;
  document.title = 'SmartSwap Invoice';
  window.print();
  setTimeout(() => { document.title = previousTitle; }, 300);
}
function saveCurrentBillAsPdf(){
  const preview = document.getElementById('billingPrintPreview');
  if (!preview || !preview.innerHTML.trim()) return;
  const printableHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SmartSwap Invoice</title><style>@page{size:A4;margin:12mm} body{font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;margin:0;} .invoice-wrap{max-width:820px;margin:0 auto;background:#fff;padding:18px;} </style></head><body><div class="invoice-wrap">${preview.innerHTML}</div></body></html>`;
  const blob = new Blob([printableHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const billCode = String(document.querySelector('#billingPrintPreview .bill-no')?.textContent || '001').replace(/\s+/g, '-');
  link.download = `SmartSwap_${billCode}_invoice.html`;
  link.click();
  URL.revokeObjectURL(url);
}
function downloadBillBackup(){
  const bills = readBills();
  const currentBill = bills[0] || {};
  const billCode = String(currentBill.billNumber || 'BILL-0000').replace(/\s+/g, '-');
  const blob = new Blob([JSON.stringify(bills, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `SmartSwap_${billCode}_backup.json`;
  link.click();
  URL.revokeObjectURL(url);
}
function renderBillingLedger(){
  const list = document.getElementById('billingList');
  const bills = readBills();
  if (!list) return;
  list.innerHTML = bills.length ? `<table class="inventory-table"><thead><tr><th>Bill</th><th>Customer</th><th>Model</th><th>Sale date</th><th>Price</th><th>Payment</th><th>Notes</th><th>Action</th></tr></thead><tbody>${bills.map((bill, index) => `<tr><td><strong>${bill.billNumber || `#${index + 1}`}</strong></td><td>${bill.customerName || '-'}<small>${bill.customerPhone || ''}</small></td><td>${bill.model || '-'}</td><td>${bill.saleDate || '-'}</td><td>${bill.salePrice ? formatCurrency(bill.salePrice) : '-'}</td><td>${bill.paymentMethod || '-'}</td><td>${bill.notes || '-'}</td><td><button class="btn btn-ghost" data-view-bill="${index}">Print</button> <button class="btn btn-ghost" data-edit-bill="${index}">Edit</button> <button class="btn btn-ghost" data-delete-bill="${index}">Delete</button></td></tr>`).join('')}</tbody></table>` : '<p class="admin-empty">No sales bills recorded yet.</p>';
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
    if(returned){ const item = items[Number(returned.dataset.returnInventory)]; const reason = window.prompt('Return reason?'); if(!reason) return; const returnDate = new Date().toISOString().slice(0, 10); item.status = 'returned'; saveInventory(items); const returns = readReturns(); returns.unshift({model:item.model, customer:item.buyer || '', buyDate:item.purchaseDate || '', returnDate, reason, notes:'Linked from inventory'}); saveReturns(returns); renderInventory(); renderReturns(); renderFinanceDashboard(); downloadInventoryCsv(); }
    if(remove){ const index = Number(remove.dataset.deleteInventory); if(!window.confirm(`Remove "${items[index].model}" from inventory?`)) return; items.splice(index, 1); saveInventory(items); renderInventory(); renderFinanceDashboard(); }
  });
  document.getElementById('exportInventory').addEventListener('click', downloadInventoryCsv);
  document.getElementById('exportReturns').addEventListener('click', downloadReturnsCsv);
  document.getElementById('importInventory').addEventListener('change', event => { const file = event.target.files[0]; if(!file) return; const reader = new FileReader(); reader.onload = () => { const lines = String(reader.result).trim().split(/\r?\n/); const columns = parseCsvLine(lines.shift()); const imported = lines.filter(Boolean).map(line => Object.fromEntries(parseCsvLine(line).map((value, index) => [columns[index], value]))); saveInventory([...imported, ...readInventory()]); renderInventory(); renderFinanceDashboard(); downloadInventoryCsv(); event.target.value = ''; }; reader.readAsText(file); });
  seedInventory();
  renderInventory();
  renderReturns();
  renderBillingLedger();
  renderFinanceDashboard();
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

let adminRequestType = 'sell';
let adminRequestStatus = 'all';
let adminRequestDate = 'all';
let adminSubmissionsCache = [];

function submissionType(item){
  const type = String(item.type || '').toLowerCase();
  return ['buy', 'sell', 'repair', 'recycle'].includes(type) ? type : 'sell';
}

function submissionStatus(item){
  return String(item.status || 'new').toLowerCase().replace(/\s+/g, '-');
}

function submissionRequestNumber(item){
  if (item.requestNumber) return item.requestNumber;
  const prefix = submissionType(item) === 'buy' ? 'BUY' : submissionType(item).toUpperCase();
  return `${prefix}-${String(item.id || 'PENDING').slice(-4).toUpperCase()}`;
}

function submissionDisplayValue(value){
  if (value === null || value === undefined || value === '') return '-';
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

function submissionDateTime(value){
  const date = new Date(Number(value) || value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

function submissionDateKey(value){
  const date = new Date(Number(value) || value);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function adminDateKey(offset = 0){
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function requestAnswerRows(title, labels, answers, yesMeaning, noMeaning, problemWhen){
  if (!Array.isArray(answers) || !answers.length) return '';
  return `<section class="request-answer-section"><h4>${title}</h4><div class="request-answer-list">${labels.map((label, index) => {
    const answer = String(answers[index] || 'Not answered');
    const isProblem = problemWhen(answer, index);
    const meaning = answer === 'Yes' ? yesMeaning : answer === 'No' ? noMeaning : answer;
    return `<div class="request-answer-row ${isProblem ? 'is-problem' : 'is-ok'}"><span>${label}</span><strong>${meaning}</strong></div>`;
  }).join('')}</div></section>`;
}

function requestDetailMarkup(item){
  const problemLabels = ['Front Camera', 'Back Camera', 'Volume Button', 'Finger Touch', 'WiFi', 'Battery', 'Speaker', 'Power Button'];
  const screenBodyLabels = ['Broken / scratched screen', 'Dead spot / visible line / discoloration', 'Scratch / dent on body', 'Panel missing / broken'];
  const conditionLabels = ['Calls', 'Touch screen', 'Original screen'];
  const accessoryLabels = ['Original charger', 'Original box with same IMEI', 'Original bill with IMEI'];
  const excluded = ['id', 'photos', 'problemAnswers', 'conditionAnswers', 'accessoryAnswers', 'createdAt'];
  const fields = Object.entries(item).filter(([key, value]) => !excluded.includes(key) && value !== '').map(([key, value]) => `<div class="request-detail-field"><strong>${key.replace(/([A-Z])/g, ' $1')}</strong><span>${submissionDisplayValue(value)}</span></div>`).join('');
  const screenBodySection = Array.isArray(item.screenBodyAnswers) && item.screenBodyAnswers.length
    ? requestAnswerRows('Screen / body condition', screenBodyLabels, item.screenBodyAnswers, 'Damage found', 'No damage', answer => answer === 'Yes')
    : '<section class="request-answer-section"><h4>Screen / body condition</h4><div class="request-not-collected">Not collected in this request.</div></section>';
  const usesWorkingStatus = item.problemAnswerMode === 'working-status-v1';
  const functionalYesMeaning = usesWorkingStatus ? 'Working' : 'Not working';
  const functionalNoMeaning = usesWorkingStatus ? 'Not working' : 'Working';
  const functionalProblemValue = usesWorkingStatus ? 'No' : 'Yes';
  return `<div class="request-detail-form"><div class="request-detail-field"><strong>Created time</strong><span>${submissionDateTime(item.createdAt)}</span></div>${fields}</div>${screenBodySection}${requestAnswerRows('Functional / physical problems', problemLabels, item.problemAnswers, functionalYesMeaning, functionalNoMeaning, answer => answer === functionalProblemValue)}${requestAnswerRows('Device condition', conditionLabels, item.conditionAnswers, 'Working / original', 'Problem / changed', answer => answer === 'No')}${requestAnswerRows('Accessories', accessoryLabels, item.accessoryAnswers, 'Available', 'Not available', answer => answer === 'No')}`;
}

function renderAdminSubmissionTabs(submissions){
  document.querySelectorAll('[data-request-type]').forEach(tab => {
    const type = tab.dataset.requestType;
    const count = submissions.filter(item => submissionType(item) === type).length;
    tab.querySelector('span').textContent = count;
    const active = type === adminRequestType;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}

async function renderAdminSubmissions(){
  const list = document.getElementById('adminSubmissions');
  try {
    adminSubmissionsCache = (await readSubmissions()) || [];
    const dateInput = document.getElementById('requestDateInput');
    const dateStrip = document.getElementById('requestDateStrip');
    const recentDates = Array.from({length: 8}, (_, index) => adminDateKey(-index));
    if (dateStrip) dateStrip.innerHTML = `${recentDates.map((date, index) => `<button type="button" class="request-date-button ${adminRequestDate === date ? 'active' : ''}" data-request-date="${date}">${index === 0 ? 'Today' : date.slice(-2)}</button>`).join('')}<button type="button" class="request-date-button ${adminRequestDate === 'all' ? 'active' : ''}" data-request-date="all">All</button>`;
    if (dateInput) {
      dateInput.value = recentDates.includes(adminRequestDate) || adminRequestDate === 'all' ? '' : adminRequestDate;
    }
    renderAdminSubmissionTabs(adminSubmissionsCache);
    const selectedDate = adminRequestDate === 'today' ? adminDateKey() : adminRequestDate === 'yesterday' ? adminDateKey(-1) : adminRequestDate;
    const filtered = adminSubmissionsCache.filter(item => submissionType(item) === adminRequestType && (adminRequestStatus === 'all' || submissionStatus(item) === adminRequestStatus) && (selectedDate === 'all' || submissionDateKey(item.createdAt) === selectedDate));
    const summary = document.getElementById('requestSummary');
    if(summary) summary.textContent = `${adminRequestType.charAt(0).toUpperCase() + adminRequestType.slice(1)} queue · Total: ${filtered.length} · New: ${filtered.filter(item => submissionStatus(item) === 'new').length} · In progress: ${filtered.filter(item => submissionStatus(item) === 'in-progress').length} · Completed: ${filtered.filter(item => submissionStatus(item) === 'completed').length}`;
    list.innerHTML = filtered.length ? filtered.map(item => {
      const requestNumber = submissionRequestNumber(item);
      const details = Object.entries(item).filter(([key, value]) => !['type', 'name', 'phone', 'customerPhone', 'email', 'createdAt', 'photos', 'status', 'requestNumber', 'id'].includes(key) && value !== '').map(([key, value]) => `<span><strong>${key.replace(/([A-Z])/g, ' $1')}</strong>${typeof value === 'object' ? JSON.stringify(value) : value}</span>`).join('');
      const status = submissionStatus(item);
      return `<article class="submission-item request-row" data-request-id="${item.id || ''}"><div class="request-row-cell request-number-cell"><strong>${requestNumber}</strong><small>Request no.</small></div><div class="request-row-cell"><strong>${submissionType(item)}</strong><small>Category</small></div><div class="request-row-cell"><strong>${item.name || 'Customer'}</strong><small>Customer</small></div><div class="request-row-cell"><strong>${item.customerPhone || item.phone || item.email || 'No contact'}</strong><small>Mobile</small></div><div class="request-row-cell request-time-cell"><strong>${item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN', {dateStyle:'short', timeStyle:'short'}) : 'Unknown'}</strong><small>Created</small></div><small class="request-row-hint">Tap to view full request</small></article>`;
    }).join('') : '<p class="admin-empty">No requests in this queue.</p>';
  } catch (error) {
    list.innerHTML = `<p class="admin-empty">Could not load customer requests. ${error.message || 'Check Firebase permissions.'}</p>`;
  }
}

const adminCatalogViews = { buy: null, sell: null, buyOpen: true, sellOpen: true };

function catalogBrandLabel(model){
  if (/^poco\b/i.test(String(model.name || '').trim())) return 'Poco';
  const brand = String(model.brand || '').trim();
  if(brand) return brand.charAt(0).toUpperCase() + brand.slice(1);
  const specBrand = String(model.spec || '').split('·').pop().trim();
  return specBrand || 'Other';
}

function catalogModelBrand(model){
  return model.brand || String(model.spec || '').split('·').pop().trim();
}

function catalogVariantSummary(model){
  if(Array.isArray(model.storageVariants) && model.storageVariants.length){
    return model.storageVariants.map(item => `${item.storage}: ₹${Number(item.price || 0).toLocaleString('en-IN')}`).join(' · ');
  }
  return model.spec || 'No storage variant added';
}

function catalogModelSearchResults(type, query, scope, view = null){
  const models = type === 'buy' ? getCatalogBuyModels() : getCatalogSellModels();
  const needle = String(query || '').trim().toLowerCase();
  if(!needle) return [];
  return models.filter(model => {
    const brand = catalogBrandLabel(model).toLowerCase();
    const selected = String(view || '').toLowerCase();
    if(scope === 'brand' && selected && brand !== selected) return false;
    const name = String(model.name || '').toLowerCase();
    const spec = String(model.spec || '').toLowerCase();
    const text = `${brand} ${name} ${spec}`;
    return text.includes(needle);
  }).slice(0, 12);
}

function getCatalogBuyModels(){
  const buyModels = readBuyModels().map(model => ({...model, custom:false}));
  const customProducts = readProducts().map((product, index) => ({
    ...product,
    customIndex: index,
    custom: true,
    image: product.frontImage || product.photos?.[0] || '',
    spec: product.details || `${product.brand} · Added phone`,
    price: product.price,
    grade: product.grade || 'Superb',
    warranty: product.warranty || '30-day'
  }));
  return [...buyModels, ...customProducts].filter((model, index, all) => all.findIndex(candidate => modelIdentity(candidate.name, catalogModelBrand(candidate)) === modelIdentity(model.name, catalogModelBrand(model))) === index);
}

function getCatalogSellModels(){
  return uniqueModels(readSellModels());
}

function getCatalogBuyModelsForSearch(){
  const buyModels = readBuyModels().map(model => ({...model, custom:false}));
  const customProducts = readProducts().map((product, index) => ({
    ...product,
    customIndex: index,
    custom: true,
    image: product.frontImage || product.photos?.[0] || '',
    spec: product.details || `${product.brand} · Added phone`,
    price: product.price,
    grade: product.grade || 'Superb',
    warranty: product.warranty || '30-day'
  }));
  return [...buyModels, ...customProducts].filter((model, index, all) => all.findIndex(candidate => modelIdentity(candidate.name, catalogModelBrand(candidate)) === modelIdentity(model.name, catalogModelBrand(model))) === index);
}

function getCatalogSellModelsForSearch(){
  return uniqueModels(readSellModels());
}

function renderCatalogSearchResults(typeName, query, scope, view, results){
  const models = typeName === 'buy' ? getCatalogBuyModelsForSearch() : getCatalogSellModelsForSearch();
  const q = String(query || '').trim().toLowerCase();
  if(!q){
    results.innerHTML = '';
    results.classList.remove('open');
    return;
  }
  const filtered = models.filter(model => {
    const brand = catalogBrandLabel(model).toLowerCase();
    if(scope === 'brand' && view && view !== '__all__' && brand !== String(view).toLowerCase()) return false;
    const name = String(model.name || '').toLowerCase();
    const spec = String(model.spec || '').toLowerCase();
    return `${brand} ${name} ${spec}`.includes(q);
  }).slice(0, 12);
  if(!filtered.length){
    results.innerHTML = '<div class="admin-catalog-search-result">No matching model</div>';
  } else {
    results.innerHTML = filtered.map(model => {
      const brand = catalogBrandLabel(model);
      const brandKey = brand.toLowerCase();
      return `<div class="admin-catalog-search-result" data-catalog-search-result="true" data-catalog-brand="${brandKey}" data-catalog-type="${typeName}"><span class="admin-catalog-search-brand">${brand}</span><span class="admin-catalog-search-model">${model.name}</span></div>`;
    }).join('');
  }
  results.classList.add('open');
}

function renderCatalogBrandPicker(list, models, type, title){
  const brands = [...new Map(models.map(model => {
    const label = catalogBrandLabel(model);
    return [label.toLowerCase(), label];
  })).entries()].sort((first, second) => first[1].localeCompare(second[1]));
  list.innerHTML = brands.length ? `
    <div class="admin-catalog-browser">
      <div class="admin-catalog-browser-head"><strong>Select ${title} brand</strong><span>${models.length} models</span></div>
      <div class="admin-catalog-search-wrap" data-catalog-search-wrap="${type}" data-catalog-search-scope="brands">
        <input class="admin-catalog-searchbox" type="search" autocomplete="off" placeholder="Search ${title} brand or model" data-catalog-search="${type}" data-catalog-scope="brands" data-catalog-view="__all__">
        <div class="admin-catalog-search-results" data-catalog-search-results="${type}"></div>
      </div>
      <div class="admin-brand-grid">${brands.map(([key, label]) => {
        const count = models.filter(model => catalogBrandLabel(model).toLowerCase() === key).length;
        return `<button class="admin-brand-card" type="button" data-catalog-brand="${key}" data-catalog-type="${type}"><strong>${label}</strong><span>${count} ${count === 1 ? 'model' : 'models'}</span></button>`;
      }).join('')}</div>
    </div>` : `<p class="admin-empty">No phones in ${type} catalog yet.</p>`;
}

function renderCatalogModels(list, models, type, view){
  const compareModelNames = (firstName, secondName) => {
    const first = String(firstName || ''), second = String(secondName || '');
    const firstNumber = first.match(/\d+/), secondNumber = second.match(/\d+/);
    if(firstNumber && secondNumber && Number(firstNumber[0]) !== Number(secondNumber[0])) return Number(firstNumber[0]) - Number(secondNumber[0]);
    if(firstNumber && !secondNumber) return -1;
    if(!firstNumber && secondNumber) return 1;
    return first.localeCompare(second, undefined, {numeric:true, sensitivity:'base'});
  };
  const filtered = (view === '__all__' ? models : models.filter(model => catalogBrandLabel(model).toLowerCase() === view))
    .sort((first, second) => compareModelNames(first.name, second.name));
  const rows = filtered.map(model => type === 'sell' ? `
    <article class="admin-item" data-sell-type="canonical" data-sell-ref="${model.id}" style="cursor:pointer;">
      ${model.image ? `<img src="${model.image}" alt="${model.name}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;">` : '<div class="admin-thumb">PHONE</div>'}
      <div><h4>${model.name}${model.hidden || model.deleted ? ' (Hidden)' : ''}</h4><p>${catalogVariantSummary(model)}</p></div>
      <button class="btn btn-ghost" type="button" data-sell-edit>Edit</button>
      <button class="btn btn-ghost" type="button" data-toggle-sell-canonical="${model.id}">${model.hidden || model.deleted ? 'Restore' : 'Hide'}</button><button class="btn btn-ghost" type="button" data-delete-sell-canonical="${model.id}">Delete</button>
    </article>` : `
    <article class="admin-item" data-buy-type="${model.custom ? 'custom' : 'buy'}" data-buy-ref="${model.custom ? model.customIndex : model.id}" style="cursor:pointer;">
      ${model.image ? `<img src="${model.image}" alt="${model.name}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;">` : '<div class="admin-thumb">PHONE</div>'}
      <div><h4>${model.name}${(model.custom && model.visible === false) || (!model.custom && (model.hidden || model.deleted)) ? ' (Hidden)' : ''}</h4><p>${catalogVariantSummary(model)}${model.grade ? ` · ${model.grade}` : ''}${model.warranty ? ` · ${model.warranty} warranty` : ''}</p></div>
      <button class="btn btn-ghost" type="button" data-buy-edit>Edit</button>
      ${model.custom ? `<button class="btn btn-ghost" type="button" data-toggle-product="${model.customIndex}">${model.visible ? 'Hide' : 'Show'}</button><button class="btn btn-ghost" type="button" data-delete-product="${model.customIndex}">Delete</button>` : `<button class="btn btn-ghost" type="button" data-toggle-buy-canonical="${model.id}">${model.hidden || model.deleted ? 'Restore' : 'Hide'}</button><button class="btn btn-ghost" type="button" data-delete-buy-canonical="${model.id}">Delete</button>`}
    </article>`).join('');
  const heading = view === '__all__' ? `All ${type} models` : (filtered.length ? catalogBrandLabel(filtered[0]) : view);
  const selectedBrand = String(view || '').trim().toLowerCase();
  const searchScope = view === '__all__' ? 'brands' : 'brand';
  list.innerHTML = `<div class="admin-catalog-browser-head"><button class="btn btn-ghost" type="button" data-catalog-back="${type}">Back to brands</button><strong>${heading}</strong><span>${filtered.length} models</span></div>
    <div class="admin-catalog-search-wrap" data-catalog-search-wrap="${type}" data-catalog-search-scope="${searchScope}">
      <input class="admin-catalog-searchbox" type="search" autocomplete="off" placeholder="Search ${heading} model" data-catalog-search="${type}" data-catalog-scope="${searchScope}" data-catalog-view="${selectedBrand || '__all__'}">
      <div class="admin-catalog-search-results" data-catalog-search-results="${type}"></div>
    </div>
    ${rows || '<p class="admin-empty">No models in this brand.</p>'}`;
}

// Show all sell models through a brand-first browser.
function renderAdminSellModels(){
  const list = document.getElementById('adminSellModels');
  if(!list) return;
  if(!adminCatalogViews.sellOpen){
    list.innerHTML = '';
    return;
  }
  const models = uniqueModels(readSellModels());
  if(!models.length){
    list.innerHTML = '<p class="admin-empty">No phones in sell catalog yet. Use "Add sell phone" above.</p>';
    return;
  }
  if(adminCatalogViews.sell) renderCatalogModels(list, models, 'sell', adminCatalogViews.sell);
  else renderCatalogBrandPicker(list, models, 'sell', 'sell phone');
}

// Buy phone catalog: merges the fixed buy-model list with any custom phones
// added through the top "Add phone" form, and renders it as a clickable list
// (same pattern as the sell catalog) so tapping a row loads it into the form
// above for editing. No more "View Buy page" redirect — everything happens here.
function renderAdminBuyModels(){
  const list = document.getElementById('adminBuyModels');
  if(!list) return;
  if(!adminCatalogViews.buyOpen){
    list.innerHTML = '';
    return;
  }
  const buyModels = readBuyModels().map(model => ({...model, custom:false}));
  const customProducts = readProducts().map((product, index) => ({
    ...product,
    customIndex: index,
    custom: true,
    image: product.frontImage || product.photos?.[0] || '',
    spec: product.details || `${product.brand} · Added phone`,
    price: product.price,
    grade: product.grade || 'Superb',
    warranty: product.warranty || '30-day'
  }));
  const models = [...buyModels, ...customProducts].filter((model, index, all) => all.findIndex(candidate => modelIdentity(candidate.name, catalogModelBrand(candidate)) === modelIdentity(model.name, catalogModelBrand(model))) === index);
  if(!models.length){
    list.innerHTML = '<p class="admin-empty">No phones in buy catalog yet. Use "Add phone" above.</p>';
    return;
  }
  if(adminCatalogViews.buy) renderCatalogModels(list, models, 'buy', adminCatalogViews.buy);
  else renderCatalogBrandPicker(list, models, 'buy', 'buy phone');
}

function readPhoneCatalog(){
  if (window.swapioData && typeof window.swapioData.readPhoneCatalog === 'function') {
    return window.swapioData.readPhoneCatalog();
  }
  return JSON.parse(localStorage.getItem(catalogKey) || '[]');
}
function savePhoneCatalog(phones){
  if (window.swapioData && typeof window.swapioData.savePhoneCatalog === 'function') {
    return window.swapioData.savePhoneCatalog(phones);
  }
  localStorage.setItem(catalogKey, JSON.stringify(phones));
}

async function loadAllDataFromCloud() {
  const cloudProducts = await loadProductsFromCloud();
  const cloudInventory = await loadInventoryFromCloud();
  const cloudReturns = await loadReturnsFromCloud();
  const cloudBuyCatalog = await window.swapioData?.loadBuyCatalogFromCloud?.();
  const cloudSellCatalog = await window.swapioData?.loadSellCatalogFromCloud?.();
  const cloudRepairCatalog = await window.swapioData?.loadRepairCatalogFromCloud?.();
  const cloudRecycleCatalog = await window.swapioData?.loadRecycleCatalogFromCloud?.();
  
  if (cloudProducts !== null) {
    localStorage.setItem(productStoreKey, JSON.stringify(cloudProducts));
  }
  if (cloudInventory !== null) {
    localStorage.setItem(inventoryKey, JSON.stringify(cloudInventory));
  }
  if (cloudReturns !== null) {
    localStorage.setItem(returnsKey, JSON.stringify(cloudReturns));
  }
  if (cloudBuyCatalog !== null && cloudBuyCatalog !== undefined) {
    localStorage.setItem('swapioBuyCatalog', JSON.stringify(cloudBuyCatalog));
    localStorage.setItem('swapioBuyModels', JSON.stringify(Object.fromEntries(cloudBuyCatalog.map(model => [model.id, model]))));
  }
  if (cloudSellCatalog !== null && cloudSellCatalog !== undefined) {
    localStorage.setItem(sellCatalogKey, JSON.stringify(cloudSellCatalog));
  }
  if (cloudRepairCatalog !== null && cloudRepairCatalog !== undefined) {
    localStorage.setItem(repairCatalogKey, JSON.stringify(cloudRepairCatalog));
    renderRepairCatalog();
  }
  if (cloudRecycleCatalog !== null && cloudRecycleCatalog !== undefined) {
    localStorage.setItem('swapioRecycleCatalog', JSON.stringify(cloudRecycleCatalog));
  }

  if (window.swapioData?.readCatalog && window.swapioData?.saveCatalog) {
    await Promise.all([
      window.swapioData.saveCatalog('buy', readBuyModels()),
      window.swapioData.saveCatalog('sell', readSellModels()),
      window.swapioData.saveCatalog('repair', [...readRepairCatalog().filter(item => !isRepairServiceRecord(item)), ...readRepairServices()]),
      window.swapioData.saveCatalog('recycle', readRecycleCatalog())
    ]);
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
  setupRepairCatalogManagement();
  setupRecycleCatalogManagement();

  const showDashboardFallback = async () => {
    sessionStorage.setItem('swapioAdminLoggedIn', 'true');
    login.hidden = true;
    dashboard.hidden = false;
    await loadAllDataFromCloud();
    renderAdminProducts();
    renderAdminBuyModels();
    renderAdminSellModels();
    renderAdminSubmissions();
    renderInventory();
    renderReturns();
    renderFinanceDashboard();
  };

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
    showAdminMessage('Firebase Auth is not configured. Configure Firebase before opening the admin dashboard.');
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
  const brandSelect = productForm.elements.brand;
  const otherBrandInput = document.getElementById('otherBrandName');

  // Show/hide "Other Brand" input based on brand selection
  function updateBrandInputVisibility(){
    otherBrandInput.style.display = brandSelect.value === 'OTHER' ? 'block' : 'none';
    if(brandSelect.value === 'OTHER'){
      otherBrandInput.required = true;
    } else {
      otherBrandInput.required = false;
      otherBrandInput.value = '';
    }
  }
  brandSelect.addEventListener('change', updateBrandInputVisibility);

  // Normalizes any stored brand value (case-insensitive, or a spec string like
  // "128GB · Apple") into the correct <option> in the brand dropdown, falling
  // back to "Other Brand" with the custom name filled in when there's no match.
  function setBrandSelectValue(brandRaw){
    const raw = String(brandRaw || '').trim();
    if(!raw){ brandSelect.value = ''; otherBrandInput.value = ''; updateBrandInputVisibility(); return; }
    const knownOptions = Array.from(brandSelect.options).map(opt => opt.value).filter(v => v && v !== 'OTHER');
    const match = knownOptions.find(opt => opt.toLowerCase() === raw.toLowerCase());
    if(match){ brandSelect.value = match; otherBrandInput.value = ''; }
    else { brandSelect.value = 'OTHER'; otherBrandInput.value = raw; }
    updateBrandInputVisibility();
  }

  // Pulls the brand out of a "storage · brand" spec string (used by preset
  // buy/sell models which don't store brand as its own field).
  function brandFromSpec(spec){
    const parts = String(spec || '').split('·').map(s => s.trim());
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  function resetProductForm(){
    productForm.reset();
    productForm.querySelectorAll('.storage-price').forEach(input => { input.disabled = true; input.value = ''; });
    productForm.elements.editIndex.value = '';
    productFormTitle.textContent = 'Add phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Add phone';
    cancelEdit.hidden = true;
    updateBrandInputVisibility();
  }

  productForm.querySelectorAll('input[name="storageVariant"]').forEach(checkbox => checkbox.addEventListener('change', () => {
    const priceInput = productForm.querySelector(`[data-storage-price="${checkbox.value}"]`);
    priceInput.disabled = !checkbox.checked;
    if(!checkbox.checked) priceInput.value = '';
  }));

  function getModelStorageVariants(model){
    if(Array.isArray(model.storageVariants) && model.storageVariants.length) return model.storageVariants;
    if(Array.isArray(model.storageOptions) && model.storageOptions.length){
      return model.storageOptions.map(storage => ({storage: String(storage).trim(), price: model.price || ''}));
    }
    const legacy = String(model.details || model.spec || '').split('·')[0].trim();
    const matches = legacy.match(/\d+\s*GB/gi) || [];
    return matches.map(storage => ({storage: storage.replace(/\s+/g, ' '), price: model.price || ''}));
  }

  function ensureCustomStorageRows(count){
    const list = productForm.querySelector('.storage-variant-list');
    const current = list.querySelectorAll('input[data-custom-storage="true"]').length;
    for(let index = current + 1; index <= count; index++){
      const key = `custom-${index}`;
      list.insertAdjacentHTML('beforeend', `<label class="storage-variant-row custom-storage-row"><input type="checkbox" name="storageVariant" value="${key}" data-custom-storage="true"><input class="storage-variant-name" data-storage-name="${key}" type="text" placeholder="e.g. 128 GB"><span class="storage-price-label">Custom variant price (₹)</span><input class="storage-price" data-storage-price="${key}" aria-label="Custom variant price" type="number" min="0" placeholder="Enter price" disabled></label>`);
      const checkbox = list.querySelector(`input[value="${key}"]`);
      checkbox.addEventListener('change', () => {
        const priceInput = list.querySelector(`[data-storage-price="${key}"]`);
        priceInput.disabled = !checkbox.checked;
        if(!checkbox.checked) priceInput.value = '';
      });
    }
  }

  function fillStorageVariants(model){
    const variants = getModelStorageVariants(model);
    const fixedValues = new Set(['2/32', '4/64', '6/128', '6/256', '8/256', '8/512']);
    const customVariants = variants.filter(item => !fixedValues.has(String(item.storage)));
    ensureCustomStorageRows(customVariants.length);
    let customIndex = 0;
    productForm.querySelectorAll('input[name="storageVariant"]').forEach(checkbox => {
      const customName = checkbox.dataset.customStorage === 'true' ? productForm.querySelector(`[data-storage-name="${checkbox.value}"]`) : null;
      const stored = checkbox.dataset.customStorage === 'true'
        ? customVariants[customIndex++]
        : variants.find(item => String(item.storage) === checkbox.value);
      checkbox.checked = Boolean(stored);
      const priceInput = productForm.querySelector(`[data-storage-price="${checkbox.value}"]`);
      priceInput.disabled = !stored;
      priceInput.value = stored ? stored.price : '';
      if(customName) customName.value = stored ? stored.storage : '';
    });
  }

  cancelEdit.addEventListener('click', resetProductForm);
  productForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.updatedAt = Date.now();
    
    // Handle "Other Brand" custom name
    if(data.brand === 'OTHER'){
      data.brand = data.otherBrandName || 'Other';
    }
    delete data.otherBrandName;
    const storageVariants = Array.from(productForm.querySelectorAll('input[name="storageVariant"]:checked')).map(checkbox => {
      const priceInput = productForm.querySelector(`[data-storage-price="${checkbox.value}"]`);
      const nameInput = checkbox.dataset.customStorage === 'true' ? productForm.querySelector(`[data-storage-name="${checkbox.value}"]`) : null;
      return {storage: nameInput ? nameInput.value.trim() : checkbox.value, price: priceInput.value};
    });
    if(!storageVariants.length || storageVariants.some(item => !item.storage || item.price === '')){
      window.alert('Select at least one storage variant, enter its name if custom, and add its price.');
      return;
    }
    data.storageVariants = storageVariants;
    data.details = storageVariants.map(item => item.storage).join(', ');
    data.price = storageVariants[0].price;
    delete data.storageVariant;
    
    const readImage = file => file ? new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const targetWidth = 1200;
          const targetHeight = 900;
          const targetRatio = targetWidth / targetHeight;
          const imageRatio = image.width / image.height;
          const context = canvas.getContext('2d');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, targetWidth, targetHeight);

          let sx = 0;
          let sy = 0;
          let sw = image.width;
          let sh = image.height;
          if (imageRatio > targetRatio) {
            sw = image.height * targetRatio;
            sx = (image.width - sw) / 2;
          } else {
            sh = image.width / targetRatio;
            sy = (image.height - sh) / 2;
          }

          context.drawImage(image, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }) : Promise.resolve('');

    async function uploadImageDataUrl(file, side) {
      if (!file) return '';
      const dataUrl = await readImage(file);
      if (!dataUrl) return '';
      const payload = {
        brand: data.brand || 'other-brand',
        model: data.name || 'product',
        type: side,
        imageDataUrl: dataUrl
      };
      try {
        const response = await fetch('/api/product-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
        const result = await response.json();
        return result.url || '';
      } catch (error) {
        window.alert('Image upload failed. Product image was not saved.');
        return '';
      }
    }

    const frontFile = form.elements.frontPhoto.files[0];
    const backFile = form.elements.backPhoto.files[0];
    const frontImage = await uploadImageDataUrl(frontFile, 'front');
    const backImage = await uploadImageDataUrl(backFile, 'back');
    const products = readProducts();
    if(editIndex.startsWith('custom:')){
      const productIndex = Number(editIndex.slice(7));
      const product = products[productIndex];
      if(products.some((existing, index) => index !== productIndex && hasDuplicateModel(products, {...data, id: existing.id}, existing.id))){
        window.alert('This model already exists in the Buy catalog.');
        return;
      }
      data.id = product.id || `product-${Date.now()}`;
      data.frontImage = frontImage || product.frontImage || product.photos?.[0] || '';
      data.backImage = backImage || product.backImage || '';
      data.visible = product.visible;
      products[productIndex] = data;
      saveProducts(products);
    } else if(editIndex.startsWith('buy:')){
      const buyModels = readBuyModels();
      const buyId = editIndex.slice(4);
      const buyModel = buyModels.find(model => model.id === buyId);
      if(!buyModel){ window.alert('This catalog record changed in another browser. The latest catalog has been loaded; please open the model again.'); renderAdminBuyModels(); return; }
      if(hasDuplicateModel(buyModels, data, buyId)){
        window.alert('This model already exists in the Buy catalog.');
        return;
      }
      buyModel.name = data.name;
      buyModel.brand = data.brand;
      buyModel.spec = data.details || data.brand;
      buyModel.storageVariants = storageVariants;
      buyModel.price = data.price;
      buyModel.oldPrice = data.oldPrice;
      buyModel.grade = data.grade;
      buyModel.warranty = data.warranty;
      buyModel.updatedAt = data.updatedAt;
      buyModel.image = frontImage || buyModel.image || '';
      buyModel.backImage = backImage || buyModel.backImage || '';
      saveBuyModels(buyModels);
        } else if(editIndex.startsWith('sell:')){
      const sellModels = readSellModels();
      const sellId = editIndex.slice(5);
      const sellModel = sellModels.find(model => model.id === sellId);
      if(!sellModel){ window.alert('This catalog record changed in another browser. The latest catalog has been loaded; please open the model again.'); renderAdminSellModels(); return; }
      if(hasDuplicateModel(sellModels, data, sellId)){
        window.alert('This model already exists in the Sell catalog.');
        return;
      }
      sellModel.name = data.name;
      sellModel.brand = data.brand;
      sellModel.spec = data.details || data.brand;
      sellModel.storageVariants = storageVariants;
      sellModel.price = data.price;
      sellModel.image = frontImage || sellModel.image || '';
      sellModel.backImage = backImage || sellModel.backImage || '';
      sellModel.updatedAt = data.updatedAt;
      saveSellModels(sellModels);
    } else if(editIndex.startsWith('sellcat:')){
      const catalog = readSellCatalog();
      const raw = editIndex.slice(8);
      const entry = {
        id: `sell-${Date.now()}`,
        name: data.name,
        brand: (data.brand || '').toLowerCase(),
        spec: data.details || '',
        storageVariants,
        grade: data.grade || '',
        warranty: data.warranty || '',
        price: data.price,
        updatedAt: data.updatedAt,
        image: frontImage || '',
        hidden: false
      };
      if(raw === 'new'){
        const existingModels = readSellModels();
        const existingIndex = existingModels.findIndex(model => modelIdentity(model.name, model.brand) === modelIdentity(entry.name, entry.brand));
        if(existingIndex >= 0){
          const existing = existingModels[existingIndex];
          existingModels[existingIndex] = {...existing, ...entry, id: existing.id, image: frontImage || existing.image || '', hidden: existing.hidden === true ? existing.hidden : false};
          saveSellModels(existingModels);
          resetProductForm(); renderAdminSellModels();
          return;
        }
        catalog.unshift(entry);
      } else {
        const idx = Number(raw);
        if(hasDuplicateModel([...readSellModels(), ...catalog], entry, catalog[idx].id)){
          window.alert('This model already exists in the Sell catalog.');
          return;
        }
        entry.id = catalog[idx].id;
        entry.image = frontImage || catalog[idx].image || '';
        entry.hidden = catalog[idx].hidden;
        catalog[idx] = entry;
      }
      saveSellCatalog(catalog);
      resetProductForm(); renderAdminSellModels();
      return;
    } else if(editIndex !== ''){
      const oldProduct = products[Number(editIndex)];
      data.frontImage = frontImage || oldProduct.frontImage || oldProduct.photos?.[0] || '';
      data.backImage = backImage || oldProduct.backImage || '';
      data.visible = oldProduct.visible;
      products[Number(editIndex)] = data;
    } else {
      if(hasDuplicateModel([...readBuyModels(), ...products], data)){
        window.alert('This model already exists in the Buy catalog.');
        return;
      }
      data.id = `product-${Date.now()}`;
      data.frontImage = frontImage;
      data.backImage = backImage;
      data.visible = true;
      products.unshift(data);
    }
    saveProducts(products); resetProductForm(); renderAdminProducts(); renderAdminBuyModels(); renderAdminSellModels();
  });
  document.getElementById('addBuyPhoneBtn').addEventListener('click', () => {
    resetProductForm();
    productFormTitle.textContent = 'Add phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Add phone';
    cancelEdit.hidden = true;
    productForm.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('adminBuyModels').addEventListener('click', event => {
    const toggle = event.target.closest('[data-toggle-product]');
    const remove = event.target.closest('[data-delete-product]');
    const canonicalToggle = event.target.closest('[data-toggle-buy-canonical]');
    const canonicalRemove = event.target.closest('[data-delete-buy-canonical]');
    const presetRemove = event.target.closest('[data-delete-buy-preset]');
    if(canonicalToggle || canonicalRemove){
      const id = (canonicalToggle || canonicalRemove).dataset.toggleBuyCanonical || (canonicalToggle || canonicalRemove).dataset.deleteBuyCanonical;
      const models = readBuyModels();
      const model = models.find(entry => entry.id === id);
      if(!model) return;
      if(canonicalToggle){ model.hidden = !(model.hidden || model.deleted); model.deleted = false; }
      if(canonicalRemove){
        if(!window.confirm(`Remove "${model.name}"?`)) return;
        model.hidden = true;
        model.deleted = true;
      }
      saveBuyModels(models);
      renderAdminBuyModels();
      return;
    }
    if(presetRemove){
      const id = presetRemove.dataset.deleteBuyPreset;
      if(!window.confirm('Remove this Buy catalog model?')) return;
      const model = readBuyModels().find(entry => entry.id === id);
      const overrides = JSON.parse(localStorage.getItem('swapioBuyModels') || '{}');
      overrides[id] = {...(overrides[id] || {}), hidden:true};
      localStorage.setItem('swapioBuyModels', JSON.stringify(overrides));
      if (model) saveBuyModels([...readBuyModels(), {...model, hidden:true}]);
      renderAdminBuyModels();
      return;
    }
    if(toggle || remove){
      const products = readProducts();
      if(toggle) products[Number(toggle.dataset.toggleProduct)].visible = !products[Number(toggle.dataset.toggleProduct)].visible;
      if(remove) products.splice(Number(remove.dataset.deleteProduct), 1);
      saveProducts(products);
      renderAdminBuyModels();
      return;
    }
    const row = event.target.closest('[data-buy-type]');
    if(!row) return;
    const type = row.dataset.buyType;
    const ref = row.dataset.buyRef;
    if(type === 'custom'){
      const product = readProducts()[Number(ref)];
      if(!product) return;
      productForm.elements.name.value = product.name;
      productForm.elements.grade.value = product.grade || '';
      productForm.elements.warranty.value = product.warranty || '';
      fillStorageVariants(product);
      productForm.elements.editIndex.value = `custom:${ref}`;
      setBrandSelectValue(product.brand);
      productForm.elements.frontPhoto.value = '';
      productForm.elements.backPhoto.value = '';
      productFormTitle.textContent = 'Edit phone';
      productForm.querySelector('button[type="submit"]').textContent = 'Update phone';
      cancelEdit.hidden = false;
      productForm.scrollIntoView({behavior:'smooth', block:'center'});
    } else {
      const model = readBuyModels().find(entry => entry.id === ref);
      if(!model) return;
      productForm.elements.name.value = model.name;
      setBrandSelectValue(model.brand || brandFromSpec(model.spec));
      fillStorageVariants(model);
      productForm.elements.grade.value = model.grade || '';
      productForm.elements.warranty.value = model.warranty || '';
      productForm.elements.editIndex.value = `buy:${model.id}`;
      productForm.elements.frontPhoto.value = '';
      productForm.elements.backPhoto.value = '';
      productFormTitle.textContent = 'Edit buy phone';
      productForm.querySelector('button[type="submit"]').textContent = 'Update buy phone';
      cancelEdit.hidden = false;
      productForm.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
        document.getElementById('adminSellModels').addEventListener('click', event => {
    const toggle = event.target.closest('[data-toggle-sell-canonical]');
    const remove = event.target.closest('[data-delete-sell-canonical]');
    if(toggle || remove){
      const id = (toggle || remove).dataset.toggleSellCanonical || (toggle || remove).dataset.deleteSellCanonical;
      const models = readSellModels();
      const model = models.find(entry => entry.id === id);
      if(!model) return;
      if(toggle){ model.hidden = !(model.hidden || model.deleted); model.deleted = false; }
      if(remove){
        if(!window.confirm(`Remove "${model.name}"?`)) return;
        model.hidden = true;
        model.deleted = true;
      }
      saveSellModels(models);
      renderAdminSellModels();
      return;
    }
    const row = event.target.closest('[data-sell-type]');
    if(!row) return;
    const model = readSellModels().find(entry => entry.id === row.dataset.sellRef);
    if(!model) return;
    productForm.elements.name.value = model.name;
    setBrandSelectValue(model.brand || brandFromSpec(model.spec));
    productForm.elements.grade.value = model.grade || '';
    productForm.elements.warranty.value = model.warranty || '';
    fillStorageVariants(model);
    productForm.elements.frontPhoto.value = '';
    productForm.elements.backPhoto.value = '';
    productForm.elements.editIndex.value = `sell:${model.id}`;
    productFormTitle.textContent = 'Edit sell phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Update sell phone';
    cancelEdit.hidden = false;
    productForm.scrollIntoView({behavior:'smooth', block:'center'});
  });
    document.getElementById('addSellPhoneBtn').addEventListener('click', () => {
    resetProductForm();
    productForm.elements.editIndex.value = 'sellcat:new';
    productFormTitle.textContent = 'Add sell phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Add sell phone';
    cancelEdit.hidden = false;
    productForm.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('viewBuyListBtn').addEventListener('click', () => {
    adminCatalogViews.buy = null;
    adminCatalogViews.buyOpen = !adminCatalogViews.buyOpen;
    if(adminCatalogViews.buyOpen) {
      renderAdminBuyModels();
      document.getElementById('adminBuyModels').scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      document.getElementById('adminBuyModels').innerHTML = '';
    }
  });
  document.getElementById('viewSellListBtn').addEventListener('click', () => {
    adminCatalogViews.sell = null;
    adminCatalogViews.sellOpen = !adminCatalogViews.sellOpen;
    if(adminCatalogViews.sellOpen) {
      renderAdminSellModels();
      document.getElementById('adminSellModels').scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      document.getElementById('adminSellModels').innerHTML = '';
    }
  });
  document.getElementById('adminBuyModels').addEventListener('click', event => {
    const searchResult = event.target.closest('[data-catalog-search-result]');
    const brand = event.target.closest('[data-catalog-brand]');
    const back = event.target.closest('[data-catalog-back="buy"]');
    if(searchResult){ adminCatalogViews.buy = searchResult.dataset.catalogBrand; renderAdminBuyModels(); return; }
    if(brand){
      if(adminCatalogViews.buy === brand.dataset.catalogBrand){
        adminCatalogViews.buy = null;
        adminCatalogViews.buyOpen = false;
        document.getElementById('adminBuyModels').innerHTML = '';
      } else {
        adminCatalogViews.buy = brand.dataset.catalogBrand;
        adminCatalogViews.buyOpen = true;
        renderAdminBuyModels();
      }
      return;
    }
    if(back){ adminCatalogViews.buy = null; adminCatalogViews.buyOpen = true; renderAdminBuyModels(); }
  });
  document.getElementById('adminBuyModels').addEventListener('input', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(!results) return;
    renderCatalogSearchResults(input.dataset.catalogSearch, input.value, input.dataset.catalogScope, input.dataset.catalogView, results);
  });
  document.getElementById('adminBuyModels').addEventListener('focusin', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input || !input.value.trim()) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(results) results.classList.add('open');
  });
  document.getElementById('adminBuyModels').addEventListener('focusout', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(results) setTimeout(() => results.classList.remove('open'), 150);
  });
  document.getElementById('adminSellModels').addEventListener('click', event => {
    const searchResult = event.target.closest('[data-catalog-search-result]');
    const brand = event.target.closest('[data-catalog-brand]');
    const back = event.target.closest('[data-catalog-back="sell"]');
    if(searchResult){ adminCatalogViews.sell = searchResult.dataset.catalogBrand; renderAdminSellModels(); return; }
    if(brand){
      if(adminCatalogViews.sell === brand.dataset.catalogBrand){
        adminCatalogViews.sell = null;
        adminCatalogViews.sellOpen = false;
        document.getElementById('adminSellModels').innerHTML = '';
      } else {
        adminCatalogViews.sell = brand.dataset.catalogBrand;
        adminCatalogViews.sellOpen = true;
        renderAdminSellModels();
      }
      return;
    }
    if(back){ adminCatalogViews.sell = null; adminCatalogViews.sellOpen = true; renderAdminSellModels(); }
  });
  document.getElementById('adminSellModels').addEventListener('input', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(!results) return;
    renderCatalogSearchResults(input.dataset.catalogSearch, input.value, input.dataset.catalogScope, input.dataset.catalogView, results);
  });
  document.getElementById('adminSellModels').addEventListener('focusin', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input || !input.value.trim()) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(results) results.classList.add('open');
  });
  document.getElementById('adminSellModels').addEventListener('focusout', event => {
    const input = event.target.closest('[data-catalog-search]');
    if(!input) return;
    const wrap = input.closest('[data-catalog-search-wrap]');
    const results = wrap ? wrap.querySelector('[data-catalog-search-results]') : null;
    if(results) setTimeout(() => results.classList.remove('open'), 150);
  });
  document.getElementById('refreshSubmissions').addEventListener('click', renderAdminSubmissions);
  document.getElementById('adminSubmissions').addEventListener('click', event => {
    const row = event.target.closest('[data-request-id]');
    const panel = document.getElementById('requestDetailPanel');
    if (!row || !panel) return;
    const item = adminSubmissionsCache.find(entry => entry.id === row.dataset.requestId);
    if (!item) return;
    panel.innerHTML = `<div class="request-detail-head"><div><div class="eyebrow">${submissionType(item)} request</div><h3>${submissionRequestNumber(item)}</h3></div><button type="button" class="btn btn-ghost" data-close-request-detail>Close</button></div>${requestDetailMarkup(item)}`;
    panel.hidden = false;
    panel.scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('requestDetailPanel').addEventListener('click', event => { if (event.target.closest('[data-close-request-detail]')) event.currentTarget.hidden = true; });
  document.getElementById('requestStatusFilter').addEventListener('change', event => { adminRequestStatus = event.target.value; renderAdminSubmissions(); });
  document.getElementById('requestDateStrip').addEventListener('click', event => { const button = event.target.closest('[data-request-date]'); if (button) { adminRequestDate = button.dataset.requestDate; document.getElementById('requestDateInput').value = ''; renderAdminSubmissions(); } });
  document.getElementById('requestDateInput').addEventListener('change', event => { adminRequestDate = event.target.value || 'all'; renderAdminSubmissions(); });
  document.querySelectorAll('[data-request-type]').forEach(tab => tab.addEventListener('click', () => { adminRequestType = tab.dataset.requestType; renderAdminSubmissions(); }));
  
  document.querySelectorAll('[data-admin-tab]').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('[data-admin-tab]').forEach(item => item.classList.remove('active')); tab.classList.add('active'); document.getElementById('adminCatalogTab').hidden = tab.dataset.adminTab !== 'catalog'; document.getElementById('adminRequestsTab').hidden = tab.dataset.adminTab !== 'requests'; document.getElementById('adminRepairTab').hidden = tab.dataset.adminTab !== 'repair'; document.getElementById('adminRecycleTab').hidden = tab.dataset.adminTab !== 'recycle'; document.getElementById('adminInventoryTab').hidden = tab.dataset.adminTab !== 'inventory'; document.getElementById('adminBillingTab').hidden = tab.dataset.adminTab !== 'billing'; document.getElementById('adminReturnsTab').hidden = tab.dataset.adminTab !== 'returns'; document.getElementById('adminFinanceTab').hidden = tab.dataset.adminTab !== 'finance'; if (tab.dataset.adminTab === 'finance') renderFinanceDashboard(); if (tab.dataset.adminTab === 'requests') renderAdminSubmissions(); }));
  const billingForm = document.getElementById('billingForm');
  const billingItemsList = document.getElementById('billingItemsList');
  const billingEditIndex = { value: '' };
  const billingDraftItems = [];
  function normalizeModelName(value){
    return String(value || '').trim().replace(/\s+/g, ' ');
  }
  function readDraftBillingItemFromForm(){
    const model = normalizeModelName(billingForm.model.value);
    const quantity = Number(billingForm.quantity.value || 1);
    const salePrice = Number(billingForm.salePrice.value || 0);
    const imei = String(billingForm.imei.value || '').trim();
    if (!model || !imei || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(salePrice) || salePrice <= 0) {
      return null;
    }
    return {
      model,
      imei,
      qty: quantity,
      rate: salePrice,
      amount: salePrice * quantity
    };
  }
  function renderBillingDraftItems(){
    if (!billingItemsList) return;
    if (!billingDraftItems.length) {
      billingItemsList.innerHTML = '<p class="admin-empty">No items added yet. Select a model and press “Add item”.</p>';
      return;
    }
    billingItemsList.innerHTML = `
      <table class="inventory-table">
        <thead><tr><th>Model</th><th>IMEI</th><th>Qty</th><th>Unit price</th><th>Total</th><th>Action</th></tr></thead>
        <tbody>
          ${billingDraftItems.map((item, index) => `
            <tr>
              <td>${item.model}</td>
              <td>${item.imei}</td>
              <td>${item.qty}</td>
              <td>${formatCurrency(item.rate)}</td>
              <td>${formatCurrency(item.amount)}</td>
              <td><button class="btn btn-ghost" type="button" data-remove-billing-item="${index}">Remove</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  function formatInvoiceNumberDisplay(value){
    const digits = String(value || '').replace(/^BILL[-\s]*/i, '').replace(/[^\d]/g, '');
    return digits ? String(Number(digits)).padStart(3, '0') : '001';
  }
  async function generateNextBillNumber(){
    if (window.swapioData && typeof window.swapioData.getNextBillNumber === 'function') {
      return window.swapioData.getNextBillNumber();
    }

    const bills = readBills();
    let highest = 0;
    bills.forEach(bill => {
      const raw = String(bill.billNumber || '').replace(/[^0-9]/g, '');
      const numeric = Number(raw || 0);
      if (numeric > highest) highest = numeric;
    });
    return `BILL-${String(highest + 1).padStart(4, '0')}`;
  }
  function populateBillingModelOptions(){
    const inventory = readInventory();
    const allModels = [...new Set(
      inventory
        .filter(item => item.model)
        .map(item => String(item.model).trim())
        .filter(Boolean)
    )].sort();
    const activeModels = [...new Set(
      inventory
        .filter(item => item.model && !['sold', 'returned'].includes(String(item.status || 'in-stock').toLowerCase()))
        .map(item => String(item.model).trim())
        .filter(Boolean)
    )].sort();
    const modelNames = activeModels.length ? activeModels : allModels;
    const select = document.getElementById('billingModelInput');
    if (!select) return;
    select.innerHTML = '<option value="">Select available inventory phone</option>' + modelNames.map(model => `<option value="${model}">${model}</option>`).join('');
    if (!select.value && modelNames[0]) {
      select.value = modelNames[0];
    }
    const billNumberField = document.getElementById('billingBillNumber');
    if (billNumberField && !billNumberField.value) {
      generateNextBillNumber().then(next => {
        if (billNumberField && !billNumberField.value) billNumberField.value = formatInvoiceNumberDisplay(next);
      });
    }
  }
  document.getElementById('addBillingItem').addEventListener('click', () => {
    const item = readDraftBillingItemFromForm();
    if (!item) {
      window.alert('Please select a model, enter a valid IMEI, quantity, and sold price before adding it.');
      return;
    }
    billingDraftItems.push(item);
    renderBillingDraftItems();
    billingForm.model.value = '';
    billingForm.imei.value = '';
    billingForm.quantity.value = 1;
    billingForm.salePrice.value = '';
  });

  document.getElementById('clearBillingItems').addEventListener('click', () => {
    billingDraftItems.length = 0;
    renderBillingDraftItems();
  });

  document.getElementById('billingItemsList').addEventListener('click', event => {
    const removeBtn = event.target.closest('[data-remove-billing-item]');
    if (!removeBtn) return;
    const index = Number(removeBtn.dataset.removeBillingItem);
    if (Number.isFinite(index) && index >= 0 && index < billingDraftItems.length) {
      billingDraftItems.splice(index, 1);
      renderBillingDraftItems();
    }
  });

  const saveBillingDraft = async () => {
    const form = billingForm;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.customerName || !data.saleDate || !data.paymentMethod) {
      window.alert('Please fill buyer name, sale date, and payment method before saving the bill.');
      return;
    }

    const draftItems = billingDraftItems.length ? [...billingDraftItems] : [readDraftBillingItemFromForm()].filter(Boolean);
    if (!draftItems.length) {
      window.alert('Please add at least one item to the bill before saving.');
      return;
    }

    const inventory = readInventory();
    const bills = readBills();
    const nextNumber = await generateNextBillNumber();
    const normalized = {
      billNumber: billingEditIndex.value !== '' ? (bills[Number(billingEditIndex.value)]?.billNumber || nextNumber) : nextNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone || '',
      customerAddress: data.customerAddress || '',
      paymentMethod: data.paymentMethod,
      saleDate: data.saleDate,
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      items: draftItems.map(item => ({
        model: item.model,
        imei: item.imei,
        qty: item.qty,
        rate: item.rate,
        amount: item.amount,
        description: item.model
      })),
      model: draftItems[0].model,
      imei: draftItems[0].imei,
      quantity: draftItems.reduce((sum, item) => sum + Number(item.qty || 1), 0),
      salePrice: draftItems.reduce((sum, item) => sum + Number(item.amount || 0), 0),
      purchasePrice: 0,
      saveStatus: { firebase: true, local: true, drive: false }
    };

    draftItems.forEach(item => {
      const targetItem = inventory.find(entry =>
        normalizeModelName(entry.model) === normalizeModelName(item.model) &&
        !['sold', 'returned'].includes(String(entry.status || 'in-stock').toLowerCase())
      ) || inventory.find(entry => normalizeModelName(entry.model) === normalizeModelName(item.model));

      if (!targetItem) {
        throw new Error(`Model not available in inventory: ${item.model}`);
      }

      targetItem.status = 'sold';
      targetItem.salePrice = item.rate;
      targetItem.paymentMethod = data.paymentMethod;
      targetItem.saleDate = data.saleDate;
      targetItem.buyer = data.customerName;
      targetItem.buyerPhone = data.customerPhone || '';
      targetItem.buyerAddress = data.customerAddress || '';
      targetItem.billNumber = normalized.billNumber;
      targetItem.imei = item.imei;
      targetItem.quantity = item.qty;
      normalized.purchasePrice += Number(targetItem.purchasePrice || 0) * Number(item.qty || 1);
    });

    if (billingEditIndex.value !== '') {
      bills[Number(billingEditIndex.value)] = normalized;
    } else {
      bills.unshift(normalized);
    }

    let firebaseSaved = true;
    try {
      await saveBills(bills);
    } catch (error) {
      console.error('Bill save failed to Firebase/local storage', error);
      firebaseSaved = false;
    }

    if (!firebaseSaved) {
      normalized.saveStatus = { firebase: false, local: true, drive: false };
    }

    saveInventory(inventory);
    renderBillingLedger();
    renderInventory();
    renderFinanceDashboard();
    showBillPreview(normalized);

    billingDraftItems.length = 0;
    renderBillingDraftItems();
    form.reset();
    billingEditIndex.value = '';
    document.getElementById('cancelBillingEdit').hidden = true;
    const nextBill = await generateNextBillNumber();
    document.getElementById('billingBillNumber').value = formatInvoiceNumberDisplay(nextBill);
    populateBillingModelOptions();
  };

  document.getElementById('saveBillingButton').addEventListener('click', saveBillingDraft);
  document.getElementById('cancelBillingEdit').addEventListener('click', async () => {
    billingForm.reset();
    billingEditIndex.value = '';
    document.getElementById('cancelBillingEdit').hidden = true;
    document.getElementById('billingBillNumber').value = formatInvoiceNumberDisplay(await generateNextBillNumber());
    populateBillingModelOptions();
  });
  document.getElementById('downloadBillBackup').addEventListener('click', downloadBillBackup);
  document.getElementById('billingList').addEventListener('click', event => {
    const view = event.target.closest('[data-view-bill]');
    const edit = event.target.closest('[data-edit-bill]');
    const remove = event.target.closest('[data-delete-bill]');
    const bills = readBills();
    if (view) {
      const bill = bills[Number(view.dataset.viewBill)];
      if (bill) showBillPreview(bill);
      printCurrentBill();
      return;
    }
    if (edit) {
      const bill = bills[Number(edit.dataset.editBill)];
      document.getElementById('billingBillNumber').value = formatInvoiceNumberDisplay(bill.billNumber || '');
      billingForm.customerName.value = bill.customerName || '';
      billingForm.customerPhone.value = bill.customerPhone || '';
      billingForm.customerAddress.value = bill.customerAddress || '';
      if (billingForm.deliveryAddress) billingForm.deliveryAddress.value = '';
      billingForm.paymentMethod.value = bill.paymentMethod || '';
      billingForm.saleDate.value = bill.saleDate || '';
      billingForm.model.value = bill.model || '';
      billingForm.imei.value = bill.imei || '';
      billingForm.quantity.value = bill.quantity || 1;
      billingForm.salePrice.value = bill.salePrice || '';
      billingForm.notes.value = bill.notes || '';
      billingEditIndex.value = String(edit.dataset.editBill);
      document.getElementById('cancelBillingEdit').hidden = false;
      billingForm.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    if (remove) {
      const billToDelete = bills[Number(remove.dataset.deleteBill)];
      const inventory = readInventory();
      if (billToDelete && billToDelete.model) {
        const item = inventory.find(entry => normalizeModelName(entry.model) === normalizeModelName(billToDelete.model) && entry.status === 'sold' && (entry.buyer || '') === (billToDelete.customerName || ''));
        if (item) {
          item.status = 'in-stock';
          item.salePrice = '';
          item.paymentMethod = '';
          item.saleDate = '';
          item.buyer = '';
          item.buyerPhone = '';
          item.buyerAddress = '';
          item.billNumber = '';
          saveInventory(inventory);
        }
      }
      bills.splice(Number(remove.dataset.deleteBill), 1);
      saveBills(bills);
      renderBillingLedger();
      renderInventory();
      renderFinanceDashboard();
    }
  });
  const returnForm = document.getElementById('returnForm');
  const returnReason = document.getElementById('returnReason');
  const customReturnReason = document.getElementById('customReturnReason');
  returnReason.addEventListener('change', () => { customReturnReason.hidden = returnReason.value !== 'other'; customReturnReason.required = returnReason.value === 'other'; if(returnReason.value !== 'other') customReturnReason.value = ''; });
  returnForm.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget).entries()); if(data.reason === 'other') data.reason = data.customReason; delete data.customReason; const returns = readReturns(); returns.unshift(data); saveReturns(returns); renderReturns(); event.currentTarget.reset(); customReturnReason.hidden = true; customReturnReason.required = false; });
  document.getElementById('returnList').addEventListener('click', event => { const remove = event.target.closest('[data-delete-return]'); if(!remove) return; const returns = readReturns(); returns.splice(Number(remove.dataset.deleteReturn), 1); saveReturns(returns); renderReturns(); });
  if (billingForm && billingForm.saleDate && !billingForm.saleDate.value) {
    billingForm.saleDate.value = new Date().toISOString().slice(0, 10);
  }
  populateBillingModelOptions();
  setupInventory();
}

document.addEventListener('DOMContentLoaded', setupAdmin);