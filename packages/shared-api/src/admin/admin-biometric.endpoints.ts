/**
 * Admin Biometric Endpoints
 * অ্যাডমিন বায়োমেট্রিক এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminBiometric,
  AdminBiometricCreateInput,
  AdminBiometricVerifyInput,
} from '@vubon/shared-types';

export class AdminBiometricEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get biometric devices
   * বায়োমেট্রিক ডিভাইস পাওয়া
   */
  async getBiometricDevices(adminId: string): Promise<AdminBiometric[]> {
    return this.client.get<AdminBiometric[]>(`/admin/${adminId}/biometric/devices`);
  }

  /**
   * Get current admin biometric devices
   * বর্তমান অ্যাডমিনের বায়োমেট্রিক ডিভাইস পাওয়া
   */
  async getMyBiometricDevices(): Promise<AdminBiometric[]> {
    return this.client.get<AdminBiometric[]>('/admin/me/biometric/devices');
  }

  /**
   * Register biometric device
   * বায়োমেট্রিক ডিভাইস রেজিস্টার করা
   */
  async registerBiometricDevice(
    adminId: string,
    data: AdminBiometricCreateInput
  ): Promise<AdminBiometric> {
    return this.client.post<AdminBiometric>(`/admin/${adminId}/biometric/devices`, data);
  }

  /**
   * Verify biometric
   * বায়োমেট্রিক ভেরিফাই করা
   */
  async verifyBiometric(
    adminId: string,
    data: AdminBiometricVerifyInput
  ): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>(`/admin/${adminId}/biometric/verify`, data);
  }

  /**
   * Delete biometric device
   * বায়োমেট্রিক ডিভাইস ডিলিট করা
   */
  async deleteBiometricDevice(adminId: string, deviceId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/admin/${adminId}/biometric/devices/${deviceId}`
    );
  }

  /**
   * Enable biometric
   * বায়োমেট্রিক ইন্যাবল করা
   */
  async enableBiometric(adminId: string, deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(
      `/admin/${adminId}/biometric/devices/${deviceId}/enable`
    );
  }

  /**
   * Disable biometric
   * বায়োমেট্রিক ডিসেবল করা
   */
  async disableBiometric(adminId: string, deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(
      `/admin/${adminId}/biometric/devices/${deviceId}/disable`
    );
  }
}
