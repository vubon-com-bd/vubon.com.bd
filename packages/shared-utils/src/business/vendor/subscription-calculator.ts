export interface SubscriptionData {
  price: { amount: number };
  startDate: Date;
  endDate: Date;
}

export const calculateSubscriptionCost = (subscription: SubscriptionData): number => {
  return subscription.price.amount;
};

export const calculateSubscriptionRemaining = (subscription: SubscriptionData): number => {
  const now = new Date();
  const end = new Date(subscription.endDate);
  const start = new Date(subscription.startDate);
  if (now > end) return 0;
  const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const remainingDays = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return (subscription.price.amount * remainingDays) / totalDays;
};
