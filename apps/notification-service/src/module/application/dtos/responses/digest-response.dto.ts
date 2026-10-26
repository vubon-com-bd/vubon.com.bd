/**
 * Digest Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationDigestFrequencyValue,
  NotificationDigestTypeValue,
  NotificationDigestStatusValue,
} from '@vubon/shared-types/platform';

export interface DigestItemResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly category: string;
  readonly priority: string;
  readonly title: string;
  readonly summary: string;
  readonly actionUrl?: string;
  readonly occurredAt: string;
}

export interface DigestResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly type: NotificationDigestTypeValue;
  readonly status: NotificationDigestStatusValue;
  readonly categories: readonly string[];
  readonly sendHour: number;
  readonly timezone: string;
  readonly itemCount: number;
  readonly items?: readonly DigestItemResponseDTO[];
  readonly generatedAt?: string;
  readonly sentAt?: string;
}

export interface DigestSummaryResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly status: NotificationDigestStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface DigestListResponseDTO {
  readonly items: readonly DigestSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
