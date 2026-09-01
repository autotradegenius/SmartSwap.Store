/* ============================================================
   SmartSwap Chatbot - Knowledge Base + Matching Engine
   Covers: buying, selling, repairs, pricing, warranty, pickup,
   payments, condition grading, timing, brands, data safety,
   bulk/corporate, location, and more.
   Drop this file in place of your old one. It exposes the same
   window.smartSwapChatbotResponses object your UI already reads,
   plus a ready-to-use window.smartSwapGetResponse(userText)
   function with typo tolerance built in.
   ============================================================ */

function getSharedInventory() {
  if (window.swapioData && typeof window.swapioData.readInventory === 'function') {
    const sharedItems = window.swapioData.readInventory();
    if (Array.isArray(sharedItems) && sharedItems.length) return sharedItems;
  }

  const localItems = JSON.parse(localStorage.getItem('swapioInventory') || '[]');
  if (Array.isArray(localItems) && localItems.length) return localItems;

  return Array.isArray(window.smartSwapInventory) ? window.smartSwapInventory : [];
}

window.smartSwapContact = {
  call: '+91 9718655625',
  whatsapp: '+91 9718655625'
};

window.smartSwapChatbotResponses = {

  greeting: 'Hi! I can help with selling, buying, or repairing your phone. What do you need today?',
  default: 'I can help with buying, selling, and repairs. Tell me what you need and I will guide you.',
  fallback: 'I may not have the exact answer yet. Please contact our team on WhatsApp: +91 9718655625 and we will help you right away.',

  // ---------- SELL ----------
  sell: 'You can sell your phone from our Sell page. Share the model and condition, and we will guide you on the best price and pickup.',
  sell_process: 'Selling is easy: 1) Tell us your phone model and condition, 2) We give you an instant quote, 3) You confirm, 4) We pick up or you drop it off, 5) You get paid on the spot after a quick check.',
  sell_condition: 'Price depends on condition: screen condition, battery health, body scratches/dents, and whether everything (buttons, camera, charging) works properly. Share these details and we will give an accurate quote.',
  sell_documents: 'To sell your phone we usually need a valid ID proof and the original box/bill if you have them (not compulsory, but helps get a better price).',
  sell_payment_speed: 'Once your phone passes the quick condition check, payment is instant — via UPI, bank transfer, or cash, whichever you prefer.',

  // ---------- BUY ----------
  buy: 'You can browse certified refurbished phones on our Buy page. We have tested and verified devices at great value.',
  buy_condition_grades: 'Our refurbished phones are graded (e.g. Like New, Good, Fair) based on cosmetic condition — all grades are fully function-tested regardless of scratches, so the phone always works perfectly.',
  buy_warranty: 'All phones we sell come with a warranty period so you can buy with confidence. Ask us for the exact warranty duration on the specific model you want.',
  buy_emi: 'Yes, EMI/installment options are available on most purchases. Ask us for eligibility and available plans.',
  buy_brands: 'We deal in all major brands — iPhone, Samsung, OnePlus, Xiaomi, Vivo, Oppo, and more. Tell us the brand/model you are looking for and we will check availability.',
  buy_availability: 'Stock changes daily. Share the exact model and budget you have in mind, and we will confirm if it is currently available.',
  buy_android_generic: 'Sure! We have Android phones available across brands like Samsung, OnePlus, Xiaomi, Vivo, and Oppo. Do you have a specific brand, model, or budget in mind so we can show you the best options?',
  buy_iphone: 'Great choice! We regularly have certified refurbished iPhones in stock. Tell us the model (e.g. iPhone 12, 13, 14) and your budget, and we will confirm current availability and price.',
  buy_samsung: 'We have Samsung phones available. Tell us the exact model (e.g. Galaxy S23, A54) and your budget, and we will check current stock and price for you.',
  buy_oppo: 'We have Oppo phones available. Tell us the exact model and your budget, and we will confirm current stock and price for you.',
  buy_vivo: 'We have Vivo phones available. Tell us the exact model and your budget, and we will confirm current stock and price for you.',
  buy_oneplus: 'We have OnePlus phones available. Tell us the exact model and your budget, and we will confirm current stock and price for you.',
  buy_xiaomi: 'We have Xiaomi/Redmi phones available. Tell us the exact model and your budget, and we will confirm current stock and price for you.',

  // ---------- REPAIR ----------
  repair: 'Tell us the issue — screen, battery, charging, or camera — and we will help you with the repair options.',
  repair_screen: 'Screen replacement is one of our most common repairs. Share your phone model and we will confirm the cost and how long it will take.',
  repair_battery: 'Battery replacement/health issues can usually be fixed same day. Share your phone model for exact pricing.',
  repair_charging: 'Charging port issues (slow charging, not charging, loose connection) can often be fixed quickly. Share your model and we will check.',
  repair_camera: 'Camera issues (blurry, not focusing, black screen on camera app) are repairable. Share the phone model and the exact issue for a quote.',
  repair_water_damage: 'Water damage repair depends on how soon you bring it in — the sooner, the better the chances of recovery. Turn the phone off immediately and bring it to us as soon as possible.',
  repair_software: 'We also fix software issues — phone hanging, restarting, boot loops, update failures, or forgotten passwords/locks (with proof of ownership).',
  repair_time: 'Most common repairs (screen, battery, charging port) are done same day, often within a couple of hours. Water damage or complex motherboard issues may take longer — we will give you a clear timeline after inspection.',
  repair_warranty: 'All our repairs come with a warranty on the part and the work done. Ask us for the exact warranty period for your specific repair.',
  repair_genuine_parts: 'We use quality-tested parts for all repairs and will always tell you upfront what type of part is being used.',

  // ---------- PRICE / QUOTE ----------
  price: 'We can help with a quick price estimate. Please share the phone model and condition, and we will guide you.',
  price_negotiable: 'Our quotes are based on current market value and phone condition, so they are fair and close to final — but feel free to share details and we will always try to get you the best price.',

  // ---------- TRADE-IN / EXCHANGE ----------
  trade_in: 'Yes, we accept old phones as exchange when buying a new/refurbished one from us. Share your old phone model and condition along with the phone you want, and we will adjust the value.',

  // ---------- DATA SAFETY ----------
  data_safety: 'Your data privacy matters to us. We recommend backing up and factory-resetting your phone before selling or handing it in for repair. We can also guide you through this if needed.',

  // ---------- PICKUP / DELIVERY ----------
  pickup: 'We offer doorstep pickup for selling your old phone in most areas. Share your location and we will confirm if pickup is available for you.',
  delivery: 'Yes, we deliver purchased phones to your address. Delivery time depends on your location — share your pincode and we will confirm.',

  // ---------- BULK / CORPORATE ----------
  bulk_sell: 'We also handle bulk phone buying for individuals or businesses upgrading multiple devices. Message us on WhatsApp with quantity and models for a custom quote.',

  // ---------- RETURN / REFUND ----------
  return_policy: 'Purchased phones come with a return/replacement window in case of any manufacturing issue — ask us for the exact policy on your specific purchase.',

  // ---------- CONTACT / LOCATION / HOURS ----------
  contact: 'You can also contact us directly on WhatsApp: +91 9718655625',
  location: 'Please contact us on WhatsApp at +91 9718655625 for our exact store address and directions.',
  hours: 'For our current working hours, please message us on WhatsApp: +91 9718655625 and we will confirm right away.',

  // ---------- SMALL TALK ----------
  thanks: 'You are welcome! Let us know if you need anything else — buying, selling, or repairing your phone.',
  bye: 'Thanks for chatting with us! Reach out anytime, or message us on WhatsApp: +91 9718655625',

  patterns: {
    greeting: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],

    sell: ['sell', 'sell my', 'sell phone', 'get price', 'price my phone', 'trade in my'],
    sell_process: ['how to sell', 'sell process', 'how does selling work', 'steps to sell'],
    sell_condition: ['condition matter', 'how is price decided', 'condition based', 'scratches price', 'affect price'],
    sell_documents: ['id proof', 'documents needed', 'aadhar', 'bill required', 'box required'],
    sell_payment_speed: ['when do i get paid', 'payment after selling', 'instant payment', 'cash on spot', 'upi payment sell'],

    buy: ['buy', 'purchase', 'want to buy', 'phone price', 'look for phone', 'looking to buy'],
    buy_condition_grades: ['grade', 'like new', 'refurbished condition', 'what does good mean', 'condition meaning'],
    buy_warranty: ['warranty on buy', 'warranty phone purchase', 'guarantee on buy'],
    buy_emi: ['emi', 'installment', 'monthly payment', 'finance option', 'no cost emi'],
    buy_brands: ['which brands', 'brands available', 'what brands', 'all brands'],
    buy_availability: ['in stock', 'available', 'do you have', 'stock check'],
    buy_android_generic: ['android phone', 'android', 'need android'],
    buy_iphone: ['iphone', 'apple phone', 'i phone', 'want to buy iphone', 'buy iphone', 'looking for iphone'],
    buy_samsung: ['samsung', 'galaxy', 'want to buy samsung', 'buy samsung'],
    buy_oppo: ['oppo'],
    buy_vivo: ['vivo'],
    buy_oneplus: ['oneplus', 'one plus'],
    buy_xiaomi: ['xiaomi', 'redmi', 'mi phone'],

    repair: ['repair', 'fix', 'problem', 'issue', 'broken', 'not working'],
    repair_screen: ['screen', 'display', 'glass', 'cracked screen', 'broken screen', 'touch not working'],
    repair_battery: ['battery', 'battery drain', 'battery health', 'battery backup', 'battery swelling'],
    repair_charging: ['charging', 'not charging', 'charging port', 'slow charging', 'charger issue'],
    repair_camera: ['camera', 'blurry camera', 'camera not working', 'camera black'],
    repair_water_damage: ['water damage', 'water', 'wet phone', 'fell in water', 'liquid damage'],
    repair_software: ['software', 'hang', 'hanging', 'restart', 'boot loop', 'forgot password', 'locked phone', 'update issue'],
    repair_time: ['how long', 'repair time', 'same day', 'turnaround', 'how much time'],
    repair_warranty: ['warranty on repair', 'repair guarantee', 'guarantee on parts'],
    repair_genuine_parts: ['original parts', 'genuine parts', 'what parts do you use', 'quality of parts'],

    price: ['price', 'quote', 'offer', 'valuation', 'estimate', 'cost'],
    price_negotiable: ['negotiable', 'best price', 'final price', 'can you increase price'],

    trade_in: ['exchange', 'trade in', 'exchange offer', 'swap phone'],

    data_safety: ['data safe', 'data privacy', 'backup', 'factory reset', 'my photos', 'my data'],

    pickup: ['pickup', 'doorstep', 'come to my place', 'home pickup'],
    delivery: ['delivery', 'deliver', 'shipping', 'how will i get it'],

    bulk_sell: ['bulk', 'multiple phones', 'corporate', 'company sell', 'many phones'],

    return_policy: ['return', 'refund', 'replace', 'exchange policy', 'return policy'],

    contact: ['contact', 'call', 'whatsapp', 'number', 'phone number', 'talk to someone'],
    location: ['location', 'address', 'where are you', 'shop address', 'store location'],
    hours: ['hours', 'timing', 'open', 'closed', 'what time'],

    thanks: ['thanks', 'thank you', 'thx', 'appreciate it'],
    bye: ['bye', 'goodbye', 'see you', 'ok bye']
  }
};

