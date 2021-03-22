# ALZ predictor &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mudafar/alz-predictor/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/alz-predictor.svg?style=flat)](https://www.npmjs.com/package/alz-predictor)  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

ALZ predictor is a JavaScript library for symbols sequence prediction, based on Gopalratnam and Cook Active LeZi algorithm.


* **AI:** ALZ predictor makes it possible to create proactive and smart UIs. Improve your application UX by adding a touch of artificial intelligence. Guess and prefetch required data to enhance performance. 

* **Simple:** Model each user action as a char, then train ALZ by simply adding them as they come (one by one). Predict next user action at any time. 

* **Lightweight:** No dependencies.   



## Installation
```bash
# Yarn
yarn add alz-predictor

# NPM
npm install --save alz-predictor
```


## Usage

```js
import Predictor from 'alz-predictor'

const predictor = new Predictor()
predictor.add('a')
predictor.add('b')
predictor.add('a')

const predictions = predictor.predict()
```

## Examples
- Prefetch data based on next user action prediction



## Documentation
### Constructor
```js
const predictor = new Predictor()
```

### Methods
- add: add `char` to the sequence.
- predict: get predictions object. 
- loadJSON: recover state from JSON. 

### Serialization
```js
const predictor = new Predictor()
predictor.add('a')
predictor.add('b')

const json = JSON.stringify(predictor)
```


## License
ALZ predictor is [MIT licensed](./LICENSE).