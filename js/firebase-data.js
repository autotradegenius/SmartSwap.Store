(function () {
  const STORAGE_KEYS = {
    products: 'swapioAdminProducts',
    inventory: 'swapioInventory',
    returns: 'swapioReturns',
    phoneCatalog: 'swapioPhoneCatalog',
    buyCatalog: 'swapioBuyCatalog',
    sellCatalog: 'swapioSellCatalog',
    repairCatalog: 'swapioRepairCatalog',
    bills: 'swapioBills',
    billingCounter: 'swapioBillingCounter'
  };

  const DOC_PATHS = {
    products: 'catalog',
    inventory: 'inventory',
    returns: 'returns',
    phoneCatalog: 'phoneCatalog',
    buyCatalog: 'buyCatalog',
    sellCatalog: 'sellCatalog',
    repairCatalog: 'repairCatalog',
    recycleCatalog: 'recycleCatalog',
    bills: 'bills',
    billingCounter: 'billingCounter'
  };
  const REQUEST_OUTBOX_KEY = 'swapioRequestOutbox';
  const CATALOG_KEYS = {
    buy: STORAGE_KEYS.buyCatalog,
    sell: STORAGE_KEYS.sellCatalog,
    repair: STORAGE_KEYS.repairCatalog,
    recycle: 'swapioRecycleCatalog'
  };
  const CATALOG_SAVE = {
    buy: saveBuyCatalog,
    sell: saveSellCatalog,
    repair: saveRepairCatalog,
    recycle: items => {
      setLocalStorage(CATALOG_KEYS.recycle, items);
      return syncCatalogDocument('recycleCatalog', { items });
    }
  };

  function requestPrefix(type) {
    return String(type || '').toLowerCase() === 'order' ? 'BUY' : String(type || 'sell').toUpperCase().replace('DAMAGED-PHONE', 'SELL');
  }

  function createRequestNumber(type) {
    const prefix = requestPrefix(type);
    const stamp = Date.now().toString(36).slice(-2).toUpperCase();
    const random = Math.random().toString(36).slice(2, 4).toUpperCase();
    return `${prefix}-${stamp}${random}`;
  }

  function readRequestOutbox() {
    return safeParse(REQUEST_OUTBOX_KEY, []);
  }

  function writeRequestOutbox(items) {
    setLocalStorage(REQUEST_OUTBOX_KEY, items);
  }

  function queueCustomerSubmission(submission) {
    const outbox = readRequestOutbox().filter(item => item.requestNumber !== submission.requestNumber);
    outbox.push(submission);
    writeRequestOutbox(outbox);
  }

  function removeQueuedSubmission(requestNumber) {
    writeRequestOutbox(readRequestOutbox().filter(item => item.requestNumber !== requestNumber));
  }

  function cleanSubmissionData(value) {
    if (Array.isArray(value)) return value.map(cleanSubmissionData);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value)
        .filter(([, entry]) => entry !== undefined && typeof entry !== 'function')
        .map(([key, entry]) => [key, cleanSubmissionData(entry)]));
    }
    return value;
  }

  function migrateLegacyCustomerSubmissions() {
    const legacyKeys = [
      ['swapioSellSubmissions', 'sell'],
      ['swapioDamagedSubmissions', 'damaged-phone']
    ];
    legacyKeys.forEach(([key, type]) => {
      const legacy = safeParse(key, []);
      if (!Array.isArray(legacy) || !legacy.length) return;
      legacy.forEach(item => {
        const migrated = {...item, type: item.type || type};
        if (!migrated.requestNumber) migrated.requestNumber = createRequestNumber(migrated.type);
        if (!migrated.createdAt || typeof migrated.createdAt !== 'number') migrated.createdAt = Date.now();
        queueCustomerSubmission(migrated);
      });
      localStorage.removeItem(key);
    });
  }

  function safeParse(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureFirebaseApp() {
    if (!window.SWAPIO_FIREBASE_CONFIG) return false;
    if (!window.firebase || !window.firebase.firestore || !window.firebase.auth) return false;

    if (!firebase.apps.length) {
      firebase.initializeApp(window.SWAPIO_FIREBASE_CONFIG);
    }

    return true;
  }

  function getDb() {
    if (!ensureFirebaseApp()) return null;
    if (!window.__swapioDb) {
      window.__swapioDb = firebase.firestore();
    }
    return window.__swapioDb;
  }

  function getDocRef(docKey) {
    const db = getDb();
    if (!db) return null;
    return db.collection('admin').doc(DOC_PATHS[docKey] || docKey);
  }

  async function setDocument(docKey, payload) {
    const ref = getDocRef(docKey);
    if (!ref) return false;
    await ref.set(payload, { merge: true });
    return true;
  }

  async function getDocument(docKey) {
    const ref = getDocRef(docKey);
    if (!ref) return null;
    const snapshot = await ref.get();
    return snapshot.exists ? snapshot.data() : null;
  }

  function initializeFirebaseAuth() {
    if (!ensureFirebaseApp()) return null;
    return firebase.auth();
  }

  async function signInAdminWithFirebase(email, password) {
    const auth = initializeFirebaseAuth();
    if (!auth) {
      throw new Error('Firebase Auth is not ready. Please make sure Firebase is configured correctly.');
    }

    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdTokenResult(true);
    const adminEmail = (window.SWAPIO_ADMIN_EMAIL || 'admin@swapio.com').toLowerCase();

    if (token.claims.admin !== true && userCredential.user.email?.toLowerCase() !== adminEmail) {
      await auth.signOut();
      throw new Error('This account is not allowed to access the admin dashboard.');
    }

    return userCredential.user;
  }

  function readProducts() {
    return safeParse(STORAGE_KEYS.products, []);
  }

  function saveProducts(products) {
    setLocalStorage(STORAGE_KEYS.products, products);
    return syncProductsToCloud(products);
  }

  async function syncProductsToCloud(products) {
    const db = getDb();
    if (!db) return false;
    await setDocument('products', { products, updatedAt: Date.now() });
    return true;
  }

  async function loadProductsFromCloud() {
    const data = await getDocument('products');
    if (!data) return null;
    return Array.isArray(data.products) ? data.products : [];
  }

  function readInventory() {
    return safeParse(STORAGE_KEYS.inventory, []);
  }

  function saveInventory(items) {
    setLocalStorage(STORAGE_KEYS.inventory, items);
    return syncInventoryToCloud(items);
  }

  async function syncInventoryToCloud(items) {
    const db = getDb();
    if (!db) return false;
    await setDocument('inventory', { inventory: items, updatedAt: Date.now() });
    return true;
  }

  async function loadInventoryFromCloud() {
    const data = await getDocument('inventory');
    if (!data) return null;
    return Array.isArray(data.inventory) ? data.inventory : [];
  }

  function readPhoneCatalog() {
    return safeParse(STORAGE_KEYS.phoneCatalog, []);
  }

  function savePhoneCatalog(items) {
    setLocalStorage(STORAGE_KEYS.phoneCatalog, items);
    return syncPhoneCatalogToCloud(items);
  }

  async function syncPhoneCatalogToCloud(items) {
    const db = getDb();
    if (!db) return false;
    await setDocument('phoneCatalog', { phones: items, updatedAt: Date.now() });
    return true;
  }

  async function loadPhoneCatalogFromCloud() {
    const data = await getDocument('phoneCatalog');
    if (!data) return null;
    return Array.isArray(data.phones) ? data.phones : [];
  }

  function readBuyCatalog() {
    return safeParse(STORAGE_KEYS.buyCatalog, []);
  }

  function saveBuyCatalog(items) {
    const records = stampCatalogRecords(STORAGE_KEYS.buyCatalog, 'buy', items);
    setLocalStorage(STORAGE_KEYS.buyCatalog, records);
    return syncBuyCatalogToCloud(records);
  }

  async function syncBuyCatalogToCloud(items) {
    const db = getDb();
    if (!db) return false;
    const current = await getDocument('buyCatalog');
    await setDocument('buyCatalog', { models: mergeCatalogRecords(current?.models, items, 'buy'), updatedAt: Date.now() });
    return true;
  }

  async function loadBuyCatalogFromCloud() {
    const data = await getDocument('buyCatalog');
    if (!data) return null;
    return Array.isArray(data.models) ? data.models : [];
  }

  function readSellCatalog() {
    return safeParse(STORAGE_KEYS.sellCatalog, []);
  }

  function saveSellCatalog(items) {
    const records = stampCatalogRecords(STORAGE_KEYS.sellCatalog, 'sell', items);
    setLocalStorage(STORAGE_KEYS.sellCatalog, records);
    return syncSellCatalogToCloud(records);
  }

  async function syncSellCatalogToCloud(items) {
    const db = getDb();
    if (!db) return false;
    const current = await getDocument('sellCatalog');
    await setDocument('sellCatalog', { models: mergeCatalogRecords(current?.models, items, 'sell'), updatedAt: Date.now() });
    return true;
  }

  async function loadSellCatalogFromCloud() {
    const data = await getDocument('sellCatalog');
    if (!data) return null;
    return Array.isArray(data.models) ? data.models : [];
  }

  function readRepairCatalog() {
    return safeParse(STORAGE_KEYS.repairCatalog, []);
  }

  function saveRepairCatalog(items) {
    const records = stampCatalogRecords(STORAGE_KEYS.repairCatalog, 'repair', items);
    setLocalStorage(STORAGE_KEYS.repairCatalog, records);
    return syncRepairCatalogToCloud(records);
  }

  async function syncRepairCatalogToCloud(items) {
    const db = getDb();
    if (!db) return false;
    const current = await getDocument('repairCatalog');
    await setDocument('repairCatalog', { repairs: mergeCatalogRecords(current?.repairs, items, 'repair'), updatedAt: Date.now() });
    return true;
  }

  async function loadRepairCatalogFromCloud() {
    const data = await getDocument('repairCatalog');
    if (!data) return null;
    return Array.isArray(data.repairs) ? data.repairs : [];
  }

  function catalogIdentity(record) {
    const domain = String(record?.domain || '').toLowerCase();
    const brand = String(record?.brand || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
    let name = String(record?.name || record?.model || record?.service || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (brand && name.startsWith(brand)) name = name.slice(brand.length);
    const variant = String(record?.memory || record?.storage || record?.variant || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
    return `${domain}:${brand}:${name}:${variant}`;
  }

  function normalizeSellModelName(record) {
    if (!record || String(record.domain || '').toLowerCase() !== 'sell') return record;
    const brand = String(record.brand || '').trim();
    const name = String(record.name || '').trim();
    if (!brand || !name) return record;
    const prefix = new RegExp(`^${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s-]+`, 'i');
    const modelName = name.replace(prefix, '').trim();
    return modelName ? {...record, name: `${brand} ${modelName}`} : record;
  }

  function preferCatalogRecord(current, candidate) {
    if (!current) return candidate;
    const currentInactive = current.hidden === true || current.deleted === true || current.enabled === false;
    const candidateInactive = candidate.hidden === true || candidate.deleted === true || candidate.enabled === false;
    if (currentInactive !== candidateInactive) return candidateInactive ? current : candidate;
    return Number(candidate.updatedAt || 0) >= Number(current.updatedAt || 0) ? candidate : current;
  }

  function stampCatalogRecords(storageKey, domain, items) {
    const previous = safeParse(storageKey, []);
    const previousByIdentity = new Map(previous.map(item => [catalogIdentity({...item, domain}), item]));
    const now = Date.now();
    return (Array.isArray(items) ? items : []).map(item => {
      const previousItem = previousByIdentity.get(catalogIdentity({...item, domain}));
      const {updatedAt: ignoredCurrentTimestamp, ...currentData} = item;
      const {updatedAt: ignoredPreviousTimestamp, ...previousData} = previousItem || {};
      const unchanged = previousItem && JSON.stringify(currentData) === JSON.stringify(previousData);
      const requestedTimestamp = Number(item.updatedAt || 0);
      const explicitlyUpdated = requestedTimestamp > Number(previousItem?.updatedAt || 0);
      return {...item, updatedAt: explicitlyUpdated || !unchanged ? (requestedTimestamp || now) : previousItem.updatedAt};
    });
  }

  function mergeCatalogRecords(existing, incoming, domain) {
    const merged = new Map();
    [...(Array.isArray(existing) ? existing : []), ...(Array.isArray(incoming) ? incoming : [])].forEach(item => {
      const key = catalogIdentity({...item, domain});
      merged.set(key, preferCatalogRecord(merged.get(key), item));
    });
    return [...merged.values()];
  }

  function readCatalog(domain, seeds = [], includeHidden = true) {
    const key = CATALOG_KEYS[domain];
    if (!key) return [];
    const stored = safeParse(key, []);
    const records = Array.isArray(stored) ? stored : [];
    const byIdentity = new Map();
    const seedRecords = Array.isArray(seeds) ? seeds : [];
    seedRecords.forEach(seed => {
      if (!seed) return;
      const identity = catalogIdentity({...seed, domain});
      const record = {...seed, domain, enabled: seed.enabled !== false, source: seed.source || 'seed'};
      if (!byIdentity.has(identity)) byIdentity.set(identity, record);
    });
    records.forEach(record => {
      const identity = catalogIdentity({...record, domain});
      const current = byIdentity.get(identity);
      const hasSavedEdit = Number(record.updatedAt || 0) > 0;
      if (domain === 'sell' && current && !Number(current.updatedAt || 0) && !hasSavedEdit) return;
      byIdentity.set(identity, preferCatalogRecord(current, record));
    });
    const merged = [...byIdentity.values()].map(normalizeSellModelName);
    setLocalStorage(key, merged);
    return includeHidden ? merged : merged.filter(record => record.enabled !== false && record.hidden !== true && record.deleted !== true);
  }

  function saveCatalog(domain, items) {
    const key = CATALOG_KEYS[domain];
    if (!key) return Promise.resolve(false);
    const records = (Array.isArray(items) ? items : []).map(item => ({...item, domain, source: item.source || 'admin'}));
    setLocalStorage(key, records);
    if (domain === 'buy') return saveBuyCatalog(records);
    if (domain === 'sell') return saveSellCatalog(records);
    if (domain === 'repair') return saveRepairCatalog(records);
    return saveRecycleCatalog(records);
  }

  async function syncCatalogDocument(docKey, payload) {
    const db = getDb();
    if (!db) return false;
    const current = await getDocument(docKey);
    const field = Object.keys(payload)[0];
    const merged = mergeCatalogRecords(current?.[field], payload[field], 'recycle');
    await setDocument(docKey, {[field]: merged, updatedAt: Date.now()});
    return true;
  }

  async function loadRecycleCatalogFromCloud() {
    const data = await getDocument('recycleCatalog');
    if (!data) return null;
    return Array.isArray(data.items) ? data.items : [];
  }

  async function saveRecycleCatalog(items) {
    const records = stampCatalogRecords(CATALOG_KEYS.recycle, 'recycle', items);
    setLocalStorage(CATALOG_KEYS.recycle, records);
    return syncCatalogDocument('recycleCatalog', { items: records });
  }

  function readReturns() {
    return safeParse(STORAGE_KEYS.returns, []);
  }

  function saveReturns(items) {
    setLocalStorage(STORAGE_KEYS.returns, items);
    return syncReturnsToCloud(items);
  }

  async function syncReturnsToCloud(items) {
    const db = getDb();
    if (!db) return false;
    await setDocument('returns', { returns: items, updatedAt: Date.now() });
    return true;
  }

  async function loadReturnsFromCloud() {
    const data = await getDocument('returns');
    if (!data) return null;
    return Array.isArray(data.returns) ? data.returns : [];
  }

  function readBills() {
    return safeParse(STORAGE_KEYS.bills, []);
  }

  function saveBills(items) {
    setLocalStorage(STORAGE_KEYS.bills, items);
    return syncBillsToCloud(items);
  }

  async function syncBillsToCloud(items) {
    const db = getDb();
    if (!db) return false;
    await setDocument('bills', { bills: items, updatedAt: Date.now() });
    return true;
  }

  async function loadBillsFromCloud() {
    const data = await getDocument('bills');
    if (!data) return null;
    return Array.isArray(data.bills) ? data.bills : [];
  }

  async function getNextBillNumber() {
    const db = getDb();
    if (db) {
      const ref = db.collection('admin').doc(DOC_PATHS.billingCounter || 'billingCounter');
      try {
        const result = await db.runTransaction(async transaction => {
          const snapshot = await transaction.get(ref);
          const current = Number(snapshot.data()?.value || 0);
          const next = current + 1;
          transaction.set(ref, { value: next, updatedAt: Date.now() }, { merge: true });
          return next;
        });
        return `BILL-${String(result).padStart(4, '0')}`;
      } catch (error) {
        console.warn('Firebase billing counter failed. Falling back to local bill number generation.', error);
      }
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

  async function saveCustomerSubmission(submission) {
    const prepared = cleanSubmissionData({
      ...submission,
      requestNumber: submission.requestNumber || createRequestNumber(submission.type),
      status: submission.status || 'New',
      createdAt: Number(submission.createdAt) || Date.now()
    });
    Object.assign(submission, prepared);
    queueCustomerSubmission(prepared);
    const db = getDb();
    if (!db) throw new Error('Firebase is not configured yet.');
    await db.collection('submissions').doc(prepared.requestNumber).set(prepared, { merge: true });
    removeQueuedSubmission(prepared.requestNumber);
    return prepared;
  }

  async function flushCustomerSubmissionOutbox() {
    const pending = readRequestOutbox();
    if (!pending.length || !getDb()) return;
    for (const submission of pending) {
      try {
        await getDb().collection('submissions').doc(submission.requestNumber).set(submission, { merge: true });
        removeQueuedSubmission(submission.requestNumber);
      } catch (error) {
        console.warn('Pending customer request is waiting for Firebase.', error);
      }
    }
  }

  async function loadCustomerSubmissions() {
    const db = getDb();
    if (!db) return null;
    const snapshot = await db.collection('submissions').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function loadAllDataFromCloud() {
    const cloudProducts = await loadProductsFromCloud();
    const cloudInventory = await loadInventoryFromCloud();
    const cloudReturns = await loadReturnsFromCloud();
    const cloudPhoneCatalog = await loadPhoneCatalogFromCloud();

    if (cloudProducts !== null) {
      setLocalStorage(STORAGE_KEYS.products, cloudProducts);
    }
    if (cloudInventory !== null) {
      setLocalStorage(STORAGE_KEYS.inventory, cloudInventory);
    }
    if (cloudReturns !== null) {
      setLocalStorage(STORAGE_KEYS.returns, cloudReturns);
    }
    if (cloudPhoneCatalog !== null) {
      setLocalStorage(STORAGE_KEYS.phoneCatalog, cloudPhoneCatalog);
    }
    const cloudBuyCatalog = await loadBuyCatalogFromCloud();
    if (cloudBuyCatalog !== null) {
      setLocalStorage(STORAGE_KEYS.buyCatalog, cloudBuyCatalog);
    }
    const cloudSellCatalog = await loadSellCatalogFromCloud();
    if (cloudSellCatalog !== null) {
      setLocalStorage(STORAGE_KEYS.sellCatalog, cloudSellCatalog);
    }
    const cloudBills = await loadBillsFromCloud();
    if (cloudBills !== null) {
      setLocalStorage(STORAGE_KEYS.bills, cloudBills);
    }
  }

  window.swapioData = {
    STORAGE_KEYS,
    DOC_PATHS,
    getDb,
    initializeFirebaseAuth,
    signInAdminWithFirebase,
    readProducts,
    saveProducts,
    syncProductsToCloud,
    loadProductsFromCloud,
    readInventory,
    saveInventory,
    syncInventoryToCloud,
    loadInventoryFromCloud,
    readPhoneCatalog,
    savePhoneCatalog,
    syncPhoneCatalogToCloud,
    loadPhoneCatalogFromCloud,
    readBuyCatalog,
    saveBuyCatalog,
    syncBuyCatalogToCloud,
    loadBuyCatalogFromCloud,
    readSellCatalog,
    saveSellCatalog,
    syncSellCatalogToCloud,
    loadSellCatalogFromCloud,
    readRepairCatalog,
    saveRepairCatalog,
    syncRepairCatalogToCloud,
    loadRepairCatalogFromCloud,
    readCatalog,
    saveCatalog,
    loadRecycleCatalogFromCloud,
    saveRecycleCatalog,
    catalogIdentity,
    readReturns,
    saveReturns,
    syncReturnsToCloud,
    loadReturnsFromCloud,
    readBills,
    saveBills,
    syncBillsToCloud,
    loadBillsFromCloud,
    getNextBillNumber,
    saveCustomerSubmission,
    flushCustomerSubmissionOutbox,
    loadCustomerSubmissions,
    loadAllDataFromCloud,
    setDocument,
    getDocument
  };
  migrateLegacyCustomerSubmissions();
  window.addEventListener('online', flushCustomerSubmissionOutbox);
  setTimeout(flushCustomerSubmissionOutbox, 1500);
  setInterval(flushCustomerSubmissionOutbox, 10000);
})();
