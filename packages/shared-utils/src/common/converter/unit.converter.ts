/**
 * Unit Converter — generic dispatcher.
 */
import { convertLength } from './length.converter';
import { convertWeight } from './weight.converter';
import { convertArea } from './area.converter';
import { convertVolume } from './volume.converter';
import { convertTemperature } from './temperature.converter';

export type UnitCategory = 'length' | 'weight' | 'area' | 'volume' | 'temperature';

const CATEGORY_UNITS: Record<UnitCategory, string[]> = {
  length: ['m', 'km', 'cm', 'mm', 'um', 'nm', 'mi', 'yd', 'ft', 'in'],
  weight: ['kg', 'g', 'mg', 't', 'lb', 'oz', 'st'],
  area: [
    'sqm',
    'sqkm',
    'sqcm',
    'sqft',
    'sqyd',
    'acre',
    'hectare',
    'katha_bd',
    'bigha_bd',
    'decimal_bd',
  ],
  volume: ['l', 'ml', 'cl', 'dl', 'm3', 'gal', 'gal_uk', 'qt', 'pt', 'cup', 'floz'],
  temperature: ['C', 'F', 'K'],
};

export const detectCategory = (unit: string): UnitCategory | null => {
  for (const [category, units] of Object.entries(CATEGORY_UNITS)) {
    if (units.includes(unit)) return category as UnitCategory;
  }
  return null;
};

export const convertUnit = (value: number, from: string, to: string): number => {
  const fromCat = detectCategory(from);
  const toCat = detectCategory(to);
  if (!fromCat || !toCat) throw new Error(`Unknown unit: ${!fromCat ? from : to}`);
  if (fromCat !== toCat) throw new Error(`Cannot convert across categories: ${fromCat} → ${toCat}`);
  switch (fromCat) {
    case 'length':
      return convertLength(value, from, to);
    case 'weight':
      return convertWeight(value, from, to);
    case 'area':
      return convertArea(value, from, to);
    case 'volume':
      return convertVolume(value, from, to);
    case 'temperature':
      return convertTemperature(value, from, to);
  }
};

export { CATEGORY_UNITS };
