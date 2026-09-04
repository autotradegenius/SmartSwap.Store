(function () {
  const brands = [
    ['apple', 'Apple'], ['xiaomi', 'Xiaomi'], ['samsung', 'Samsung'], ['oppo', 'OPPO'],
    ['vivo', 'Vivo'], ['oneplus', 'OnePlus'], ['realme', 'Realme'], ['motorola', 'Motorola'],
    ['lenovo', 'Lenovo'], ['nokia', 'Nokia'], ['honor', 'Honor'], ['asus', 'Asus'],
    ['google', 'Google'], ['poco', 'POCO'], ['lg', 'LG'], ['infinix', 'Infinix'],
    ['tecno', 'Tecno'], ['iqoo', 'iQOO'], ['nothing', 'Nothing']
  ];
  const textWordmarkBrands = new Set(['realme', 'poco', 'infinix', 'tecno', 'iqoo', 'nothing']);

  function logoUrl(slug) {
    return `https://cdn.simpleicons.org/${slug}`;
  }

  function fallbackLogoUrl(slug) {
    return `https://api.iconify.design/simple-icons:${slug}.svg`;
  }

  function brandHref(slug) {
    const path = window.location.pathname;
    const existingBrandPages = ['apple', 'samsung', 'xiaomi', 'vivo', 'oneplus', 'poco', 'motorola', 'oppo', 'nokia'];
    if (document.body.dataset.page === 'index') return `buy.html?brand=${slug}`;
    if (path.endsWith('/more-brands.html')) {
      const mode = new URLSearchParams(window.location.search).get('mode');
      return mode === 'buy' ? `buy.html?brand=${slug}` : `sell-flow/brand.html?brand=${slug}`;
    }
    if (path.includes('/sell-flow/')) return `brand.html?brand=${slug}`;
    if (path.endsWith('/buy.html')) return `buy.html?brand=${slug}`;
    return existingBrandPages.includes(slug) ? `brand/${slug}.html` : `sell-flow/brand.html?brand=${slug}`;
  }

  function renderPicker() {
    document.querySelectorAll('[data-brand-picker]').forEach(container => {
      const compact = container.dataset.brandPicker === 'compact' && new URLSearchParams(window.location.search).get('brands') !== 'all';
      const visibleBrands = compact ? brands.slice(0, 4) : brands;
      const buyPage = window.location.pathname.endsWith('/buy.html');
      const brandSelected = new URLSearchParams(window.location.search).has('brand');
      const expanded = new URLSearchParams(window.location.search).get('brands') === 'all';
      const selectedBrand = new URLSearchParams(window.location.search).get('brand');
      const allPhones = buyPage
        && !brandSelected
        ? '<a class="brand-logo-card all-phones-brand" href="buy.html?all=1"><span class="brand-logo-mark"><strong>ALL</strong></span><span>All Phones</span></a>'
        : '';
      const moreHref = buyPage ? 'buy.html?brands=all' : (document.body.dataset.page === 'index' ? 'more-brands.html?mode=buy' : 'brand.html?brands=all');
      const closeHref = buyPage
        ? (selectedBrand ? `buy.html?brand=${selectedBrand}` : 'buy.html')
        : (selectedBrand ? `brand.html?brand=${selectedBrand}` : 'brand.html');
      const closeCard = expanded ? `<a class="brand-logo-card close-more-brands" href="${closeHref}"><span class="brand-logo-mark"><strong>×</strong></span><span>Close Brands</span></a>` : '';
      const sellDamageCard = document.body.dataset.page === 'sell' && window.location.pathname.includes('/sell-flow/brand.html')
        ? `<a class="brand-logo-card damaged-phone-brand" href="damaged.html"><span class="brand-logo-mark"><strong aria-hidden="true">♻</strong></span><span>Damaged Phone</span></a>`
        : '';
      container.innerHTML = allPhones + visibleBrands.map(([slug, label]) => `
        <a class="brand-logo-card${selectedBrand && selectedBrand.toLowerCase() === slug ? ' brand-selected' : ''}" href="${brandHref(slug)}" data-brand="${slug}">
          <span class="brand-logo-mark">${textWordmarkBrands.has(slug) ? `<strong class="wordmark-${slug}">${label}</strong>` : `<img src="${logoUrl(slug)}" alt="${label} logo" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback='true';this.src='${fallbackLogoUrl(slug)}';}else{this.hidden=true;this.nextElementSibling.hidden=false;}"><strong hidden>${label}</strong>`}</span>
          <span>${label}</span>
        </a>`).join('') + closeCard + (compact ? `<a class="brand-logo-card more-brand" href="${moreHref}"><span class="brand-logo-mark"><strong>+</strong></span><span>More Brands</span></a>` : '') + sellDamageCard;
    });
  }

  function renderBenefits() {
    document.querySelectorAll('[data-benefits]').forEach(container => {
      container.innerHTML = `
        <div class="benefits-heading"><span class="eyebrow">SmartSwap.Store</span><h2>${document.body.dataset.page === 'buy' ? 'Quality you can count on' : 'Why sell with SmartSwap?'}</h2></div>
        <div class="benefits-grid">
          <article><span class="benefit-icon">&#10003;</span><h3>Safe &amp; Secure</h3><p>Every phone and customer detail is handled through a verified process.</p></article>
          <article><span class="benefit-icon">&#8377;</span><h3>Instant Payment</h3><p>Get a clear price and quick payment after the device check.</p></article>
          <article><span class="benefit-icon">&#9733;</span><h3>Best Price</h3><p>Transparent grading and competitive market-based pricing.</p></article>
        </div>`;
    });
  }

  function init() {
    renderPicker();
    renderBenefits();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
