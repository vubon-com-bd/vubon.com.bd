export const isValidNagadNumber = (number: string): boolean => {
  const nagadRegex = /^(?:\+880|0|880)?(1[3-9]\d{8})$/;
  return nagadRegex.test(number.replace(/\s/g, ''));
};
