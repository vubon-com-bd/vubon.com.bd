/**
 * Temperature Converter.
 */
export type TempUnit = 'C' | 'F' | 'K';

const VALID: TempUnit[] = ['C', 'F', 'K'];

const assertUnit = (u: string): TempUnit => {
  if (!VALID.includes(u as TempUnit)) {
    throw new Error(`Invalid temperature unit: ${u}`);
  }
  return u as TempUnit;
};

const toCelsius = (value: number, from: TempUnit): number => {
  switch (from) {
    case 'C':
      return value;
    case 'F':
      return ((value - 32) * 5) / 9;
    case 'K':
      return value - 273.15;
  }
};

const fromCelsius = (celsius: number, to: TempUnit): number => {
  switch (to) {
    case 'C':
      return celsius;
    case 'F':
      return (celsius * 9) / 5 + 32;
    case 'K':
      return celsius + 273.15;
  }
};

export const convertTemperature = (value: number, from: string, to: string): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  const fromU = assertUnit(from);
  const toU = assertUnit(to);
  if (fromU === toU) return value;
  return fromCelsius(toCelsius(value, fromU), toU);
};
