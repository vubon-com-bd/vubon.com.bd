import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

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