/* ============================================================
   Typo-tolerant matching engine
   - normalizes text (lowercase, strips punctuation)
   - checks direct substring matches first (fast, exact)
   - falls back to word-by-word fuzzy matching (Levenshtein
     distance <= 1 for words 4+ letters) to catch typos like
     "iphoen" -> "iphone", "reapir" -> "repair"
   ============================================================ */

function smartSwapNormalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function smartSwapLevenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function smartSwapWordsFuzzyMatch(inputWords, patternPhrase) {
  const patternWords = smartSwapNormalize(patternPhrase).split(' ');
  return patternWords.every(pw =>
    inputWords.some(iw => {
      if (iw === pw) return true;
      if (pw.length >= 4 && iw.length >= 4) {
        return smartSwapLevenshtein(iw, pw) <= 1;
      }
      return false;
    })
  );
}

function smartSwapFindInventoryMatch(userText) {
  const inventory = getSharedInventory();
  if (!inventory.length) return null;

  const normalized = smartSwapNormalize(userText);
  const inputWords = normalized.split(' ').filter(Boolean);
  let bestMatch = null;
  let bestScore = 0;

  const queryAliases = new Set([
    normalized,
    normalized.replace(/\s+/g, ''),
    ...inputWords,
    ...inputWords.map(word => word.replace(/[^a-z0-9]/gi, ''))
  ]);

  for (const item of inventory) {
    const modelName = item.model || item.name || '';
    const model = smartSwapNormalize(modelName);
    const modelWords = model.split(' ').filter(Boolean);
    let score = 0;

    if (!model) continue;

    const aliasSet = new Set([
      model,
      model.replace(/\s+/g, ''),
      ...modelWords,
      ...modelWords.map(word => word.replace(/[^a-z0-9]/gi, '')),
      ...(modelWords.length > 1 ? [modelWords.join(''), modelWords.join(' ')] : [])
    ]);

    const directMatch = model === normalized || normalized.includes(model) || model.includes(normalized);
    if (directMatch) score += 1000;

    // Strong exact alias match: 'f19' should match 'oppo f19' and not 'oneplus 9'.
    if (Array.from(queryAliases).some(q => aliasSet.has(q))) score += 600;

    // Exact token match gets highest priority when model names share a token.
    if (inputWords.some(iw => modelWords.some(mw => iw === mw || iw.replace(/[^a-z0-9]/gi, '') === mw.replace(/[^a-z0-9]/gi, '')))) score += 500;

    // Short-code / partial model match like 'f19' should match 'oppo f19'.
    if (inputWords.some(iw => modelWords.some(mw => {
      const a = iw.replace(/[^a-z0-9]/gi, '');
      const b = mw.replace(/[^a-z0-9]/gi, '');
      return a && b && (a === b || mw.includes(iw) || iw.includes(mw) || a.includes(b) || b.includes(a));
    }))) score += 250;

    // Only award brand-level match after a concrete model match is absent.
    if (modelWords.some(mw => normalized.includes(mw))) score += 80;

    // Fuzzy matching only as a last resort.
    if (inputWords.some(iw => modelWords.some(mw => mw.length >= 4 && iw.length >= 4 && smartSwapLevenshtein(iw, mw) <= 1))) score += 15;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

function smartSwapGetAvailabilityState(item) {
  const candidateKeys = ['inStock', 'in_stock', 'isAvailable', 'available', 'status', 'stock', 'availability'];

  for (const key of candidateKeys) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key];
      if (typeof value === 'boolean') return { available: value };
      if (typeof value === 'string') {
        const text = value.toLowerCase().trim();
        if (!text) continue;
        if (text.includes('in stock') || text.includes('instock') || text.includes('available') || text.includes('available now')) return { available: true };
        if (text.includes('out of stock') || text.includes('outofstock') || text.includes('not available') || text.includes('sold out') || text.includes('unavailable')) return { available: false };
      }
    }
  }

  return { available: true };
}

