/**
 * In-App Constants
 * Core in-app notification configuration and settings
 */

export const NOTIFICATIONINAPP = {
  // In-App Types
  TYPES: {
    ALERT: 'alert',
    BANNER: 'banner',
    TOAST: 'toast',
    SNACKBAR: 'snackbar',
    MODAL: 'modal',
    DRAWER: 'drawer',
    POPOVER: 'popover',
    TOOLTIP: 'tooltip',
    BADGE: 'badge',
    CUSTOM: 'custom',
  } as const,

  // In-App Categories
  CATEGORIES: {
    SYSTEM: 'system',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    MARKETING: 'marketing',
    SOCIAL: 'social',
    ALERT: 'alert',
    REMINDER: 'reminder',
    ENGAGEMENT: 'engagement',
    CUSTOM: 'custom',
  } as const,

  // In-App Positions
  POSITIONS: {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center',
    TOP_LEFT: 'top_left',
    TOP_RIGHT: 'top_right',
    BOTTOM_LEFT: 'bottom_left',
    BOTTOM_RIGHT: 'bottom_right',
    CUSTOM: 'custom',
  } as const,

  // In-App Animations
  ANIMATIONS: {
    FADE: 'fade',
    SLIDE: 'slide',
    BOUNCE: 'bounce',
    ZOOM: 'zoom',
    FLIP: 'flip',
    ROTATE: 'rotate',
    NONE: 'none',
    CUSTOM: 'custom',
  } as const,

  // In-App Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'toast',
    DEFAULT_CATEGORY: 'system',
    DEFAULT_POSITION: 'top_right',
    DEFAULT_ANIMATION: 'slide',
    DEFAULT_DURATION: 5000,
    DEFAULT_AUTO_DISMISS: true,
    DEFAULT_PAUSE_ON_HOVER: true,
    DEFAULT_MAX_STACK: 5,
    DEFAULT_WIDTH: 400,
    DEFAULT_HEIGHT: 80,
    MAX_DURATION: 60000,
    MIN_DURATION: 1000,
    DEFAULT_Z_INDEX: 9999,
    DEFAULT_BORDER_RADIUS: 8,
    DEFAULT_SHADOW: true,
    DEFAULT_CLOSE_BUTTON: true,
    DEFAULT_PROGRESS_BAR: false,
  } as const,

  // In-App Limits
  LIMITS: {
    MIN_MESSAGE_LENGTH: 1,
    MAX_MESSAGE_LENGTH: 500,
    MAX_TITLE_LENGTH: 100,
    MAX_STACK: 10,
    MAX_DURATION: 60000,
    MIN_DURATION: 1000,
    MAX_ACTIONS: 3,
    MAX_IMAGES: 1,
    MAX_IMAGE_SIZE_KB: 100,
    MAX_BUTTONS: 3,
    MAX_LINKS: 3,
  } as const,

  // In-App Errors
  ERRORS: {
    RENDER_FAILED: 'render_failed',
    STACK_OVERFLOW: 'stack_overflow',
    INVALID_POSITION: 'invalid_position',
    INVALID_ANIMATION: 'invalid_animation',
    DURATION_ERROR: 'duration_error',
    ACTION_ERROR: 'action_error',
    IMAGE_LOAD_ERROR: 'image_load_error',
  } as const,
} as const;

// In-App Types
export type NotificationInAppType =
  (typeof NOTIFICATIONINAPP.TYPES)[keyof typeof NOTIFICATIONINAPP.TYPES];

// In-App Categories
export type NotificationInAppCategory =
  (typeof NOTIFICATIONINAPP.CATEGORIES)[keyof typeof NOTIFICATIONINAPP.CATEGORIES];

// In-App Positions
export type NotificationInAppPosition =
  (typeof NOTIFICATIONINAPP.POSITIONS)[keyof typeof NOTIFICATIONINAPP.POSITIONS];

// In-App Animations
export type NotificationInAppAnimation =
  (typeof NOTIFICATIONINAPP.ANIMATIONS)[keyof typeof NOTIFICATIONINAPP.ANIMATIONS];

// In-App Defaults
export type NotificationInAppDefault =
  (typeof NOTIFICATIONINAPP.DEFAULTS)[keyof typeof NOTIFICATIONINAPP.DEFAULTS];

// In-App Limits
export type NotificationInAppLimit =
  (typeof NOTIFICATIONINAPP.LIMITS)[keyof typeof NOTIFICATIONINAPP.LIMITS];

// In-App Errors
export type NotificationInAppError =
  (typeof NOTIFICATIONINAPP.ERRORS)[keyof typeof NOTIFICATIONINAPP.ERRORS];

