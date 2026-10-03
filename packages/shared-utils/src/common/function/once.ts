/**
 * Invoke function only once (subsequent calls return first result)
 * @module shared-utils/common/function
 */
export function once<TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => TResult
): (...args: TArgs) => TResult {
  let called = false;
  let result: TResult;
  return (...args: TArgs): TResult => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
