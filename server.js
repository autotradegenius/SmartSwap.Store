const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 8000);

function normalizeFolderPart(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function decodeDataUrl(imageDataUrl) {
  const match = String(imageDataUrl || '').match(/^data:(image\/(png|jpeg|jpg|webp|gif));base64,(.+)$/i);
  if (!match) return null;
  const mime = String(match[1]).toLowerCase();
  const ext = mime.includes('png') ? 'png'
    : mime.includes('webp') ? 'webp'
    : mime.includes('gif') ? 'gif'
    : 'jpg';
  return { ext, buffer: Buffer.from(match[3], 'base64') };
}

function uploadProductImage(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > 2 * 1024 * 1024) {
      body = body.slice(0, 2 * 1024 * 1024);
    }
  });

  req.on('end', () => {
    try {
      const payload = JSON.parse(body || '{}');
      const imageData = decodeDataUrl(payload.imageDataUrl);
      if (!imageData) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Expected a valid image data URL.' }));
        return;
      }

      const brand = normalizeFolderPart(payload.brand || 'other-brand');
      const model = normalizeFolderPart(payload.model || 'product');
      const type = String(payload.type || 'front').toLowerCase() === 'back' ? 'back' : 'front';
      const folder = path.join(root, 'assets', 'phones', brand, model);
      fs.mkdirSync(folder, { recursive: true });

      const fileName = `${type}.${imageData.ext}`;
      const filePath = path.join(folder, fileName);
      fs.writeFileSync(filePath, imageData.buffer);

      const publicUrl = `/assets/phones/${brand}/${model}/${fileName}`;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ url: publicUrl }));
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: error.message || 'Image upload failed.' }));
    }
  });
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  return path.normalize(decoded).replace(/^\/+/, '');
}

function resolveFile(reqUrl) {
  const pathname = new URL(reqUrl, 'http://localhost').pathname;
  let clean = pathname.replace(/\/+$/, '');

  if (!clean || clean === '/') {
    return path.join(root, 'index.html');
  }

  const relative = safePath(clean);
  const directPath = path.join(root, relative);

  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  const candidate = path.join(root, `${relative}.html`);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  if (!path.extname(relative)) {
    const folderIndex = path.join(root, relative, 'index.html');
    if (fs.existsSync(folderIndex) && fs.statSync(folderIndex).isFile()) {
      return folderIndex;
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'POST' && url.pathname === '/api/product-image') {
    uploadProductImage(req, res);
    return;
  }

  const filePath = resolveFile(url.pathname);

  if (!filePath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(`Cannot GET ${url.pathname}\n`);
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`Server error: ${err.message}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.statusCode = 200;
    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`SmartSwap preview running at http://localhost:${port}`);
});
