/**
 * Compose functions left-to-right
 * @module shared-utils/common/function
 *
 * @example
 * pipe(addOne, double)(3) // double(addOne(3)) = 8
 */
export function pipe<A, B>(f1: (a: A) => B): (a: A) => B;
export function pipe<A, B, C>(f1: (a: A) => B, f2: (b: B) => C): (a: A) => C;
export function pipe<A, B, C, D>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D): (a: A) => D;
export function pipe<A, B, C, D, E>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E
): (a: A) => E;
export function pipe(...fns: ((x: unknown) => unknown)[]): (x: unknown) => unknown {
  if (fns.length === 0) throw new RangeError('pipe requires at least one function');
  return (x: unknown): unknown => fns.reduce((acc, fn) => fn(acc), x);
}
