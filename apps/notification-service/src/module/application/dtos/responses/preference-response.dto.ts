/**
 * Preference Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationPreferenceTypeValue,
  NotificationPreferenceFrequencyValue,
} from '@vubon/shared-types/platform';

export interface PreferenceOptionResponseDTO {
  readonly channel: string;
  readonly category?: string;
  readonly enabled: boolean;
}

export interface PreferenceResponseDTO {
  readonly userId: string;
  readonly type: NotificationPreferenceTypeValue;
  readonly options: readonly PreferenceOptionResponseDTO[];
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale: string;
  readonly locked: boolean;
  readonly updatedAt: string;
}

export interface PreferenceMatrixResponseDTO {
  readonly userId: string;
  readonly channels: Readonly<Record<string, boolean>>;
  readonly categories: Readonly<Record<string, boolean>>;
  readonly quietHours: { readonly start?: number; readonly end?: number } | null;
  readonly timezone: string;
  readonly locale: string;
}

export interface PreferenceDefaultsResponseDTO {
  readonly email: boolean;
  readonly sms: boolean;
  readonly push: boolean;
  readonly inApp: boolean;
  readonly webhook: boolean;
  readonly whatsapp: boolean;
  readonly frequency: NotificationPreferenceFrequencyValue;
}
