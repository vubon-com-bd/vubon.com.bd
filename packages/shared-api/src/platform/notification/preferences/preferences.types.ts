export interface NotificationPreferences {
  readonly channels: {
    readonly inApp: boolean;
    readonly email: boolean;
    readonly sms: boolean;
    readonly push: boolean;
  };
  readonly categories: Record<string, boolean>;
}

export interface UpdateNotificationPreferencesRequest {
  readonly channels?: Partial<NotificationPreferences['channels']>;
  readonly categories?: Record<string, boolean>;
}
