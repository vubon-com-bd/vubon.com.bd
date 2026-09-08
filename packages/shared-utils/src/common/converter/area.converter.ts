export const convertArea = (value: number, from: string, to: string): number => {
  const units: Record<string, number> = {
    sqm: 1,
    sqkm: 0.000001,
    sqft: 10.7639,
    sqyd: 1.19599,
    acre: 0.000247105,
  };
  return (value / units[from]) * units[to];
};
