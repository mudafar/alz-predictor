# ALZ predictor &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mudafar/alz-predictor/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/alz-predictor.svg?style=flat)](https://www.npmjs.com/package/alz-predictor)  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

ALZ predictor is a JavaScript library for symbols sequence prediction, based on **Gopalratnam and Cook Active LeZi algorithm**.


* **AI:** ALZ predictor makes it possible to create proactive and smart UIs. Improve your application UX by adding a touch of artificial intelligence. Guess and prefetch required data to enhance performance. 

* **Simple:** Model each user action as a char, then train ALZ by simply adding them as they come (one by one). Predict next user action at any time. 

* **Lightweight:** No dependencies.   

## FAQ
- Why **JavaScript** and **Frontend AI** at all? 
   - No server-client latency
   - Offline
   - Privacy
   - Cost
   - [TensorFlow.js](https://www.tensorflow.org/js/) and [ONNX.JS](https://microsoft.github.io/onnxjs-demo/#/)

- How to **save learning** data?
   
   Serialize and save to browser **localStorage**.

- What is the difference with **Guess.js**?
   
    **Google Analytics** is **not** required for training.


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
- Next-page data predective prefetching:
    - Online demo: https://mudafar.github.io/alz-predictor-prefetch-example/

    - [Source code](https://github.com/mudafar/alz-predictor-prefetch-example)



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