/**
 * Customer hooks — app-specific.
 * Layer: App-specific
 * Owner: Customer Team
 */
export { useCustomer } from './use-customer';
export type { CustomerContext } from './use-customer';
export { useWishlist, WISHLIST_QUERY_KEY } from './use-wishlist';
export { useRecentlyViewed } from './use-recently-viewed';
export { useRecommendations } from './use-recommendations';
export type { RecommendationItem } from './use-recommendations';
export { useTrending } from './use-trending';
export type { TrendingItem } from './use-trending';
export { useReviews } from './use-reviews';
export type { CustomerReview, CustomerReviewListResult } from './use-reviews';
export { useLoyalty } from './use-loyalty';
export type { LoyaltyAccount } from './use-loyalty';
export { useNotifications, NOTIFICATIONS_QUERY_KEY } from './use-notifications';
export type { CustomerNotification, NotificationListResult } from './use-notifications';
