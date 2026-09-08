export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value);
};

export const isPositiveNumber = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

export const isNonNegativeNumber = (value: number): boolean => {
  return isNumber(value) && value >= 0;
};
