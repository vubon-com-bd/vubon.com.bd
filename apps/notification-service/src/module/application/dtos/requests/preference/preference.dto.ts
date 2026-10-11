/**
 * Preference Request DTOs
 * @module notification-service/application/dtos/requests/preference
 */
import type { NotificationPreferenceFrequencyValue } from '@vubon/shared-types/platform/notification';

export interface GetPreferenceRequestDTO {
  readonly userId: string;
}

export interface UpdatePreferenceRequestDTO {
  readonly userId: string;
  readonly channelPreferences?: Readonly<Record<string, boolean>>;
  readonly categoryPreferences?: Readonly<Record<string, boolean>>;
  readonly frequency?: NotificationPreferenceFrequencyValue;
  readonly timezone?: string;
  readonly locale?: string;
}

export interface ToggleChannelRequestDTO {
  readonly userId: string;
  readonly channel: string;
  readonly enabled: boolean;
}

export interface ToggleCategoryRequestDTO {
  readonly userId: string;
  readonly category: string;
  readonly enabled: boolean;
}

export interface UpdateQuietHoursRequestDTO {
  readonly userId: string;
  readonly enabled: boolean;
  readonly startHour?: number;
  readonly endHour?: number;
  readonly timezone?: string;
}

export interface OptOutRequestDTO {
  readonly userId: string;
  readonly scope: string;
  readonly reason?: string;
}

export interface OptInRequestDTO {
  readonly userId: string;
  readonly scope: string;
}
