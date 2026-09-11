export const addHoursToDate = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export interface AbandonedCartData {
  lastActivity: Date;
  status: string;
  lastReminderSentAt?: Date;
  reminderCount: number;
}

export const isAbandonedCart = (cart: { lastActivity: Date; status: string }): boolean => {
  const lastActivity = new Date(cart.lastActivity);
  const hoursSinceLastActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastActivity > 3 && cart.status !== 'checked_out';
};

export const getReminderSchedule = (): Date[] => {
  const now = new Date();
  return [
    addHoursToDate(now, 1),
    addHoursToDate(now, 24),
    addHoursToDate(now, 48),
    addHoursToDate(now, 72),
  ];
};

export const shouldSendReminder = (abandonedCart: AbandonedCartData): boolean => {
  const lastReminder = abandonedCart.lastReminderSentAt;
  if (!lastReminder) return true;
  const hoursSinceLast = (Date.now() - new Date(lastReminder).getTime()) / (1000 * 60 * 60);
  return hoursSinceLast > 24 && abandonedCart.reminderCount < 4;
};
