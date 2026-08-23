/**
 * Social Marketing Constants Index
 * Export all social marketing constants and types for easy importing
 */

// Social Media Constants
export {
  MARKETINGSOCIAL,
  marketingsocialGetTypeLabel,
  marketingsocialGetCategoryLabel,
  marketingsocialGetPriorityLabel,
  marketingsocialGetContentTypeLabel,
  marketingsocialGetEngagementTypeLabel,
  marketingsocialGetMetricLabel,
  marketingsocialIsPaidType,
  marketingsocialIsOrganicType,
  marketingsocialGetDefaultPostingTime,
  marketingsocialGetDefaultPostFrequency,
  marketingsocialGetDefaultCallToAction,
} from './social-media.constants';

export type {
  MarketingSocialType,
  MarketingSocialCategory,
  MarketingSocialPriority,
  MarketingSocialContentType,
  MarketingSocialEngagementType,
  MarketingSocialMetric,
  MarketingSocialDefault,
  MarketingSocialLimit,
} from './social-media.constants';

// Social Media Platform Constants
export {
  MARKETINGSOCIAL_PLATFORM,
  marketingsocialGetPlatformLabel,
  marketingsocialGetPlatformCategory,
  marketingsocialGetPlatformCharLimit,
  marketingsocialGetPlatformImageSize,
  marketingsocialGetPlatformVideoSpec,
  marketingsocialIsVideoPlatform,
  marketingsocialIsPhotoPlatform,
  marketingsocialGetDefaultPlatform,
} from './social-media-platform.constants';

export type {
  MarketingSocialPlatform,
  MarketingSocialPlatformCategory,
  MarketingSocialPlatformFeature,
  MarketingSocialCharLimit,
  MarketingSocialImageSize,
  MarketingSocialVideoSpec,
  MarketingSocialDemographics,
} from './social-media-platform.constants';

// Social Media Status Constants
export {
  MARKETINGSOCIAL_STATUS,
  marketingsocialGetStatusLabel,
  marketingsocialGetStatusColor,
  marketingsocialGetStatusCategory,
  marketingsocialIsPublished,
  marketingsocialIsActive,
  marketingsocialIsPending,
  marketingsocialCanTransition,
} from './social-media-status.constants';

export type {
  MarketingSocialStatusType,
  MarketingSocialStatusColor,
  MarketingSocialStatusCategory,
  MarketingSocialStatusOrder,
  MarketingSocialStatusTransition,
} from './social-media-status.constants';

// Social Media Post Type Constants
export {
  MARKETINGSOCIAL_POST,
  marketingsocialGetPostTypeLabel,
  marketingsocialGetPostFormatLabel,
  marketingsocialGetPostPurposeLabel,
  marketingsocialGetPostCTALabel,
  marketingsocialGetPostFrequencyLabel,
  marketingsocialIsEngagementPost,
  marketingsocialIsPromotionalPost,
  marketingsocialGetMaxImagesPerPost,
  marketingsocialGetDefaultPostType,
  marketingsocialGetDefaultPostCTA,
} from './social-media-post-type.constants';

export type {
  MarketingSocialPostType,
  MarketingSocialPostFormat,
  MarketingSocialPostPurpose,
  MarketingSocialPostCTA,
  MarketingSocialPostFrequency,
  MarketingSocialPostDefault,
  MarketingSocialPostLimit,
} from './social-media-post-type.constants';