// Utility Functions
export function notificationinappGetTypeLabel(type: NotificationInAppType): string {
  const labels: Record<NotificationInAppType, string> = {
    [NOTIFICATIONINAPP.TYPES.ALERT]: 'Alert',
    [NOTIFICATIONINAPP.TYPES.BANNER]: 'Banner',
    [NOTIFICATIONINAPP.TYPES.TOAST]: 'Toast',
    [NOTIFICATIONINAPP.TYPES.SNACKBAR]: 'Snackbar',
    [NOTIFICATIONINAPP.TYPES.MODAL]: 'Modal',
    [NOTIFICATIONINAPP.TYPES.DRAWER]: 'Drawer',
    [NOTIFICATIONINAPP.TYPES.POPOVER]: 'Popover',
    [NOTIFICATIONINAPP.TYPES.TOOLTIP]: 'Tooltip',
    [NOTIFICATIONINAPP.TYPES.BADGE]: 'Badge',
    [NOTIFICATIONINAPP.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown In-App Type';
}

export function notificationinappGetCategoryLabel(category: NotificationInAppCategory): string {
  const labels: Record<NotificationInAppCategory, string> = {
    [NOTIFICATIONINAPP.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONINAPP.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONINAPP.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONINAPP.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONINAPP.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONINAPP.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONINAPP.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATIONINAPP.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [NOTIFICATIONINAPP.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationinappGetPositionLabel(position: NotificationInAppPosition): string {
  const labels: Record<NotificationInAppPosition, string> = {
    [NOTIFICATIONINAPP.POSITIONS.TOP]: 'Top',
    [NOTIFICATIONINAPP.POSITIONS.BOTTOM]: 'Bottom',
    [NOTIFICATIONINAPP.POSITIONS.LEFT]: 'Left',
    [NOTIFICATIONINAPP.POSITIONS.RIGHT]: 'Right',
    [NOTIFICATIONINAPP.POSITIONS.CENTER]: 'Center',
    [NOTIFICATIONINAPP.POSITIONS.TOP_LEFT]: 'Top Left',
    [NOTIFICATIONINAPP.POSITIONS.TOP_RIGHT]: 'Top Right',
    [NOTIFICATIONINAPP.POSITIONS.BOTTOM_LEFT]: 'Bottom Left',
    [NOTIFICATIONINAPP.POSITIONS.BOTTOM_RIGHT]: 'Bottom Right',
    [NOTIFICATIONINAPP.POSITIONS.CUSTOM]: 'Custom',
  };
  return labels[position] || 'Unknown Position';
}

export function notificationinappGetAnimationLabel(animation: NotificationInAppAnimation): string {
  const labels: Record<NotificationInAppAnimation, string> = {
    [NOTIFICATIONINAPP.ANIMATIONS.FADE]: 'Fade',
    [NOTIFICATIONINAPP.ANIMATIONS.SLIDE]: 'Slide',
    [NOTIFICATIONINAPP.ANIMATIONS.BOUNCE]: 'Bounce',
    [NOTIFICATIONINAPP.ANIMATIONS.ZOOM]: 'Zoom',
    [NOTIFICATIONINAPP.ANIMATIONS.FLIP]: 'Flip',
    [NOTIFICATIONINAPP.ANIMATIONS.ROTATE]: 'Rotate',
    [NOTIFICATIONINAPP.ANIMATIONS.NONE]: 'None',
    [NOTIFICATIONINAPP.ANIMATIONS.CUSTOM]: 'Custom',
  };
  return labels[animation] || 'Unknown Animation';
}

export function notificationinappGetErrorLabel(error: NotificationInAppError): string {
  const labels: Record<NotificationInAppError, string> = {
    [NOTIFICATIONINAPP.ERRORS.RENDER_FAILED]: 'Render Failed',
    [NOTIFICATIONINAPP.ERRORS.STACK_OVERFLOW]: 'Stack Overflow',
    [NOTIFICATIONINAPP.ERRORS.INVALID_POSITION]: 'Invalid Position',
    [NOTIFICATIONINAPP.ERRORS.INVALID_ANIMATION]: 'Invalid Animation',
    [NOTIFICATIONINAPP.ERRORS.DURATION_ERROR]: 'Duration Error',
    [NOTIFICATIONINAPP.ERRORS.ACTION_ERROR]: 'Action Error',
    [NOTIFICATIONINAPP.ERRORS.IMAGE_LOAD_ERROR]: 'Image Load Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationinappGetDefaultDuration(): number {
  return NOTIFICATIONINAPP.DEFAULTS.DEFAULT_DURATION;
}

export function notificationinappGetDefaultMaxStack(): number {
  return NOTIFICATIONINAPP.DEFAULTS.DEFAULT_MAX_STACK;
}

export function notificationinappIsBannerType(type: NotificationInAppType): boolean {
  const bannerTypes: NotificationInAppType[] = [
    NOTIFICATIONINAPP.TYPES.BANNER,
    NOTIFICATIONINAPP.TYPES.TOAST,
    NOTIFICATIONINAPP.TYPES.SNACKBAR,
  ];
  return bannerTypes.includes(type);
}

export function notificationinappIsModalType(type: NotificationInAppType): boolean {
  const modalTypes: NotificationInAppType[] = [
    NOTIFICATIONINAPP.TYPES.MODAL,
    NOTIFICATIONINAPP.TYPES.DRAWER,
    NOTIFICATIONINAPP.TYPES.POPOVER,
  ];
  return modalTypes.includes(type);
}
