import ALZ from '../src/alz';

describe('ALZ', () => {
  test('instantiate without error', () => {
    const alz = new ALZ();
  });

  const input = 'aaababbbbbaabccddcbaaaa';

  describe('add symbols', () => {
    const alz = new ALZ();
    for (const symbol of input) {
      alz.add(symbol);
    }

    test('count symbols correctly', () => {
      expect(alz.symbolsCount).toBe(input.length);
    });

    test('have the correct symbolsWindow', () => {
      const expectedWindow = 'aaa';

      expect(alz.symbolsWindow).toBe(expectedWindow);
    });

    test('have the correct max window size', () => {
      expect(alz.maxLZSize).toBe(3);
    });

    test('generate correct dictionary', () => {
      const expectedDictionary = {
        a: 1,
        aa: 1,
        b: 1,
        ab: 1,
        bb: 1,
        bba: 1,
        abc: 1,
        c: 1,
        d: 1,
        dc: 1,
        ba: 1,
        aaa: 1,
      };

      expect(alz.dictionary).toEqual(expectedDictionary);
    });

    test('generate correct trie', () => {
      expect(alz.trie.get('a')).toBe(10);
      expect(alz.trie.get('b')).toBe(8);
      expect(alz.trie.get('c')).toBe(3);
      expect(alz.trie.get('d')).toBe(2);
      expect(alz.trie.get('aaa')).toBe(2);
      expect(alz.trie.get('bcc')).toBe(1);
      expect(alz.trie.get('ccd')).toBe(1);
      expect(alz.trie.get('dcb')).toBe(1);
      expect(alz.trie.get('bb')).toBe(4);
    });
  });

  test('predict correct symbols probabilities', () => {
    const alz = new ALZ();
    for (const symbol of input) {
      alz.add(symbol);
    }

    const expectedPrediction = {
      a: 0.6347826086956522,
      b: 0.34782608695652173,
      c: 0.010434782608695653,
      d: 0.006956521739130435,
    };

    expect(alz.predict()).toEqual(expectedPrediction);
  });

  describe('serialize', () => {
    const alz = new ALZ();
    alz.add('a');
    alz.add('a');
    alz.add('a');
    alz.add('b');
    alz.add('a');

    const expectedPrediction = alz.predict();

    test('generate correct json', () => {
      expect(JSON.stringify(alz)).toBe('{\"trie\":{\"root\":{\"children\":{\"a\":{\"children\":{\"a\":{\"children\":{},\"value\":1},\"b\":{\"children\":{},\"value\":1}},\"value\":4},\"b\":{\"children\":{\"a\":{\"children\":{},\"value\":1}},\"value\":1}}}},\"dictionary\":{\"a\":1,\"aa\":1,\"b\":1},\"phrase\":\"a\",\"symbolsWindow\":\"ba\",\"maxLZSize\":2,\"symbolsCount\":5}');
    });

    test('load json', () => {
      alz.loadJSON('{\"trie\":{\"root\":{\"children\":{\"a\":{\"children\":{\"a\":{\"children\":{},\"value\":1},\"b\":{\"children\":{},\"value\":1}},\"value\":4},\"b\":{\"children\":{\"a\":{\"children\":{},\"value\":1}},\"value\":1}}}},\"dictionary\":{\"a\":1,\"aa\":1,\"b\":1},\"phrase\":\"a\",\"symbolsWindow\":\"ba\",\"maxLZSize\":2,\"symbolsCount\":5}');

      expect(alz.predict()).toEqual(expectedPrediction);
    });
  });
});
