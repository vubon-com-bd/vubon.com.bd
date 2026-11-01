/**
 * INotificationActionService — contract
 * @module notification-service/application/services/interfaces
 */
export const NOTIFICATION_ACTION_SERVICE = Symbol('NOTIFICATION_ACTION_SERVICE');

export interface ActionResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly actionType: string;
  readonly label: string;
  readonly url?: string;
  readonly triggerCount: number;
  readonly lastTriggeredAt?: string;
}

export interface INotificationActionService {
  listByNotification(notificationId: string): Promise<readonly ActionResponseDTO[]>;
  listTriggered(notificationId: string): Promise<readonly ActionResponseDTO[]>;
  recordTrigger(actionId: string, by: string): Promise<void>;
}