function smartSwapInventoryResponse(userText) {
  const inventory = getSharedInventory();
  if (!inventory.length) return null;

  const normalized = smartSwapNormalize(userText);
  const availabilityQuestion = ['available', 'availability', 'in stock', 'stock check', 'do you have', 'is there'].some(phrase => normalized.includes(phrase));
  if (!availabilityQuestion) return null;
  const match = smartSwapFindInventoryMatch(userText);
  const callNumber = window.smartSwapContact?.call || '+91 9718655625';
  const whatsappNumber = window.smartSwapContact?.whatsapp || '+91 9718655625';

  if (!match) {
    const hasBrandReference = inventory.some(item => {
      const modelName = String(item.model || item.name || '');
      return smartSwapNormalize(modelName).split(' ').some(word => normalized.includes(word));
    });
    if (!hasBrandReference) return null;
  }

  if (!match) {
    const inStock = inventory.filter(item => {
      const status = String(item.status || item.stock || '').toLowerCase();
      return status.includes('in-stock') || status.includes('instock') || status.includes('in stock');
    }).slice(0, 3);
    if (inStock.length) {
      const suggestions = inStock.map(item => {
        const name = item.model || item.name || 'Model';
        const price = item.salePrice || item.price || item.purchasePrice || 'Price on request';
        return `${name} (${price})`;
      }).join(', ');
      return `We do not have that model right now, but we do have similar options available: ${suggestions}. For the latest stock and exact availability, contact our sales team on WhatsApp: ${whatsappNumber} or call: ${callNumber}.`;
    }
    return null;
  }

  const modelName = match.model || match.name || 'This model';
  const price = match.salePrice || match.price || match.purchasePrice || 'Price on request';
  const availability = smartSwapGetAvailabilityState(match);

  if (availability.available === true) {
    return `Yes, ${modelName} is available for ${price}. We have ${modelName} in stock right now. Message us on WhatsApp: ${whatsappNumber} or call us on ${callNumber}.`;
  }

  return `Sorry, ${modelName} is currently out of stock — but new stock is coming soon! You may contact our sales team for updates: Call ${callNumber} / WhatsApp ${whatsappNumber}.`;
}

