/**
 * Convert temperature between C, F, K
 * @module shared-utils/converter/unit
 */
export type TemperatureUnit = 'c' | 'f' | 'k';

export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (!Number.isFinite(value)) return 0;
  if (from === to) return value;

  let celsius: number;
  switch (from) {
    case 'c':
      celsius = value;
      break;
    case 'f':
      celsius = ((value - 32) * 5) / 9;
      break;
    case 'k':
      celsius = value - 273.15;
      break;
  }

  switch (to) {
    case 'c':
      return round2(celsius);
    case 'f':
      return round2((celsius * 9) / 5 + 32);
    case 'k':
      return round2(celsius + 273.15);
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
