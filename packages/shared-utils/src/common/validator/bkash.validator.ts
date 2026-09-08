export const isValidBkashNumber = (number: string): boolean => {
  const bkashRegex = /^(?:\+880|0|880)?(1[3-9]\d{8})$/;
  return bkashRegex.test(number.replace(/\s/g, ''));
};
