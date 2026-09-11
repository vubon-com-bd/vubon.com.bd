export const generateCheckoutTrackingNumber = (prefix: string = 'TRK'): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export const generateTrackingNumberWithCarrier = (carrier: string): string => {
  const prefix = carrier.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
};
