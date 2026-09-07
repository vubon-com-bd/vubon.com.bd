export interface AuthNotificationPreferences {
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
  notificationPreferences: AuthNotificationPreferences;
  securityPreferences: SecurityPreferences;
  metadata: Record<string, unknown>;
}
