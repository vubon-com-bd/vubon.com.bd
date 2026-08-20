// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই - AUDIT_ID_PREFIX ইমপোর্ট করতে হবে না)

// 3. প্রকল্পের অন্য ফাইল
// (কোনটি প্রয়োজন নেই)

/**
 * অ্যাডমিন অডিট লগ টাইপ
 */
export interface AdminAuditLog {
  /** অডিট লগের অনন্য আইডি */
  id: string;
  /** ইউজার আইডি */
  userId: string;
  /** সম্পাদিত অ্যাকশন */
  action: string;
  /** রিসোর্সের নাম */
  resource: string;
  /** রিসোর্স আইডি (ঐচ্ছিক) */
  resourceId?: string;
  /** পরিবর্তনের বিবরণ (ঐচ্ছিক) */
  changes?: Record<string, unknown>;
  /** আইপি ঠিকানা (ঐচ্ছিক) */
  ipAddress?: string;
  /** ইউজার এজেন্ট (ঐচ্ছিক) */
  userAgent?: string;
  /** টাইমস্ট্যাম্প */
  timestamp: string;
}

/**
 * অ্যাডমিন অডিট ফিল্টার টাইপ
 */
export interface AdminAuditFilter {
  /** ইউজার আইডি দ্বারা ফিল্টার */
  userId?: string;
  /** অ্যাকশন দ্বারা ফিল্টার */
  action?: string;
  /** রিসোর্স দ্বারা ফিল্টার */
  resource?: string;
  /** শুরু তারিখ দ্বারা ফিল্টার */
  fromDate?: string;
  /** শেষ তারিখ দ্বারা ফিল্টার */
  toDate?: string;
}
