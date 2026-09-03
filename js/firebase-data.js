(function () {
  const STORAGE_KEYS = {
    products: 'swapioAdminProducts',
    inventory: 'swapioInventory',
    returns: 'swapioReturns',
    phoneCatalog: 'swapioPhoneCatalog',
    bills: 'swapioBills',
    billingCounter: 'swapioBillingCounter'
  };

  const DOC_PATHS = {
    products: 'catalog',
    inventory: 'inventory',
    returns: 'returns',
    phoneCatalog: 'phoneCatalog',
    bills: 'bills',
    billingCounter: 'billingCounter'
  };

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
    const db = getDb();
    if (!db) throw new Error('Firebase is not configured yet.');
    await db.collection('submissions').add(submission);
    return true;
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
    loadCustomerSubmissions,
    loadAllDataFromCloud,
    setDocument,
    getDocument
  };
})();
