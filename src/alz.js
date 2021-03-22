import Trie from './trie';

function ALZ() {
  this.trie = new Trie();
  this.dictionary = {};
  this.phrase = '';
  this.symbolsWindow = '';
  this.maxLZSize = 0;
  this.symbolsCount = 0;
}

ALZ.prototype.add = function add(symbol) {
  this.symbolsCount += 1;
  this.phrase += symbol;

  if (!this.dictionary[this.phrase]) {
    this.dictionary[this.phrase] = 1;
    if (this.phrase.length > this.maxLZSize) {
      this.maxLZSize = this.phrase.length;
    }
    this.phrase = '';
  }

  this.symbolsWindow += symbol;

  if (this.symbolsWindow.length > this.maxLZSize) {
    this.symbolsWindow = this.symbolsWindow.substring(1);
  }

  // increment frequencies of all context from symbolsWindow (that includes symbol)
  function increment(value = 0) {
    return value + 1;
  }
  for (let i = 0; i < this.symbolsWindow.length; i += 1) {
    this.trie.update(this.symbolsWindow.substring(i, this.symbolsWindow.length), increment);
  }
};

ALZ.prototype.predict = function predict() {
  // create a dictionary with all symbols,
  // and initialize them with their respective order-0 probability.
  /* eslint no-param-reassign: ["error", { "props": false }] */
  const symbols = Object.entries(this.trie.root.children).reduce((accum, entryNode) => {
    accum[entryNode[0]] = entryNode[1].value / this.symbolsCount;

    return accum;
  }, {});

  // calculate symbolsWindow probability for each suffix, except itself
  for (let i = this.symbolsWindow.length - 1; i > 0; i -= 1) {
    const suffixKey = this.symbolsWindow.substring(i, this.symbolsWindow.length);
    const { children } = this.trie.nodeAt(suffixKey);
    const childrenValueSum = Object.values(children).reduce((accum, node) => accum + node.value, 0);

    // calculate and apply escape probability
    const value = this.trie.get(suffixKey);
    const escapeProbability = (value - childrenValueSum) / value;
    Object.keys(symbols).forEach((key) => {
      symbols[key] *= escapeProbability;
    });

    // add each child probability related to the current suffix
    Object.keys(children).forEach((key) => {
      symbols[key] += children[key].value / this.trie.get(suffixKey);
    });
  }

  return symbols;
};

ALZ.prototype.loadJSON = function loadJSON(json) {
  const {
    trie,
    dictionary,
    phrase,
    symbolsWindow,
    symbolsCount,
    maxLZSize,
  } = JSON.parse(json);

  this.trie.load(trie);
  this.dictionary = dictionary;
  this.phrase = phrase;
  this.symbolsWindow = symbolsWindow;
  this.maxLZSize = maxLZSize;
  this.symbolsCount = symbolsCount;
};

export default ALZ;
