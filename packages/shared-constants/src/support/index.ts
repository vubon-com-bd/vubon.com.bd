/**
 * Support Constants Index
 * Export all support constants and types for easy importing
 */

// Support Constants
export {
  SUPPORT,
  supportGetSLAHours,
  supportIsWithinBusinessHours,
  supportGetChannelLabel,
} from './support.constants';

export type { SupportType, SupportChannel, SupportSLA, SupportLanguage } from './support.constants';

// Support Permission Constants
export {
  SUPPORT_PERMISSION,
  supportPermissionGetRoleLabel,
  supportPermissionGetActionLabel,
  supportPermissionGetLevelLabel,
  supportPermissionGetScopeLabel,
  supportPermissionHasPermission,
  supportPermissionGetRolePermissions,
  supportPermissionGetAllRolePermissions,
} from './support-permission.constants';

export type {
  SupportPermissionModule,
  SupportPermissionAction,
  SupportPermissionRole,
  SupportPermissionLevel,
  SupportPermissionScope,
} from './support-permission.constants';

// Support Error Constants
export {
  SUPPORT_ERROR,
  supportErrorGetMessage,
  supportErrorGetCategory,
  supportErrorGetSeverity,
  supportErrorIsRetryable,
  supportErrorGetHttpStatus,
} from './support-error.constants';

export type {
  SupportErrorCode,
  SupportErrorCategory,
  SupportErrorSeverity,
} from './support-error.constants';

// Ticket Constants
export * from './ticket';

// Conversation Constants
export * from './conversation';

// knowledge-base Constants
export * from './knowledge-base';

// support-feedback Constants
export * from './support-feedback';

// support-faq Constants
export * from './support-faq';

// Conversation Constants
export * from './conversation';

// survey Constants
export * from './survey';

// live-chat Constants
export * from './live-chat';

// chatbot Constants
export * from './chatbot';

// complaint Constants
export * from './complaint';

// Conversation Constants
export * from './conversation';

// support-team Constants
export * from './support-team';

// support-report Constants
export * from './support-report';

// support-sla Constants
export * from './support-sla';

// support-schedule Constants
export * from './support-schedule';

// support-rule Constants
export * from './support-rule';

// support-automation Constants
export * from './support-automation';

// support-template Constants
export * from './support-template';

// support-script Constants
export * from './support-script';

// support-email Constants
export * from './support-email';

// support-sms Constants
export * from './support-sms';

// support-push Constants
export * from './support-push';
