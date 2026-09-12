/**
 * Array Helper — crypto-secure shuffle.
 */
import { secureRandomInt } from './crypto.helper';

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('Chunk size must be a positive integer');
  }
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uniqueArray = <T>(array: T[]): T[] => [...new Set(array)];

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> =>
  array.reduce(
    (acc, item) => {
      const group = String(item[key]);
      if (!acc[group]) acc[group] = [];
      acc[group]!.push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );

export const flatten = <T>(array: (T | T[])[]): T[] => array.flat() as T[];

export const shuffle = <T>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i);
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
};

export const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);
