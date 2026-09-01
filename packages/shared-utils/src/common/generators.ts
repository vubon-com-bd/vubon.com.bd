/**
 * Generate Slug
 * স্লাগ তৈরি করা
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Generate SKU
 * এসকেইউ তৈরি করা
 */
export const generateSKU = (productName: string, category: string): string => {
  const prefix = category.slice(0, 3).toUpperCase();
  const random = Math.floor(10000 + Math.random() * 90000);
  const name = productName.slice(0, 3).toUpperCase();

  return `${prefix}-${name}-${random}`;
};

/**
 * Generate Order Number
 * অর্ডার নম্বর তৈরি করা
 */
export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${year}-${month}${day}-${random}`;
};

/**
 * Generate Invoice Number
 * ইনভয়েস নম্বর তৈরি করা
 */
export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(10000 + Math.random() * 90000);

  return `INV-${year}${month}${day}-${random}`;
};

/**
 * Generate OTP
 * ওটিপি তৈরি করা
 */
export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

/**
 * Generate Random String
 * র্যান্ডম স্ট্রিং তৈরি করা
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

/**
 * Generate Transaction ID
 * ট্রানজেকশন আইডি তৈরি করা
 */
export const generateTransactionId = (prefix: string = 'TXN'): string => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Generate Reference Number
 * রেফারেন্স নম্বর তৈরি করা
 */
export const generateReferenceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(10000 + Math.random() * 90000);

  return `REF-${year}${month}${day}-${random}`;
};

/**
 * Generate Unique ID
 * ইউনিক আইডি তৈরি করা
 */
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Generate Coupon Code
 * কুপন কোড তৈরি করা
 */
export const generateCouponCode = (prefix: string = 'CPN'): string => {
  const random = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `${prefix}-${random}`;
};
