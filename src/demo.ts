import fs from 'fs';
import { recurrent } from 'brain.js';
import { resolve } from 'path';
import md5 from 'md5';

const net = new recurrent.LSTMTimeStep();

const trainingData = [
  [
    [0, 1],
    [0.39, 0.0553],
    [0.723, 0.815],
    [1, 1],
    [1.524, 0.107],
    [5.203, 317.8],
    [9.539, 95.2],
    [19.18, 14.5],
    [30.06, 17.1]
  ],
  [
    [0, 0.08],
    [0.01111, 0.84860077],
    [0.01521, 1.3793735],
    [0.02144, 0.40999812],
    [0.02817, 0.61976461],
    [0.0371, 0.68015193],
    [0.0451, 1.3412342],
    [0.059539171, 0.34834272]
  ],
  [
    [0, 1.04],
    [0.051269087, 363.09625],
    [1.393, 398.19717],
    [0.085968073, 13.10087],
    [0.016935154, 6.8301238]
  ],
  [
    [0, 0.78],
    [0.538, 3.9315324],
    [1.334, 3.9315324],
    [0.133, 1.7512323],
    [0.243, 1.8306893]
  ]
];

console.log(trainingData);

// net.train(trainingData, {
//   iterations: 500000,
//   log: details => console.log(details),
//   logPeriod: 1000,
//   errorThresh: 1
// });

// const json = JSON.stringify(net.toJSON());
// const hash = md5(json);

// fs.writeFileSync(
//   resolve(__dirname, '..', 'data', `planets-net-${hash}.json`),
//   json
// );

// console.log(net.forecast([[0, 0.8]], 4));
// console.log(net.forecast([[0, 0.08]], 4));
