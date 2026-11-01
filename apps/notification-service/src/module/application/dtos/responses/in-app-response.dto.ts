/**
 * In-App Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type { InAppTypeValue, InAppStatusValue } from '@vubon/shared-types/platform';

export interface InAppResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: InAppTypeValue;
  readonly status: InAppStatusValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
    readonly action?: string;
  }[];
  readonly readAt?: string;
  readonly dismissedAt?: string;
  readonly clickedAt?: string;
  readonly createdAt: string;
  readonly expiresAt?: string;
}

export interface InAppInboxResponseDTO {
  readonly userId: string;
  readonly unreadCount: number;
  readonly totalCount: number;
  readonly notifications: readonly InAppResponseDTO[];
}
