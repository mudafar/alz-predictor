import Trie from '../src/trie';

describe('Trie', () => {
  test('instantiate without error', () => {
    const trie = new Trie();
  });

  test('add items', () => {
    const trie = new Trie();
    trie.add('a', 1);
    trie.add('ab', 2);
    trie.add('abc', 5);

    expect(trie.get('a')).toBe(1);
    expect(trie.get('ab')).toBe(2);
    expect(trie.get('abc')).toBe(5);
  });

  test('return undefined for non existing key', () => {
    const trie = new Trie();

    expect(trie.get('aaa')).toBeUndefined();
  });

  describe('update', () => {
    const trie = new Trie();

    test('increment existing item value', () => {
      trie.add('a', 1);
      trie.update('a', (v) => v + 1);

      expect(trie.get('a')).toBe(2);
    });

    test('add item for non existing key', () => {
      trie.update('b', (v = 0) => v + 1);

      expect(trie.get('b')).toBe(1);
    });
  });

  describe('serialize', () => {
    test('generate correct json', () => {
      const trie = new Trie();
      trie.add('a', 1);
      trie.add('ab', 2);
      trie.add('abc', 5);

      expect(JSON.stringify(trie)).toBe('{\"root\":{\"children\":{\"a\":{\"children\":{\"b\":{\"children\":{\"c\":{\"children\":{},\"value\":5}},\"value\":2}},\"value\":1}}}}');
    });

    test('load json', () => {
      const trie = new Trie();
      trie.loadJSON('{\"root\":{\"children\":{\"a\":{\"children\":{\"b\":{\"children\":{\"c\":{\"children\":{},\"value\":5}},\"value\":2}},\"value\":1}}}}');

      expect(trie.get('a')).toBe(1);
      expect(trie.get('ab')).toBe(2);
      expect(trie.get('abc')).toBe(5);
    });
  });
});
