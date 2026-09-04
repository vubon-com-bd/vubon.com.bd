/**
 * Admin Profile Types
 * অ্যাডমিন প্রোফাইল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export interface AdminProfile extends BaseEntity {
  adminId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  position?: string;
  phone?: string;
  email?: string;
  timezone?: string;
  language?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  metadata?: Record<string, unknown>;
}

export interface AdminProfileCreateInput {
  adminId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  position?: string;
  phone?: string;
  email?: string;
  timezone?: string;
  language?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  metadata?: Record<string, unknown>;
}

// UpdateInput Partial ব্যবহার
export type AdminProfileUpdateInput = Partial<AdminProfileCreateInput>;
