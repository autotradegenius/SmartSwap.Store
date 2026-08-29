/* ==========================================================
   SWAPIO — main.js
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
          <h3>Login to SWAPIO</h3>
          <p class="sub">Use the email and password from your SWAPIO account.</p>
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

// ---------- kick things off ----------
document.addEventListener('DOMContentLoaded', loadPartials);