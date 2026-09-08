export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Pick<T, K>);
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  return Object.keys(obj)
    .filter((key) => !keys.includes(key as K))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key as keyof T] }), {} as Omit<T, K>);
};
