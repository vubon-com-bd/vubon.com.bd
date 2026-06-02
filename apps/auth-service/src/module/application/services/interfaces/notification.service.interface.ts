/**
 * Notification Service Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/notification.service.interface
 * 
 * @description
 * Service contract for sending notifications to users.
 * Supports email, SMS, push notifications, and Bangladesh-specific channels (WhatsApp, Imo, Voice).
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ No business logic
 * ✅ No infrastructure imports
 * ✅ Framework-free
 * ✅ Bangladesh specific - WhatsApp, Imo, Voice Call support
 */

// ============================================================
// Phase-1: Import from shared-constants and shared-types
// ============================================================

// ✅ Import from shared-constants
import {
  NOTIFICATION_TEMPLATES,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITIES,
  NOTIFICATION_CHANNELS,
  LOCALES,
} from '@vubon/shared-constants';

// ✅ Import types from shared-types
import type {
  Locale,
  NotificationType as SharedNotificationType,
  NotificationPriority as SharedNotificationPriority,
  NotificationChannel as SharedNotificationChannel,
} from '@vubon/shared-types';

// ============================================================
// Notification Types (Re-export from shared-constants for convenience)
// ============================================================

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  WHATSAPP = 'whatsapp',      // Bangladesh specific
  IMO = 'imo',                // Bangladesh specific
  VOICE = 'voice',            // Voice call for feature phones
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum NotificationChannel {
  // Authentication
  WELCOME = 'welcome',
  VERIFICATION = 'verification',
  PASSWORD_RESET = 'password_reset',
  PASSWORD_CHANGED = 'password_changed',
  MFA_ENABLED = 'mfa_enabled',
  MFA_DISABLED = 'mfa_disabled',
  MFA_CODE = 'mfa_code',
  
  // Account Changes
  EMAIL_CHANGED = 'email_changed',
  PHONE_CHANGED = 'phone_changed',
  
  // Security
  ACCOUNT_LOCKED = 'account_locked',
  ACCOUNT_UNLOCKED = 'account_unlocked',
  LOGIN_ALERT = 'login_alert',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  ACCOUNT_DELETED = 'account_deleted',
  
  // Transactional (Bangladesh specific)
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  ORDER_CONFIRMATION = 'order_confirmation',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  REFUND_PROCESSED = 'refund_processed',
  
  // Promotional
  PROMOTION = 'promotion',
  NEWSLETTER = 'newsletter',
  OFFER_AVAILABLE = 'offer_available',
  
  // OTP
  OTP_SMS = 'otp_sms',
  OTP_WHATSAPP = 'otp_whatsapp',    // Bangladesh specific
  OTP_IMO = 'otp_imo',              // Bangladesh specific
  OTP_VOICE = 'otp_voice',          // Voice OTP for feature phones
}

// ============================================================
// Notification Data Interfaces
// ============================================================

export interface WelcomeEmailData {
  name: string;
  nameBn?: string;                    // Bengali name
  appName?: string;
  appNameBn?: string;
  loginUrl?: string;
  supportEmail?: string;
  supportPhone?: string;              // Bangladesh specific
  whatsappSupport?: string;           // Bangladesh specific
}

export interface VerificationEmailData {
  code: string;
  expiresInMinutes?: number;
  appName?: string;
  appNameBn?: string;
}

export interface PasswordResetEmailData {
  resetLink: string;
  expiresInHours?: number;
  appName?: string;
  appNameBn?: string;
}

export interface PasswordChangedData {
  deviceName?: string;
  location?: string;
  locationBn?: string;                // Bengali location
  time?: Date;
  ipAddress?: string;
}

export interface MfaCodeData {
  code: string;
  expiresInMinutes?: number;
  appName?: string;
  appNameBn?: string;
  method: 'sms' | 'whatsapp' | 'imo' | 'voice' | 'email';
}

export interface MfaEnabledData {
  mfaType: string;
  mfaTypeBn?: string;
  deviceName?: string;
  enabledAt: Date;
  ipAddress?: string;
}

export interface MfaDisabledData {
  mfaType: string;
  mfaTypeBn?: string;
  disabledBy: 'user' | 'admin';
  disabledAt: Date;
  ipAddress?: string;
}

