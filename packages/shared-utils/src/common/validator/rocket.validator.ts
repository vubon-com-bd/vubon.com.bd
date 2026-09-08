export const isValidRocketNumber = (number: string): boolean => {
  const rocketRegex = /^(?:\+880|0|880)?(1[3-9]\d{8})$/;
  return rocketRegex.test(number.replace(/\s/g, ''));
};
