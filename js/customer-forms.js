const MAX_PHOTOS = 5;

function setupPhotoInput(inputId, previewId){
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if(!input || !preview) return;
  input.addEventListener('change', () => {
    const files = Array.from(input.files).slice(0, MAX_PHOTOS);
    preview.innerHTML = '';
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.alt = file.name;
        preview.appendChild(image);
      };
      reader.readAsDataURL(file);
    });
    if(input.files.length > MAX_PHOTOS) input.setCustomValidity('Please choose up to 5 photos.');
    else input.setCustomValidity('');
  });
}

function setupCustomerForm(formId, type){
  const form = document.getElementById(formId);
  if(!form) return;
  const confirmButton = form.querySelector('[data-auth-required]');

  async function saveCustomerRequest(){
    if(!window.swapioAuth?.requireUser()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const files = Array.from(form.querySelector('input[type="file"]')?.files || []).slice(0, MAX_PHOTOS);
    data.photos = await Promise.all(files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    })));
    data.type = type;
    data.createdAt = new Date().toLocaleString();
    if(!window.swapioData?.saveCustomerSubmission) throw new Error('Firebase is not configured yet.');
    data.createdAt = Date.now();
    const saved = await window.swapioData.saveCustomerSubmission(data);
    if(!saved) throw new Error('The request could not be saved. Please try again.');
    form.reset();
    if(confirmButton) confirmButton.hidden = true;
    const preview = form.querySelector('.photo-preview');
    if(preview) preview.innerHTML = '';
    const message = form.querySelector('.form-msg');
    message.textContent = 'Request received. Our team will contact you shortly.';
    message.className = 'form-msg ok';
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const message = form.querySelector('.form-msg');
    const modelName = data.model.trim().toLowerCase();
    const matchedModel = Object.keys(window.swapioSellPrices || {}).find(name => modelName.includes(name) || name.includes(modelName));
    const estimate = matchedModel ? `Estimated price: ${window.swapioSellPrices[matchedModel]}.` : 'We will calculate the estimated price from your phone details.';
    message.textContent = `${estimate} Confirm below to submit your request.`;
    message.className = 'form-msg ok';
    if(confirmButton) confirmButton.hidden = false;
  });

  if(confirmButton) confirmButton.addEventListener('click', () => {
    saveCustomerRequest().catch(error => {
      const message = form.querySelector('.form-msg');
      message.textContent = error.message || 'The request could not be saved. Please try again.';
      message.className = 'form-msg err';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupPhotoInput('sellPhotos', 'sellPhotoPreview');
  setupPhotoInput('repairPhotos', 'repairPhotoPreview');
  setupCustomerForm('sellRequestForm', 'sell');
  setupCustomerForm('repairRequestForm', 'repair');
});
