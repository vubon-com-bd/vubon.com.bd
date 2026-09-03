import { ROLES, STATUS } from '@vubon/shared-constants';
import { Address } from './address';

/**
 * User
 * ইউজার টাইপ
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  status:
    typeof STATUS.ACTIVE | typeof STATUS.INACTIVE | typeof STATUS.PENDING | typeof STATUS.SUSPENDED;
  username?: string;
  avatar?: string;
  bio?: string;
  addresses?: Address[];
  isVerified: boolean;
  isLocked: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Create Input
 * ইউজার তৈরি করার জন্য ইনপুট
 */
export interface UserCreateInput {
  email: string;
  name: string;
  phone?: string;
  username?: string;
  password?: string;
  role?: string;
  status?: string;
}

/**
 * User Update Input
 * ইউজার আপডেট করার জন্য ইনপুট
 */
export interface UserUpdateInput {
  email?: string;
  name?: string;
  phone?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  role?: string;
  status?: string;
  isVerified?: boolean;
  isLocked?: boolean;
}

/**
 * User with Profile
 * প্রোফাইল সহ ইউজার
 */
export interface UserWithProfile extends User {
  profile: {
    fullName: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    nid?: string;
    birthRegistration?: string;
    occupation?: string;
    company?: string;
  };
}

/**
 * Vendor User
 * ভেন্ডর ইউজার
 */
export interface VendorUser extends User {
  shopName: string;
  shopDescription: string;
  shopLogo?: string;
  shopBanner?: string;
  shopAddress: Address;
  isVerified: boolean;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  commissionRate: number;
}
