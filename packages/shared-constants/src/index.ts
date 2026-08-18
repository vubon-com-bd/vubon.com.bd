// ============================================
// Export all modules with namespaces
// to avoid naming conflicts
// ============================================

// 1. নোটিফিকেশন মডিউল (কোন কনফ্লিক্ট নেই)
export * as Notification from './notification';

// 2. অথেনটিকেশন মডিউল (কোন কনফ্লিক্ট নেই)
export * from './authentication';

// 3. SEO AI মডিউল (কোন কনফ্লিক্ট নেই)
export * from './seo-ai';

// 4. কমন মডিউল (কোন কনফ্লিক্ট নেই)
export * from './common';

// 5. Analytics Reporting মডিউল (নেমস্পেসে)
export * as AnalyticsReporting from './analytics-reporting';

// 6. Flash Sales Deals মডিউল (নেমস্পেসে)
export * as FlashSalesDeals from './Flash-Sales-Deals';

// 7. Content Marketing মডিউল (নেমস্পেসে)
export * as ContentMarketing from './Content-Marketing';

// সাপোর্ট কনস্ট্যান্টস
export * from './support';
