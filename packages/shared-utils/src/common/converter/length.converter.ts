export const convertLength = (value: number, from: string, to: string): number => {
  const units: Record<string, number> = {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    ft: 3.28084,
    in: 39.3701,
  };
  return (value / units[from]) * units[to];
};
