const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const html = readFileSync(`${__dirname}/../public/cv/index.html`, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

for (const search of ['', '?print=0', '?print=1']) {
  test(`CV print flow for ${search || 'normal viewing'}`, async () => {
    let onLoad;
    let prints = 0;
    let fontsReady;
    const ready = new Promise(resolve => { fontsReady = resolve; });
    runInNewContext(script, {
      URLSearchParams,
      document: { fonts: { ready } },
      window: {
        location: { search },
        addEventListener(event, callback, options) {
          assert.equal(event, 'load');
          assert.equal(options.once, true);
          onLoad = callback;
        },
        print() { prints++; },
      },
    });
    assert.equal(prints, 0);
    if (search !== '?print=1') {
      assert.equal(onLoad, undefined);
      return;
    }
    const printing = onLoad();
    assert.equal(prints, 0);
    fontsReady();
    await printing;
    assert.equal(prints, 1);
  });
}
