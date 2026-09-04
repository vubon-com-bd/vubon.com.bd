/**
 * Admin Profile Endpoints
 * অ্যাডমিন প্রোফাইল এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminProfile,
  AdminProfileCreateInput,
  AdminProfileUpdateInput,
} from '@vubon/shared-types';

export class AdminProfileEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin profile
   * অ্যাডমিন প্রোফাইল পাওয়া
   */
  async getProfile(adminId: string): Promise<AdminProfile> {
    return this.client.get<AdminProfile>(`/admin/${adminId}/profile`);
  }

  /**
   * Get current admin profile
   * বর্তমান অ্যাডমিনের প্রোফাইল পাওয়া
   */
  async getMyProfile(): Promise<AdminProfile> {
    return this.client.get<AdminProfile>('/admin/me/profile');
  }

  /**
   * Create admin profile
   * অ্যাডমিন প্রোফাইল তৈরি করা
   */
  async createProfile(data: AdminProfileCreateInput): Promise<AdminProfile> {
    return this.client.post<AdminProfile>('/admin/profile', data);
  }

  /**
   * Update admin profile
   * অ্যাডমিন প্রোফাইল আপডেট করা
   */
  async updateProfile(adminId: string, data: AdminProfileUpdateInput): Promise<AdminProfile> {
    return this.client.patch<AdminProfile>(`/admin/${adminId}/profile`, data);
  }

  /**
   * Update current admin profile
   * বর্তমান অ্যাডমিনের প্রোফাইল আপডেট করা
   */
  async updateMyProfile(data: AdminProfileUpdateInput): Promise<AdminProfile> {
    return this.client.patch<AdminProfile>('/admin/me/profile', data);
  }

  /**
   * Upload profile avatar
   * প্রোফাইল অ্যাভাটার আপলোড করা
   */
  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.client.post<{ avatar: string }>('/admin/me/profile/avatar', formData);
  }

  /**
   * Upload profile cover
   * প্রোফাইল কভার আপলোড করা
   */
  async uploadCover(file: File): Promise<{ cover: string }> {
    const formData = new FormData();
    formData.append('cover', file);
    return this.client.post<{ cover: string }>('/admin/me/profile/cover', formData);
  }

  /**
   * Remove profile avatar
   * প্রোফাইল অ্যাভাটার রিমুভ করা
   */
  async removeAvatar(): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>('/admin/me/profile/avatar');
  }

  /**
   * Remove profile cover
   * প্রোফাইল কভার রিমুভ করা
   */
  async removeCover(): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>('/admin/me/profile/cover');
  }
}
