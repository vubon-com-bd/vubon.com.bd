// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
// (কোনটি প্রয়োজন নেই)

/**
 * অ্যাডমিন SEO মেটাডেটা টাইপ
 */
export interface AdminSeoMetadata {
  /** পেজের শিরোনাম */
  title: string;
  /** পেজের বিবরণ */
  description: string;
  /** কীওয়ার্ডসমূহ (ঐচ্ছিক) */
  keywords?: string[];
  /** ওপেন গ্রাফ শিরোনাম (ঐচ্ছিক) */
  ogTitle?: string;
  /** ওপেন গ্রাফ বিবরণ (ঐচ্ছিক) */
  ogDescription?: string;
  /** ওপেন গ্রাফ ইমেজ (ঐচ্ছিক) */
  ogImage?: string;
  /** টুইটার কার্ড টাইপ (ঐচ্ছিক) */
  twitterCard?: string;
  /** ক্যানোনিকাল URL (ঐচ্ছিক) */
  canonicalUrl?: string;
  /** রোবটস মেটা ট্যাগ (ঐচ্ছিক) */
  robots?: string;
}

/**
 * অ্যাডমিন SEO পেজ টাইপ
 */
export interface AdminSeoPage {
  /** পেজের অনন্য আইডি */
  id: string;
  /** পেজের পাথ */
  path: string;
  /** SEO মেটাডেটা */
  metadata: AdminSeoMetadata;
  /** শেষ আপডেটের সময় */
  updatedAt: string;
}
