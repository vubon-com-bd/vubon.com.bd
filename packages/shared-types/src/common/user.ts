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
