export const generateTrackingId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export const generateShipmentTrackingNumber = (carrier: string): string => {
  const prefix = carrier.substring(0, 3).toUpperCase();
  return generateTrackingId(prefix, 12);
};

export const generateReturnTrackingNumber = (): string => {
  return generateTrackingId('RTRK', 12);
};

export const generateLogisticsTrackingNumber = (): string => {
  return generateTrackingId('LTRK', 12);
};
