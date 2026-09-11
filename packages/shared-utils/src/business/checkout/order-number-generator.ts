export const generateCheckoutOrderNumber = (prefix: string = 'ORD'): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export const generateOrderNumberWithTimestamp = (): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
};
