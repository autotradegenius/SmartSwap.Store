(() => {
  const config = window.SWAPIO_FIREBASE_CONFIG;
  const ready = config && !config.apiKey.startsWith('REPLACE_');

  if(ready && !firebase.apps.length) firebase.initializeApp(config);
  const auth = ready ? firebase.auth() : null;
  let currentUser = null;

  function messageForError(error){
    const messages = {
      'auth/invalid-email':'Please enter a valid email address.',
      'auth/user-not-found':'No account was found for this email.',
      'auth/wrong-password':'The email or password is incorrect.',
      'auth/invalid-credential':'The email or password is incorrect.',
      'auth/email-already-in-use':'An account already exists for this email.',
      'auth/weak-password':'Use a password with at least 6 characters.',
      'auth/too-many-requests':'Too many attempts. Please try again later.'
    };
    return messages[error.code] || error.message || 'Something went wrong. Please try again.';
  }

  async function login(email, password){
    if(!auth) throw new Error('Firebase is not configured yet. Add your web app config in js/firebase-config.js.');
    const result = await auth.signInWithEmailAndPassword(email, password);
    await result.user.reload();
    if(!result.user.emailVerified){
      await auth.signOut();
      throw new Error('Please click the verification link in your email before logging in.');
    }
    return result.user;
  }

  function requireUser(){
    if(currentUser) return true;
    const modal = document.getElementById('loginModal');
    if(modal) modal.classList.add('open');
    return false;
  }

  function setupAuthForms(){
    const registerForm = document.getElementById('registerForm');
    if(registerForm) registerForm.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = form.querySelector('.form-msg');
      const button = form.querySelector('button[type="submit"]');
      message.textContent = '';
      button.disabled = true;
      try {
        if(!auth) throw new Error('Firebase is not configured yet. Add your web app config in js/firebase-config.js.');
        const userCredential = await auth.createUserWithEmailAndPassword(form.email.value.trim(), form.password.value);
        await userCredential.user.sendEmailVerification();
        await auth.signOut();
        message.textContent = 'Account created. Check your email and click the verification link before logging in.';
        message.className = 'form-msg ok';
        form.reset();
      } catch(error) {
        message.textContent = messageForError(error);
        message.className = 'form-msg err';
      } finally { button.disabled = false; }
    });

    const forgotForm = document.getElementById('forgotPasswordForm');
    if(forgotForm) forgotForm.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = form.querySelector('.form-msg');
      try {
        if(!auth) throw new Error('Firebase is not configured yet. Add your web app config in js/firebase-config.js.');
        await auth.sendPasswordResetEmail(form.email.value.trim());
        message.textContent = 'If an account exists for that email, a password reset link is on its way.';
        message.className = 'form-msg ok';
        form.reset();
      } catch(error) {
        message.textContent = messageForError(error);
        message.className = 'form-msg err';
      }
    });
  }

  window.swapioAuth = { login, requireUser, messageForError, signOut: () => auth?.signOut() };
  window.setupSwapioAuth = function(){
    setupAuthForms();
    if(!auth) return;
    auth.onAuthStateChanged(user => {
      currentUser = user;
      const label = document.getElementById('authUserLabel');
      const loginButton = document.getElementById('loginOpenBtn');
      const logoutButton = document.getElementById('logoutBtn');
      if(label) { label.textContent = user?.email || ''; label.hidden = !user; }
      if(loginButton) loginButton.hidden = !!user;
      if(logoutButton) logoutButton.hidden = !user;
      if(logoutButton && !logoutButton.dataset.wired){
        logoutButton.dataset.wired = 'true';
        logoutButton.addEventListener('click', () => auth.signOut());
      }
    });
    document.addEventListener('click', event => {
      const protectedElement = event.target.closest('[data-auth-required]');
      if(protectedElement && !currentUser){
        event.preventDefault();
        event.stopPropagation();
        requireUser();
      }
    }, true);
  };
})();
