export interface SubscriptionCalculationData {
  amount: { amount: number };
  startDate: Date;
  endDate: Date;
  trialEndDate?: Date;
}

export const calculateSubscriptionTotal = (subscription: SubscriptionCalculationData): number => {
  return subscription.amount.amount;
};

export const calculateSubscriptionRemaining = (
  subscription: SubscriptionCalculationData
): number => {
  const now = new Date();
  const end = new Date(subscription.endDate);
  const total = subscription.amount.amount;
  if (now > end) return 0;
  const totalDays =
    (end.getTime() - new Date(subscription.startDate).getTime()) / (1000 * 60 * 60 * 24);
  const remainingDays = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return (total * remainingDays) / totalDays;
};

export const calculateTrialRemaining = (subscription: SubscriptionCalculationData): number => {
  if (!subscription.trialEndDate) return 0;
  const now = new Date();
  const trialEnd = new Date(subscription.trialEndDate);
  if (now > trialEnd) return 0;
  return (trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
};
