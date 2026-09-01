(function () {
  const STORAGE_KEYS = {
    products: 'swapioAdminProducts',
    inventory: 'swapioInventory',
    returns: 'swapioReturns'
  };

  const DOC_PATHS = {
    products: 'catalog',
    inventory: 'inventory',
    returns: 'returns'
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

    if (cloudProducts !== null) {
      setLocalStorage(STORAGE_KEYS.products, cloudProducts);
    }
    if (cloudInventory !== null) {
      setLocalStorage(STORAGE_KEYS.inventory, cloudInventory);
    }
    if (cloudReturns !== null) {
      setLocalStorage(STORAGE_KEYS.returns, cloudReturns);
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
    readReturns,
    saveReturns,
    syncReturnsToCloud,
    loadReturnsFromCloud,
    saveCustomerSubmission,
    loadCustomerSubmissions,
    loadAllDataFromCloud,
    setDocument,
    getDocument
  };
})();
