/**
 * Auth Biometric Endpoints
 * প্রমীকরণ বায়োমেট্রিক এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AuthBiometric,
  AuthBiometricCreateInput,
  AuthBiometricVerifyInput,
} from '@vubon/shared-types';

export class AuthBiometricEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get biometric devices
   * বায়োমেট্রিক ডিভাইস লিস্ট পাওয়া
   */
  async getBiometricDevices(): Promise<AuthBiometric[]> {
    return this.client.get<AuthBiometric[]>('/auth/biometric/devices');
  }

  /**
   * Register biometric device
   * বায়োমেট্রিক ডিভাইস রেজিস্টার করা
   */
  async registerBiometricDevice(data: AuthBiometricCreateInput): Promise<AuthBiometric> {
    return this.client.post<AuthBiometric>('/auth/biometric/devices', data);
  }

  /**
   * Verify biometric
   * বায়োমেট্রিক ভেরিফাই করা
   */
  async verifyBiometric(data: AuthBiometricVerifyInput): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>('/auth/biometric/verify', data);
  }

  /**
   * Delete biometric device
   * বায়োমেট্রিক ডিভাইস ডিলিট করা
   */
  async deleteBiometricDevice(deviceId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/biometric/devices/${deviceId}`);
  }

  /**
   * Enable biometric
   * বায়োমেট্রিক ইন্যাবল করা
   */
  async enableBiometric(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/biometric/devices/${deviceId}/enable`);
  }

  /**
   * Disable biometric
   * বায়োমেট্রিক ডিসেবল করা
   */
  async disableBiometric(deviceId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/biometric/devices/${deviceId}/disable`);
  }

  /**
   * Get supported biometric types
   * সাপোর্টেড বায়োমেট্রিক টাইপ পাওয়া
   */
  async getSupportedBiometricTypes(): Promise<{ types: string[] }> {
    return this.client.get<{ types: string[] }>('/auth/biometric/supported-types');
  }
}
