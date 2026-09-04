/**
 * Admin Device Endpoints
 * অ্যাডমিন ডিভাইস এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminDevice, AdminDeviceCreateInput, AdminDeviceUpdateInput } from '@vubon/shared-types';
import { ADMIN_DEVICE } from '@vubon/shared-constants';

export class AdminDeviceEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin devices
   * অ্যাডমিনের ডিভাইস পাওয়া
   */
  async getDevices(adminId: string): Promise<AdminDevice[]> {
    return this.client.get<AdminDevice[]>(`/admin/${adminId}/devices`);
  }

  /**
   * Get current admin devices
   * বর্তমান অ্যাডমিনের ডিভাইস পাওয়া
   */
  async getMyDevices(): Promise<AdminDevice[]> {
    return this.client.get<AdminDevice[]>('/admin/me/devices');
  }

  /**
   * Get device by ID
   * আইডি দ্বারা ডিভাইস পাওয়া
   */
  async getDevice(deviceId: string): Promise<AdminDevice> {
    return this.client.get<AdminDevice>(`/admin/devices/${deviceId}`);
  }

  /**
   * Register device
   * ডিভাইস রেজিস্টার করা
   */
  async registerDevice(data: AdminDeviceCreateInput): Promise<AdminDevice> {
    return this.client.post<AdminDevice>('/admin/devices', data);
  }

  /**
   * Update device
   * ডিভাইস আপডেট করা
   */
  async updateDevice(deviceId: string, data: AdminDeviceUpdateInput): Promise<AdminDevice> {
    return this.client.patch<AdminDevice>(`/admin/devices/${deviceId}`, data);
  }

  /**
   * Delete device
   * ডিভাইস ডিলিট করা
   */
  async deleteDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/devices/${deviceId}`);
  }

  /**
   * Trust device
   * ডিভাইস ট্রাস্ট করা
   */
  async trustDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/devices/${deviceId}/trust`);
  }

  /**
   * Untrust device
   * ডিভাইস আনট্রাস্ট করা
   */
  async untrustDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/devices/${deviceId}/untrust`);
  }

  /**
   * Get device types from constants
   * কনস্ট্যান্ট থেকে ডিভাইস টাইপ পাওয়া
   */
  getDeviceTypes(): Record<string, string> {
    return {
      DESKTOP: ADMIN_DEVICE.TYPES.DESKTOP,
      LAPTOP: ADMIN_DEVICE.TYPES.LAPTOP,
      TABLET: ADMIN_DEVICE.TYPES.TABLET,
      MOBILE: ADMIN_DEVICE.TYPES.MOBILE,
      SMART_TV: ADMIN_DEVICE.TYPES.SMART_TV,
      SMART_WATCH: ADMIN_DEVICE.TYPES.SMART_WATCH,
      IOT: ADMIN_DEVICE.TYPES.IOT,
      SERVER: ADMIN_DEVICE.TYPES.SERVER,
      API_CLIENT: ADMIN_DEVICE.TYPES.API_CLIENT,
      OTHER: ADMIN_DEVICE.TYPES.OTHER,
    };
  }

  /**
   * Get device statuses from constants
   * কনস্ট্যান্ট থেকে ডিভাইস স্ট্যাটাস পাওয়া
   */
  getDeviceStatuses(): Record<string, string> {
    return {
      TRUSTED: ADMIN_DEVICE.STATUS.TRUSTED,
      UNTRUSTED: ADMIN_DEVICE.STATUS.UNTRUSTED,
      SUSPICIOUS: ADMIN_DEVICE.STATUS.SUSPICIOUS,
      BLOCKED: ADMIN_DEVICE.STATUS.BLOCKED,
      PENDING: ADMIN_DEVICE.STATUS.PENDING,
      EXPIRED: ADMIN_DEVICE.STATUS.EXPIRED,
      REVOKED: ADMIN_DEVICE.STATUS.REVOKED,
    };
  }

  /**
   * Get default device config from constants
   * কনস্ট্যান্ট থেকে ডিফল্ট ডিভাইস কনফিগ পাওয়া
   */
  getDeviceDefaults(): {
    maxDevices: number;
    sessionTimeout: number;
    trustedTokenExpiry: number;
  } {
    return {
      maxDevices: ADMIN_DEVICE.DEFAULTS.MAX_DEVICES,
      sessionTimeout: ADMIN_DEVICE.DEFAULTS.SESSION_TIMEOUT,
      trustedTokenExpiry: ADMIN_DEVICE.DEFAULTS.TRUSTED_TOKEN_EXPIRY,
    };
  }
}
