/**
 * Dismiss In-App Notification Request DTO
 * @module notification-service/application/dtos/requests/in-app
 */
export interface DismissInAppRequestDTO {
  readonly notificationId: string;
  readonly dismissedAt?: string;
}

export interface DismissInAppCommandDTO extends DismissInAppRequestDTO {
  readonly actorId?: string;
}
