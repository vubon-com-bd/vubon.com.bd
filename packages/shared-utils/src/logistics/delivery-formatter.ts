export const formatDeliveryDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export const formatDeliveryTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-GB');
};

export interface DeliveryFormatData {
  deliveryNumber: string;
  status: string;
  scheduledDate: Date;
}

export interface DeliveryAttemptData {
  attemptNumber: number;
  attemptedAt: Date;
  status: string;
}

export const formatDeliverySummary = (delivery: DeliveryFormatData): string => {
  return `#${delivery.deliveryNumber} | ${delivery.status} | ${formatDeliveryDate(delivery.scheduledDate)}`;
};

export const formatDeliveryStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatDeliveryAttempt = (attempt: DeliveryAttemptData): string => {
  return `Attempt ${attempt.attemptNumber}: ${attempt.status} at ${formatDeliveryDate(attempt.attemptedAt)} ${formatDeliveryTime(attempt.attemptedAt)}`;
};
