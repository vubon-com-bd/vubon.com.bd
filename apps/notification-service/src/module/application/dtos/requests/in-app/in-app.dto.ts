/**
 * In-App Notification Request DTOs
 * @module notification-service/application/dtos/requests/in-app
 */
import type {
  InAppTypeValue,
  InAppPositionValue,
} from '@vubon/shared-types/platform/notification';

export interface InAppActionInputDTO {
  readonly id: string;
  readonly label: string;
  readonly url?: string;
  readonly action?: string;
}

export interface SendInAppRequestDTO {
  readonly userId: string;
  readonly type: InAppTypeValue;
  readonly position?: InAppPositionValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly InAppActionInputDTO[];
  readonly displayDurationSeconds?: number;
  readonly autoDismiss?: boolean;
  readonly expiresAt?: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface InAppInboxRequestDTO {
  readonly userId: string;
  readonly unreadOnly?: boolean;
  readonly page?: number;
  readonly limit?: number;
}

export interface MarkInAppReadRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
}

export interface DismissInAppRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
}

export interface InAppClickRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
  readonly actionId?: string;
}