/**
 * Returns the best-matching reply for a given user message.
 * Falls back to `default` if nothing scores, or `fallback` is
 * available separately for "truly stuck" cases if you want to
 * use it after N failed attempts in your UI logic.
 */
window.smartSwapGetResponse = function (userText) {
  const kb = window.smartSwapChatbotResponses;
  if (!userText || !userText.trim()) return kb.default;

  const inventoryReply = smartSwapInventoryResponse(userText);
  if (inventoryReply) return inventoryReply;

  const normalized = smartSwapNormalize(userText);
  const inputWords = normalized.split(' ');

  let bestKey = null;
  let bestScore = 0;

  for (const [key, phrases] of Object.entries(kb.patterns)) {
    for (const phrase of phrases) {
      const normalizedPhrase = smartSwapNormalize(phrase);

      // 1) exact substring match = strong signal
      if (normalized.includes(normalizedPhrase)) {
        const score = normalizedPhrase.split(' ').length + 1 + (key.includes('_') ? 0.1 : 0);
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
        continue;
      }

      // 2) fuzzy word-by-word match = catches typos
      if (smartSwapWordsFuzzyMatch(inputWords, phrase)) {
        const score = normalizedPhrase.split(' ').length + (key.includes('_') ? 0.1 : 0);
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
    }
  }

  if (bestKey && kb[bestKey]) return kb[bestKey];
  return kb.default;
};