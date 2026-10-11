/**
 * Digest Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationDigestFrequencyValue,
  NotificationDigestTypeValue,
  NotificationDigestStatusValue,
} from '@vubon/shared-types/platform/notification';

export interface DigestResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly type: NotificationDigestTypeValue;
  readonly status: NotificationDigestStatusValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly itemCount: number;
  readonly itemIds: readonly string[];
  readonly generatedAt?: string;
  readonly sentAt?: string;
  readonly channel?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DigestListResponseDTO {
  readonly items: readonly DigestResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DigestPreviewResponseDTO {
  readonly userId: string;
  readonly itemCount: number;
  readonly items: readonly {
    readonly id: string;
    readonly type: string;
    readonly title: string;
    readonly category: string;
    readonly createdAt: string;
  }[];
}
