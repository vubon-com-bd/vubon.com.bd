/**
 * Digest Request DTOs
 * @module notification-service/application/dtos/requests/digest
 */
import type {
  NotificationDigestFrequencyValue,
  NotificationDigestTypeValue,
} from '@vubon/shared-types/platform/notification';

export interface CreateDigestRequestDTO {
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly type: NotificationDigestTypeValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly itemIds?: readonly string[];
  readonly channel?: string;
}

export interface UpdateDigestRequestDTO {
  readonly digestId: string;
  readonly frequency?: NotificationDigestFrequencyValue;
  readonly type?: NotificationDigestTypeValue;
}

export interface GetDigestRequestDTO {
  readonly digestId: string;
}

export interface ListDigestsRequestDTO {
  readonly filter?: {
    readonly userId?: string;
    readonly status?: string;
    readonly frequency?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'periodStart' | 'sentAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface GenerateDigestRequestDTO {
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly type?: NotificationDigestTypeValue;
  readonly periodStart?: string;
  readonly periodEnd?: string;
}

export interface SendDigestRequestDTO {
  readonly digestId: string;
  readonly channel: string;
}

export interface DigestPreviewRequestDTO {
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
}
