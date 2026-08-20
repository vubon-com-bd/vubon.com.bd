// ============================================
// Export all modules with namespaces
// to avoid naming conflicts
// ============================================

// 1. নোটিফিকেশন মডিউল (কোন কনফ্লিক্ট নেই)
export * as Notification from './notification';

// 2. অথেনটিকেশন মডিউল (কোন কনফ্লিক্ট নেই)
export * as authentication from './authentication';

// 3. SEO AI মডিউল (কোন কনফ্লিক্ট নেই)
export * as seoai from './seo-ai';

// 4. কমন মডিউল (শুধুমাত্র non-conflicting items)
export * as common from './common';

// 5. Analytics Reporting মডিউল (নেমস্পেসে)
export * as AnalyticsReporting from './analytics-reporting';

// 6. Flash Sales Deals মডিউল (নেমস্পেসে)
export * as FlashSalesDeals from './Flash-Sales-Deals';

// 7. Content Marketing মডিউল (নেমস্পেসে)
export * as ContentMarketing from './Content-Marketing';

// 8. Logistics মডিউল
export * as logistics from './logistics';

// 9. vendor  ভেন্ডার মডিউল
export * as vendor from './vendor';

// 10. search-discovery মডিউল (কোন কনফ্লিক্ট নেই)
export * as searchdiscovery from './search-discovery';

// 11. checkout মডিউল (কোন কনফ্লিক্ট নেই)
export * as checkout from './checkout';

// 12. cart মডিউল (কোন কনফ্লিক্ট নেই)
export * as cart from './cart';

// 13. product মডিউল (কোন কনফ্লিক্ট নেই)
export * product from './product';

// 14. admin মডিউল (কোন কনফ্লিক্ট নেই)
export * as admin from './admin';
