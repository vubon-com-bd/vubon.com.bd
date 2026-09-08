export const calculateMargin = (sellingPrice: number, costPrice: number): number => {
  return ((sellingPrice - costPrice) / sellingPrice) * 100;
};

export const calculateMarkup = (costPrice: number, margin: number): number => {
  return costPrice / (1 - margin / 100);
};
