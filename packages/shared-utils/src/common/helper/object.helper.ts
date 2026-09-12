/**
 * Object Helper.
 */
export const deepClone = <T>(obj: T): T => {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(obj);
    } catch {
      // fall through to JSON fallback
    }
  }
  return JSON.parse(JSON.stringify(obj)) as T;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>
  );

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> =>
  Object.keys(obj)
    .filter((key) => !keys.includes(key as K))
    .reduce(
      (acc, key) => {
        acc[key as keyof Omit<T, K>] = obj[key as keyof T] as never;
        return acc;
      },
      {} as Omit<T, K>
    );

export const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

export const merge = <T extends object>(...objects: Partial<T>[]): T =>
  Object.assign({}, ...objects) as T;
