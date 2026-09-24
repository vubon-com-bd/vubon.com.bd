export interface DeliveryResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly providerName: string;
  readonly providerMessageId: string | null;
  readonly status: string;
  readonly attemptCount: number;
  readonly lastError: string | null;
  readonly deliveredAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
