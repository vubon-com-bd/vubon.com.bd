/**
 * Auth Device Endpoints
 * প্রমীকরণ ডিভাইস এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthDevice, AuthDeviceCreateInput, AuthDeviceUpdateInput } from '@vubon/shared-types';

export class AuthDeviceEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get devices
   * ডিভাইস লিস্ট পাওয়া
   */
  async getDevices(): Promise<AuthDevice[]> {
    return this.client.get<AuthDevice[]>('/auth/devices');
  }

  /**
   * Get device by ID
   * আইডি দ্বারা ডিভাইস পাওয়া
   */
  async getDevice(deviceId: string): Promise<AuthDevice> {
    return this.client.get<AuthDevice>(`/auth/devices/${deviceId}`);
  }

  /**
   * Register device
   * ডিভাইস রেজিস্টার করা
   */
  async registerDevice(data: AuthDeviceCreateInput): Promise<AuthDevice> {
    return this.client.post<AuthDevice>('/auth/devices', data);
  }

  /**
   * Update device
   * ডিভাইস আপডেট করা
   */
  async updateDevice(deviceId: string, data: AuthDeviceUpdateInput): Promise<AuthDevice> {
    return this.client.patch<AuthDevice>(`/auth/devices/${deviceId}`, data);
  }

  /**
   * Delete device
   * ডিভাইস ডিলিট করা
   */
  async deleteDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/devices/${deviceId}`);
  }

  /**
   * Trust device
   * ডিভাইস ট্রাস্ট করা
   */
  async trustDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/devices/${deviceId}/trust`);
  }

  /**
   * Untrust device
   * ডিভাইস আনট্রাস্ট করা
   */
  async untrustDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/devices/${deviceId}/untrust`);
  }

  /**
   * Get device fingerprint
   * ডিভাইস ফিঙ্গারপ্রিন্ট পাওয়া
   */
  async getDeviceFingerprint(): Promise<{ fingerprint: string }> {
    return this.client.get<{ fingerprint: string }>('/auth/devices/fingerprint');
  }
}
