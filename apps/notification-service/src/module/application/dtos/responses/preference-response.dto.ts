/**
 * Preference Response DTOs
 * @module notification-service/application/dtos/responses
 */
export interface PreferenceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly channelPreferences: Readonly<Record<string, boolean>>;
  readonly categoryPreferences: Readonly<Record<string, boolean>>;
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PreferencePublicResponseDTO {
  readonly userId: string;
  readonly channels: Readonly<Record<string, boolean>>;
  readonly categories: Readonly<Record<string, boolean>>;
  readonly quietHours: {
    readonly enabled: boolean;
    readonly start?: number;
    readonly end?: number;
    readonly timezone: string;
  };
}
