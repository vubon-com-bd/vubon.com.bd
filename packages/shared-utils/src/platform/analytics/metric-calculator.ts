export const calculateMetric = <T extends Record<string, unknown>>(
  data: T[],
  operation: string,
  field: string
): number => {
  const values = data.map((item) => {
    const value = item[field];
    return typeof value === 'number' ? value : 0;
  });

  if (operation === 'sum') return values.reduce((a, b) => a + b, 0);
  if (operation === 'avg')
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  if (operation === 'min') return values.length > 0 ? Math.min(...values) : 0;
  if (operation === 'max') return values.length > 0 ? Math.max(...values) : 0;
  if (operation === 'count') return values.length;
  if (operation === 'distinct') return new Set(values).size;
  return 0;
};
