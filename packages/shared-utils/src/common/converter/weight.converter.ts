export const convertWeight = (value: number, from: string, to: string): number => {
  const units: Record<string, number> = { kg: 1, g: 1000, lb: 2.20462, oz: 35.274 };
  return (value / units[from]) * units[to];
};
