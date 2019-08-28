import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

interface Planet {
  name: string;
  axis: number;
  mass: number;
  radius: number;
  habitable: boolean;
  type: string; // 'Jovian', etc
}

interface System {
  name: string;
  mass: number;
  radius: number;
  type: string; // 'M' | 'K', etc
  snowLine: number;
  abio: number;
  planets: Planet[];
}

interface Systems {
  [key: string]: System;
}

const readFile = promisify(fs.readFile);

const createTrainingData = (system: System) => {
  const planets = system.planets.map(p => [p.axis, p.mass]);
  return [[0, system.mass], ...planets];
};

const createAllTrainingData = (systems: System[]) => {
  return systems.map(s => createTrainingData(s));
};

/**
 * Filters systems with less than two planets
 */
const filterSystems = (systems: Systems): System[] =>
  Object.values(systems).filter((s: any) => s.planets.length > 3);

/**
 * Split CSV Data
 */
const split = (data: string): string[] => data.split('\n');

/**
 * Parse relevant Star data from RAW format
 */
const parseStarData = (data: any): System => ({
  name: data.S_NAME,
  mass: Number.parseFloat(data.S_MASS),
  radius: Number.parseFloat(data.S_RADIUS_EST),
  type: data.S_TYPE_TEMP,
  snowLine: Number.parseFloat(data.S_SNOW_LINE),
  abio: Number.parseFloat(data.S_ABIO_ZONE),
  planets: []
});

/**
 * Parse relevant Star data from RAW format
 */
const parsePlanetData = (data: any): Planet => ({
  name: data.P_NAME,
  axis: Number.parseFloat(data.P_SEMI_MAJOR_AXIS_EST),
  mass: Number.parseFloat(data.P_MASS_EST),
  radius: Number.parseFloat(data.P_RADIUS_EST),
  type: data.P_TYPE,
  habitable: data.P_HABITABLE === 1
});

/**
 * Parse relevant Star data from RAW format
 */
const collateSystemData = (data: any) =>
  data.reduce((acc: any, d: any) => {
    const star = parseStarData(d);
    const planet = parsePlanetData(d);
    console.log(planet);

    if (!Number.isNaN(planet.axis) && !Number.isNaN(planet.mass)) {
      star.planets = acc[star.name]
        ? [...acc[star.name].planets, planet]
        : [planet];
    }

    return star.name ? { ...acc, [star.name]: star } : acc;
  }, {});

/**
 * Parse CSV data into RAW format
 */
const parseRawData = (data: string[]) => {
  const headers = data[0].split(',');
  return data.slice(1).map(row =>
    row.split('","').reduce(
      (acc: any, value, index) => ({
        ...acc,
        [headers[index]]: value.replace(/\"/g, '')
      }),
      {}
    )
  );
};

/**
 * Main function to parse Exo-Planet CSV
 */
export const parsePHData = async (path: string): Promise<number[][][]> => {
  const systems = collateSystemData(
    parseRawData(split(await readFile(resolve(__dirname, path), 'utf8')))
  );
  const results = filterSystems(systems);
  console.log(results);
  console.log(results.length);
  console.log(createAllTrainingData(results));
  return createAllTrainingData(results);
};

parsePHData('../data/phl_exoplanet_catalog.csv');
