import type { ReactElement } from 'react';

import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Scatter,
  ScatterChart,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  ZAxis,
} from 'recharts';

type Primitive = string | number;

type GenericObject = {
  [key: Primitive]: Primitive;
};

type ReverseMap<T extends GenericObject> = {
  [P in T[keyof T]]: {
    [K in keyof T]: T[K] extends P ? K : never;
  }[keyof T];
};

type MainSpectralClasses = ['O', 'B', 'A', 'F', 'G', 'K', 'M'];

const spectralTypeCharacteristics: { [spectralType: string]: number } = {
  O: 40_000,
  B0: 29_200,
  B1: 23_000,
  B2: 21_000,
  B3: 17_600,
  B5: 15_200,
  B6: 14_300,
  B7: 13_500,
  B8: 12_300,
  B9: 11_400,
  A0: 9600,
  A1: 9330,
  A2: 9040,
  A3: 8750,
  A4: 8480,
  A5: 8310,
  A7: 7920,
  A9: 7500,
  F0: 7350,
  F2: 7050,
  F3: 6850,
  F5: 6700,
  F6: 6550,
  F7: 6400,
  F8: 6300,
  G0: 6050,
  G1: 5930,
  G2: 5800,
  G5: 5660,
  G8: 5440,
  K0: 5240,
  K1: 5110,
  K2: 4960,
  K3: 4800,
  K4: 4600,
  K5: 4400,
  K7: 4000,
  M0: 3750,
};

function returnReverseMapping<T extends GenericObject>(obj: T): ReverseMap<T> {
  return Object.fromEntries(
    Object.entries(obj).map(entryArr => entryArr.reverse())
  ) as ReverseMap<T>;
}

const tempToSpectralTypeMapping = returnReverseMapping(
  spectralTypeCharacteristics
);

const boundSpectralTemperatures: number[] = Object.keys(
  spectralTypeCharacteristics
)
  .filter(key => typeof key === 'string' && /[A-Z]0|O/.test(key))
  .map(spectralType => spectralTypeCharacteristics[spectralType]);

const mainSpectralTypes: MainSpectralClasses = 'obafgkm'
  .split('')
  .map(str => str.toLocaleUpperCase()) as MainSpectralClasses;

function transformTempToSpecteralType(_: number, index: number): string {
  return mainSpectralTypes[index];
}

interface StarData {
  x: number;
  y: number;
}

const brightestsStarsData: StarData[] = [
  { x: spectralTypeCharacteristics['G2'], y: 4.8 },
  { x: spectralTypeCharacteristics['A1'], y: 1.4 },
  { x: spectralTypeCharacteristics['A9'], y: -2.5 },
  {
    x: spectralTypeCharacteristics['G2'],
    y: -2.4,
  },
  { x: spectralTypeCharacteristics['K2'], y: 0.2 },
  { x: spectralTypeCharacteristics['A0'], y: 0.6 },
  {
    x: spectralTypeCharacteristics['G6'],
    y: 0.4,
  },
  { x: spectralTypeCharacteristics['B8'], y: -8.1 },
  { x: spectralTypeCharacteristics['F5'], y: 2.6 },
  { x: spectralTypeCharacteristics['B3'], y: -1.3 },
  { x: spectralTypeCharacteristics['M2'], y: -7.2 },
  { x: spectralTypeCharacteristics['B1'], y: -4.4 },
  { x: spectralTypeCharacteristics['B2'], y: -4.6 },
  { x: spectralTypeCharacteristics['A7'], y: 2.3 },
  { x: spectralTypeCharacteristics['K5'], y: -0.3 },
  { x: spectralTypeCharacteristics['M2'], y: -5.2 },
  { x: spectralTypeCharacteristics['B1'], y: -3.2 },
  { x: spectralTypeCharacteristics['K0'], y: 0.7 },
  { x: spectralTypeCharacteristics['A3'], y: 2.0 },
  { x: spectralTypeCharacteristics['B1'], y: -4.7 },
  { x: spectralTypeCharacteristics['A2'], y: -7.2 },
  { x: spectralTypeCharacteristics['B7'], y: -0.3 },
  { x: spectralTypeCharacteristics['B2'], y: -4.8 },
  { x: spectralTypeCharacteristics['A3'], y: 0.5 },
  { x: spectralTypeCharacteristics['M4'], y: -1.2 },
  { x: spectralTypeCharacteristics['B2'], y: -3.5 },
];

const nearestStarData: StarData[] = [
  { x: 'G2', y: 4.8 },
  { x: 'M5', y: 15.5 },
  { x: 'G2', y: 4.4 },
  { x: 'K1', y: 5.7 },
  { x: 'M3', y: 13.2 },
  { x: 'M5', y: 16.7 },
  { x: 'M2', y: 10.5 },
  { x: 'M5', y: 15.5 },
  { x: 'M5', y: 16 },
  { x: 'A1', y: 1.4 },
  { x: 'M3', y: 13.1 },
  { x: 'M4', y: 14.8 },
  { x: 'K2', y: 6.1 },
  { x: 'M4', y: 13.5 },
  { x: 'K3', y: 7.6 },
  { x: 'K4', y: 8.4 },
  { x: 'K3', y: 7 },
  { x: 'M1', y: 10.4 },
  { x: 'M3', y: 13.4 },
  { x: 'F5', y: 2.6 },
  { x: 'M3', y: 11.2 },
  { x: 'M3', y: 11.9 },
  { x: 'M1', y: 9.6 },
].map(({ x, y }) => ({ x: spectralTypeCharacteristics[x], y }));

export default function HrDiagram(): ReactElement {
  return (
    <ResponsiveContainer width="80%" height={700}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <defs>
          <linearGradient id="MyGradient">
            <stop offset="27%" stop-color="#2E5785" />
            <stop offset="35%" stop-color="#008D8E" />
            <stop offset="50%" stop-color="#84AB3F" />
            <stop offset="59%" stop-color="#F4DA3B" />
            <stop offset="100%" stop-color="#CA4242" />
            <stop stop-color="#f00" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" fill="url(#MyGradient)" />
        <XAxis
          padding={{ left: 100, right: 20 }}
          dataKey="x"
          type="number"
          name="Temperature(K)"
          height={50}
          ticks={boundSpectralTemperatures}
          tickFormatter={transformTempToSpecteralType}
          reversed={true}>
          <Label value="Spectral Type" offset={-15} position="bottom" />
        </XAxis>

        <YAxis
          padding={{ bottom: 70, top: 50 }}
          dataKey="y"
          type="number"
          domain={[-9, 17]}
          name="Absolute Magnitude"
          reversed={true}>
          <Label
            value="Absolute Magnitude"
            offset={-1}
            position="insideLeft"
            style={{ textAnchor: 'middle' }}
            angle={-90}
          />
        </YAxis>

        <ZAxis range={[200, 200]} />

        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend verticalAlign="top" margin={{ bottom: 0 }} height={40} />

        <Scatter
          name="Brightest Stars"
          data={brightestsStarsData}
          fill="#ff0000"
        />
        <Scatter
          name="Nearest Stars"
          data={nearestStarData}
          fill="#000000"
          shape="square"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

// Check these out
// https://recharts.org/en-US/examples/ScatterChartWithCells
// https://recharts.org/en-US/examples/ThreeDimScatterChart
// https://www.astronomytrek.com/list-of-different-star-types/
// https://www.handprint.com/ASTRO/specclass.html
// http://hyperphysics.phy-astr.gsu.edu/hbase/Starlog/staspe.html
