// Run with: node --test tests/
// Uses only Node's built-in test runner, so it needs no extra packages beyond express/dotenv.
const test = require('node:test');
const assert = require('node:assert');
const { app, annualSalary, clampRadius, classifyOsmElement } = require('../server');

function listen() {
    return new Promise(resolve => {
        const server = app.listen(0, () => resolve(server));
    });
}

test('annualSalary compares hourly and yearly pay', () => {
    assert.strictEqual(annualSalary('$80,000 - $100,000'), 80000);
    assert.strictEqual(annualSalary('$25 per hour'), 25 * 2080);
    assert.ok(annualSalary('$60 - $80 per hour') > annualSalary('$80,000 - $100,000'));
    assert.strictEqual(annualSalary(undefined), 0);
});

test('clampRadius keeps the search radius sane', () => {
    assert.strictEqual(clampRadius(undefined), 8000);
    assert.strictEqual(clampRadius('-5'), 8000);
    assert.strictEqual(clampRadius('abc'), 8000);
    assert.strictEqual(clampRadius('100'), 500);
    assert.strictEqual(clampRadius('999999'), 32000);
});

test('classifyOsmElement maps tags to resource types', () => {
    assert.strictEqual(classifyOsmElement({ amenity: 'food_bank' }), 'food');
    assert.strictEqual(classifyOsmElement({ amenity: 'clinic' }), 'healthcare');
    assert.strictEqual(classifyOsmElement({ shop: 'charity' }), 'clothing');
    assert.strictEqual(classifyOsmElement({ amenity: 'cafe' }), null);
});

test('pages route does not serve files outside pages/', async () => {
    const server = await listen();
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
        for (const p of ['/pages/..%2Fserver.js', '/pages/..%2Fpackage.json', '/pages/%2E%2E%2Fserver.js']) {
            const res = await fetch(base + p);
            assert.strictEqual(res.status, 404, p);
        }
    } finally {
        server.close();
    }
});

test('resources rejects bad coordinates and posts reject huge text', async () => {
    const server = await listen();
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
        let res = await fetch(`${base}/api/resources?lat=abc&lng=1`);
        assert.strictEqual(res.status, 400);
        res = await fetch(`${base}/api/resources?lat=95&lng=1`);
        assert.strictEqual(res.status, 400);
        res = await fetch(`${base}/api/resources?type=food`);
        assert.strictEqual(res.status, 200);
        assert.ok(Array.isArray(await res.json()));

        res = await fetch(`${base}/api/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: 'a', content: 'x'.repeat(5000) })
        });
        assert.strictEqual(res.status, 400);
        res = await fetch(`${base}/api/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: 'a', content: { not: 'text' } })
        });
        assert.strictEqual(res.status, 400);
    } finally {
        server.close();
    }
});
