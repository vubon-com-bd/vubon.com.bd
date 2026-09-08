export const isValidBDPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:\+880|0|880)?(1[3-9]\d{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidBDPostalCode = (postalCode: string): boolean => {
  const postalRegex = /^[1-9]\d{3}$/;
  return postalRegex.test(postalCode);
};
