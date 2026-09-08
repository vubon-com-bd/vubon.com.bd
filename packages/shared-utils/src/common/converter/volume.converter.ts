export const convertVolume = (value: number, from: string, to: string): number => {
  const units: Record<string, number> = { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338 };
  return (value / units[from]) * units[to];
};
