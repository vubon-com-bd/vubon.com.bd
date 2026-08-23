/**
 * Announcement Constants Index
 * Export all announcement constants and types for easy importing
 */

// Announcement Constants
export {
  CONTENT_ANNOUNCEMENT,
  contentAnnouncementGetTypeLabel,
  contentAnnouncementGetStatusLabel,
  contentAnnouncementGetPriorityLabel,
  contentAnnouncementGetScopeLabel,
  contentAnnouncementGetChannelLabel,
  contentAnnouncementGetTargetLabel,
  contentAnnouncementGetVisibilityLabel,
  contentAnnouncementGetDisplayLabel,
  contentAnnouncementIsPublished,
  contentAnnouncementIsEditable,
  contentAnnouncementIsActive,
  contentAnnouncementGetDefaultStatus,
  contentAnnouncementGetDefaultPriority,
  contentAnnouncementGetDefaultScope,
  contentAnnouncementGetDefaultChannel,
  contentAnnouncementGetDefaultTarget,
  contentAnnouncementGetDefaultDisplay,
  contentAnnouncementGetDefaultDuration,
  contentAnnouncementGetMaxTitleLength,
  contentAnnouncementGetMaxContentLength,
  contentAnnouncementIsValidType,
  contentAnnouncementIsValidStatus,
  contentAnnouncementIsValidPriority,
  contentAnnouncementIsValidScope,
  contentAnnouncementIsValidChannel,
  contentAnnouncementIsValidTarget,
} from './announcement.constants';

export type {
  ContentAnnouncementType,
  ContentAnnouncementStatus,
  ContentAnnouncementPriority,
  ContentAnnouncementScope,
  ContentAnnouncementChannel,
  ContentAnnouncementTarget,
  ContentAnnouncementVisibility,
  ContentAnnouncementDisplay,
} from './announcement.constants';

// Announcement Type Constants
export {
  CONTENT_ANNOUNCEMENT_TYPE,
  contentAnnouncementTypeGetCategoryLabel,
  contentAnnouncementTypeGetSubTypeLabel,
  contentAnnouncementTypeGetFormatLabel,
  contentAnnouncementTypeGetUrgencyLabel,
  contentAnnouncementTypeGetToneLabel,
  contentAnnouncementTypeIsValidCategory,
  contentAnnouncementTypeIsValidFormat,
} from './announcement-type.constants';

export type {
  ContentAnnouncementTypeCategory,
  ContentAnnouncementTypeSubType,
  ContentAnnouncementTypeFormat,
  ContentAnnouncementTypeUrgency,
  ContentAnnouncementTypeTone,
} from './announcement-type.constants';

// Announcement Status Constants
export {
  CONTENT_ANNOUNCEMENT_STATUS,
  contentAnnouncementStatusGetLabel,
  contentAnnouncementStatusGetCategory,
  contentAnnouncementStatusGetColor,
  contentAnnouncementStatusGetPriority,
  contentAnnouncementStatusIsPublished,
  contentAnnouncementStatusIsEditable,
  contentAnnouncementStatusIsActive,
  contentAnnouncementStatusIsArchived,
  contentAnnouncementStatusCanTransitionTo,
  contentAnnouncementStatusGetAvailableTransitions,
  contentAnnouncementStatusGetSequence,
  contentAnnouncementStatusGetStateLabel,
  contentAnnouncementStatusGetActionLabel,
  contentAnnouncementStatusIsValid,
  contentAnnouncementStatusIsValidState,
} from './announcement-status.constants';

export type {
  ContentAnnouncementStatusType,
  ContentAnnouncementStatusCategory,
  ContentAnnouncementStatusColor,
  ContentAnnouncementStatusPriority,
  ContentAnnouncementState,
  ContentAnnouncementAction,
} from './announcement-status.constants';

// Announcement Priority Constants
export {
  CONTENT_ANNOUNCEMENT_PRIORITY,
  contentAnnouncementPriorityGetLevelLabel,
  contentAnnouncementPriorityGetScore,
  contentAnnouncementPriorityGetColor,
  contentAnnouncementPriorityGetIcon,
  contentAnnouncementPriorityGetBadge,
  contentAnnouncementPriorityGetTimeout,
  contentAnnouncementPriorityGetEscalation,
  contentAnnouncementPriorityGetResponseTime,
  contentAnnouncementPriorityGetResolutionTime,
  contentAnnouncementPriorityIsValidLevel,
  contentAnnouncementPriorityGetLevelFromScore,
  contentAnnouncementPriorityGetPriorityForUrgency,
} from './announcement-priority.constants';

export type {
  ContentAnnouncementPriorityLevel,
  ContentAnnouncementPriorityScore,
  ContentAnnouncementPriorityColor,
  ContentAnnouncementPriorityIcon,
  ContentAnnouncementPriorityBadge,
  ContentAnnouncementPriorityTimeout,
  ContentAnnouncementPriorityEscalation,
  ContentAnnouncementPriorityResponseTime,
  ContentAnnouncementPriorityResolutionTime,
} from './announcement-priority.constants';
