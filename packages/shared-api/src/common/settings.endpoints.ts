import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminSettings } from '@vubon/shared-types';

export interface Setting {
  key: string;
  value: unknown;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  group: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsUpdate {
  key: string;
  value: unknown;
}

export interface SettingsCategory {
  name: string;
  settings: Setting[];
}

export class SettingsEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async getAllSettings(): Promise<Setting[]> {
    return this.client.get<Setting[]>('/settings');
  }

  async getSettingsByGroup(group: string): Promise<Setting[]> {
    return this.client.get<Setting[]>(`/settings/${group}`);
  }

  async getSetting(key: string): Promise<Setting> {
    return this.client.get<Setting>(`/settings/${key}`);
  }

  async updateSetting(key: string, value: unknown): Promise<Setting> {
    return this.client.patch<Setting>(`/settings/${key}`, { value });
  }

  async updateSettings(updates: SettingsUpdate[]): Promise<Setting[]> {
    return this.client.patch<Setting[]>('/settings', { updates });
  }

  async getSettingsCategories(): Promise<SettingsCategory[]> {
    return this.client.get<SettingsCategory[]>('/settings/categories');
  }

  async resetSetting(key: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/settings/${key}/reset`);
  }

  async resetSettingsByGroup(group: string): Promise<{ success: boolean; count: number }> {
    return this.client.delete(`/settings/group/${group}/reset`);
  }

  async getPublicSettings(): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>('/settings/public');
  }
}

// Admin Settings Endpoints
export class AdminSettingsEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin settings
   * অ্যাডমিন সেটিংস পাওয়া
   */
  async getSettings(adminId: string): Promise<AdminSettings[]> {
    return this.client.get<AdminSettings[]>(`/admin/${adminId}/settings`);
  }

  /**
   * Get admin settings by category
   * ক্যাটাগরি অনুযায়ী অ্যাডমিন সেটিংস পাওয়া
   */
  async getSettingsByCategory(adminId: string, category: string): Promise<AdminSettings[]> {
    return this.client.get<AdminSettings[]>(`/admin/${adminId}/settings/category/${category}`);
  }

  /**
   * Get admin setting by key
   * কী দ্বারা অ্যাডমিন সেটিংস পাওয়া
   */
  async getSetting(adminId: string, key: string): Promise<AdminSettings> {
    return this.client.get<AdminSettings>(`/admin/${adminId}/settings/${key}`);
  }

  /**
   * Update admin settings
   * অ্যাডমিন সেটিংস আপডেট করা
   */
  async updateSettings(adminId: string, settings: AdminSettings[]): Promise<AdminSettings[]> {
    return this.client.patch<AdminSettings[]>(`/admin/${adminId}/settings`, { settings });
  }

  /**
   * Update admin setting
   * অ্যাডমিন সেটিংস আপডেট করা
   */
  async updateSetting(adminId: string, key: string, value: unknown): Promise<AdminSettings> {
    return this.client.patch<AdminSettings>(`/admin/${adminId}/settings/${key}`, { value });
  }

  /**
   * Get current admin settings
   * বর্তমান অ্যাডমিনের সেটিংস পাওয়া
   */
  async getMySettings(): Promise<AdminSettings[]> {
    return this.client.get<AdminSettings[]>('/admin/me/settings');
  }

  /**
   * Update current admin settings
   * বর্তমান অ্যাডমিনের সেটিংস আপডেট করা
   */
  async updateMySettings(settings: AdminSettings[]): Promise<AdminSettings[]> {
    return this.client.patch<AdminSettings[]>('/admin/me/settings', { settings });
  }

  /**
   * Reset admin settings
   * অ্যাডমিন সেটিংস রিসেট করা
   */
  async resetSettings(adminId: string, category?: string): Promise<{ success: boolean; count: number }> {
    const url = category
      ? `/admin/${adminId}/settings/category/${category}/reset`
      : `/admin/${adminId}/settings/reset`;
    return this.client.delete(url);
  }
}
