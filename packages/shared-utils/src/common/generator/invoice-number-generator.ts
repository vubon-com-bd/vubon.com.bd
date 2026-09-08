export const generateInvoiceNumber = (prefix: string = 'INV'): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${timestamp.slice(-8)}-${random}`;
};
