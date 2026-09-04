import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminPreferences } from '@vubon/shared-types';

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

// Admin Preferences Endpoints
export class AdminPreferencesEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin preferences
   * অ্যাডমিন প্রেফারেন্স পাওয়া
   */
  async getPreferences(adminId: string): Promise<AdminPreferences> {
    return this.client.get<AdminPreferences>(`/admin/${adminId}/preferences`);
  }

  /**
   * Update admin preferences
   * অ্যাডমিন প্রেফারেন্স আপডেট করা
   */
  async updatePreferences(adminId: string, preferences: Partial<AdminPreferences>): Promise<AdminPreferences> {
    return this.client.patch<AdminPreferences>(`/admin/${adminId}/preferences`, preferences);
  }

  /**
   * Get current admin preferences
   * বর্তমান অ্যাডমিনের প্রেফারেন্স পাওয়া
   */
  async getMyPreferences(): Promise<AdminPreferences> {
    return this.client.get<AdminPreferences>('/admin/me/preferences');
  }

  /**
   * Update current admin preferences
   * বর্তমান অ্যাডমিনের প্রেফারেন্স আপডেট করা
   */
  async updateMyPreferences(preferences: Partial<AdminPreferences>): Promise<AdminPreferences> {
    return this.client.patch<AdminPreferences>('/admin/me/preferences', preferences);
  }

  /**
   * Reset admin preferences
   * অ্যাডমিন প্রেফারেন্স রিসেট করা
   */
  async resetPreferences(adminId: string): Promise<{ success: boolean }> {
    return this.client.delete(`/admin/${adminId}/preferences/reset`);
  }

  /**
   * Get default admin preferences
   * ডিফল্ট অ্যাডমিন প্রেফারেন্স পাওয়া
   */
  async getDefaultPreferences(): Promise<AdminPreferences> {
    return this.client.get<AdminPreferences>('/admin/preferences/default');
  }

  /**
   * Apply default admin preferences
   * ডিফল্ট অ্যাডমিন প্রেফারেন্স প্রয়োগ করা
   */
  async applyDefaultPreferences(adminId: string): Promise<AdminPreferences> {
    return this.client.post<AdminPreferences>(`/admin/${adminId}/preferences/default/apply`);
  }
}
