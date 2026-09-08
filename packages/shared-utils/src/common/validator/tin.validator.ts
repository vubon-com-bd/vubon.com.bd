export const isValidTIN = (tin: string): boolean => {
  const tinRegex = /^[0-9]{10}$|^[0-9]{12}$/;
  return tinRegex.test(tin);
};
