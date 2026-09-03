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
const billsKey = window.swapioData?.STORAGE_KEYS?.bills || 'swapioBills';
const catalogKey = 'swapioPhoneCatalog';
const sellCatalogKey = 'swapioSellCatalog';
function readSellCatalog(){
  return JSON.parse(localStorage.getItem(sellCatalogKey) || '[]');
}
function saveSellCatalog(items){
  localStorage.setItem(sellCatalogKey, JSON.stringify(items));
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
          <div class="shop-line">Shop No. 12, Karol Bagh, New Delhi — 110005</div>
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

async function renderAdminSubmissions(){
  const list = document.getElementById('adminSubmissions');
  const submissions = await readSubmissions();
  list.innerHTML = submissions.length ? submissions.map(item => `
    <article class="admin-item submission-item"><div><span class="pill pill-coral">${item.type}</span><h4>${item.name || 'Customer'}</h4><p>${item.phone || item.email || 'No contact'} · ${item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Unknown date'}</p><small>${item.model || item.issue || item.details || 'No details'}${item.price ? ` · ${item.price}` : ''}${item.payment ? ` · ${item.payment}` : ''}${item.utr ? ` · UTR: ${item.utr}` : ''}${item.paymentStatus ? ` · ${item.paymentStatus}` : ''}</small></div><div class="admin-photos">${(item.photos || []).map(photo => `<img src="${photo}" alt="Customer upload">`).join('')}</div></article>`).join('') : '<p class="admin-empty">No customer submissions yet.</p>';
}

// Sell phone catalog: shows EVERY sell phone regardless of where it came from —
// the 8 built-in preset models (readSellModels/swapioSellModels) as well as
// anything added through "Add sell phone" (readSellCatalog/swapioSellCatalog).
// Every row is clickable and loads straight into the form above for editing.
function renderAdminSellModels(){
  const list = document.getElementById('adminSellModels');
  if(!list) return;
  const presetModels = readSellModels().map(model => ({...model, source:'preset'}));
  const catalogModels = readSellCatalog().map((model, index) => ({...model, source:'catalog', catalogIndex:index}));
  const models = [...presetModels, ...catalogModels];
  if(!models.length){
    list.innerHTML = '<p class="admin-empty">No phones in sell catalog yet. Use "Add sell phone" above.</p>';
    return;
  }
  list.innerHTML = models.map(model => `
    <article class="admin-item" data-sell-type="${model.source}" data-sell-ref="${model.source === 'catalog' ? model.catalogIndex : model.id}" style="cursor:pointer;">
      ${model.image ? `<img src="${model.image}" alt="${model.name}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;">` : '<div class="admin-thumb">PHONE</div>'}
      <div><h4>${model.name}${model.hidden ? ' (Hidden)' : ''}${model.source === 'preset' ? ' (Preset)' : ''}</h4><p>${model.brand || ''} ${model.brand ? '·' : ''} ${model.spec || ''} · Up to ₹${Number(model.price || 0).toLocaleString('en-IN')}</p></div>
      <button class="btn btn-ghost" type="button" data-sell-edit>Edit</button>
      ${model.source === 'catalog' ? `<button class="btn btn-ghost" type="button" data-toggle-sell-catalog="${model.catalogIndex}">${model.hidden ? 'Show' : 'Hide'}</button><button class="btn btn-ghost" type="button" data-delete-sell-catalog="${model.catalogIndex}">Delete</button>` : ''}
    </article>`).join('');
}

// Buy phone catalog: merges the fixed buy-model list with any custom phones
// added through the top "Add phone" form, and renders it as a clickable list
// (same pattern as the sell catalog) so tapping a row loads it into the form
// above for editing. No more "View Buy page" redirect — everything happens here.
function renderAdminBuyModels(){
  const list = document.getElementById('adminBuyModels');
  if(!list) return;
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
  const models = [...buyModels, ...customProducts];
  if(!models.length){
    list.innerHTML = '<p class="admin-empty">No phones in buy catalog yet. Use "Add phone" above.</p>';
    return;
  }
  list.innerHTML = models.map(model => `
    <article class="admin-item" data-buy-type="${model.custom ? 'custom' : 'buy'}" data-buy-ref="${model.custom ? model.customIndex : model.id}" style="cursor:pointer;">
      ${model.image ? `<img src="${model.image}" alt="${model.name}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;">` : '<div class="admin-thumb">PHONE</div>'}
      <div><h4>${model.name}${model.custom && model.visible === false ? ' (Hidden)' : ''}</h4><p>${model.spec || ''} · ₹${Number(model.price || 0).toLocaleString('en-IN')}${model.grade ? ` · ${model.grade}` : ''}${model.warranty ? ` · ${model.warranty} warranty` : ''}</p></div>
      <button class="btn btn-ghost" type="button" data-buy-edit>Edit</button>
      ${model.custom ? `<button class="btn btn-ghost" type="button" data-toggle-product="${model.customIndex}">${model.visible ? 'Hide' : 'Show'}</button><button class="btn btn-ghost" type="button" data-delete-product="${model.customIndex}">Delete</button>` : ''}
    </article>`).join('');
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
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          await showDashboardFallback();
          return;
        }
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
    showDashboardFallback();
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
    productForm.elements.editIndex.value = '';
    productFormTitle.textContent = 'Add phone';
    productForm.querySelector('button[type="submit"]').textContent = 'Add phone';
    cancelEdit.hidden = true;
    updateBrandInputVisibility();
  }

  cancelEdit.addEventListener('click', resetProductForm);
  productForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    
    // Handle "Other Brand" custom name
    if(data.brand === 'OTHER'){
      data.brand = data.otherBrandName || 'Other';
    }
    delete data.otherBrandName;
    
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
    } else if(editIndex.startsWith('sellcat:')){
      const catalog = readSellCatalog();
      const raw = editIndex.slice(8);
      const entry = {
        id: `sell-${Date.now()}`,
        name: data.name,
        brand: (data.brand || '').toLowerCase(),
        spec: data.details || '',
        price: data.price,
        image: frontImage || '',
        hidden: false
      };
      if(raw === 'new'){
        catalog.unshift(entry);
      } else {
        const idx = Number(raw);
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
      data.frontImage = frontImage;
      data.backImage = backImage;
      data.visible = true;
      products.unshift(data);
      // Also save to phone catalog so brand pages / Other Brands keep working
      const catalog = readPhoneCatalog();
      catalog.unshift({
        id: `phone-${Date.now()}`,
        name: data.name,
        brand: data.brand || 'Other',
        price: data.price,
        condition: data.condition || 'Superb',
        image: frontImage || '',
        backImage: backImage || '',
        spec: data.details || `${data.brand} · ${data.condition || 'Superb'}`
      });
      savePhoneCatalog(catalog);
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
      productForm.elements.price.value = product.price;
      productForm.elements.condition.value = product.condition || '';
      productForm.elements.grade.value = product.grade || '';
      productForm.elements.warranty.value = product.warranty || '';
      productForm.elements.details.value = product.details || '';
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
      setBrandSelectValue(brandFromSpec(model.spec));
      productForm.elements.price.value = model.price;
      productForm.elements.details.value = model.spec || '';
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
    const toggle = event.target.closest('[data-toggle-sell-catalog]');
    const remove = event.target.closest('[data-delete-sell-catalog]');
    if(toggle || remove){
      const catalog = readSellCatalog();
      if(toggle){
        const idx = Number(toggle.dataset.toggleSellCatalog);
        catalog[idx].hidden = !catalog[idx].hidden;
        saveSellCatalog(catalog);
      }
      if(remove){
        const idx = Number(remove.dataset.deleteSellCatalog);
        if(!window.confirm(`Remove "${catalog[idx].name}"?`)) return;
        catalog.splice(idx,1);
        saveSellCatalog(catalog);
      }
      renderAdminSellModels();
      return;
    }
    const row = event.target.closest('[data-sell-type]');
    if(!row) return;
    const type = row.dataset.sellType;
    const ref = row.dataset.sellRef;
    if(type === 'catalog'){
      const catalog = readSellCatalog();
      const idx = Number(ref);
      const model = catalog[idx];
      if(!model) return;
      productForm.elements.name.value = model.name;
      setBrandSelectValue(model.brand);
      productForm.elements.price.value = model.price;
      productForm.elements.details.value = model.spec || '';
      productForm.elements.frontPhoto.value = '';
      productForm.elements.backPhoto.value = '';
      productForm.elements.editIndex.value = `sellcat:${idx}`;
      productFormTitle.textContent = 'Edit sell phone';
      productForm.querySelector('button[type="submit"]').textContent = 'Update sell phone';
      cancelEdit.hidden = false;
      productForm.scrollIntoView({behavior:'smooth', block:'center'});
    } else {
      const model = readSellModels().find(entry => entry.id === ref);
      if(!model) return;
      productForm.elements.name.value = model.name;
      setBrandSelectValue(brandFromSpec(model.spec));
      productForm.elements.price.value = model.price;
      productForm.elements.details.value = model.spec || '';
      productForm.elements.frontPhoto.value = '';
      productForm.elements.backPhoto.value = '';
      productForm.elements.editIndex.value = `sell:${model.id}`;
      productFormTitle.textContent = 'Edit sell phone';
      productForm.querySelector('button[type="submit"]').textContent = 'Update sell phone';
      cancelEdit.hidden = false;
      productForm.scrollIntoView({behavior:'smooth', block:'center'});
    }
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
    renderAdminBuyModels();
    document.getElementById('adminBuyModels').scrollIntoView({behavior:'smooth', block:'start'});
  });
  document.getElementById('viewSellListBtn').addEventListener('click', () => {
    renderAdminSellModels();
    document.getElementById('adminSellModels').scrollIntoView({behavior:'smooth', block:'start'});
  });
  document.getElementById('refreshSubmissions').addEventListener('click', renderAdminSubmissions);
  
  document.querySelectorAll('[data-admin-tab]').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('[data-admin-tab]').forEach(item => item.classList.remove('active')); tab.classList.add('active'); document.getElementById('adminCatalogTab').hidden = tab.dataset.adminTab !== 'catalog'; document.getElementById('adminInventoryTab').hidden = tab.dataset.adminTab !== 'inventory'; document.getElementById('adminBillingTab').hidden = tab.dataset.adminTab !== 'billing'; document.getElementById('adminReturnsTab').hidden = tab.dataset.adminTab !== 'returns'; document.getElementById('adminFinanceTab').hidden = tab.dataset.adminTab !== 'finance'; if (tab.dataset.adminTab === 'finance') renderFinanceDashboard(); }));
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