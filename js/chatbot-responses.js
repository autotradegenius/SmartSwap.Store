/* ============================================================
   SmartSwap Chatbot - Knowledge Base + Matching Engine
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

function pickReply(value) {
  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)];
  }
  return value;
}

let smartSwapLastFallbackIndex = -1;
function pickFallback(value) {
  if (!Array.isArray(value)) return value;
  if (value.length === 1) return value[0];
  let idx;
  do {
    idx = Math.floor(Math.random() * value.length);
  } while (idx === smartSwapLastFallbackIndex);
  smartSwapLastFallbackIndex = idx;
  return value[idx];
}

window.smartSwapChatbotResponses = {

  greeting: [
    "Hey! Looking to sell, buy, or get your phone fixed today?",
    "Hi there! What can I help you with — selling, buying, or a repair?"
  ],
  default: [
    "I can help with buying, selling, or repairing a phone — just tell me a bit more about what you need.",
    "Not totally sure what you're looking for — could you tell me if it's about buying, selling, or fixing a phone?"
  ],
  fallback: [
    "Hmm, I'm not totally sure about that one. You can message our team directly on WhatsApp: +91 9718655625 and they'll help you right away.",
    "That's a bit outside what I can answer directly — best to check with our team on WhatsApp: +91 9718655625, they'll sort it out fast.",
    "I don't have a clear answer for that yet. Give our team a shout on WhatsApp: +91 9718655625 and they'll take it from here."
  ],

  // ---------- SELL ----------
  sell: [
    "Sure! Just tell me your phone's model and condition, and I'll get you moving toward a quote and pickup.",
    "Selling with us is pretty simple — share the model and condition and I'll help you get the best price."
  ],
  sell_process: "Here's how it works: tell us the model and condition → we give you an instant quote → you confirm → we pick it up (or you drop it off) → you get paid on the spot after a quick check. Takes way less time than you'd think.",
  sell_condition: "Price mostly comes down to condition — screen, battery health, scratches/dents, and whether everything (buttons, camera, charging) still works fine. Share those details and I can get you an accurate number.",
  sell_documents: "Usually just a valid ID proof. Original box/bill isn't mandatory but can bump up the price a bit if you have it.",
  sell_payment_speed: "As soon as your phone clears the quick condition check, you're paid instantly — UPI, bank transfer, or cash, your call.",
  sell_dead_phone: "Yes, we still buy dead or non-working phones — the price will obviously be lower than a working one, but it's not zero. Share the model and what's wrong, and we'll give you a rough estimate.",

  // ---------- BUY ----------
  buy: [
    "We've got certified refurbished phones on the Buy page — all tested and verified. What are you in the market for?",
    "Take a look at our Buy page — everything's tested and verified before it's listed. Any particular brand or budget in mind?"
  ],
  buy_condition_grades: "Our refurbished phones come graded — Like New, Good, Fair — but that's purely cosmetic. Every unit is fully function-tested regardless of grade, so it works properly no matter what.",
  buy_warranty: "Every phone we sell comes with a warranty period, so you're covered. Tell me the model you're eyeing and I'll confirm the exact duration.",
  buy_emi: "Yep, EMI's available on most purchases. Want me to check your eligibility and current plans?",
  buy_emi_eligibility: "EMI eligibility usually depends on your card/lender and the purchase amount — most major cards and a few no-cost EMI partners are supported. Tell us the model and price range and we'll confirm what you're eligible for.",
  buy_brands: "We carry pretty much all the major brands — iPhone, Samsung, OnePlus, Xiaomi, Vivo, Oppo. What are you after?",
  buy_availability: "Stock shifts daily, so best to just tell me the exact model and your budget and I'll confirm what's available right now.",
  buy_android_generic: "We've got Android across the board — Samsung, OnePlus, Xiaomi, Vivo, Oppo. Got a brand, model, or budget in mind?",
  buy_iphone: [
    "Nice pick! We usually have refurbished iPhones in stock. Which model are you thinking — 12, 13, 14? And what's your budget?",
    "Good choice. Let me know the iPhone model you want and your rough budget, and I'll check what we've got available."
  ],
  buy_samsung: "We've got Samsung phones in. Tell me the exact model — like Galaxy S23 or A54 — and your budget, and I'll check current stock.",
  buy_oppo: "We have Oppo phones available. Which model, and what's your budget? I'll confirm stock and price.",
  buy_vivo: "We have Vivo phones available. Which model, and what's your budget? I'll confirm stock and price.",
  buy_oneplus: "We have OnePlus phones available. Which model, and what's your budget? I'll confirm stock and price.",
  buy_xiaomi: "We have Xiaomi/Redmi phones available. Which model, and what's your budget? I'll confirm stock and price.",
  buy_color_options: "Colors depend on what's currently in stock for that model. Tell me the exact model and I'll check which colors we have.",
  buy_accessories: "At minimum you get a charging cable — box, original charger, and earphones vary unit to unit and are noted in the listing. Give me a model and I'll confirm exactly what's included.",
  buy_network_lock: "All our phones are fully network-unlocked, so they work with any SIM or carrier. If you want, tell me the model and I'll double-check before you buy.",
  buy_imei_check: "Every unit we sell has a clean, verified IMEI — no blacklist, no financial lock. Happy to share the IMEI with you before or after purchase.",
  buy_gift: "Buying it as a gift? No problem — we can help with packaging and picking the right model for whoever it's for. Just let me know their needs and your budget.",
  buy_vs_new: "Compared to a brand-new phone, our refurbished units are function-tested, come with warranty, and cost noticeably less — usually the only difference is minor cosmetic wear depending on the grade you pick. Great option if you want to save without sacrificing reliability.",
  buy_inspection_tips: "Good instinct to check before buying! We recommend testing the screen touch response, all buttons, camera, charging, speaker/mic, and battery health during a quick demo — we're happy to walk you through this in person or on a video call before you finalize.",
  cod: "Cash on delivery may be available in select areas depending on order value — share your pincode and what you're buying, and we'll confirm if COD works for you.",
  festival_offer: "We do run festival and seasonal offers from time to time. Message us on WhatsApp and we'll tell you if anything's live right now.",

  // ---------- REPAIR ----------
  repair: [
    "What's going on with it — screen, battery, charging, or camera? Tell me the issue and I'll help sort it.",
    "Let's figure this out. What exactly is happening — is it the screen, battery, charging, or something else?"
  ],
  repair_iphone: "We can definitely help fix your iPhone. Just tell me the model and what's actually broken, and I'll get you a cost and timeline.",
  repair_screen: "Screen repairs are one of the most common jobs we do. Share your model and I'll confirm the cost and turnaround.",
  repair_battery: "Battery issues can usually be sorted same day. Just tell me your model for exact pricing.",
  repair_charging: "Charging port trouble — slow charging, not charging, loose connection — is usually a quick fix. Share your model and I'll check.",
  repair_camera: "Camera issues (blurry, not focusing, black screen) are fixable. Tell me the model and exactly what's wrong for a quote.",
  repair_water_damage: "With water damage, speed matters a lot — the sooner you bring it in, the better the odds of saving it. Turn it off right now and get it to us ASAP.",
  repair_software: "We handle software stuff too — hanging, restarts, boot loops, failed updates, even forgotten passwords/locks (with proof of ownership).",
  repair_time: "Most common fixes — screen, battery, charging port — are same-day, often within a couple hours. Water damage or motherboard issues can take longer; we'll give you a clear timeline after we take a look.",
  repair_warranty: "All our repairs come with warranty on both the part and the work. Ask us for the exact period for your specific repair.",
  repair_genuine_parts: "We use quality-tested parts across the board, and we'll always tell you upfront exactly what kind of part is going in.",
  repair_speaker: "Speaker or mic problems — no sound, muffled audio, call issues — are fixable. Tell me your model and what's happening.",
  repair_sim: "SIM tray or network/signal issues can usually be diagnosed pretty fast. Share your model and I'll take a look.",
  repair_not_turning_on: "Phone not turning on can be a battery, power button, or motherboard issue — hard to say without checking. Bring it in (or share the model and what happened just before it stopped) and we'll diagnose it for you.",
  repair_motherboard: "Motherboard issues are more complex and take longer to diagnose and fix than standard repairs — usually a couple of days depending on the damage. Bring the phone in so we can run a proper diagnostic and give you an honest cost estimate.",
  repair_forgot_password: "If you've forgotten your pattern/PIN/password, we can help unlock it — we'll just need proof of ownership (bill, box, or ID matching the account) before we proceed, for security reasons.",
  tempered_glass: "Yes, we install tempered glass / screen protectors, with or without a full screen repair. Share your model and we'll confirm price and availability.",

  // ---------- PRICE / QUOTE ----------
  price: [
    "Happy to give you a quick estimate — just share the model and condition.",
    "Let's get you a number. What's the model, and what condition is it in?"
  ],
  price_negotiable: "Our quotes are based on current market value and condition, so they're already pretty fair — but tell me more details and I'll always try to get you the best number possible.",

  // ---------- TRADE-IN / EXCHANGE ----------
  trade_in: "Yep, we take old phones as exchange when you're buying a new/refurbished one from us. Tell me your old phone's model and condition, plus what you want to buy, and I'll adjust the value.",

  // ---------- DATA SAFETY ----------
  data_safety: "Your privacy matters — we'd recommend backing up and factory-resetting before selling or handing it in for repair. Happy to walk you through it if you need.",
  data_wipe: "Before resale, we run a certified data-wipe on every phone after you've backed up and factory-reset it. Nothing gets left behind.",
  data_transfer_help: "Sure, we can help move your data — contacts, photos, apps — from your old phone to the new one when you buy from us. Just ask our team when you're in.",
  data_backup_before_update: "Before any major software update or repair, it's always smart to back up your data first — we can guide you through it, or just be aware that repairs involving the motherboard/storage carry some risk to existing data.",

  // ---------- PICKUP / DELIVERY ----------
  pickup: "We do doorstep pickup for selling in most areas. Share your location and I'll confirm if it's covered.",
  pickup_cost: "Pickup's free in most service areas. Give me your location and I'll confirm for your pincode.",
  delivery: "Yep, we deliver purchases to your address. Timing depends on location — share your pincode and I'll confirm.",
  old_battery_recycle: "Yes — we take old batteries and dead phones for proper e-waste recycling, even if you're not buying or selling anything with us.",

  // ---------- BULK / CORPORATE ----------
  bulk_sell: "We handle bulk buying too, whether it's a business upgrade or a bunch of personal devices. Message us on WhatsApp with quantity and models for a custom quote.",
  bulk_repair: "Yes, we handle bulk/corporate repairs too — for offices or teams with multiple devices needing fixes. Message us on WhatsApp with quantity and issues for a custom quote and turnaround time.",

  // ---------- RETURN / REFUND ----------
  return_policy: "Purchases come with a return/replacement window for any manufacturing issue. Ask us for the exact policy on your specific item.",
  payment_methods: "For buying: UPI, cards, EMI. For selling: UPI, bank transfer, or cash once the condition check is done.",
  complaint: "Sorry to hear you're facing an issue! Please share the details on WhatsApp: +91 9718655625 and our team will personally look into it and get back to you.",

  // ---------- CONTACT / LOCATION / HOURS ----------
  contact: "You can reach us directly on WhatsApp: +91 9718655625",
  location: "For our exact address and directions, message us on WhatsApp: +91 9718655625",
  hours: "Ping us on WhatsApp (+91 9718655625) and we'll confirm today's hours right away.",
  working_days: "We're open all days except major holidays — for exact working days this week, message us on WhatsApp: +91 9718655625.",

  // ---------- SMALL TALK ----------
  thanks: [
    "Anytime! Let me know if there's anything else — buying, selling, repairs, whatever.",
    "No worries at all — happy to help whenever you need."
  ],
  bye: [
    "Take care! Reach out anytime, or ping us on WhatsApp: +91 9718655625",
    "See you around! We're on WhatsApp too if you need us: +91 9718655625"
  ],

  patterns: {
    greeting: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],

    sell: ['sell', 'sell my', 'sell phone', 'get price', 'price my phone'],
    sell_process: ['how to sell', 'sell process', 'how does selling work', 'steps to sell'],
    sell_condition: ['condition matter', 'how is price decided', 'condition based', 'scratches price', 'affect price'],
    sell_documents: ['id proof', 'documents needed', 'what documents do i need', 'aadhar', 'bill required', 'box required'],
    sell_payment_speed: ['when do i get paid', 'payment after selling', 'instant payment', 'cash on spot', 'upi payment sell'],
    sell_dead_phone: ['sell dead phone', 'phone not working sell', 'sell broken phone', 'sell non working phone'],

    buy: ['buy', 'purchase', 'want to buy', 'phone price', 'look for phone', 'looking to buy'],
    buy_condition_grades: ['grade', 'like new', 'refurbished condition', 'what does good mean', 'condition meaning'],
    buy_warranty: ['warranty on buy', 'warranty phone purchase', 'what warranty comes with a purchase', 'warranty on purchase', 'guarantee on buy'],
    buy_emi: ['emi', 'installment', 'monthly payment', 'finance option', 'no cost emi'],
    buy_emi_eligibility: ['emi eligibility', 'am i eligible for emi', 'emi eligible', 'qualify for emi'],
    buy_brands: ['which brands', 'brands available', 'what brands', 'all brands'],
    buy_availability: ['in stock', 'available', 'do you have', 'stock check'],
    buy_android_generic: ['android phone', 'android', 'need android'],
    buy_iphone: ['iphone', 'apple phone', 'want to buy iphone', 'buy iphone', 'looking for iphone'],
    buy_samsung: ['samsung', 'galaxy', 'want to buy samsung', 'buy samsung'],
    buy_oppo: ['oppo'],
    buy_vivo: ['vivo'],
    buy_oneplus: ['oneplus', 'one plus'],
    buy_xiaomi: ['xiaomi', 'redmi'],
    buy_color_options: ['color options', 'which colors', 'colour available', 'what colors do you have'],
    buy_accessories: ['box included', 'original charger', 'comes with charger', 'accessories included', 'earphones included'],
    buy_network_lock: ['network locked', 'is it unlocked', 'carrier locked', 'sim locked', 'network unlock'],
    buy_imei_check: ['imei check', 'imei number', 'check imei', 'blacklisted', 'imei blacklist'],
    buy_gift: ['buy as gift', 'gift a phone', 'buying for someone', 'gift wrap'],
    buy_vs_new: ['refurbished vs new', 'difference between new and refurbished', 'second hand vs new', 'is refurbished good', 'refurbished vs second hand'],
    buy_inspection_tips: ['what to check before buying', 'how to check phone before buying', 'inspect before buying', 'tips before buying phone'],
    cod: ['cash on delivery', 'cod available', 'pay on delivery'],
    festival_offer: ['festival offer', 'diwali offer', 'seasonal discount', 'sale offer', 'festive discount'],

    repair: ['repair', 'fix', 'problem', 'issue', 'broken', 'not working', 'dropped phone', 'dropped'],
    repair_iphone: ['iphone broken', 'iphone is broken', 'broken iphone', 'my iphone is broken', 'dropped iphone', 'iphone dropped'],
    repair_screen: ['screen', 'display', 'glass', 'cracked screen', 'broken screen', 'touch not working'],
    repair_battery: ['battery', 'battery drain', 'battery health', 'battery backup', 'battery swelling'],
    repair_charging: ['charging', 'not charging', 'charging port', 'slow charging', 'charger issue'],
    repair_camera: ['camera', 'blurry camera', 'camera not working', 'camera black'],
    repair_water_damage: ['water damage', 'water', 'wet phone', 'fell in water', 'liquid damage'],
    repair_software: ['software', 'hang', 'hanging', 'restart', 'boot loop', 'forgot password', 'locked phone', 'update issue'],
    repair_time: ['how long', 'repair time', 'same day', 'turnaround', 'how much time'],
    repair_warranty: ['warranty on repair', 'repair guarantee', 'guarantee on parts'],
    repair_genuine_parts: ['original parts', 'genuine parts', 'what parts do you use', 'quality of parts'],
    repair_speaker: ['speaker not working', 'no sound', 'mic not working', 'muffled sound', 'call audio issue'],
    repair_sim: ['sim not detected', 'no network', 'no signal', 'sim tray issue', 'sim card issue'],
    repair_not_turning_on: ['phone not turning on', 'not switching on', 'wont turn on', 'dead phone not starting', 'phone not starting'],
    repair_motherboard: ['motherboard issue', 'motherboard problem', 'motherboard repair', 'logic board issue'],
    repair_forgot_password: ['forgot pattern', 'forgot pin', 'forgot my password', 'unlock my phone pattern', 'pattern lock help'],
    tempered_glass: ['tempered glass', 'screen protector', 'screen guard', 'glass protector'],

    price: ['price', 'quote', 'offer', 'valuation', 'estimate', 'cost', 'how much can i get', 'what is my phone worth'],
    price_negotiable: ['negotiable', 'best price', 'final price', 'can you increase price'],

    trade_in: ['exchange', 'trade in', 'exchange offer', 'swap phone'],

    data_safety: ['data safe', 'data privacy', 'backup', 'factory reset', 'my photos', 'my data'],
    data_wipe: ['data wipe', 'wipe data', 'certified data wipe', 'erase my data'],
    data_transfer_help: ['transfer my data', 'move my data', 'transfer contacts', 'help transfer photos'],
    data_backup_before_update: ['backup before update', 'should i backup before repair', 'backup before software update'],

    pickup: ['pickup', 'doorstep', 'do you offer doorstep pickup', 'come to my place', 'home pickup'],
    pickup_cost: ['is pickup free', 'free pickup', 'pickup cost', 'do you charge for pickup'],
    delivery: ['delivery', 'deliver', 'shipping', 'how will i get it'],
    old_battery_recycle: ['recycle old phone', 'can i recycle my battery', 'e waste', 'dispose old phone', 'recycle battery', 'old battery disposal'],

    bulk_sell: ['bulk', 'multiple phones', 'corporate', 'company sell', 'many phones'],
    bulk_repair: ['bulk repair', 'corporate repair', 'office phones repair', 'multiple phones repair'],

    return_policy: ['return', 'refund', 'replace', 'exchange policy', 'return policy'],
    payment_methods: ['payment methods', 'how can i pay', 'ways to pay', 'payment options'],
    complaint: ['complaint', 'file a complaint', 'not happy', 'bad experience', 'escalate', 'raise an issue'],

    contact: ['contact', 'call', 'whatsapp', 'number', 'phone number', 'talk to someone'],
    location: ['location', 'address', 'where are you', 'where is your store', 'shop address', 'store location'],
    hours: ['hours', 'timing', 'open', 'closed', 'what time'],
    working_days: ['working days', 'which days are you open', 'open on sunday', 'weekly off'],

    thanks: ['thanks', 'thank you', 'thx', 'appreciate it'],
    bye: ['bye', 'goodbye', 'see you', 'ok bye']
  }
};

/* ============================================================
   Typo-tolerant matching engine
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
  const meaningfulWords = patternWords.filter(word => word.length >= 3);
  if (!meaningfulWords.length) return false;
  return meaningfulWords.every(pw => {
    if (pw.length < 3) return true;
    return inputWords.some(iw => {
      if (iw === pw) return true;
      if (pw.length >= 4 && iw.length >= 3 && iw[0] === pw[0]) {
        return smartSwapLevenshtein(iw, pw) <= 1;
      }
      return false;
    });
  });
}

function smartSwapExactMatch(normalized, inputWords, normalizedPhrase) {
  const phraseWords = normalizedPhrase.split(' ');
  if (phraseWords.length === 1) {
    return inputWords.includes(normalizedPhrase);
  }
  return normalized.includes(normalizedPhrase);
}

const smartSwapIntentPriority = {
  repair_iphone: 3, repair_screen: 3, repair_battery: 3, repair_charging: 3,
  repair_camera: 3, repair_water_damage: 3, repair_software: 3, repair_time: 3,
  repair_warranty: 3, repair_genuine_parts: 3, repair_speaker: 3, repair_sim: 3,
  repair_not_turning_on: 3, repair_motherboard: 3, repair_forgot_password: 3, tempered_glass: 3,
  buy_iphone: 2, buy_samsung: 2, buy_oppo: 2, buy_vivo: 2, buy_oneplus: 2, buy_xiaomi: 2,
  buy_color_options: 2, buy_accessories: 2, buy_network_lock: 2, buy_imei_check: 2, buy_gift: 2,
  buy_vs_new: 2, buy_inspection_tips: 2, buy_emi_eligibility: 2, cod: 2, festival_offer: 2,
  sell_process: 2, sell_condition: 2, sell_documents: 2, sell_payment_speed: 2, sell_dead_phone: 2,
  buy_warranty: 2, buy_emi: 2, buy_brands: 2, pickup_cost: 2, data_wipe: 2, payment_methods: 2,
  discount_student: 2, discount_referral: 2, insurance: 2, data_transfer_help: 2, old_battery_recycle: 2,
  data_backup_before_update: 2, bulk_repair: 2, complaint: 2, working_days: 2
};

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

    if (Array.from(queryAliases).some(q => aliasSet.has(q))) score += 600;

    if (inputWords.some(iw => modelWords.some(mw => iw === mw || iw.replace(/[^a-z0-9]/gi, '') === mw.replace(/[^a-z0-9]/gi, '')))) score += 500;

    if (inputWords.some(iw => modelWords.some(mw => {
      const a = iw.replace(/[^a-z0-9]/gi, '');
      const b = mw.replace(/[^a-z0-9]/gi, '');
      return a && b && (a === b || mw.includes(iw) || iw.includes(mw) || a.includes(b) || b.includes(a));
    }))) score += 250;

    if (modelWords.some(mw => normalized.includes(mw))) score += 80;

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
      return `We don't have that model right now, but we do have a few similar options: ${suggestions}. For the latest on stock, ping our sales team on WhatsApp: ${whatsappNumber} or call: ${callNumber}.`;
    }
    return null;
  }

  const modelName = match.model || match.name || 'This model';
  const price = match.salePrice || match.price || match.purchasePrice || 'Price on request';
  const availability = smartSwapGetAvailabilityState(match);

  if (availability.available === true) {
    return `Yep, ${modelName} is available for ${price} — in stock right now. Message us on WhatsApp: ${whatsappNumber} or call: ${callNumber}.`;
  }

  return `Sorry, ${modelName} is out of stock at the moment — but new stock is coming soon! Reach out for updates: Call ${callNumber} / WhatsApp ${whatsappNumber}.`;
}

/* ============================================================
   Consecutive-miss tracking (drives the fallback trigger)
   ============================================================ */

