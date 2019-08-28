import { recurrent } from 'brain.js';
// import planets from './planets';
import { parsePHData } from './train';

const padTrainingData = (data: number[]): number[] => {
  if (data.length === 6) {
    return data;
  }
  return padTrainingData([...data, 0]);
};

const main = async () => {
  const net = new recurrent.LSTMTimeStep({
    inputSize: 6,
    hiddenLayers: [50],
    outputSize: 6
  });

  // const solarSystem = [[0, 1], ...planets];
  const data = await (await parsePHData(
    '../data/phl_exoplanet_catalog.csv'
  )).slice(0, 10);

  const trainingData = data.map(d => padTrainingData(d)); //[solarSystem, ...data];
  console.log(trainingData);
  // console.log(data.length);
  // trainingData.forEach(d => console.log(d.length));

  net.train(trainingData, {
    iterations: 15000,
    log: details => console.log(details),
    logPeriod: 100,
    errorThresh: 0.011
  });

  console.log(net.run([[1.1]]));
  // console.log(net.forecast(solarSystem.splice(0, 6), 3));
  // console.log(net.forecast([1], 5));
};

main();
