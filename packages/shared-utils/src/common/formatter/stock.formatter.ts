export const formatStock = (stock: number): string => {
  if (stock <= 0) return 'Out of Stock';
  if (stock < 10) return `Only ${stock} left`;
  return `${stock} in stock`;
};
