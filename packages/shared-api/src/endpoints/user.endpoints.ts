/**
 * User API endpoint paths.
 * @module shared-api/endpoints/user
 */

export const USER_ENDPOINTS = {
  LIST: '/users',
  CREATE: '/users',
  GET: (userId: string) => `/users/${userId}`,
  UPDATE: (userId: string) => `/users/${userId}`,
  DELETE: (userId: string) => `/users/${userId}`,
  ME: '/users/me',
  PROFILE: (userId: string) => `/users/${userId}/profile`,
  SETTINGS: '/users/me/settings',
  PREFERENCES: '/users/me/preferences',
  ACTIVITY: (userId: string) => `/users/${userId}/activity`,
  LOGS: (userId: string) => `/users/${userId}/logs`,
  KYC: (userId: string) => `/users/${userId}/kyc`,
  KYC_SUBMIT: '/users/me/kyc',
  ADDRESSES: '/users/me/addresses',
  ADDRESS: (addressId: string) => `/users/me/addresses/${addressId}`,
  CONTACTS: '/users/me/contacts',
  CONTACT: (contactId: string) => `/users/me/contacts/${contactId}`,
  VERIFICATIONS: '/users/me/verifications',
  VERIFICATION: (verificationId: string) => `/users/me/verifications/${verificationId}`,
  ROLES: (userId: string) => `/users/${userId}/roles`,
  PERMISSIONS: (userId: string) => `/users/${userId}/permissions`,
  ANALYTICS: (userId: string) => `/users/${userId}/analytics`,
} as const;
