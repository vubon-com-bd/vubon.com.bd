export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export interface SecurityPreferences {
  require2FA: boolean;
  requireBiometric: boolean;
  requireDeviceVerification: boolean;
}

export interface AuthPreferences {
  userId: string;
  twoFactorEnabled: boolean;
  rememberMe: boolean;
  sessionTimeout: number;
  notificationPreferences: NotificationPreferences;
  securityPreferences: SecurityPreferences;
  metadata: Record<string, unknown>;
}
