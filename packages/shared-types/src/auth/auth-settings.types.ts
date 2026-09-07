export interface AuthSettings {
  userId: string;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiryDays: number;
  mfaEnabled: boolean;
  mfaType?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  metadata: Record<string, unknown>;
}
