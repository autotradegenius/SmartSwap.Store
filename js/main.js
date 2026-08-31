/* ==========================================================
   SmartSwap.Store — main.js
   Common code loaded on EVERY page:
   - Loads header.html and footer.html into placeholders
   - Highlights the active nav link
   - Builds the scrolling price ticker
   - Handles the shared login modal and auth UI
   ========================================================== */

// ---------- 1. Load header & footer partials ----------
async function loadPartials(){
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  async function getPartial(path){
    const res = await fetch(`${path}?v=2`, {cache:'no-store'});
    if(!res.ok) throw new Error(`Could not load ${path}`);
    const html = await res.text();
    return html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '');
  }

  if(headerSlot){
    headerSlot.innerHTML = await getPartial('partials/header.html');
  }
  if(footerSlot){
    footerSlot.innerHTML = await getPartial('partials/footer.html');
  }

  // Once header/footer are in the page, wire up everything that lives inside them
  highlightActiveNav();
  buildTicker();
  setupHamburger();
  ensureLoginUI();
  ensureChatbotWidget();
  setupLoginModal();
  if(window.setupSwapioAuth) window.setupSwapioAuth();
}

// ---------- 2. Highlight current page in nav ----------
function highlightActiveNav(){
  // <body data-page="sell"> tells us which page we're on
  const current = document.body.getAttribute('data-page') || 'index';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if(link.getAttribute('data-page') === current){
      link.classList.add('active');
    }
  });
}

// ---------- 3. Mobile hamburger menu ----------
function setupHamburger(){
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.querySelector('.nav-links');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('mobile-open'));
}

// ---------- 4. Ticker (scrolling recent prices) ----------
const tickerData = [
  {name:'iPhone 13 128GB', price:'₹28,500'},
  {name:'Galaxy S21', price:'₹14,200'},
  {name:'OnePlus 9', price:'₹11,800'},
  {name:'iPhone 11', price:'₹16,200'},
  {name:'Redmi Note 11 Pro', price:'₹6,900'},
  {name:'Galaxy S22 Ultra', price:'₹32,400'},
  {name:'iPhone 12 Mini', price:'₹19,600'},
  {name:'OnePlus Nord 2', price:'₹9,300'},
];
function buildTicker(){
  const track = document.getElementById('tickerTrack');
  if(!track) return;
  const row = tickerData.map(d => `<span><b>${d.name}</b> · Up to <em>${d.price}</em></span>`).join('');
  track.innerHTML = row + row; // duplicated for seamless loop
}

