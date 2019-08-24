import { recurrent } from 'brain.js';
import planets from './planets';

const net = new recurrent.LSTMTimeStep({
  inputSize: 2,
  hiddenLayers: [10],
  outputSize: 2
});

const trainingData = [
  [[0, 1], ...planets],
  [[0, 1.54], []]
];

console.log(planets);

net.train(trainingData, {
  iterations: 1500,
  log: details => console.log(details),
  errorThresh: 0.011
});

console.log(net.run([[0, 0.5], [0.3, 1]]));
