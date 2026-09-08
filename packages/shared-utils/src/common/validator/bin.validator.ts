export const isValidBIN = (bin: string): boolean => {
  const binRegex = /^[0-9]{9}$|^[0-9]{13}$/;
  return binRegex.test(bin);
};
