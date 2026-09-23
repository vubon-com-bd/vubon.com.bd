export { OwnCampaign, OWN_CAMPAIGN_KEY } from './own-campaign.decorator';
export { AffiliateOnly, AFFILIATE_ONLY_KEY } from './affiliate-only.decorator';
export { AdminOnly, ADMIN_ONLY_KEY } from './admin-only.decorator';
export { TrackAttribution, TRACK_ATTRIBUTION_KEY } from './track-attribution.decorator';

// Re-export kernel decorators
export {
  Public,
  Roles,
  Permissions,
  RateLimit,
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
