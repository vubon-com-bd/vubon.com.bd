/**
 * ID Generator
 * আইডি জেনারেটর
 */
export const idGenerator = {
  /**
   * Generate UUID v4
   * ইউইউআইডি ভি৪ তৈরি করা
   */
  uuid: (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
   * Generate short ID
   * শর্ট আইডি তৈরি করা
   */
  shortId: (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  },

  /**
   * Generate numeric ID
   * নিউমেরিক আইডি তৈরি করা
   */
  numericId: (length: number = 10): string => {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  },

  /**
   * Generate timestamp ID
   * টাইমস্ট্যাম্প আইডি তৈরি করা
   */
  timestampId: (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  },

  /**
   * Generate order ID
   * অর্ডার আইডি তৈরি করা
   */
  orderId: (prefix: string = 'ORD'): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${year}${month}${day}-${random}`;
  },

  /**
   * Generate invoice ID
   * ইনভয়েস আইডি তৈরি করা
   */
  invoiceId: (prefix: string = 'INV'): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(10000 + Math.random() * 90000);

    return `${prefix}-${year}${month}${day}-${random}`;
  },

  /**
   * Generate transaction ID
   * ট্রানজেকশন আইডি তৈরি করা
   */
  transactionId: (prefix: string = 'TXN'): string => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${timestamp}-${random}`;
  },

  /**
   * Generate reference ID
   * রেফারেন্স আইডি তৈরি করা
   */
  referenceId: (prefix: string = 'REF'): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(10000 + Math.random() * 90000);

    return `${prefix}-${year}${month}${day}-${random}`;
  },

  /**
   * Generate OTP
   * ওটিপি তৈরি করা
   */
  otp: (length: number = 6): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  },

  /**
   * Generate verification code
   * ভেরিফিকেশন কোড তৈরি করা
   */
  verificationCode: (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  },

  /**
   * Generate coupon code
   * কুপন কোড তৈরি করা
   */
  couponCode: (prefix: string = 'CPN', length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${prefix}-${code}`;
  },

  /**
   * Generate tracking number
   * ট্র্যাকিং নম্বর তৈরি করা
   */
  trackingNumber: (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let tracking = '';
    for (let i = 0; i < 12; i++) {
      tracking += chars[Math.floor(Math.random() * chars.length)];
    }
    return tracking;
  },

  /**
   * Generate random string
   * র্যান্ডম স্ট্রিং তৈরি করা
   */
  randomString: (length: number = 10): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  },
};
