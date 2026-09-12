export const aggregateData = <T extends Record<string, unknown>>(
  data: T[],
  groupBy: string,
  metric: string
): Record<string, number> => {
  const result: Record<string, number> = {};
  for (const item of data) {
    const key = String(item[groupBy]);
    const value = item[metric];
    if (!result[key]) result[key] = 0;
    result[key] += typeof value === 'number' ? value : 0;
  }
  return result;
};

export const aggregateByDate = <T extends Record<string, unknown>>(
  data: T[],
  dateField: string,
  metric: string
): Record<string, number> => {
  const result: Record<string, number> = {};
  for (const item of data) {
    const date = new Date(String(item[dateField])).toISOString().split('T')[0];
    const value = item[metric];
    if (!result[date]) result[date] = 0;
    result[date] += typeof value === 'number' ? value : 0;
  }
  return result;
};
