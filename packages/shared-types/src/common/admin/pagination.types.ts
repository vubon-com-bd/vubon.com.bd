// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
// (কোনটি প্রয়োজন নেই)

/**
 * অ্যাডমিন পেজিনেশন প্যারামিটার টাইপ
 */
export interface AdminPaginationParams {
  /** পেজ নম্বর (ডিফল্ট: 1) */
  page?: number;
  /** প্রতি পেজে আইটেম সংখ্যা (ডিফল্ট: 10) */
  limit?: number;
  /** সাজানোর ক্ষেত্র */
  sortBy?: string;
  /** সাজানোর ক্রম */
  sortOrder?: 'asc' | 'desc';
}

/**
 * অ্যাডমিন পেজিনেশন মেটা টাইপ
 */
export interface AdminPaginationMeta {
  /** বর্তমান পেজ */
  page: number;
  /** প্রতি পেজে আইটেম সংখ্যা */
  limit: number;
  /** মোট আইটেম সংখ্যা */
  total: number;
  /** মোট পেজ সংখ্যা */
  totalPages: number;
  /** পরবর্তী পেজ আছে কিনা */
  hasNextPage: boolean;
  /** পূর্ববর্তী পেজ আছে কিনা */
  hasPrevPage: boolean;
}

/**
 * অ্যাডমিন পেজিনেটেড রেসপন্স টাইপ
 */
export interface AdminPaginatedResponse<T> {
  /** আইটেমের তালিকা */
  items: T[];
  /** পেজিনেশন মেটা ডেটা */
  meta: AdminPaginationMeta;
}
