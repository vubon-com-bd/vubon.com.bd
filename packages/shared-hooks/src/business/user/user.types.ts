export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone?: string;
  readonly avatarUrl?: string;
  readonly bio?: string;
}

export interface UserSettings {
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly theme: 'light' | 'dark' | 'system';
}

export interface UserPreferences {
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingOptIn: boolean;
}

export interface UserAddress {
  readonly id: string;
  readonly label: string;
  readonly line1: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly isDefault: boolean;
}

export type KycStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export interface UserActivityEntry {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly createdAt: string;
}
