/**
 * Cart Guest Endpoints
 * কার্ট গেস্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CART } from '@vubon/shared-constants';
import type { CartGuest } from '@vubon/shared-types';

// CART কনস্ট্যান্ট থেকে সোর্স এবং ডিফল্ট মান ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart/guest';

export const cartGuestEndpoints = {
  create: `${BASE_PATH}`,
  link: `${BASE_PATH}/link`,
  extend: `${BASE_PATH}/extend`,
  get: (sessionId: string) => `${BASE_PATH}/${sessionId}`,
  cleanup: `${BASE_PATH}/cleanup`,
} as const;

// CART টাইপ ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type CartGuestResponse = {
  guest: CartGuest;
  sessionId: string;
  expiresAt: string;
  source: keyof typeof CART.SOURCE;
};

export type CartGuestLinkResponse = {
  success: boolean;
  userId: string;
  cartMerged: boolean;
  source: keyof typeof CART.SOURCE;
};

export type CartGuestEndpointKey = keyof typeof cartGuestEndpoints;
