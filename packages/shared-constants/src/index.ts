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

// 4. কমন মডিউল (শুধুমাত্র non-conflicting items)
export * from './common';

// 5. Analytics Reporting মডিউল (নেমস্পেসে)
export * as AnalyticsReporting from './analytics-reporting';

// 6. Flash Sales Deals মডিউল (নেমস্পেসে)
export * as FlashSalesDeals from './Flash-Sales-Deals';

// 7. Content Marketing মডিউল (নেমস্পেসে)
export * as ContentMarketing from './Content-Marketing';

// 8. Logistics মডিউল
export * as logistics from './logistics';

// ভেন্ডার মডিউল
export * as vebdor from './vendor';

// 2. search-discovery  মডিউল (কোন কনফ্লিক্ট নেই)
export * as searchdiscovery from './search-discovery';

// 2. অথেনটিকেশন মডিউল (কোন কনফ্লিক্ট নেই)
export * from './checkout';
