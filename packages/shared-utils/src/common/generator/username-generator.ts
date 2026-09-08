export const generateUsername = (firstName: string, lastName: string): string => {
  const first = firstName.toLowerCase().slice(0, 3);
  const last = lastName.toLowerCase().slice(0, 3);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${first}${last}${random}`;
};
