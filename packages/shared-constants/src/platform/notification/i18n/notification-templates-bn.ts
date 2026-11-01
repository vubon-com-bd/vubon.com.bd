/**
 * Bangla Notification Templates
 * @module shared-constants/platform/notification/i18n
 */

export const NOTIFICATION_TEMPLATES_BN = Object.freeze({
  // ─── Auth ─────────────────────────────────
  WELCOME: {
    subject: 'ভুবনে স্বাগতম!',
    body: 'হ্যালো {{name}}, ভুবন.কম.বিডি-তে আপনাকে স্বাগতম। আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
  },
  EMAIL_VERIFIED: {
    subject: 'ইমেইল যাচাই সম্পন্ন',
    body: 'আপনার ইমেইল সফলভাবে যাচাই হয়েছে। এখন আপনি সব সুবিধা ব্যবহার করতে পারবেন।',
  },
  PASSWORD_RESET: {
    subject: 'পাসওয়ার্ড রিসেট করুন',
    body: 'আপনার পাসওয়ার্ড রিসেট করার জন্য এই লিংকে ক্লিক করুন: {{resetUrl}}। এই লিংক ৩০ মিনিটের জন্য বৈধ।',
  },
  MFA_CODE: {
    subject: 'আপনার ভেরিফিকেশন কোড',
    body: 'আপনার ওয়ান-টাইম পাসওয়ার্ড: {{code}}। এই কোড ৫ মিনিটের জন্য বৈধ।',
  },

  // ─── Order ────────────────────────────────
  ORDER_CREATED: {
    subject: 'অর্ডার কনফার্ম হয়েছে - #{{orderId}}',
    body: 'প্রিয় {{name}}, আপনার অর্ডার #{{orderId}} সফলভাবে গ্রহণ করা হয়েছে। মোট: {{total}} টাকা।',
  },
  ORDER_CONFIRMED: {
    subject: 'অর্ডার নিশ্চিত হয়েছে - #{{orderId}}',
    body: 'আপনার অর্ডার #{{orderId}} নিশ্চিত করা হয়েছে। আমরা শীঘ্রই এটি পাঠানোর জন্য প্রস্তুত করব।',
  },
  ORDER_SHIPPED: {
    subject: 'অর্ডার পাঠানো হয়েছে - #{{orderId}}',
    body: 'আপনার অর্ডার #{{orderId}} পাঠানো হয়েছে। ট্র্যাকিং: {{trackingNumber}}।',
  },
  ORDER_DELIVERED: {
    subject: 'অর্ডার ডেলিভারি সম্পন্ন - #{{orderId}}',
    body: 'আপনার অর্ডার #{{orderId}} সফলভাবে ডেলিভারি করা হয়েছে। ধন্যবাদ!',
  },
  ORDER_CANCELLED: {
    subject: 'অর্ডার বাতিল হয়েছে - #{{orderId}}',
    body: 'আপনার অর্ডার #{{orderId}} বাতিল করা হয়েছে। কারণ: {{reason}}।',
  },

  // ─── Payment ──────────────────────────────
  PAYMENT_RECEIVED: {
    subject: 'পেমেন্ট গ্রহণ করা হয়েছে',
    body: 'আপনার পেমেন্ট {{amount}} টাকা সফলভাবে গ্রহণ করা হয়েছে। ট্রানজেকশন: {{transactionId}}।',
  },
  PAYMENT_FAILED: {
    subject: 'পেমেন্ট ব্যর্থ হয়েছে',
    body: 'দুঃখিত, আপনার পেমেন্ট {{amount}} টাকা ব্যর্থ হয়েছে। কারণ: {{reason}}। আবার চেষ্টা করুন।',
  },
  PAYMENT_REFUNDED: {
    subject: 'রিফান্ড প্রক্রিয়া সম্পন্ন',
    body: 'আপনার {{amount}} টাকার রিফান্ড সফলভাবে প্রক্রিয়া করা হয়েছে।',
  },

  // ─── BD Payment Gateways ──────────────────
  BKASH_PAYMENT_SUCCESS: {
    subject: '',
    body: 'ভুবন: আপনার bKash পেমেন্ট {{amount}} টাকা সফলভাবে সম্পন্ন হয়েছে। TxnID: {{txnId}}। ধন্যবাদ!',
  },
  BKASH_PAYMENT_FAILED: {
    subject: '',
    body: 'ভুবন: আপনার bKash পেমেন্ট {{amount}} টাকা ব্যর্থ হয়েছে। আবার চেষ্টা করুন অথবা ০৯৬১২ ১৬২ ১৬২ নম্বরে কল করুন।',
  },
  NAGAD_PAYMENT_SUCCESS: {
    subject: '',
    body: 'ভুবন: আপনার Nagad পেমেন্ট {{amount}} টাকা সফলভাবে সম্পন্ন হয়েছে। TxnID: {{txnId}}। ধন্যবাদ!',
  },
  NAGAD_PAYMENT_FAILED: {
    subject: '',
    body: 'ভুবন: আপনার Nagad পেমেন্ট {{amount}} টাকা ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
  },
  ROCKET_PAYMENT_SUCCESS: {
    subject: '',
    body: 'ভুবন: আপনার Rocket পেমেন্ট {{amount}} টাকা সফলভাবে সম্পন্ন হয়েছে। TxnID: {{txnId}}।',
  },

  // ─── Delivery ─────────────────────────────
  DELIVERY_SCHEDULED: {
    subject: 'ডেলিভারি নির্ধারিত হয়েছে',
    body: 'আপনার অর্ডার #{{orderId}}-এর ডেলিভারি {{estimatedAt}}-এ নির্ধারিত হয়েছে।',
  },
  DELIVERY_OUT_FOR_DELIVERY: {
    subject: 'আপনার অর্ডার পথে আছে',
    body: 'আপনার অর্ডার #{{orderId}} এখন ডেলিভারির জন্য পথে আছে। শীঘ্রই পৌঁছে যাবে।',
  },
  DELIVERY_DELIVERED: {
    subject: 'ডেলিভারি সম্পন্ন',
    body: 'আপনার অর্ডার #{{orderId}} সফলভাবে ডেলিভারি করা হয়েছে। ধন্যবাদ {{name}}!',
  },
  DELIVERY_FAILED: {
    subject: 'ডেলিভারি ব্যর্থ',
    body: 'আপনার অর্ডার #{{orderId}}-এর ডেলিভারি ব্যর্থ হয়েছে। কারণ: {{reason}}।',
  },

  // ─── Vendor ───────────────────────────────
  VENDOR_APPROVED: {
    subject: 'ভেন্ডর অনুমোদন সম্পন্ন',
    body: 'অভিনন্দন! আপনার ভেন্ডর অ্যাকাউন্ট অনুমোদিত হয়েছে। এখন আপনি পণ্য বিক্রি শুরু করতে পারবেন।',
  },
  VENDOR_SUSPENDED: {
    subject: 'ভেন্ডর অ্যাকাউন্ট স্থগিত',
    body: 'আপনার ভেন্ডর অ্যাকাউন্ট স্থগিত করা হয়েছে। কারণ: {{reason}}। বিস্তারিত জানতে যোগাযোগ করুন।',
  },
  VENDOR_PAYOUT_PROCESSED: {
    subject: 'পেআউট সম্পন্ন হয়েছে',
    body: 'আপনার {{amount}} টাকার পেআউট প্রক্রিয়া সম্পন্ন হয়েছে। TxnID: {{txnId}}।',
  },

  // ─── Cart ─────────────────────────────────
  CART_ABANDONED: {
    subject: 'আপনার কার্টে পণ্য অপেক্ষা করছে!',
    body: 'আপনার কার্টে {{itemCount}} টি পণ্য রয়েছে। এখনই চেকআউট করুন এবং {{discount}} টাকা ছাড় পান!',
  },

  // ─── Product ──────────────────────────────
  REVIEW_POSTED: {
    subject: 'নতুন রিভিউ পেয়েছেন',
    body: 'আপনার পণ্যে একটি নতুন রিভিউ এসেছে: {{rating}}/৫ তারা।',
  },
});
