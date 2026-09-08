export const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const isEmptyObject = (value: Record<string, unknown>): boolean => {
  return Object.keys(value).length === 0;
};
