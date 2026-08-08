// packages/backend-service/src/auth/module/domain/ports/notification-sender.port.ts

// ✅ Shared types
import type { Email } from '../value-objects/email.vo';

/**
 * Notification channel types
 */
export type NotificationChannel = 'email' | 'sms' | 'push' | 'in_app' | 'webhook';

/**
 * Notification priority levels
 */
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Notification options interface
 */
export interface NotificationOptions {
  /** Recipient identifier (email, phone number, device token, or user ID) */
  recipient: string | Email;
  /** Notification channel to use */
  channel: NotificationChannel;
  /** Notification subject (for email) or title (for push) */
  subject?: string;
  /** Notification message body */
  message: string;
  /** HTML version of the message (for email) */
  html?: string;
  /** Notification priority */
  priority?: NotificationPriority;
  /** Additional metadata for tracking or template rendering */
  metadata?: Record<string, unknown>;
  /** Delay in milliseconds before sending (optional) */
  delayMs?: number;
  /** Whether to send immediately or queue for later */
  sendImmediately?: boolean;
}

/**
 * Notification result interface
 */
export interface NotificationResult {
  /** Whether the notification was sent successfully */
  success: boolean;
  /** Notification ID from the service provider */
  notificationId?: string;
  /** Error message if sending failed */
  error?: string;
  /** Channel used for sending */
  channel: NotificationChannel;
  /** Additional data from the service provider */
  data?: Record<string, unknown>;
}

/**
 * SMS options interface
 */
export interface SmsOptions {
  /** Recipient phone number (E.164 format) */
  phoneNumber: string;
  /** SMS message body */
  message: string;
  /** Sender ID (optional, service-dependent) */
  senderId?: string;
  /** Additional metadata for tracking */
  metadata?: Record<string, unknown>;
}

/**
 * Push notification options interface
 */
export interface PushNotificationOptions {
  /** Device token or registration ID */
  deviceToken: string;
  /** Notification title */
  title: string;
  /** Notification body */
  body: string;
  /** Additional data for the push notification */
  data?: Record<string, unknown>;
  /** Sound to play (optional) */
  sound?: string;
  /** Badge count (optional) */
  badge?: number;
  /** Deep link URL (optional) */
  deepLink?: string;
  /** Platform-specific options */
  platformOptions?: {
    /** iOS-specific options */
    ios?: {
      /** APNs priority */
      priority?: 'high' | 'low';
      /** Critical alert sound */
      criticalSound?: string;
      /** Interruption level */
      interruptionLevel?: 'active' | 'passive' | 'time-sensitive' | 'critical';
    };
    /** Android-specific options */
    android?: {
      /** FCM priority */
      priority?: 'high' | 'normal';
      /** Notification channel ID */
      channelId?: string;
      /** Click action */
      clickAction?: string;
    };
  };
}

/**
 * Notification Sender Port Interface
 *
 * ডোমেইন লেয়ারকে নোটিফিকেশন পাঠানোর সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার SMS, Push Notification, In-App Notification ইত্যাদি পাঠানোর অনুরোধ করতে পারে।
 */
export interface INotificationSender {
  /**
   * একটি নোটিফিকেশন পাঠায়
   * @param options - নোটিফিকেশন অপশন
   * @returns নোটিফিকেশন পাঠানোর ফলাফল
   */
  sendNotification(options: NotificationOptions): Promise<NotificationResult>;

  /**
   * একাধিক নোটিফিকেশন পাঠায়
   * @param optionsArray - নোটিফিকেশন অপশনের অ্যারে
   * @returns নোটিফিকেশন পাঠানোর ফলাফলের অ্যারে
   */
  sendMultipleNotifications(optionsArray: NotificationOptions[]): Promise<NotificationResult[]>;

  /**
   * একটি এসএমএস পাঠায়
   * @param options - এসএমএস অপশন
   * @returns নোটিফিকেশন পাঠানোর ফলাফল
   */
  sendSms(options: SmsOptions): Promise<NotificationResult>;

  /**
   * একটি পুশ নোটিফিকেশন পাঠায়
   * @param options - পুশ নোটিফিকেশন অপশন
   * @returns নোটিফিকেশন পাঠানোর ফলাফল
   */
  sendPushNotification(options: PushNotificationOptions): Promise<NotificationResult>;

  /**
   * একটি টেমপ্লেট নোটিফিকেশন পাঠায়
   * @param templateName - টেমপ্লেটের নাম
   * @param templateData - টেমপ্লেটের ডেটা
   * @param recipient - প্রাপকের ঠিকানা (ইমেইল, ফোন নম্বর, ডিভাইস টোকেন, বা ইউজার আইডি)
   * @param channel - নোটিফিকেশন চ্যানেল
   * @param options - অতিরিক্ত নোটিফিকেশন অপশন (optional)
   * @returns নোটিফিকেশন পাঠানোর ফলাফল
   */
  sendTemplateNotification(
    templateName: string,
    templateData: Record<string, unknown>,
    recipient: string | Email,
    channel: NotificationChannel,
    options?: Partial<Omit<NotificationOptions, 'recipient' | 'channel' | 'message'>>
  ): Promise<NotificationResult>;

  /**
   * একটি নোটিফিকেশন বাতিল করে (যদি কিউ করা থাকে)
   * @param notificationId - নোটিফিকেশন আইডি
   * @returns বাতিল সফল হলে true, না হলে false
   */
  cancelNotification(notificationId: string): Promise<boolean>;

  /**
   * একটি নোটিফিকেশনের স্ট্যাটাস চেক করে
   * @param notificationId - নোটিফিকেশন আইডি
   * @returns নোটিফিকেশনের বর্তমান স্ট্যাটাস
   */
  getNotificationStatus(notificationId: string): Promise<{
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'cancelled';
    timestamp: Date;
    error?: string;
  }>;
}
