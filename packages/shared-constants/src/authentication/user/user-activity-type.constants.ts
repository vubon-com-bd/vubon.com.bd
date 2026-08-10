// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User activity type enum
 */
export const USER_ACTIVITY_TYPE = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  UPDATE_PROFILE: 'update_profile',
  CHANGE_PASSWORD: 'change_password',
  UPDATE_SETTINGS: 'update_settings',
  ADD_ADDRESS: 'add_address',
  UPDATE_ADDRESS: 'update_address',
  DELETE_ADDRESS: 'delete_address',
  ADD_CONTACT: 'add_contact',
  UPDATE_CONTACT: 'update_contact',
  DELETE_CONTACT: 'delete_contact',
  VERIFY_EMAIL: 'verify_email',
  VERIFY_PHONE: 'verify_phone',
  SUBMIT_KYC: 'submit_kyc',
  UPDATE_KYC: 'update_kyc',
  VIEW_PRODUCT: 'view_product',
  ADD_TO_CART: 'add_to_cart',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  RATE_PRODUCT: 'rate_product',
  REVIEW_PRODUCT: 'review_product',
  REPORT_ISSUE: 'report_issue',
  CONTACT_SUPPORT: 'contact_support',
  DOWNLOAD_REPORT: 'download_report',
  EXPORT_DATA: 'export_data',
  DELETE_ACCOUNT: 'delete_account',
} as const;

/**
 * User logged in
 */
export const USER_ACTIVITY_TYPE_LOGIN = USER_ACTIVITY_TYPE.LOGIN;

/**
 * User logged out
 */
export const USER_ACTIVITY_TYPE_LOGOUT = USER_ACTIVITY_TYPE.LOGOUT;

/**
 * User registered
 */
export const USER_ACTIVITY_TYPE_REGISTER = USER_ACTIVITY_TYPE.REGISTER;

/**
 * User updated profile
 */
export const USER_ACTIVITY_TYPE_UPDATE_PROFILE = USER_ACTIVITY_TYPE.UPDATE_PROFILE;

/**
 * User changed password
 */
export const USER_ACTIVITY_TYPE_CHANGE_PASSWORD = USER_ACTIVITY_TYPE.CHANGE_PASSWORD;

/**
 * User updated settings
 */
export const USER_ACTIVITY_TYPE_UPDATE_SETTINGS = USER_ACTIVITY_TYPE.UPDATE_SETTINGS;

/**
 * User added address
 */
export const USER_ACTIVITY_TYPE_ADD_ADDRESS = USER_ACTIVITY_TYPE.ADD_ADDRESS;

/**
 * User updated address
 */
export const USER_ACTIVITY_TYPE_UPDATE_ADDRESS = USER_ACTIVITY_TYPE.UPDATE_ADDRESS;

/**
 * User deleted address
 */
export const USER_ACTIVITY_TYPE_DELETE_ADDRESS = USER_ACTIVITY_TYPE.DELETE_ADDRESS;

/**
 * User added contact
 */
export const USER_ACTIVITY_TYPE_ADD_CONTACT = USER_ACTIVITY_TYPE.ADD_CONTACT;

/**
 * User updated contact
 */
export const USER_ACTIVITY_TYPE_UPDATE_CONTACT = USER_ACTIVITY_TYPE.UPDATE_CONTACT;

/**
 * User deleted contact
 */
export const USER_ACTIVITY_TYPE_DELETE_CONTACT = USER_ACTIVITY_TYPE.DELETE_CONTACT;

/**
 * User verified email
 */
export const USER_ACTIVITY_TYPE_VERIFY_EMAIL = USER_ACTIVITY_TYPE.VERIFY_EMAIL;

/**
 * User verified phone
 */
export const USER_ACTIVITY_TYPE_VERIFY_PHONE = USER_ACTIVITY_TYPE.VERIFY_PHONE;

/**
 * User submitted KYC
 */
export const USER_ACTIVITY_TYPE_SUBMIT_KYC = USER_ACTIVITY_TYPE.SUBMIT_KYC;

/**
 * User updated KYC
 */
export const USER_ACTIVITY_TYPE_UPDATE_KYC = USER_ACTIVITY_TYPE.UPDATE_KYC;

/**
 * User viewed product
 */
export const USER_ACTIVITY_TYPE_VIEW_PRODUCT = USER_ACTIVITY_TYPE.VIEW_PRODUCT;

/**
 * User added to cart
 */
export const USER_ACTIVITY_TYPE_ADD_TO_CART = USER_ACTIVITY_TYPE.ADD_TO_CART;

/**
 * User made a purchase
 */
export const USER_ACTIVITY_TYPE_PURCHASE = USER_ACTIVITY_TYPE.PURCHASE;

/**
 * User requested refund
 */
export const USER_ACTIVITY_TYPE_REFUND = USER_ACTIVITY_TYPE.REFUND;

/**
 * User rated a product
 */
export const USER_ACTIVITY_TYPE_RATE_PRODUCT = USER_ACTIVITY_TYPE.RATE_PRODUCT;

/**
 * User reviewed a product
 */
export const USER_ACTIVITY_TYPE_REVIEW_PRODUCT = USER_ACTIVITY_TYPE.REVIEW_PRODUCT;

/**
 * User reported an issue
 */
export const USER_ACTIVITY_TYPE_REPORT_ISSUE = USER_ACTIVITY_TYPE.REPORT_ISSUE;

/**
 * User contacted support
 */
export const USER_ACTIVITY_TYPE_CONTACT_SUPPORT = USER_ACTIVITY_TYPE.CONTACT_SUPPORT;

/**
 * User downloaded report
 */
export const USER_ACTIVITY_TYPE_DOWNLOAD_REPORT = USER_ACTIVITY_TYPE.DOWNLOAD_REPORT;

/**
 * User exported data
 */
export const USER_ACTIVITY_TYPE_EXPORT_DATA = USER_ACTIVITY_TYPE.EXPORT_DATA;

/**
 * User deleted account
 */
export const USER_ACTIVITY_TYPE_DELETE_ACCOUNT = USER_ACTIVITY_TYPE.DELETE_ACCOUNT;

/**
 * Type for user activity type
 */
export type UserActivityTypeEnum = (typeof USER_ACTIVITY_TYPE)[keyof typeof USER_ACTIVITY_TYPE];
