/**
 * Support Push Constants Index
 * Export all support push constants and types for easy importing
 */

// Support Push Constants
export {
  SUPPORT_PUSH,
  supportPushGetTypeLabel,
  supportPushGetStatusLabel,
  supportPushGetPriorityLabel,
  supportPushGetCategoryLabel,
  supportPushGetPlatformLabel,
  supportPushIsSent,
  supportPushIsFailed,
} from './support-push.constants';

export type {
  SupportPushType,
  SupportPushStatus,
  SupportPushPriority,
  SupportPushCategory,
  SupportPushPlatform,
} from './support-push.constants';

// Support Push Type Constants
export {
  SUPPORT_PUSH_TYPE,
  supportPushTypeGetCategoryLabel,
  supportPushTypeGetScopeLabel,
  supportPushTypeGetChannelLabel,
  supportPushTypeGetActionLabel,
  supportPushTypeGetSoundLabel,
  supportPushTypeGetUrgencyLabel,
} from './support-push-type.constants';

export type {
  SupportPushTypeCategory,
  SupportPushTypeScope,
  SupportPushTypeChannel,
  SupportPushTypeAction,
  SupportPushTypeSound,
  SupportPushTypeUrgency,
} from './support-push-type.constants';