function ensureLoginUI(){
  if(!document.getElementById('loginOpenBtn')){
    const navRight = document.querySelector('.nav-right');
    const loginButton = '<button class="btn btn-ink" id="loginOpenBtn" style="padding:10px 20px;font-size:14px;">Login</button>';
    const logoutButton = '<button class="btn btn-ghost" id="logoutBtn" style="padding:10px 16px;font-size:14px;" hidden>Logout</button>';
    if(navRight) navRight.insertAdjacentHTML('beforeend', loginButton + logoutButton);
    else document.body.insertAdjacentHTML('afterbegin', `<div style="position:fixed;top:16px;right:24px;z-index:1999;">${loginButton}${logoutButton}</div>`);
  }

  if(!document.getElementById('loginModal')){
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-overlay" id="loginModal">
        <div class="modal-box">
          <div class="modal-close" id="loginCloseBtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></div>
          <h3>Login to SmartSwap.Store</h3>
          <p class="sub">Use the email and password from your SmartSwap.Store account.</p>
          <div class="form-fields">
            <input type="email" id="loginEmailInput" placeholder="you@example.com" autocomplete="email">
            <input type="password" id="loginPasswordInput" placeholder="Password" autocomplete="current-password">
            <button class="btn btn-coral" id="loginBtn">Login</button>
            <div class="form-msg" id="loginMsg1"></div>
            <div class="auth-links"><a href="register.html">Create account</a><a href="forgot-password.html">Forgot password?</a></div>
          </div>
        </div>
      </div>`);
  }
}

// ---------- 5. Login modal ----------
function setupLoginModal(){
  const modal        = document.getElementById('loginModal');
  const openBtn       = document.getElementById('loginOpenBtn');
  const closeBtn       = document.getElementById('loginCloseBtn');
  const loginBtn       = document.getElementById('loginBtn');
  const emailInput     = document.getElementById('loginEmailInput');
  const msg1           = document.getElementById('loginMsg1');
  const passwordInput  = document.getElementById('loginPasswordInput');

  if(!modal || !openBtn || !closeBtn || !loginBtn || !emailInput || !passwordInput || !msg1) return;

  if(modal.dataset.wired) return;
  modal.dataset.wired = 'true';

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
  });
  closeBtn.addEventListener('click', () => closeModal());
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal(); // click outside box = close
  });

  function closeModal(){
    modal.classList.remove('open');
    emailInput.value = '';
    passwordInput.value = '';
    msg1.textContent = '';
    msg1.className = 'form-msg';
  }

  loginBtn.addEventListener('click', async () => {
    if(!window.swapioAuth) return;
    msg1.textContent = '';
    try {
      await window.swapioAuth.login(emailInput.value.trim(), passwordInput.value);
      msg1.textContent = 'Logged in.';
      msg1.className = 'form-msg ok';
      setTimeout(closeModal, 500);
    } catch(error) {
      msg1.textContent = window.swapioAuth.messageForError(error);
      msg1.className = 'form-msg err';
    }
  });
}

function ensureChatbotWidget(){
  if(document.getElementById('chatbotWidget')) return;

  const cfg = window.smartSwapChatbotResponses || {
    welcome: 'How can I help you?',
    default: 'I can help with buying, selling, and repairs. Tell me what you need and I will guide you.'
  };

  document.body.insertAdjacentHTML('beforeend', `
    <div id="chatbotWidget" class="chatbot-widget">
      <button id="chatbotToggle" class="chatbot-toggle" type="button" aria-label="Open SmartSwap.Store assistant">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 18h10a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4Z"/>
          <path d="M9 10h6M9 13h4"/>
          <path d="M9 18l-2 3 4-3"/>
        </svg>
      </button>
      <div id="chatbotPanel" class="chatbot-panel" hidden>
        <div class="chatbot-header">
          <div>
            <strong>Smart Assistant</strong>
            <small>Online now</small>
          </div>
          <button id="chatbotClose" type="button" aria-label="Close chat">×</button>
        </div>
        <div class="chatbot-body">
          <div class="chatbot-message bot">${cfg.welcome || 'How can I help you?'}</div>
        </div>
        <form id="chatbotForm" class="chatbot-form">
          <input id="chatbotInput" type="text" placeholder="Type your question..." aria-label="Type your message">
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  `);

  const panel = document.getElementById('chatbotPanel');
  const toggle = document.getElementById('chatbotToggle');
  const close = document.getElementById('chatbotClose');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const body = panel.querySelector('.chatbot-body');

  toggle.addEventListener('click', () => {
    const shouldOpen = panel.hasAttribute('hidden');
    if(shouldOpen){
      panel.removeAttribute('hidden');
      panel.hidden = false;
      input.focus();
    } else {
      panel.setAttribute('hidden', 'hidden');
      panel.hidden = true;
    }
  });

  close.addEventListener('click', () => {
    panel.setAttribute('hidden', 'hidden');
    panel.hidden = true;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if(!value) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user';
    userMsg.textContent = value;
    body.appendChild(userMsg);

    const typing = document.createElement('div');
    typing.className = 'chatbot-message bot typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    form.reset();

    const response = window.smartSwapGetResponse ? window.smartSwapGetResponse(value) : (cfg.default || 'I can help with buying, selling, and repairs. Tell me what you need and I will guide you.');

    setTimeout(() => {
      typing.remove();
      const botReply = document.createElement('div');
      botReply.className = 'chatbot-message bot';
      botReply.textContent = response;
      body.appendChild(botReply);
      body.scrollTop = body.scrollHeight;
    }, 700);
  });
}

// ---------- kick things off ----------
document.addEventListener('DOMContentLoaded', loadPartials);