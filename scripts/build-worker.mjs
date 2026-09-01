import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const serverDir = new URL('../dist/server/', import.meta.url);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8'
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'server') continue;
    const full = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const distPath = dist.pathname;
const assets = {};
for (const file of await walk(distPath)) {
  const route = '/' + relative(distPath, file).split(sep).join('/');
  assets[route] = {
    body: await readFile(file, 'utf8'),
    type: mime[extname(file)] || 'application/octet-stream'
  };
}

const worker = `const ASSETS = ${JSON.stringify(assets)};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const asset = ASSETS[url.pathname] || (request.method === 'GET' ? ASSETS['/index.html'] : null);
    if (!asset) return new Response('Not found', { status: 404 });
    return new Response(asset.body, {
      headers: {
        'content-type': asset.type,
        'cache-control': url.pathname === '/' || url.pathname.endsWith('.html') ? 'no-cache' : 'public, max-age=31536000, immutable'
      }
    });
  }
};
`;

await mkdir(serverDir, { recursive: true });
await writeFile(new URL('../dist/server/index.js', import.meta.url), worker);
console.log(`Sites worker embedded ${Object.keys(assets).length} build assets.`);
