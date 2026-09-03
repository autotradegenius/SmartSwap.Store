const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 8000);

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