export interface EmailChangedData {
  oldEmail: string;
  newEmail: string;
  changedAt: Date;
  ipAddress?: string;
  deviceName?: string;
}

export interface PhoneChangedData {
  oldPhone: string;
  newPhone: string;
  changedAt: Date;
  ipAddress?: string;
  deviceName?: string;
}

export interface AccountLockedData {
  reason: string;
  reasonBn?: string;
  lockDurationMinutes: number;
  lockedAt: Date;
  remainingAttempts?: number;
  unlockMethod: 'time' | 'email' | 'support';
}

export interface AccountUnlockedData {
  unlockedAt: Date;
  unlockedBy: 'user' | 'admin' | 'auto';
  unlockMethod: string;
}

export interface LoginAlertData {
  ipAddress: string;
  location?: string;
  locationBn?: string;
  deviceName?: string;
  browser?: string;
  os?: string;
  loginTime: Date;
  isNewDevice: boolean;
  isNewLocation: boolean;
  loginMethod: 'email' | 'phone' | 'social' | 'otp';
  isSuspicious: boolean;
}

export interface SuspiciousActivityData {
  activityType: string;
  activityTypeBn?: string;
  description: string;
  descriptionBn?: string;
  ipAddress?: string;
  deviceId?: string;
  detectedAt: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction?: string;
  recommendedActionBn?: string;
  supportLink?: string;
}

export interface AccountDeletedData {
  deletionTime: Date;
  retentionDays: number;
  reactivationDeadline: Date;
  canReactivate: boolean;
}

// ============================================================
// Payment Notification Data (Bangladesh specific)
// ============================================================

export interface PaymentSuccessData {
  amount: number;
  currency: string;
  transactionId: string;
  orderId: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
  paymentTime: Date;
  merchantName?: string;
}

export interface PaymentFailedData {
  amount: number;
  currency: string;
  transactionId?: string;
  orderId: string;
  paymentMethod: string;
  failureReason: string;
  failureReasonBn?: string;
  paymentTime: Date;
  retryLink?: string;
}

export interface OrderConfirmationData {
  orderId: string;
  orderDate: Date;
  totalAmount: number;
  itemsCount: number;
  estimatedDeliveryDate?: Date;
  trackingUrl?: string;
}

export interface OrderShippedData {
  orderId: string;
  shippedAt: Date;
  carrierName: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDeliveryDate: Date;
}

export interface OrderDeliveredData {
  orderId: string;
  deliveredAt: Date;
  deliveredTo: string;
  deliveredImage?: string;
  feedbackLink?: string;
}

export interface RefundProcessedData {
  orderId: string;
  refundAmount: number;
  refundMethod: string;
  refundTime: Date;
  estimatedTimeDays?: number;
}

// ============================================================
// Notification Options (Using shared types)
// ============================================================

export interface NotificationOptions {
  type: SharedNotificationType;
  priority?: SharedNotificationPriority;
  channel: SharedNotificationChannel;
  to: string;                           // Email address or phone number
  subject?: string;
  subjectBn?: string;                   // Bengali subject
  template?: string;
  data: Record<string, unknown>;
  locale?: Locale;                      // ✅ Using shared Locale type
  metadata?: {
    userId?: string;
    correlationId?: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
  };
  retryCount?: number;
  delaySeconds?: number;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  errorBn?: string;
  sentAt: Date;
  channel: SharedNotificationChannel;
  provider?: string;                    // 'sendgrid', 'twilio', 'whatsapp_business', etc.
  deliveryStatus?: 'queued' | 'sent' | 'delivered' | 'failed' | 'read';
}

// ============================================================
// Template Names (Using shared-constants)
// ============================================================

