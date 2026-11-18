// Rauchtest der App: node test/smoke.mjs
// Startet einen lokalen Server und Headless-Chromium, legt einen Abend an, setzt einen Strich,
// beendet den Server und prüft, dass die App offline mit dem Strich wieder startet.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
  await klick('.fuss [data-a="ovzu"]');
  await klick('.kachel[data-p="Benno"]');
  await klick('[data-a="strich"][data-v="Pudel"]');
  assert.match(await js(benno), /1 Strich.*0,25/);
  await js('navigator.serviceWorker.ready.then(() => true)');

  server.kill();
  await cdp('Page.reload');
  assert.match(await bis(() => js(benno), 'Neustart offline'), /1 Strich.*0,25/);
  assert.equal(await js('!!navigator.serviceWorker.controller'), true);
  assert.equal(await js(`document.fonts.ready.then(() => document.fonts.check('600 24px "Barlow Condensed"'))`), true);
  assert.deepEqual(fehler, []);
  console.log('ok: Reihenfolge, Strich, Speichern, Neustart offline mit Schriften');
  ws.close();
} finally {
  server.kill();
  browser.kill();
  rmSync(profil, { recursive: true, force: true });
}
