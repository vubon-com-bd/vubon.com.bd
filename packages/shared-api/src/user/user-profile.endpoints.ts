/**
 * User Profile Endpoints
 * ইউজার প্রোফাইল এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserProfile, UserProfileCreateInput, UserProfileUpdateInput } from '@vubon/shared-types';
import { USER_PROFILE } from '@vubon/shared-constants';

export class UserProfileEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user profile
   * ইউজার প্রোফাইল পাওয়া
   */
  async getProfile(userId: string): Promise<UserProfile> {
    return this.client.get<UserProfile>(`/users/${userId}/profile`);
  }

  /**
   * Get current user profile
   * বর্তমান ইউজারের প্রোফাইল পাওয়া
   */
  async getMyProfile(): Promise<UserProfile> {
    return this.client.get<UserProfile>('/users/me/profile');
  }

  /**
   * Create user profile
   * ইউজার প্রোফাইল তৈরি করা
   */
  async createProfile(data: UserProfileCreateInput): Promise<UserProfile> {
    return this.client.post<UserProfile>('/users/profile', data);
  }

  /**
   * Update user profile
   * ইউজার প্রোফাইল আপডেট করা
   */
  async updateProfile(userId: string, data: UserProfileUpdateInput): Promise<UserProfile> {
    return this.client.patch<UserProfile>(`/users/${userId}/profile`, data);
  }

  /**
   * Update current user profile
   * বর্তমান ইউজারের প্রোফাইল আপডেট করা
   */
  async updateMyProfile(data: UserProfileUpdateInput): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/users/me/profile', data);
  }

  /**
   * Upload profile avatar
   * প্রোফাইল অ্যাভাটার আপলোড করা
   */
  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.client.post<{ avatar: string }>('/users/me/profile/avatar', formData);
  }

  /**
   * Upload profile cover
   * প্রোফাইল কভার আপলোড করা
   */
  async uploadCover(file: File): Promise<{ cover: string }> {
    const formData = new FormData();
    formData.append('cover', file);
    return this.client.post<{ cover: string }>('/users/me/profile/cover', formData);
  }

  /**
   * Remove profile avatar
   * প্রোফাইল অ্যাভাটার রিমুভ করা
   */
  async removeAvatar(): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>('/users/me/profile/avatar');
  }

  /**
   * Remove profile cover
   * প্রোফাইল কভার রিমুভ করা
   */
  async removeCover(): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>('/users/me/profile/cover');
  }

  /**
   * Update profile visibility
   * প্রোফাইল ভিসিবিলিটি আপডেট করা
   */
  async updateVisibility(visibility: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/users/me/profile/visibility', { visibility });
  }

  /**
   * Get profile visibility options from constants
   * কনস্ট্যান্ট থেকে প্রোফাইল ভিসিবিলিটি অপশন পাওয়া
   */
  getVisibilityOptions(): Record<string, string> {
    return {
      PUBLIC: USER_PROFILE.VISIBILITY.PUBLIC,
      PRIVATE: USER_PROFILE.VISIBILITY.PRIVATE,
      CONTACTS: USER_PROFILE.VISIBILITY.CONTACTS,
      FRIENDS: USER_PROFILE.VISIBILITY.FRIENDS,
      CUSTOM: USER_PROFILE.VISIBILITY.CUSTOM,
    };
  }

  /**
   * Get gender options from constants
   * কনস্ট্যান্ট থেকে জেন্ডার অপশন পাওয়া
   */
  getGenderOptions(): Record<string, string> {
    return {
      MALE: USER_PROFILE.GENDER.MALE,
      FEMALE: USER_PROFILE.GENDER.FEMALE,
      OTHER: USER_PROFILE.GENDER.OTHER,
      PREFER_NOT_TO_SAY: USER_PROFILE.GENDER.PREFER_NOT_TO_SAY,
    };
  }

  /**
   * Get relationship options from constants
   * কনস্ট্যান্ট থেকে রিলেশনশিপ অপশন পাওয়া
   */
  getRelationshipOptions(): Record<string, string> {
    return {
      SINGLE: USER_PROFILE.RELATIONSHIP.SINGLE,
      MARRIED: USER_PROFILE.RELATIONSHIP.MARRIED,
      DIVORCED: USER_PROFILE.RELATIONSHIP.DIVORCED,
      WIDOWED: USER_PROFILE.RELATIONSHIP.WIDOWED,
      IN_RELATIONSHIP: USER_PROFILE.RELATIONSHIP.IN_RELATIONSHIP,
      ENGAGED: USER_PROFILE.RELATIONSHIP.ENGAGED,
      COMPLICATED: USER_PROFILE.RELATIONSHIP.COMPLICATED,
    };
  }
}
