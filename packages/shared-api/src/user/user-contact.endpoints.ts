/**
 * User Contact Endpoints
 * ইউজার কন্টাক্ট এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserContact, UserContactCreateInput, UserContactUpdateInput } from '@vubon/shared-types';
import { USER_CONTACT } from '@vubon/shared-constants';

export class UserContactEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all contacts
   * সব কন্টাক্ট পাওয়া
   */
  async getContacts(userId: string): Promise<UserContact[]> {
    return this.client.get<UserContact[]>(`/users/${userId}/contacts`);
  }

  /**
   * Get current user contacts
   * বর্তমান ইউজারের কন্টাক্ট পাওয়া
   */
  async getMyContacts(): Promise<UserContact[]> {
    return this.client.get<UserContact[]>('/users/me/contacts');
  }

  /**
   * Get contact by ID
   * আইডি দ্বারা কন্টাক্ট পাওয়া
   */
  async getContact(contactId: string): Promise<UserContact> {
    return this.client.get<UserContact>(`/users/contacts/${contactId}`);
  }

  /**
   * Create contact
   * কন্টাক্ট তৈরি করা
   */
  async createContact(data: UserContactCreateInput): Promise<UserContact> {
    return this.client.post<UserContact>('/users/contacts', data);
  }

  /**
   * Update contact
   * কন্টাক্ট আপডেট করা
   */
  async updateContact(contactId: string, data: UserContactUpdateInput): Promise<UserContact> {
    return this.client.patch<UserContact>(`/users/contacts/${contactId}`, data);
  }

  /**
   * Delete contact
   * কন্টাক্ট ডিলিট করা
   */
  async deleteContact(contactId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/contacts/${contactId}`);
  }

  /**
   * Set primary contact
   * প্রাইমারি কন্টাক্ট সেট করা
   */
  async setPrimaryContact(contactId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/contacts/${contactId}/primary`);
  }

  /**
   * Verify contact
   * কন্টাক্ট ভেরিফাই করা
   */
  async verifyContact(contactId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/contacts/${contactId}/verify`);
  }

  /**
   * Get contacts by type
   * টাইপ অনুযায়ী কন্টাক্ট পাওয়া
   */
  async getContactsByType(userId: string, type: string): Promise<UserContact[]> {
    return this.client.get<UserContact[]>(`/users/${userId}/contacts/type/${type}`);
  }

  /**
   * Validate contact
   * কন্টাক্ট ভ্যালিডেট করা
   */
  async validateContact(
    contact: UserContactCreateInput
  ): Promise<{ valid: boolean; errors: string[] }> {
    return this.client.post<{ valid: boolean; errors: string[] }>(
      '/users/contacts/validate',
      contact
    );
  }

  /**
   * Get contact types from constants
   * কনস্ট্যান্ট থেকে কন্টাক্ট টাইপ পাওয়া
   */
  getContactTypes(): Record<string, string> {
    return {
      EMAIL: USER_CONTACT.TYPES.EMAIL,
      PHONE: USER_CONTACT.TYPES.PHONE,
      MOBILE: USER_CONTACT.TYPES.MOBILE,
      WHATSAPP: USER_CONTACT.TYPES.WHATSAPP,
      VIBER: USER_CONTACT.TYPES.VIBER,
      TELEGRAM: USER_CONTACT.TYPES.TELEGRAM,
      MESSENGER: USER_CONTACT.TYPES.MESSENGER,
      SOCIAL: USER_CONTACT.TYPES.SOCIAL,
      WEBSITE: USER_CONTACT.TYPES.WEBSITE,
      OTHER: USER_CONTACT.TYPES.OTHER,
    };
  }

  /**
   * Get social platforms from constants
   * কনস্ট্যান্ট থেকে সোশ্যাল প্ল্যাটফর্ম পাওয়া
   */
  getSocialPlatforms(): Record<string, string> {
    return USER_CONTACT.SOCIAL_PLATFORMS;
  }

  /**
   * Get visibility options from constants
   * কনস্ট্যান্ট থেকে ভিসিবিলিটি অপশন পাওয়া
   */
  getVisibilityOptions(): Record<string, string> {
    return USER_CONTACT.VISIBILITY;
  }
}
