export const isValidNID = (nid: string): boolean => {
  const nidRegex = /^[0-9]{10}$|^[0-9]{17}$/;
  return nidRegex.test(nid);
};
