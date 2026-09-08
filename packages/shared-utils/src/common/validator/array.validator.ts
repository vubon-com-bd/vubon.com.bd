export const isArray = (value: unknown): boolean => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: unknown[]): boolean => {
  return value.length === 0;
};
