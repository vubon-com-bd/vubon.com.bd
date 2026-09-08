export const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

export const isEmptyString = (value: string): boolean => {
  return value.trim().length === 0;
};

export const isNonEmptyString = (value: string): boolean => {
  return !isEmptyString(value);
};
