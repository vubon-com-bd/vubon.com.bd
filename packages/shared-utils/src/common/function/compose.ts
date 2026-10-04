/**
 * Compose functions right-to-left
 * @module shared-utils/common/function
 *
 * @example
 * compose(double, addOne)(3) // double(addOne(3)) = 8
 */
export function compose<A, B>(f1: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(f1: (b: B) => C, f2: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(f1: (c: C) => D, f2: (b: B) => C, f3: (a: A) => B): (a: A) => D;
export function compose(...fns: ((x: unknown) => unknown)[]): (x: unknown) => unknown {
  if (fns.length === 0) throw new RangeError('compose requires at least one function');
  return (x: unknown): unknown =>
    fns
      .slice()
      .reverse()
      .reduce((acc, fn) => fn(acc), x);
}
