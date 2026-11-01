export interface UserPreferences {
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingOptIn: boolean;
}

export interface UpdatePreferencesRequest {
  readonly emailNotifications?: boolean;
  readonly smsNotifications?: boolean;
  readonly pushNotifications?: boolean;
  readonly marketingOptIn?: boolean;
}