let smartSwapConsecutiveMisses = 0;
const SMARTSWAP_FALLBACK_THRESHOLD = 2; // consecutive unmatched messages before fallback kicks in

/**
 * Returns the best-matching reply for a given user message.
 * - Real intent match  -> resets miss counter, returns that reply
 * - No match (1st time) -> returns a `default` variant, counter++
 * - No match (2nd time in a row) -> returns a `fallback` variant
 *   (rotates, never repeats the immediately previous one), counter resets
 */
window.smartSwapGetResponse = function (userText) {
  const kb = window.smartSwapChatbotResponses;
  if (!userText || !userText.trim()) return pickReply(kb.default);

  const inventoryReply = smartSwapInventoryResponse(userText);
  if (inventoryReply) {
    smartSwapConsecutiveMisses = 0;
    return inventoryReply;
  }

  const normalized = smartSwapNormalize(userText);
  const inputWords = normalized.split(' ');

  let bestKey = null;
  let bestScore = 0;

  for (const [key, phrases] of Object.entries(kb.patterns)) {
    for (const phrase of phrases) {
      const normalizedPhrase = smartSwapNormalize(phrase);

      if (smartSwapExactMatch(normalized, inputWords, normalizedPhrase)) {
        const score = normalizedPhrase.split(' ').length + 1 + (key.includes('_') ? 0.1 : 0) + (smartSwapIntentPriority[key] || 0);
        if (score > bestScore) { bestScore = score; bestKey = key; }
        continue;
      }

      if (smartSwapWordsFuzzyMatch(inputWords, phrase)) {
        const score = normalizedPhrase.split(' ').length + (key.includes('_') ? 0.1 : 0) + (smartSwapIntentPriority[key] || 0);
        if (score > bestScore) { bestScore = score; bestKey = key; }
      }
    }
  }

  if (bestKey && kb[bestKey]) {
    smartSwapConsecutiveMisses = 0;
    return pickReply(kb[bestKey]);
  }

  smartSwapConsecutiveMisses += 1;
  if (smartSwapConsecutiveMisses >= SMARTSWAP_FALLBACK_THRESHOLD) {
    smartSwapConsecutiveMisses = 0;
    return pickFallback(kb.fallback);
  }

  return pickReply(kb.default);
};