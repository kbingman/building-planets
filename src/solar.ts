import fs from 'fs';
import { resolve } from 'path';
import md5 from 'md5';
import { NeuralNetwork } from 'brain.js';

import { exoplanets } from './exoplanets';
import { planets, moons } from './planets';

const bodies = {
  Mercury: {
    mass: 0.0553,
    radius: 0.383,
    type: 'Fe/MgSiO3'
  },
  Venus: {
    mass: 0.815,
    radius: 0.949,
    type: 'Fe/MgSiO3'
  },
  Earth: {
    mass: 1,
    radius: 1,
    type: 'Fe/MgSiO3'
  },
  Moon: {
    mass: 0.0123,
    radius: 0.2724,
    type: 'Fe/MgSiO3'
  },
  Mars: {
    mass: 0.107,
    radius: 0.532,
    type: 'Fe/MgSiO3'
  },
  Jupiter: {
    mass: 317.83,
    radius: 10.97,
    type: 'H/He'
  },
  Ganymede: {
    mass: 0.0248,
    radius: 0.4135,
    type: 'Fe/MgSiO3/H2O'
  },
  Saturn: {
    mass: 95.162,
    radius: 9.14,
    type: 'H/He'
  },
  Titan: {
    mass: 0.0225,
    radius: 0.404,
    type: 'Fe/MgSiO3/H2O'
  },
  Enceladus: {
    mass: 0.000018,
    radius: 0.0395,
    type: 'Fe/MgSiO3/H2O'
  },
  Iapetus: {
    mass: 0.00033,
    radius: 0.1153,
    type: 'H2O'
  },
  Uranus: {
    mass: 14.536,
    radius: 3.981,
    type: 'H2O'
  },
  Neptune: {
    mass: 17.147,
    radius: 3.865,
    type: 'H2O'
  }
};

const trainingData = Object.values({
  ...planets,
  ...moons,
  ...bodies,
  ...exoplanets
}).map(({ mass, radius, type }) => ({
  input: { mass, radius },
  output: { [type]: 1 }
}));

const net = new NeuralNetwork();
const stats = net.train(trainingData, {
  iterations: 1000000,
  log: details => console.log(details),
  logPeriod: 1000,
  errorThresh: 0.011
});

console.log(trainingData);

const json = JSON.stringify(net.toJSON());
const hash = md5(json);

fs.writeFileSync(
  resolve(__dirname, '..', 'data', `system-net-${hash}.json`),
  json
);

console.log('Earth');
console.log(net.run({ mass: 1, radius: 1 }));

console.log('Jupiter');
console.log(net.run({ mass: 317, radius: 9 }));

console.log('Pluto');
console.log(net.run({ mass: 0.0022, radius: 0.186 }));

console.log('Eris');
console.log(net.run({ mass: 0.0028, radius: 0.1825 }));

console.log('Haumea');
console.log(net.run({ mass: 0.0067, radius: 0.097 }));
