import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../dashboard/index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

test('HTML includes exactly one inline app script and valid JavaScript', () => {
  assert.ok(script, 'inline script missing');
  assert.doesNotThrow(() => new vm.Script(script, { filename: 'dashboard/index.html' }));
});
test('all id attributes are unique', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  assert.equal(new Set(ids).size, ids.length);
});
test('dashboard tabs have matching panels and non-empty labels', () => {
  const tabIds = [...html.matchAll(/role="tab"[^>]*data-page="([^"]+)"/g)].map(x => x[1]);
  assert.equal(tabIds.length, 6);
  for (const id of tabIds) {
    assert.ok(html.includes('id="page-' + id + '"'));
    assert.ok(html.includes('id="tab-' + id + '"'));
  }
});
test('sample totals are coherent with displayed metric formulas', () => {
  const data = script.split('/* ---------- Accessible tabs and table controls ---------- */')[0]
    .split('/* ---------- Sample Data (synthetic, portfolio use only) ---------- */')[1];
  const context = vm.createContext({});
  vm.runInContext(data + '\nthis.snapshot = {tsa:TSA_REQS, puc:PUC_REQS, exceptions:EXCEPTIONS, trend:TREND_COMPLIANCE};', context);
  const {tsa,puc,exceptions,trend}=context.snapshot;
  assert.equal(tsa.length,18); assert.equal(puc.length,12);
  assert.equal(exceptions.length,11);
  assert.equal(exceptions.filter(e=>e.risk==='High').length,3);
  assert.equal(exceptions.filter(e=>e.days>90).length,1);
  const compliant=[...tsa,...puc].filter(r=>r.status==='Compliant').length;
  assert.equal(Math.round(100*compliant/30),50);
  assert.equal(trend.at(-1),50);
});
test('chart navigation renders after tab is visible', () => {
  assert.match(script,/requestAnimationFrame\(drawVisibleCharts\)/);
  assert.match(script,/el\.closest\('\.page\.active'\)/);
});
test('public information is explicitly synthetic', () => {
  assert.match(html, /DEMO ONLY/);
  assert.match(html, /fictional/);
  assert.doesNotMatch(html, /Next scheduled refresh:/);
});
