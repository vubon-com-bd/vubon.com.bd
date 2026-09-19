export interface UserSettings {
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly theme: 'light' | 'dark' | 'system';
}

export interface UpdateSettingsRequest {
  readonly language?: string;
  readonly timezone?: string;
  readonly currency?: string;
  readonly theme?: 'light' | 'dark' | 'system';
}
