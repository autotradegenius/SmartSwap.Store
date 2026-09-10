(function () {
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get('service') || 'Screen Replacement';
  const defaultServices = ['Screen Replacement', 'Battery Replacement', 'Camera Repair', 'Charging Port Fix', 'Water Damage Recovery', 'Software & Performance'];
  const serviceSeeds = defaultServices.map(service => ({id:`repair-service-${service.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, service, isService:true}));
  const configuredServices = window.swapioData?.readCatalog ? window.swapioData.readCatalog('repair', serviceSeeds, false).filter(item => item.isService !== false && !item.deleted) : serviceSeeds;
  const services = configuredServices.map(item => item.service);
  const defaultPrices = Object.fromEntries(configuredServices.map(item => [item.service, Number(item.price || 0)]));
  const repairCatalog = (() => { try { return JSON.parse(localStorage.getItem('swapioRepairCatalog') || '[]'); } catch (error) { return []; } })();
  const models = [];
  const addModels = values => (Array.isArray(values) ? values : []).forEach(model => {
    if (!model || !model.name || !model.brand) return;
    const key = `${String(model.brand).toLowerCase()}:${String(model.name).toLowerCase()}`;
    if (!models.some(existing => `${String(existing.brand).toLowerCase()}:${String(existing.name).toLowerCase()}` === key)) models.push(model);
  });
  addModels(window.DEFAULT_MODELS);
  try { addModels(JSON.parse(localStorage.getItem('swapioSellCatalog') || '[]')); } catch (error) {}
  try { addModels(JSON.parse(localStorage.getItem('swapioPhoneCatalog') || '[]')); } catch (error) {}

  const lines = document.getElementById('repairLines');
  const form = document.getElementById('repairModelRequestForm');
  const brandSelect = document.getElementById('repairBrand');
  const modelSelect = document.getElementById('repairModel');
  const totalLabel = document.getElementById('repairTotal');
  const totalInput = document.getElementById('repairTotalPrice');
  const modelSummary = document.getElementById('repairRequestModel');
  const issueSummary = document.getElementById('repairRequestIssue');
  document.getElementById('repairServiceTitle').textContent = selectedService;
  document.getElementById('repairServiceBreadcrumb').textContent = selectedService;
  issueSummary.value = selectedService;

  function priceFor(service, brand, modelName) {
    const match = repairCatalog.find(item => String(item.service).toLowerCase() === service.toLowerCase() && String(item.brand).toLowerCase() === String(brand).toLowerCase() && String(item.model).toLowerCase() === String(modelName).toLowerCase());
    return match && Number(match.price) > 0 ? Number(match.price) : defaultPrices[service] || 0;
  }
  function modelOptions(selectedBrand) {
    return models.filter(model => !selectedBrand || String(model.brand).toLowerCase() === selectedBrand.toLowerCase()).map(model => `<option value="${model.name.replace(/"/g, '&quot;')}">${model.name}</option>`).join('');
  }
  function brandOptions(selectedBrand) {
    const brands = [...new Map(models.map(model => [String(model.brand).trim().toLowerCase(), String(model.brand).trim()])).values()].sort((a, b) => a.localeCompare(b));
    return `<option value="">Choose brand</option>${brands.map(brand => `<option value="${brand}" ${brand === selectedBrand ? 'selected' : ''}>${brand}</option>`).join('')}<option value="other">Other brand</option>`;
  }
  function lineTemplate(index) {
    const service = index === 1 ? selectedService : '';
    return `<div class="repair-line" data-repair-line="${index}"><div class="repair-line-number">${index}</div><select name="repairPart${index}" data-repair-part required><option value="">Choose part to replace</option>${services.map(part => `<option value="${part}" ${part === service ? 'selected' : ''}>${part}</option>`).join('')}</select><span class="repair-line-price" data-repair-price></span></div>`;
  }
  function updateLine(line) {
    const part = line.querySelector('[data-repair-part]').value;
    const price = brandSelect.value && modelSelect.value && part ? priceFor(part, brandSelect.value, modelSelect.value) : 0;
    line.querySelector('[data-repair-price]').textContent = price ? `₹${price.toLocaleString('en-IN')}` : '';
  }
  function updateTotal() {
    const selected = [...lines.querySelectorAll('.repair-line')].map(line => {
      const brand = brandSelect.value;
      const model = modelSelect.value;
      const part = line.querySelector('[data-repair-part]').value;
      return {brand, model, part, price: brand && model && part ? priceFor(part, brand, model) : 0};
    }).filter(item => item.brand && item.model && item.part);
    const total = selected.reduce((sum, item) => sum + item.price, 0);
    totalLabel.textContent = selected.length ? `₹${total.toLocaleString('en-IN')}` : '';
    totalInput.value = total;
    modelSummary.value = selected.map(item => `${item.brand} ${item.model} - ${item.part}`).join(' | ');
    issueSummary.value = selected.map(item => item.part).join(', ');
  }
  brandSelect.innerHTML = brandOptions('');
  modelSelect.innerHTML = '<option value="">Choose model</option>';
  lines.innerHTML = [1, 2, 3].map(index => lineTemplate(index)).join('');
  brandSelect.addEventListener('change', () => { modelSelect.innerHTML = `<option value="">Choose model</option>${modelOptions(brandSelect.value)}`; updateTotal(); lines.querySelectorAll('.repair-line').forEach(updateLine); });
  modelSelect.addEventListener('change', () => { lines.querySelectorAll('.repair-line').forEach(updateLine); updateTotal(); });
  lines.addEventListener('change', event => {
    const line = event.target.closest('.repair-line');
    if (line) { updateLine(line); updateTotal(); }
  });
  updateTotal();
  form.addEventListener('submit', event => {
    const selected = [...lines.querySelectorAll('.repair-line')].filter(line => brandSelect.value && modelSelect.value && line.querySelector('[data-repair-part]').value);
    if (!selected.length) { event.preventDefault(); form.querySelector('.form-msg').textContent = 'Choose at least one brand, model, and repair part.'; form.querySelector('.form-msg').className = 'form-msg err'; }
  });
  Promise.resolve(window.swapioData?.loadRepairCatalogFromCloud?.()).then(cloudCatalog => {
    if (!Array.isArray(cloudCatalog)) return;
    localStorage.setItem('swapioRepairCatalog', JSON.stringify(cloudCatalog));
    repairCatalog.splice(0, repairCatalog.length, ...cloudCatalog);
    lines.querySelectorAll('.repair-line').forEach(updateLine);
    updateTotal();
  }).catch(() => {});
}());
