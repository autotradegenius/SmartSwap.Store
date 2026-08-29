const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let serviceAccount = null;

// Try to read from file first
const keyPath = path.join(__dirname, '../serviceAccountKey.json');
if (fs.existsSync(keyPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  } catch (e) {
    console.error('Error reading serviceAccountKey.json:', e.message);
  }
}

// Fall back to environment variable
if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', e.message);
  }
}

if (!serviceAccount) {
  console.error('Missing Firebase service account.');
  console.error('Place serviceAccountKey.json in the SWAPIO folder');
  console.error('Or set FIREBASE_SERVICE_ACCOUNT environment variable.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = process.env.ADMIN_EMAIL || 'admin@swapio.com';

async function setAdminClaim() {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`Admin claim set for ${email} (${user.uid})`);
}

setAdminClaim().catch((error) => {
  console.error('Failed to set admin claim:', error);
  process.exit(1);
});
