/**
 * User Address Endpoints
 * ইউজার ঠিকানা এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserAddress, UserAddressCreateInput, UserAddressUpdateInput } from '@vubon/shared-types';
import { USER_ADDRESS } from '@vubon/shared-constants';

export class UserAddressEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all addresses
   * সব ঠিকানা পাওয়া
   */
  async getAddresses(userId: string): Promise<UserAddress[]> {
    return this.client.get<UserAddress[]>(`/users/${userId}/addresses`);
  }

  /**
   * Get current user addresses
   * বর্তমান ইউজারের ঠিকানা পাওয়া
   */
  async getMyAddresses(): Promise<UserAddress[]> {
    return this.client.get<UserAddress[]>('/users/me/addresses');
  }

  /**
   * Get address by ID
   * আইডি দ্বারা ঠিকানা পাওয়া
   */
  async getAddress(addressId: string): Promise<UserAddress> {
    return this.client.get<UserAddress>(`/users/addresses/${addressId}`);
  }

  /**
   * Create address
   * ঠিকানা তৈরি করা
   */
  async createAddress(data: UserAddressCreateInput): Promise<UserAddress> {
    return this.client.post<UserAddress>('/users/addresses', data);
  }

  /**
   * Update address
   * ঠিকানা আপডেট করা
   */
  async updateAddress(addressId: string, data: UserAddressUpdateInput): Promise<UserAddress> {
    return this.client.patch<UserAddress>(`/users/addresses/${addressId}`, data);
  }

  /**
   * Delete address
   * ঠিকানা ডিলিট করা
   */
  async deleteAddress(addressId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/addresses/${addressId}`);
  }

  /**
   * Set default address
   * ডিফল্ট ঠিকানা সেট করা
   */
  async setDefaultAddress(addressId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/addresses/${addressId}/default`);
  }

  /**
   * Get user's default address
   * ইউজারের ডিফল্ট ঠিকানা পাওয়া
   */
  async getDefaultAddress(userId: string): Promise<UserAddress | null> {
    return this.client.get<UserAddress | null>(`/users/${userId}/addresses/default`);
  }

  /**
   * Get addresses by type
   * টাইপ অনুযায়ী ঠিকানা পাওয়া
   */
  async getAddressesByType(userId: string, type: string): Promise<UserAddress[]> {
    return this.client.get<UserAddress[]>(`/users/${userId}/addresses/type/${type}`);
  }

  /**
   * Validate address
   * ঠিকানা ভ্যালিডেট করা
   */
  async validateAddress(
    address: UserAddressCreateInput
  ): Promise<{ valid: boolean; errors: string[] }> {
    return this.client.post<{ valid: boolean; errors: string[] }>(
      '/users/addresses/validate',
      address
    );
  }

  /**
   * Get address types from constants
   * কনস্ট্যান্ট থেকে ঠিকানা টাইপ পাওয়া
   */
  getAddressTypes(): Record<string, string> {
    return {
      SHIPPING: USER_ADDRESS.TYPES.SHIPPING,
      BILLING: USER_ADDRESS.TYPES.BILLING,
      BOTH: USER_ADDRESS.TYPES.BOTH,
      OFFICE: USER_ADDRESS.TYPES.OFFICE,
      HOME: USER_ADDRESS.TYPES.HOME,
      OTHER: USER_ADDRESS.TYPES.OTHER,
    };
  }

  /**
   * Get divisions from constants
   * কনস্ট্যান্ট থেকে ডিভিশন পাওয়া
   */
  getDivisions(): Record<string, string> {
    return USER_ADDRESS.DIVISIONS;
  }

  /**
   * Get countries from constants
   * কনস্ট্যান্ট থেকে দেশ পাওয়া
   */
  getCountries(): Record<string, string> {
    return USER_ADDRESS.COUNTRIES;
  }
}
