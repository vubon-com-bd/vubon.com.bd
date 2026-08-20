// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই - adminHTTP_STATUS ইমপোর্ট করতে হবে না)

// 3. প্রকল্পের অন্য ফাইল
// (কোনটি প্রয়োজন নেই)

/**
 * অ্যাডমিন এপিআই রেসপন্স টাইপ
 */
export interface AdminApiResponse<T = unknown> {
  /** অনুরোধ সফল হয়েছে কিনা */
  success: boolean;
  /** HTTP স্ট্যাটাস কোড */
  statusCode: number;
  /** রেসপন্স বার্তা */
  message: string;
  /** রেসপন্স ডেটা (ঐচ্ছিক) */
  data?: T;
  /** ভ্যালিডেশন বা অন্যান্য এরর (ঐচ্ছিক) */
  errors?: Record<string, string[]>;
  /** রেসপন্সের সময় */
  timestamp: string;
}

/**
 * অ্যাডমিন এপিআই এরর টাইপ
 */
export interface AdminApiError {
  /** এরর কোড */
  code: string;
  /** এরর বার্তা */
  message: string;
  /** অতিরিক্ত বিস্তারিত (ঐচ্ছিক) */
  details?: unknown;
}

/**
 * অ্যাডমিন পেজিনেশন মেটা টাইপ
 */
export interface AdminApiMeta {
  /** বর্তমান পেজ */
  page: number;
  /** প্রতি পেজে আইটেম সংখ্যা */
  limit: number;
  /** মোট আইটেম সংখ্যা */
  total: number;
  /** মোট পেজ সংখ্যা */
  totalPages: number;
}
