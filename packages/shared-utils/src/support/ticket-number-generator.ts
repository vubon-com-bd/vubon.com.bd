const generateTicketId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export const generateTicketNumber = (prefix: string = 'TKT'): string => {
  return generateTicketId(prefix, 10);
};

export const generateTicketNumberWithDate = (): string => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TKT-${date}-${random}`;
};
