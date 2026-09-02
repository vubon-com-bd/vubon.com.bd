import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
  };
  display: {
    compact: boolean;
    showThumbnails: boolean;
    itemsPerPage: number;
  };
  [key: string]: unknown;
}

export interface PreferenceUpdate {
  key: string;
  value: unknown;
}

export class PreferencesEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async getPreferences(): Promise<UserPreferences> {
    return this.client.get<UserPreferences>('/preferences');
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    return this.client.patch<UserPreferences>('/preferences', preferences);
  }

  async getPreference(key: string): Promise<{ key: string; value: unknown }> {
    return this.client.get<{ key: string; value: unknown }>(`/preferences/${key}`);
  }

  async updatePreference(key: string, value: unknown): Promise<{ key: string; value: unknown }> {
    return this.client.patch<{ key: string; value: unknown }>(`/preferences/${key}`, { value });
  }

  async resetPreferences(): Promise<{ success: boolean }> {
    return this.client.delete('/preferences/reset');
  }

  async resetPreference(key: string): Promise<{ success: boolean }> {
    return this.client.delete(`/preferences/${key}/reset`);
  }

  async getDefaultPreferences(): Promise<UserPreferences> {
    return this.client.get<UserPreferences>('/preferences/default');
  }

  async applyDefaultPreferences(): Promise<UserPreferences> {
    return this.client.post<UserPreferences>('/preferences/default/apply');
  }
}
