function Node(value) {
  this.children = {};
  this.value = value;
}

function Trie() {
  this.root = new Node();
}

Trie.prototype.nodeAt = function nodeAt(key) {
  let node = this.root;

  for (let i = 0; i < key.length; i += 1) {
    node = node.children[key[i]];

    if (typeof node === 'undefined') {
      return undefined;
    }
  }

  return node;
};

Trie.prototype.get = function get(key) {
  const node = this.nodeAt(key);

  if (typeof node === 'undefined') {
    return undefined;
  }

  return node.value;
};

Trie.prototype.addNode = function addNode(key) {
  let node = this.root;

  for (let i = 0, char; i < key.length; i += 1) {
    char = key[i];
    node = node.children[char] || (node.children[char] = new Node());
  }

  return node;
};

Trie.prototype.add = function add(key, value) {
  const node = this.addNode(key);
  node.value = value;
};

Trie.prototype.update = function update(key, callbackfn) {
  const node = this.addNode(key);
  node.value = callbackfn(node.value);
};

Trie.prototype.load = function load(trie) {
  this.root.children = trie.root.children;
};

Trie.prototype.loadJSON = function loadJSON(json) {
  const parsedTrie = JSON.parse(json);
  this.load(parsedTrie);
};

export default Trie;
