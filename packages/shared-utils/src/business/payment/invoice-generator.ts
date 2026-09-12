export const generateInvoiceBaseId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export const generatePaymentInvoiceNumber = (prefix: string = 'INV'): string => {
  return generateInvoiceBaseId(prefix, 10);
};

export const generateInvoiceNumberWithDate = (): string => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${date}-${random}`;
};