export const NotificationTemplates = {
  // Email templates
  WELCOME_EMAIL: NOTIFICATION_TEMPLATES.WELCOME_EMAIL,
  VERIFICATION_EMAIL: NOTIFICATION_TEMPLATES.VERIFICATION_EMAIL,
  PASSWORD_RESET_EMAIL: NOTIFICATION_TEMPLATES.PASSWORD_RESET_EMAIL,
  PASSWORD_CHANGED_EMAIL: NOTIFICATION_TEMPLATES.PASSWORD_CHANGED_EMAIL,
  LOGIN_ALERT_EMAIL: NOTIFICATION_TEMPLATES.LOGIN_ALERT_EMAIL,
  ACCOUNT_LOCKED_EMAIL: NOTIFICATION_TEMPLATES.ACCOUNT_LOCKED_EMAIL,
  ACCOUNT_UNLOCKED_EMAIL: NOTIFICATION_TEMPLATES.ACCOUNT_UNLOCKED_EMAIL,
  
  // SMS templates
  OTP_SMS: NOTIFICATION_TEMPLATES.OTP_SMS,
  LOGIN_ALERT_SMS: NOTIFICATION_TEMPLATES.LOGIN_ALERT_SMS,
  ACCOUNT_LOCKED_SMS: NOTIFICATION_TEMPLATES.ACCOUNT_LOCKED_SMS,
  
  // WhatsApp templates (Bangladesh specific)
  OTP_WHATSAPP: NOTIFICATION_TEMPLATES.OTP_WHATSAPP,
  ORDER_CONFIRMATION_WHATSAPP: NOTIFICATION_TEMPLATES.ORDER_CONFIRMATION_WHATSAPP,
  PAYMENT_SUCCESS_WHATSAPP: NOTIFICATION_TEMPLATES.PAYMENT_SUCCESS_WHATSAPP,
  
  // Imo templates (Bangladesh specific)
  OTP_IMO: NOTIFICATION_TEMPLATES.OTP_IMO,
  
  // Voice templates (Bangladesh specific - feature phones)
  OTP_VOICE: NOTIFICATION_TEMPLATES.OTP_VOICE,
} as const;

// ============================================================
// Notification Service Interface
// ============================================================

export interface NotificationService {
  // ============================================================
  // Authentication Notifications
  // ============================================================
  
