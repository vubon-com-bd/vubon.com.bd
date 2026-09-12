export const generateTransactionBaseId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export const generateTransactionId = (prefix: string = 'TXN'): string => {
  return generateTransactionBaseId(prefix, 12);
};

export const generateTransactionIdWithTimestamp = (): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TXN-${timestamp}-${random}`;
};
