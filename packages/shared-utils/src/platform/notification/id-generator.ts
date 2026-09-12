export const generateNotificationId = (prefix: string = 'NTF'): string => {
  const random = Math.random().toString(36).substring(2, 14).toUpperCase();
  return `${prefix}-${random}`;
};

export const generateEmailId = (): string => {
  return generateNotificationId('EML');
};

export const generateSmsId = (): string => {
  return generateNotificationId('SMS');
};

export const generatePushId = (): string => {
  return generateNotificationId('PSH');
};