  /**
   * Send welcome email to new user
   */
  sendWelcomeEmail(
    userId: string,
    email: string,
    name: string,
    nameBn?: string,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send email verification code
   */
  sendVerificationEmail(
    userId: string,
    email: string,
    code: string,
    expiresInMinutes?: number,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send password reset email
   */
  sendPasswordResetEmail(
    userId: string,
    email: string,
    resetLink: string,
    expiresInHours?: number,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send password changed notification
   */
  sendPasswordChangedNotification(
    userId: string,
    email: string,
    data?: PasswordChangedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  // ============================================================
  // MFA Notifications
  // ============================================================
  
  /**
   * Send MFA code via specified channel
   */
  sendMfaCode(
    userId: string,
    destination: string,
    code: string,
    method: 'sms' | 'whatsapp' | 'imo' | 'voice' | 'email',
    expiresInMinutes?: number,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send MFA enabled notification
   */
  sendMfaEnabledNotification(
    userId: string,
    email: string,
    data: MfaEnabledData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send MFA disabled notification
   */
  sendMfaDisabledNotification(
    userId: string,
    email: string,
    data: MfaDisabledData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  // ============================================================
  // Account Change Notifications
  // ============================================================
  
  /**
   * Send email changed notification
   */
  sendEmailChangedNotification(
    userId: string,
    email: string,
    data: EmailChangedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send phone changed notification
   */
  sendPhoneChangedNotification(
    userId: string,
    email: string,
    phone: string,
    data: PhoneChangedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  // ============================================================
  // Security Notifications
  // ============================================================
  
  /**
   * Send account locked notification
   */
  sendAccountLockedNotification(
    userId: string,
    email: string,
    data: AccountLockedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send account unlocked notification
   */
  sendAccountUnlockedNotification(
    userId: string,
    email: string,
    data: AccountUnlockedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send login alert notification
   */
  sendLoginAlert(
    userId: string,
    email: string,
    data: LoginAlertData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send suspicious activity alert
   */
  sendSuspiciousActivityAlert(
    userId: string,
    email: string,
    data: SuspiciousActivityData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send account deleted notification
   */
  sendAccountDeletedNotification(
    userId: string,
    email: string,
    data: AccountDeletedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  // ============================================================
  // Payment Notifications (Bangladesh specific)
  // ============================================================
  
  /**
   * Send payment success notification
   */
  sendPaymentSuccessNotification(
    userId: string,
    email: string,
    phone: string,
    data: PaymentSuccessData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send payment failed notification
   */
  sendPaymentFailedNotification(
    userId: string,
    email: string,
    phone: string,
    data: PaymentFailedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send order confirmation notification
   */
  sendOrderConfirmation(
    userId: string,
    email: string,
    data: OrderConfirmationData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send order shipped notification
   */
  sendOrderShipped(
    userId: string,
    email: string,
    data: OrderShippedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send order delivered notification
   */
  sendOrderDelivered(
    userId: string,
    email: string,
    data: OrderDeliveredData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  /**
   * Send refund processed notification
   */
  sendRefundProcessed(
    userId: string,
    email: string,
    data: RefundProcessedData,
    metadata?: { correlationId?: string; ipAddress?: string; locale?: Locale }
  ): Promise<void>;

  // ============================================================
  // Bulk & Management Operations
  // ============================================================
  
  /**
   * Send bulk notifications
   */
  sendBulk(
    notifications: NotificationOptions[]
  ): Promise<NotificationResult[]>;

  /**
   * Get notification status
   */
  getNotificationStatus(messageId: string): Promise<{
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
    deliveredAt?: Date;
    readAt?: Date;
    error?: string;
    provider?: string;
  }>;

  /**
   * Check notification service health
   */
  healthCheck(): Promise<{
    healthy: boolean;
    services: {
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
      imo: boolean;
      voice: boolean;
      push: boolean;
    };
    latency: {
      email: number;
      sms: number;
      whatsapp: number;
      imo: number;
    };
  }>;

  /**
   * Resend failed notification
   */
  resendNotification(messageId: string): Promise<NotificationResult>;

  /**
   * Cancel pending notification
   */
  cancelNotification(messageId: string): Promise<boolean>;

  /**
   * Get notification history for user
   */
  getUserNotificationHistory(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<{
    notifications: Array<{
      id: string;
      channel: SharedNotificationChannel;
      type: SharedNotificationType;
      subject: string;
      sentAt: Date;
      status: string;
      readAt?: Date;
    }>;
    total: number;
  }>;
}

// ============================================================
// Type Guards
// ============================================================

export function isNotificationResult(obj: unknown): obj is NotificationResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    'sentAt' in obj &&
    'channel' in obj
  );
}

// ============================================================
// Factory function for creating notification options
// ============================================================

export function createNotificationOptions(
  channel: SharedNotificationChannel,
  to: string,
  data: Record<string, unknown>,
  options?: Partial<NotificationOptions>,
): NotificationOptions {
  return {
    type: NotificationType.EMAIL,
    priority: NotificationPriority.NORMAL,
    channel,
    to,
    data,
    ...options,
  };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  WelcomeEmailData as WelcomeEmailDataType,
  VerificationEmailData as VerificationEmailDataType,
  PasswordResetEmailData as PasswordResetEmailDataType,
  PasswordChangedData as PasswordChangedDataType,
  MfaCodeData as MfaCodeDataType,
  MfaEnabledData as MfaEnabledDataType,
  MfaDisabledData as MfaDisabledDataType,
  EmailChangedData as EmailChangedDataType,
  PhoneChangedData as PhoneChangedDataType,
  AccountLockedData as AccountLockedDataType,
  AccountUnlockedData as AccountUnlockedDataType,
  LoginAlertData as LoginAlertDataType,
  SuspiciousActivityData as SuspiciousActivityDataType,
  AccountDeletedData as AccountDeletedDataType,
  PaymentSuccessData as PaymentSuccessDataType,
  PaymentFailedData as PaymentFailedDataType,
  OrderConfirmationData as OrderConfirmationDataType,
  OrderShippedData as OrderShippedDataType,
  OrderDeliveredData as OrderDeliveredDataType,
  RefundProcessedData as RefundProcessedDataType,
  NotificationOptions as NotificationOptionsType,
  NotificationResult as NotificationResultType,
};

// Re-export shared types for convenience
export type { Locale, SharedNotificationType, SharedNotificationPriority, SharedNotificationChannel };
