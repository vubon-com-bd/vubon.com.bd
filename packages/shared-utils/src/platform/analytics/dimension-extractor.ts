export interface DimensionValue {
  value: unknown;
  count: number;
}

export const extractDimension = <T extends Record<string, unknown>>(
  data: T[],
  dimension: string
): DimensionValue[] => {
  return data.map((item) => ({
    value: item[dimension],
    count: 1,
  }));
};

export const extractDimensions = <T extends Record<string, unknown>>(
  data: T[],
  dimensions: string[]
): Record<string, unknown>[] => {
  return data.map((item) => {
    const result: Record<string, unknown> = {};
    for (const dim of dimensions) {
      result[dim] = item[dim];
    }
    return result;
  });
};
