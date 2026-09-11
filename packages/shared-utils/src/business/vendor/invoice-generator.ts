export const generateId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export const generateVendorInvoiceNumber = (prefix: string = 'VINV'): string => {
  return generateId(prefix, 10);
};
