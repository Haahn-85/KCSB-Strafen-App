// Rauchtest der App: node test/smoke.mjs
// Startet einen lokalen Server und Headless-Chromium, legt einen Abend an, setzt einen Strich,
// beendet den Server und prüft, dass die App offline mit dem Strich wieder startet und den Export erzeugt.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import assert from 'node:assert/strict';

const wurzel = new URL('..', import.meta.url).pathname;
const profil = mkdtempSync(join(tmpdir(), 'kcsb-'));
const server = spawn('python3', ['-m', 'http.server', '8765', '-b', '127.0.0.1'], { cwd: wurzel, stdio: 'ignore' });
const browser = spawn('chromium', ['--headless', '--remote-debugging-port=9333', '--user-data-dir=' + profil, '--window-size=412,900', 'about:blank'], { stdio: 'ignore' });
const warte = ms => new Promise(r => setTimeout(r, ms));
async function bis(f, was) {
  for (let i = 0; i < 100; i++) { try { const v = await f(); if (v) return v; } catch {} await warte(100); }
  throw new Error('Zeitüberschreitung: ' + was);
}

try {
  const seite = await bis(async () => (await (await fetch('http://127.0.0.1:9333/json/list')).json()).find(t => t.type === 'page'), 'Chromium');
  const ws = new WebSocket(seite.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0;
  const offen = new Map(), fehler = [];
  ws.onmessage = m => {
    const d = JSON.parse(m.data);
    if (d.id) offen.get(d.id)(d);
    if (d.method === 'Runtime.exceptionThrown') fehler.push(d.params.exceptionDetails);
  };
  const cdp = (method, params = {}) => new Promise((ok, nein) => {
    offen.set(++id, d => d.error ? nein(new Error(d.error.message)) : ok(d.result));
    ws.send(JSON.stringify({ id, method, params }));
  });
  const js = async a => (await cdp('Runtime.evaluate', { expression: a, awaitPromise: true, returnByValue: true })).result.value;
  const klick = sel => js(`document.querySelector(${JSON.stringify(sel)}).click()`);
  const benno = `document.querySelector('.kachel[data-p="Benno"]')?.textContent`;

  await cdp('Runtime.enable');
  await cdp('Page.navigate', { url: 'http://127.0.0.1:8765/app/' });
  await bis(() => js(`!!document.querySelector('[data-a="anw"]')`), 'Anwesenheit');
  assert.deepEqual(await js(`[...document.querySelectorAll('[data-a="anw"]')].map(b => b.dataset.p)`),
    ['Ulf', 'Kim', 'Niggel', 'Chris C', 'CV', 'Benno', 'Wenzel', 'Hahn', 'Reidi', 'Kuhni', 'Lomme', 'Winnie']);
  await klick('[data-a="anw"][data-p="Benno"]');
  await klick('[data-a="anw"][data-p="Kim"]');
  await klick('.fuss [data-a="ovzu"]');
  await klick('.kachel[data-p="Benno"]');
  await klick('[data-a="strich"][data-v="Pudel"]');
  assert.match(await js(benno), /1 Strich.*0,25/);

  // iPad quer: Zelle setzt einen Strich, Korrigieren nimmt ihn zurück, Kacheln in beliebiger Reihenfolge
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1180, height: 820, deviceScaleFactor: 1, mobile: true });
  const zelle = `document.querySelector('.z[data-p="Benno"][data-k="Pudel"]')?.textContent`;
  await bis(() => js(zelle), 'Queransicht');
  await klick('.z[data-p="Benno"][data-k="Pudel"]');
  assert.equal(await js(zelle), '||');
  await klick('[data-a="korr"]');
  await klick('.z[data-p="Benno"][data-k="Pudel"]');
  assert.equal(await js(zelle), '|');
  await klick('[data-a="tview"][data-v="kacheln"]');
  await klick('[data-a="selv"][data-k="Gasse"]');
  await klick('[data-a="selp"][data-p="Benno"]');
  assert.match(await js(`document.querySelector('[data-a="selp"][data-p="Benno"]').textContent`), /0,75/);

  // Alle 9: Benno wirft, Kim zahlt
  await klick('[data-a="tview"][data-v="zettel"]');
  await klick('.z[data-p="Benno"][data-k="Alle 9"]');
  assert.deepEqual(await js(`['Benno','Kim'].map(p => document.querySelector('.z[data-p="'+p+'"][data-k="Alle 9"]').textContent)`), ['', '|']);

  // Fußball: Tor und Vorlage fest oben, auch nach dem Scrollen direkt unter der Summe
  await klick('[data-a="fbstart"]');
  assert.equal(await js(`!!document.querySelector('thead .z[data-k="tor"]') && !document.querySelector('tbody .z[data-k="tor"]')`), true);
  assert.equal(await js(`(() => { document.querySelector('.zwrap').scrollTop = 9999;
    const [s, t, v] = ['.r2 td', '.fbk td', '.fbk + .fbk td'].map(q => document.querySelector(q).getBoundingClientRect());
    return Math.abs(s.bottom - t.top) < 1.5 && Math.abs(t.bottom - v.top) < 1.5; })()`), true);
  await klick('[data-a="tview"][data-v="kacheln"]');
  assert.equal(await js(`document.querySelector('.vg .vt').dataset.k`), 'tor');
  await cdp('Emulation.clearDeviceMetricsOverride');
  await bis(() => js(benno), 'zurück zur Handy-Ansicht');
  await js('navigator.serviceWorker.ready.then(() => true)');

  server.kill();
  await cdp('Page.reload');
  assert.match(await bis(() => js(benno), 'Neustart offline'), /2 Striche.*0,75/);
  assert.equal(await js('!!navigator.serviceWorker.controller'), true);
  assert.equal(await js(`document.fonts.ready.then(() => document.fonts.check('600 24px "Barlow Condensed"'))`), true);

  // Export offline: Abschluss zeigt QR-Code und Code im Format der Kasse (SPEC 7.1)
  await klick('[data-a="menu"]');
  await klick('[data-a="ab"]');
  await klick('[data-a="abok"]');
  const code = await bis(() => js(`document.querySelector('#code')?.value`), 'Exportcode');
  assert.equal(await js(`!!document.querySelector('.qr svg path')`), true);
  const [kennung, teil, pruefsumme] = code.split('.');
  assert.equal(kennung, 'KCSB1');
  assert.equal(createHash('sha256').update(teil).digest('hex').slice(0, 8), pruefsumme);
  const d = JSON.parse(gunzipSync(Buffer.from(teil, 'base64url')));
  assert.deepEqual(d.strafenzettel.spalten.map(s => [s.name, s.striche.map(x => x.vergehen + ' ' + x.anzahl).join(', '), s.siege]),
    [['Kim', 'Alle 9 1', null], ['Benno', 'Pudel 1, Gasse 1', null]]);
  assert.deepEqual(fehler, []);
  console.log('ok: Reihenfolge, Strich, iPad quer (Zelle, Korrigieren, Kacheln, Alle 9, Fußball oben), Speichern, Neustart offline mit Schriften, Export');
  ws.close();
} finally {
  server.kill();
  browser.kill();
  rmSync(profil, { recursive: true, force: true });
}
