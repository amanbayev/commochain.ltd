import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.woff2':'font/woff2', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.png':'image/png', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml' };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') { response.writeHead(307, { Location:'/kk' }); response.end(); return; }
    if (['/kk/','/ru/','/en/'].includes(pathname)) { response.writeHead(308, { Location:pathname.slice(0,-1) }); response.end(); return; }
    let filename = resolve(root, '.' + pathname);
    if (!filename.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    if (!extname(filename)) filename += '.html';
    if (!(await stat(filename)).isFile()) throw new Error('not a file');
    const bytes = await readFile(filename);
    response.writeHead(200, { 'Content-Type':types[extname(filename)] || 'application/octet-stream', 'Content-Length':bytes.length, 'X-Content-Type-Options':'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch {
    response.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' });
    response.end(await readFile(resolve(root,'404.html')).catch(() => 'Not found'));
  }
}).listen(port, '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${port}/en`));
