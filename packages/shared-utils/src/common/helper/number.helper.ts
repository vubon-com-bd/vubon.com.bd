/**
 * Number Helper.
 * @module shared-utils/common/helper/number
 */

import { secureRandomInt } from './crypto.helper';

/**
 * Clamps a value between min and max.
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (min > max) throw new Error('min must be <= max');
  return Math.min(Math.max(value, min), max);
};

/**
 * Crypto-secure random integer in [min, max] (inclusive).
 */
export const random = (min: number, max: number): number => secureRandomInt(min, max);

/**
 * Rounds to a given number of decimals.
 */
export const roundTo = (value: number, decimals: number = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};
