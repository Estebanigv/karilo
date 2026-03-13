/**
 * Kariló Admin Panel — server.js
 * Run: node server.js  →  http://localhost:4747
 */

const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = 4747;

// ── Paths ──────────────────────────────────────────────────────────────
const ROOT    = path.resolve(__dirname, '..');
const I18N    = path.join(ROOT, 'src', 'i18n');
const ASSETS  = path.join(ROOT, 'src', 'assets');

// ── Image catalogue ────────────────────────────────────────────────────
const IMAGES = [
  { file:'hero-banner.png',    dir:ASSETS, label:'Banner Principal',         desc:'Imagen de fondo del banner de inicio' },
  { file:'casa-matriz.png',    dir:ASSETS, label:'Casa Matriz',              desc:'Foto oficina principal — Sobre Nosotros' },
  { file:'trading.png',        dir:ASSETS, label:'Solución: Trading',        desc:'Tarjeta "Trading de aceites, proteínas e ingredientes"' },
  { file:'logistica.png',      dir:ASSETS, label:'Solución: Logística',      desc:'Tarjeta "Gestión logística y bodegaje"' },
  { file:'financiera.png',     dir:ASSETS, label:'Solución: Financiero',     desc:'Tarjeta "Soluciones financieras para partners"' },
  { file:'abastecimiento.png', dir:ASSETS, label:'Solución: Representación', desc:'Tarjeta "Representación y desarrollo de productos"' },
  { file:'fortalezas.png',     dir:ASSETS, label:'Fondo Fortalezas/CTA',     desc:'Imagen de fondo sección CTA' },
  { file:'cumplimiento.png',   dir:ASSETS, label:'Fortaleza: Cumplimiento',  desc:'Imagen cumplimiento y transparencia' },
  { file:'valor-desempeno.png',dir:ASSETS, label:'Fortaleza: Valor',         desc:'Imagen valor y desempeño productivo' },
  { file:'mapa-alcance.png',   dir:ASSETS, label:'Mapa de Alcance',          desc:'Mapa de presencia internacional' },
];

// ── i18n helpers ───────────────────────────────────────────────────────
function extractObj(src) {
  const start = src.indexOf('= {') + 2;
  let depth = 0, inStr = false, ch = '';
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (c === ch && src[i-1] !== '\\') inStr = false; }
    else if (c === '"' || c === "'") { inStr = true; ch = c; }
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  throw new Error('Cannot parse i18n file');
}

function readI18n(lang) {
  const src = fs.readFileSync(path.join(I18N, lang + '.ts'), 'utf8');
  // eslint-disable-next-line no-new-func
  return new Function('return (' + extractObj(src) + ')')();
}

function valToTs(val, depth) {
  const p  = '  '.repeat(depth);
  const p1 = '  '.repeat(depth + 1);
  if (typeof val === 'string') {
    return '"' + val.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  if (Array.isArray(val)) {
    const items = val.map(item =>
      p1 + '{\n' +
      Object.entries(item).map(([k,v]) => p1 + '  ' + k + ': ' + valToTs(v, depth + 2) + ',').join('\n') +
      '\n' + p1 + '}'
    );
    return '[\n' + items.join(',\n') + ',\n' + p + ']';
  }
  if (typeof val === 'object' && val !== null) {
    const lines = Object.entries(val).map(([k,v]) => p1 + k + ': ' + valToTs(v, depth + 1) + ',');
    return '{\n' + lines.join('\n') + '\n' + p + '}';
  }
  return String(val);
}

function writeI18n(lang, data) {
  const body = Object.entries(data)
    .map(([sec, val]) => '  ' + sec + ': ' + valToTs(val, 1) + ',')
    .join('\n');
  const content = lang === 'es'
    ? 'export const es = {\n' + body + '\n};\n\nexport type Translations = typeof es;\n'
    : 'import type { Translations } from "./es";\n\nexport const ' + lang + ': Translations = {\n' + body + '\n};\n';
  fs.writeFileSync(path.join(I18N, lang + '.ts'), content, 'utf8');
}

// ── Multer ─────────────────────────────────────────────────────────────
const upload = multer({ storage: multer.memoryStorage() });

// ── Middleware ─────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use('/img/assets', express.static(ASSETS));

// ── API ────────────────────────────────────────────────────────────────
app.get('/api/i18n', (req, res) => {
  try { res.json({ es: readI18n('es'), en: readI18n('en'), pt: readI18n('pt') }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/i18n', (req, res) => {
  try {
    const { es, en, pt } = req.body;
    if (es) writeI18n('es', es);
    if (en) writeI18n('en', en);
    if (pt) writeI18n('pt', pt);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/images', (req, res) => {
  res.json(IMAGES.map(img => ({
    file: img.file,
    label: img.label,
    desc: img.desc,
    exists: fs.existsSync(path.join(img.dir, img.file)),
    url: '/img/assets/' + img.file + '?t=' + Date.now(),
  })));
});

app.post('/api/upload/:filename', upload.single('image'), (req, res) => {
  const meta = IMAGES.find(i => i.file === req.params.filename);
  if (!meta) return res.status(404).json({ error: 'Unknown image' });
  if (!req.file) return res.status(400).json({ error: 'No file received' });
  fs.writeFileSync(path.join(meta.dir, meta.file), req.file.buffer);
  res.json({ ok: true, url: '/img/assets/' + meta.file + '?t=' + Date.now() });
});

// ── Serve admin UI ─────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// ── Start ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  +--------------------------------------+');
  console.log('  |  Karilo -- Panel de Administracion  |');
  console.log('  +--------------------------------------+');
  console.log('  |  http://localhost:' + PORT + '              |');
  console.log('  +--------------------------------------+');
  console.log('');
  console.log('  Ctrl+C para detener el servidor.');
  console.log('');
});
