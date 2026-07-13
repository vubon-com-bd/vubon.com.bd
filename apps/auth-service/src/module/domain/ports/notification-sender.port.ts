/**
 * Notification Sender Port - Domain Layer Interface (Enterprise Grade)
 * 
 * @module domain/ports/notification-sender.port
 * 
 * @description
 * Port (interface) for sending notifications across multiple channels.
 * Defines the contract that infrastructure adapters (Email, SMS, WhatsApp, Push, etc.) must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 * 
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Supports multiple channels (Email, SMS, WhatsApp, Push, In-App, Voice)
 * ✅ Bangladesh specific (bKash, Nagad, Rocket, WhatsApp Business)
 * 
 * @example
 * // Domain usage
 * class UserRegistrationService {
 *   constructor(private readonly notificationSender: INotificationSender) {}
 *   
 *   async registerUser(user: User): Promise<void> {
 *     // ... registration logic
 *     await this.notificationSender.sendWelcomeEmail({
 *       to: user.getEmail().getValue(),
 *       fullName: user.getFullName(),
 *       userId: user.id,
 *     });
 *   }
 * }
 * 
 * // Infrastructure implementation
 * class NotificationSenderAdapter implements INotificationSender {
 *   async sendEmail(options: EmailOptions): Promise<NotificationResult> {
 *     // Use Nodemailer, SendGrid, AWS SES, etc.
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Notification channels supported by the system
 */
export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  IMO = 'imo',
  VOICE = 'voice',
  PUSH = 'push',
  IN_APP = 'in_app',
  SLACK = 'slack',
  TELEGRAM = 'telegram',
  WEBHOOK = 'webhook',
}

/**
 * Notification priority levels
 */
export enum NotificationPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

/**
 * Notification status
 */
export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
  BOUNCED = 'bounced',
  BLOCKED = 'blocked',
  SPAM = 'spam',
}

/**
 * Notification type (domain-specific)
 */
export enum NotificationType {
  // Authentication
  WELCOME = 'welcome',
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  PASSWORD_RESET = 'password_reset',
  LOGIN_ALERT = 'login_alert',
  MFA_CODE = 'mfa_code',
  BACKUP_CODE = 'backup_code',
  
  // Account
  ACCOUNT_ACTIVATED = 'account_activated',
  ACCOUNT_SUSPENDED = 'account_suspended',
  ACCOUNT_UNLOCKED = 'account_unlocked',
  ACCOUNT_DELETED = 'account_deleted',
  PROFILE_UPDATED = 'profile_updated',
  EMAIL_CHANGED = 'email_changed',
  PHONE_CHANGED = 'phone_changed',
  PASSWORD_CHANGED = 'password_changed',
  
  // Security
  SUSPICIOUS_LOGIN = 'suspicious_login',
  BRUTE_FORCE_ATTEMPT = 'brute_force_attempt',
  DEVICE_TRUSTED = 'device_trusted',
  DEVICE_UNTRUSTED = 'device_untrusted',
  
  // MFA
  MFA_ENABLED = 'mfa_enabled',
  MFA_DISABLED = 'mfa_disabled',
  MFA_RECOVERY = 'mfa_recovery',
  
  // E-commerce (Bangladesh specific)
  ORDER_CONFIRMATION = 'order_confirmation',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_REFUND = 'payment_refund',
  PAYMENT_VERIFICATION = 'payment_verification',
  CASHBACK_CREDITED = 'cashback_credited',
  DISCOUNT_APPLIED = 'discount_applied',
  
  // MFS (bKash, Nagad, Rocket)
  MFS_OTP = 'mfs_otp',
  MFS_PAYMENT_CONFIRMATION = 'mfs_payment_confirmation',
  MFS_CASHBACK = 'mfs_cashback',
  
  // Promotional (Bangladesh specific)
  PROMOTIONAL = 'promotional',
  NEWSLETTER = 'newsletter',
  PRICE_DROP = 'price_drop',
  BACK_IN_STOCK = 'back_in_stock',
  FLASH_SALE = 'flash_sale',
  FESTIVE_OFFER = 'festive_offer', // Eid, Durga Puja, etc.
  REFERRAL = 'referral',
}

// ============================================================
// Options Types
// ============================================================

/**
 * Base notification options
 */
/**
 * Base notification options
 * ✅ FIXED: priority now uses NotificationPriority enum
 */
export interface NotificationOptions {
  /** Priority level */
  priority?: NotificationPriority | undefined;
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
  /** Send notification immediately (bypass queue) */
  immediate?: boolean | undefined;
  /** Schedule notification for later */
  scheduledAt?: Date | undefined;
  /** Expiry time for time-sensitive notifications */
  expiresAt?: Date | undefined;
  /** Retry count */
  retryCount?: number | undefined;
  /** Metadata for tracking */
  metadata?: Record<string, unknown> | undefined;
  /** Additional recipients (CC/BCC for email) */
  additionalRecipients?: string[] | undefined;
  /** Reply-to address */
  replyTo?: string | undefined;
}

/**
 * Email notification options
 */
export interface EmailOptions extends NotificationOptions {
  /** Sender email address */
  from?: string | undefined;
  /** Reply-to email address */
  replyTo?: string | undefined;
  /** Recipient email address */
  to: string;
  /** CC recipients */
  cc?: string[] | undefined;
  /** BCC recipients */
  bcc?: string[] | undefined;
  /** Email subject */
  subject: string;
  /** HTML content */
  html?: string | undefined;
  /** Plain text content */
  text?: string | undefined;
  /** Template name (if using template system) */
  template?: string | undefined;
  /** Template data */
  templateData?: Record<string, unknown> | undefined;
  /** Attachments */
  attachments?: Array<{
    filename: string;
    content?: string | Buffer | undefined;
    path?: string | undefined;
    contentType?: string | undefined;
  }> | undefined;
  /** Headers */
  headers?: Record<string, string> | undefined;
}

/**
 * SMS notification options (Bangladesh specific)
 */
export interface SMSSOptions extends NotificationOptions {
  /** Recipient phone number (E.164 format) */
  to: string;
  /** Sender ID (optional) */
  from?: string | undefined;
  /** Message content */
  message: string;
  /** Template name (if using template system) */
  template?: string | undefined;
  /** Template data */
  templateData?: Record<string, unknown> | undefined;
  /** Unicode support for Bengali text */
  unicode?: boolean | undefined;
  /** Flash SMS (displays directly on screen) */
  flash?: boolean | undefined;
  /** Long SMS (concatenated messages) */
  long?: boolean | undefined;
  /** Bangladesh operator (for operator-specific routing) */
  operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | undefined;
}

/**
 * WhatsApp notification options (Bangladesh specific)
 */
export interface WhatsAppOptions extends NotificationOptions {
  /** Recipient phone number (E.164 format) */
  to: string;
  /** Sender phone number (WhatsApp Business) */
  from?: string | undefined;
  /** Message text */
  text?: string | undefined;
  /** Template name (required for business API) */
  template: string;
  /** Template data */
  templateData: Record<string, string>;
  /** Media URL */
  mediaUrl?: string | undefined;
  /** Media type (image, video, document, audio) */
  mediaType?: 'image' | 'video' | 'document' | 'audio' | undefined;
  /** Caption for media */
  caption?: string | undefined;
  /** Interactive buttons */
  buttons?: Array<{
    type: 'reply' | 'url' | 'call';
    title: string;
    value?: string | undefined;
  }> | undefined;
  /** List items */
  listItems?: Array<{
    id: string;
    title: string;
    description?: string | undefined;
  }> | undefined;
  /** Footer text */
  footer?: string | undefined;
}

/**
 * Push notification options
 */
export interface PushOptions extends NotificationOptions {
  /** Recipient device token */
  to: string | string[];
  /** Title */
  title: string;
  /** Body */
  body: string;
  /** Data payload */
  data?: Record<string, unknown> | undefined;
  /** Image URL */
  image?: string | undefined;
  /** Badge count */
  badge?: number | undefined;
  /** Sound */
  sound?: string | undefined;
  /** Category (for actions) */
  category?: string | undefined;
  /** Platform-specific options */
  apns?: Record<string, unknown> | undefined;
  fcm?: Record<string, unknown> | undefined;
  /** Android-specific options */
  android?: {
    channelId?: string | undefined;
    priority?: 'high' | 'normal' | undefined;
    ttl?: number | undefined;
  } | undefined;
  /** iOS-specific options */
  ios?: {
    priority?: 'high' | 'normal' | undefined;
    threadId?: string | undefined;
    interruptionLevel?: 'passive' | 'active' | 'time-sensitive' | 'critical' | undefined;
  } | undefined;
}

/**
 * In-app notification options
 */
/**
 * In-app notification options
 * ✅ FIXED: priority now uses NotificationPriority enum
 */
export interface InAppOptions extends NotificationOptions {
  /** Recipient user ID */
  userId: string | string[];
  /** Title */
  title: string;
  /** Message */
  message: string;
  /** Icon */
  icon?: string | undefined;
  /** Action URL */
  actionUrl?: string | undefined;
  /** Action label */
  actionLabel?: string | undefined;
  /** Expiry time */
  expiresAt?: Date | undefined;
  /** Read status (for tracking) */
  read?: boolean | undefined;
  /** Type (info, success, warning, error) */
  type?: 'info' | 'success' | 'warning' | 'error' | undefined;
  /** Priority (now using NotificationPriority enum) */
  priority?: NotificationPriority | undefined;
  /** Dismissible */
  dismissible?: boolean | undefined;
}

/**
 * MFS notification options (bKash, Nagad, Rocket - Bangladesh specific)
 */
export interface MFSOptions extends NotificationOptions {
  /** Recipient phone number (E.164 format) */
  to: string;
  /** MFS provider */
  provider: 'bkash' | 'nagad' | 'rocket';
  /** Transaction ID */
  transactionId?: string | undefined;
  /** Amount */
  amount?: number | undefined;
  /** Reference number */
  reference?: string | undefined;
  /** PIN for verification (send separately) */
  pin?: string | undefined;
  /** Template name */
  template: string;
  /** Template data */
  templateData: Record<string, string>;
  /** Language (en/bn) */
  language?: 'en' | 'bn' | undefined;
}

/**
 * Voice call options (for OTP - Bangladesh specific)
 */
export interface VoiceOptions extends NotificationOptions {
  /** Recipient phone number (E.164 format) */
  to: string;
  /** Message to speak */
  message: string;
  /** Language (en/bn) */
  language?: 'en' | 'bn' | undefined;
  /** Voice type */
  voice?: 'male' | 'female' | undefined;
  /** Repeat count */
  repeatCount?: number | undefined;
  /** Caller ID (optional) */
  callerId?: string | undefined;
}

// ============================================================
// Result Types
// ============================================================

/**
 * Notification result
 */
export interface NotificationResult<T = unknown> {
  /** Whether notification was sent successfully */
  success: boolean;
  /** Notification ID (tracking ID) */
  notificationId: string;
  /** Notification type */
  type: NotificationType;
  /** Notification channel */
  channel: NotificationChannel;
  /** Notification status */
  status: NotificationStatus;
  /** Recipient(s) */
  recipient: string | string[];
  /** Timestamp */
  sentAt: Date;
  /** Delivery timestamp (if confirmed) */
  deliveredAt?: Date | undefined;
  /** Error message (if failed) */
  error?: string | undefined;
  /** Provider response (provider-specific) */
  providerResponse?: T | undefined;
  /** Provider message ID */
  providerMessageId?: string | undefined;
  /** Cost (if applicable) */
  cost?: {
    amount: number;
    currency: string;
  } | undefined;
  /** Metadata */
  metadata?: Record<string, unknown> | undefined;
}

/**
 * Bulk notification result
 */
export interface BulkNotificationResult {
  /** Total notifications attempted */
  total: number;
  /** Successful notifications */
  successful: number;
  /** Failed notifications */
  failed: number;
  /** Results for each notification */
  results: NotificationResult[];
  /** Error details for failed notifications */
  errors?: Array<{
    recipient: string;
    error: string;
    channel: NotificationChannel;
  }> | undefined;
}

/**
 * Notification template
 */
export interface NotificationTemplate {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Template type */
  type: NotificationType;
  /** Template channel */
  channel: NotificationChannel;
  /** Subject (for email) */
  subject?: string | undefined;
  /** Body template (handlebars, mustache, etc.) */
  body: string;
  /** HTML version (for email) */
  html?: string | undefined;
  /** Text version (for email/SMS) */
  text?: string | undefined;
  /** Required variables */
  requiredVariables: string[];
  /** Optional variables */
  optionalVariables?: string[] | undefined;
  /** Language */
  language: 'en' | 'bn';
  /** Category */
  category: string;
  /** Tags */
  tags?: string[] | undefined;
  /** Version */
  version: number;
  /** Created at */
  createdAt: Date;
  /** Updated at */
  updatedAt: Date;
}

// ============================================================
// Main Port Interface
// ============================================================

/**
 * Notification Sender Port Interface
 * 
 * Defines the contract for sending notifications across multiple channels.
 * All notification sending should go through this interface.
 * 
 * Enterprise Features:
 * ✅ Multi-channel support (Email, SMS, WhatsApp, Push, In-App, Voice)
 * ✅ Template-based notifications
 * ✅ Bulk sending support
 * ✅ Priority-based sending
 * ✅ Scheduled notifications
 * ✅ Tracking and delivery status
 * ✅ Bangladesh specific (bKash, Nagad, Rocket)
 * ✅ Bengali language support
 * 
 * @example
 * // Using the port in domain service
 * class UserService {
 *   constructor(private readonly notificationSender: INotificationSender) {}
 * 
 *   async sendWelcomeEmail(user: User): Promise<void> {
 *     await this.notificationSender.sendEmail({
 *       to: user.getEmail().getValue(),
 *       subject: 'Welcome to Vubon!',
 *       html: `<p>Welcome ${user.getFullName()}!</p>`,
 *       template: 'welcome',
 *       templateData: {
 *         fullName: user.getFullName(),
 *         userId: user.id,
 *         verificationLink: 'https://vubon.com.bd/verify',
 *       },
 *     });
 *   }
 * }
 */
export interface INotificationSender {
  // ============================================================
  // Email Operations
  // ============================================================

  /**
   * Send an email notification
   * 
   * @param options - Email options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendEmail({
   *   to: 'user@example.com',
   *   subject: 'Welcome to Vubon!',
   *   html: '<h1>Welcome!</h1>',
   *   template: 'welcome',
   *   templateData: { fullName: 'John Doe' },
   * });
   */
  sendEmail(options: EmailOptions): Promise<NotificationResult>;

  /**
   * Send email verification code
   * 
   * @param to - Recipient email
   * @param code - Verification code
   * @param fullName - User's full name
   * @param language - Language preference ('en' | 'bn')
   * @param options - Additional options
   * @returns Notification result
   */
  sendEmailVerification(
    to: string,
    code: string,
    fullName: string,
    language?: 'en' | 'bn',
    options?: NotificationOptions,
  ): Promise<NotificationResult>;

  /**
   * Send password reset email
   * 
   * @param to - Recipient email
   * @param resetLink - Password reset link
   * @param fullName - User's full name
   * @param expiresInHours - Link expiry in hours
   * @param language - Language preference ('en' | 'bn')
   * @param options - Additional options
   * @returns Notification result
   */
  sendPasswordResetEmail(
    to: string,
    resetLink: string,
    fullName: string,
    expiresInHours: number,
    language?: 'en' | 'bn',
    options?: NotificationOptions,
  ): Promise<NotificationResult>;

  // ============================================================
  // SMS Operations (Bangladesh Specific)
  // ============================================================

  /**
   * Send an SMS notification
   * 
   * @param options - SMS options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendSMS({
   *   to: '+8801712345678',
   *   message: 'Your OTP is 123456',
   *   operator: 'gp',
   * });
   */
  sendSMS(options: SMSSOptions): Promise<NotificationResult>;

  /**
   * Send SMS verification code (Bangladesh specific)
   * 
   * @param to - Recipient phone number (E.164 format)
   * @param code - Verification code (OTP)
   * @param fullName - User's full name
   * @param language - Language preference ('en' | 'bn')
   * @param options - Additional options
   * @returns Notification result
   */
  sendSMSVerification(
    to: string,
    code: string,
    fullName: string,
    language?: 'en' | 'bn',
    options?: NotificationOptions,
  ): Promise<NotificationResult>;

  /**
   * Send welcome SMS (Bangladesh specific)
   * 
   * @param to - Recipient phone number (E.164 format)
   * @param fullName - User's full name
   * @param language - Language preference ('en' | 'bn')
   * @param options - Additional options
   * @returns Notification result
   */
  sendWelcomeSMS(
    to: string,
    fullName: string,
    language?: 'en' | 'bn',
    options?: NotificationOptions,
  ): Promise<NotificationResult>;

  // ============================================================
  // WhatsApp Operations (Bangladesh Specific)
  // ============================================================

  /**
   * Send a WhatsApp notification (via WhatsApp Business API)
   * 
   * @param options - WhatsApp options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendWhatsApp({
   *   to: '+8801712345678',
   *   template: 'order_confirmation',
   *   templateData: {
   *     orderId: 'ORD-123',
   *     amount: '500',
   *     customerName: 'John Doe',
   *   },
   * });
   */
  sendWhatsApp(options: WhatsAppOptions): Promise<NotificationResult>;

  /**
   * Send WhatsApp verification code (Bangladesh specific)
   * 
   * @param to - Recipient phone number (E.164 format)
   * @param code - Verification code (OTP)
   * @param fullName - User's full name
   * @param language - Language preference ('en' | 'bn')
   * @param options - Additional options
   * @returns Notification result
   */
  sendWhatsAppVerification(
    to: string,
    code: string,
    fullName: string,
    language?: 'en' | 'bn',
    options?: NotificationOptions,
  ): Promise<NotificationResult>;

  /**
   * Send WhatsApp MFS payment notification (bKash/Nagad/Rocket)
   * 
   * @param options - MFS options
   * @returns Notification result
   */
  sendWhatsAppMFS(options: MFSOptions): Promise<NotificationResult>;

  // ============================================================
  // Push Notification Operations
  // ============================================================

  /**
   * Send a push notification (FCM/APNS)
   * 
   * @param options - Push options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendPush({
   *   to: ['device_token_1', 'device_token_2'],
   *   title: 'New Order',
   *   body: 'You have a new order!',
   *   data: { orderId: 'ORD-123' },
   * });
   */
  sendPush(options: PushOptions): Promise<NotificationResult>;

  // ============================================================
  // In-App Notification Operations
  // ============================================================

  /**
   * Send an in-app notification
   * 
   * @param options - In-app options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendInApp({
   *   userId: 'user_123',
   *   title: 'Order Confirmed',
   *   message: 'Your order has been confirmed!',
   *   type: 'success',
   *   actionUrl: '/orders/ORD-123',
   * });
   */
  sendInApp(options: InAppOptions): Promise<NotificationResult>;

  // ============================================================
  // Voice Call Operations (Bangladesh Specific)
  // ============================================================

  /**
   * Send a voice call notification (for OTP)
   * 
   * @param options - Voice options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendVoice({
   *   to: '+8801712345678',
   *   message: 'Your verification code is 123456',
   *   language: 'bn',
   * });
   */
  sendVoice(options: VoiceOptions): Promise<NotificationResult>;

  // ============================================================
  // MFS Operations (Bangladesh Specific)
  // ============================================================

  /**
   * Send MFS (bKash/Nagad/Rocket) notification
   * 
   * @param options - MFS options
   * @returns Notification result
   * 
   * @example
   * const result = await notificationSender.sendMFS({
   *   to: '+8801712345678',
   *   provider: 'bkash',
   *   template: 'payment_success',
   *   templateData: {
   *     amount: '500',
   *     transactionId: 'TXN-123',
   *     reference: 'Order ORD-123',
   *   },
   * });
   */
  sendMFS(options: MFSOptions): Promise<NotificationResult>;

  // ============================================================
  // Template Operations
  // ============================================================

  /**
   * Render a notification template
   * 
   * @param templateName - Template name
   * @param data - Template data
   * @param language - Language preference ('en' | 'bn')
   * @param channel - Notification channel
   * @returns Rendered template
   * 
   * @example
   * const rendered = await notificationSender.renderTemplate(
   *   'welcome',
   *   { fullName: 'John Doe' },
   *   'bn',
   *   NotificationChannel.EMAIL
   * );
   * console.log(rendered.subject); // 'স্বাগতম জন ডো!'
   */
  renderTemplate(
    templateName: string,
    data: Record<string, unknown>,
    language: 'en' | 'bn',
    channel: NotificationChannel,
  ): Promise<{
    subject?: string | undefined;
    html?: string | undefined;
    text?: string | undefined;
    body: string;
  }>;

  /**
   * Get a notification template
   * 
   * @param templateId - Template ID
   * @param language - Language preference ('en' | 'bn')
   * @param channel - Notification channel
   * @returns Notification template
   */
  getTemplate(
    templateId: string,
    language: 'en' | 'bn',
    channel: NotificationChannel,
  ): Promise<NotificationTemplate | null>;

  // ============================================================
  // Bulk Operations
  // ============================================================

  /**
   * Send bulk notifications (multiple recipients)
   * 
   * @param channel - Notification channel
   * @param recipients - Array of recipients with their options
   * @param options - Base notification options (applied to all)
   * @returns Bulk notification result
   * 
   * @example
   * const result = await notificationSender.sendBulk(
   *   NotificationChannel.EMAIL,
   *   [
   *     { to: 'user1@example.com', templateData: { fullName: 'John' } },
   *     { to: 'user2@example.com', templateData: { fullName: 'Jane' } },
   *   ],
   *   { template: 'welcome', priority: NotificationPriority.MEDIUM }
   * );
   */
  sendBulk(
    channel: NotificationChannel,
    recipients: Array<Record<string, unknown>>,
    options: NotificationOptions,
  ): Promise<BulkNotificationResult>;

  /**
   * Send bulk SMS (Bangladesh specific)
   * 
   * @param recipients - Array of phone numbers with their messages
   * @param options - SMS options (applied to all)
   * @returns Bulk notification result
   * 
   * @example
   * const result = await notificationSender.sendBulkSMS(
   *   [
   *     { to: '+8801712345678', message: 'Welcome John!' },
   *     { to: '+8801812345678', message: 'Welcome Jane!' },
   *   ],
   *   { operator: 'gp' }
   * );
   */
  sendBulkSMS(
    recipients: Array<{ to: string; message: string; operator?: string | undefined }>,
    options?: NotificationOptions,
  ): Promise<BulkNotificationResult>;

  /**
   * Send bulk WhatsApp (Bangladesh specific)
   * 
   * @param recipients - Array of recipients with their template data
   * @param template - Template name
   * @param options - WhatsApp options (applied to all)
   * @returns Bulk notification result
   */
  sendBulkWhatsApp(
    recipients: Array<{ to: string; templateData: Record<string, string> }>,
    template: string,
    options?: NotificationOptions,
  ): Promise<BulkNotificationResult>;

  // ============================================================
  // Tracking & Status Operations
  // ============================================================

  /**
   * Get notification status by ID
   * 
   * @param notificationId - Notification ID
   * @param channel - Notification channel
   * @returns Notification result
   */
  getNotificationStatus(
    notificationId: string,
    channel: NotificationChannel,
  ): Promise<NotificationResult>;

  /**
   * Get delivery status by provider message ID
   * 
   * @param providerMessageId - Provider message ID
   * @param channel - Notification channel
   * @returns Delivery status
   */
  getDeliveryStatus(
    providerMessageId: string,
    channel: NotificationChannel,
  ): Promise<{
    status: NotificationStatus;
    deliveredAt?: Date | undefined;
    readAt?: Date | undefined;
    error?: string | undefined;
  }>;

  /**
   * Track notification delivery (webhook handler)
   * 
   * @param payload - Provider webhook payload
   * @param channel - Notification channel
   * @returns Processing result
   */
  handleWebhook(
    payload: Record<string, unknown>,
    channel: NotificationChannel,
  ): Promise<{
    received: boolean;
    notificationId?: string | undefined;
    status?: NotificationStatus | undefined;
  }>;

  // ============================================================
  // Channel Management
  // ============================================================

  /**
   * Check if a channel is available/enabled
   * 
   * @param channel - Notification channel
   * @param options - Additional check options
   * @returns True if channel is available
   */
  isChannelAvailable(
    channel: NotificationChannel,
    options?: {
      recipient?: string | undefined;
      type?: NotificationType | undefined;
      language?: 'en' | 'bn' | undefined;
    },
  ): Promise<boolean>;

  /**
   * Get available channels for a recipient
   * 
   * @param recipient - Email or phone number
   * @param type - Notification type
   * @param language - Language preference
   * @returns Array of available channels with their preference scores
   */
  getAvailableChannels(
    recipient: string,
    type: NotificationType,
    language?: 'en' | 'bn',
  ): Promise<Array<{
    channel: NotificationChannel;
    score: number;
    reason: string;
  }>>;

  /**
   * Get channel-specific configuration
   * 
   * @param channel - Notification channel
   * @returns Channel configuration
   */
  getChannelConfig(channel: NotificationChannel): Promise<{
    enabled: boolean;
    priority: number;
    rateLimit?: {
      perSecond: number;
      perMinute: number;
      perHour: number;
    } | undefined;
    costPerUnit: number;
    maxLength?: number | undefined;
    supportedTypes: NotificationType[];
  }>;

  // ============================================================
  // Analytics & Reporting
  // ============================================================

  /**
   * Get notification analytics
   * 
   * @param from - Start date
   * @param to - End date
   * @param options - Filter options
   * @returns Analytics data
   */
  getAnalytics(
    from: Date,
    to: Date,
    options?: {
      channels?: NotificationChannel[] | undefined;
      types?: NotificationType[] | undefined;
      status?: NotificationStatus[] | undefined;
    },
  ): Promise<{
    total: number;
    byChannel: Record<NotificationChannel, number>;
    byType: Record<NotificationType, number>;
    byStatus: Record<NotificationStatus, number>;
    successRate: number;
    avgDeliveryTime: number;
    costs: {
      total: number;
      currency: string;
      byChannel: Record<NotificationChannel, number>;
    };
  }>;
}

/**
 * Mock Notification Sender (for testing)
 * ✅ FIXED: All unused parameters prefixed with _
 */
export class MockNotificationSender implements INotificationSender {
  private notifications: Map<string, NotificationResult> = new Map();
  private templates: Map<string, NotificationTemplate> = new Map();

  constructor(
    private readonly defaultSuccess: boolean = true,
    private readonly delayMs: number = 0,
  ) {
    // Initialize default templates
    this.initTemplates();
  }

  private initTemplates(): void {
    const templates: NotificationTemplate[] = [
      {
        id: 'welcome',
        name: 'Welcome Email',
        type: NotificationType.WELCOME,
        channel: NotificationChannel.EMAIL,
        subject: 'Welcome to Vubon, {{fullName}}!',
        body: 'Welcome {{fullName}} to Vubon!',
        html: '<h1>Welcome {{fullName}}!</h1>',
        text: 'Welcome {{fullName}} to Vubon!',
        requiredVariables: ['fullName'],
        language: 'en',
        category: 'authentication',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'welcome_bn',
        name: 'Welcome Email (Bengali)',
        type: NotificationType.WELCOME,
        channel: NotificationChannel.EMAIL,
        subject: '{{fullName}}!',
        body: '{{fullName}}!',
        html: '<h1>{{fullName}}!</h1>',
        text: '{{fullName}}!',
        requiredVariables: ['fullName'],
        language: 'bn',
        category: 'authentication',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'email_verification',
        name: 'Email Verification',
        type: NotificationType.EMAIL_VERIFICATION,
        channel: NotificationChannel.EMAIL,
        subject: 'Verify Your Email',
        body: 'Your verification code is: {{code}}',
        html: '<p>Your verification code is: <strong>{{code}}</strong></p>',
        text: 'Your verification code is: {{code}}',
        requiredVariables: ['code', 'fullName'],
        language: 'en',
        category: 'verification',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'sms_verification',
        name: 'SMS Verification',
        type: NotificationType.PHONE_VERIFICATION,
        channel: NotificationChannel.SMS,
        body: 'Your verification code is: {{code}}',
        requiredVariables: ['code'],
        language: 'en',
        category: 'verification',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'whatsapp_verification',
        name: 'WhatsApp Verification',
        type: NotificationType.PHONE_VERIFICATION,
        channel: NotificationChannel.WHATSAPP,
        body: 'Your verification code is: {{code}}',
        requiredVariables: ['code'],
        language: 'en',
        category: 'verification',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const template of templates) {
      this.templates.set(`${template.id}:${template.language}`, template);
    }
  }

  private async delay(): Promise<void> {
    if (this.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }
  }

  private createResult(
    channel: NotificationChannel,
    type: NotificationType,
    recipient: string | string[],
    success: boolean = this.defaultSuccess,
    error?: string,
  ): NotificationResult {
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const result: NotificationResult = {
      success,
      notificationId,
      type,
      channel,
      status: success ? NotificationStatus.SENT : NotificationStatus.FAILED,
      recipient,
      sentAt: new Date(),
      providerMessageId: success ? `msg_${Date.now()}` : undefined,
      error: error ? error : undefined,
    };

    this.notifications.set(notificationId, result);
    return result;
  }

  async sendEmail(options: EmailOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.EMAIL,
      this.detectType(options),
      options.to,
      true,
    );
  }

  async sendEmailVerification(
    to: string,
    code: string,
    fullName: string,
    language: 'en' | 'bn' = 'en',
    options?: NotificationOptions,
  ): Promise<NotificationResult> {
    await this.delay();
    const template = await this.renderTemplate(
      language === 'en' ? 'email_verification' : 'email_verification_bn',
      { code, fullName },
      language,
      NotificationChannel.EMAIL,
    );

    return this.sendEmail({
      ...options,
      to,
      subject: language === 'en' ? 'Verify Your Email' : 'Verify Your Email',
      html: template.html,
      text: template.text,
      template: language === 'en' ? 'email_verification' : 'email_verification_bn',
      templateData: { code, fullName },
      correlationId: options?.correlationId,
    });
  }

  async sendPasswordResetEmail(
    to: string,
    resetLink: string,
    fullName: string,
    expiresInHours: number,
    language: 'en' | 'bn' = 'en',
    options?: NotificationOptions,
  ): Promise<NotificationResult> {
    await this.delay();
    return this.sendEmail({
      ...options,
      to,
      subject: language === 'en' ? 'Reset Your Password' : 'Reset Your Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in ${expiresInHours} hours.</p>`,
      text: `Reset your password: ${resetLink} (expires in ${expiresInHours} hours)`,
      template: 'password_reset',
      templateData: { fullName, resetLink, expiresInHours },
      correlationId: options?.correlationId,
    });
  }

  async sendSMS(options: SMSSOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.SMS,
      NotificationType.PHONE_VERIFICATION,
      options.to,
      true,
    );
  }

  async sendSMSVerification(
    to: string,
    code: string,
    fullName: string,
    language: 'en' | 'bn' = 'en',
    options?: NotificationOptions,
  ): Promise<NotificationResult> {
    await this.delay();
    const message = language === 'en'
      ? `Hello ${fullName}, your verification code is: ${code}`
      : `Hello ${fullName}, your verification code is: ${code}`;
    
    return this.sendSMS({
      ...options,
      to,
      message,
      template: 'sms_verification',
      templateData: { code, fullName },
      correlationId: options?.correlationId,
    });
  }

  async sendWelcomeSMS(
    to: string,
    fullName: string,
    language: 'en' | 'bn' = 'en',
    options?: NotificationOptions,
  ): Promise<NotificationResult> {
    await this.delay();
    const message = language === 'en'
      ? `Welcome ${fullName} to Vubon!`
      : `Welcome ${fullName} to Vubon!`;
    
    return this.sendSMS({
      ...options,
      to,
      message,
      template: 'welcome_sms',
      templateData: { fullName },
      correlationId: options?.correlationId,
    });
  }

  async sendWhatsApp(options: WhatsAppOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.WHATSAPP,
      NotificationType.PHONE_VERIFICATION,
      options.to,
      true,
    );
  }

  async sendWhatsAppVerification(
    to: string,
    code: string,
    fullName: string,
    language: 'en' | 'bn' = 'en',
    options?: NotificationOptions,
  ): Promise<NotificationResult> {
    await this.delay();
    return this.sendWhatsApp({
      ...options,
      to,
      template: 'whatsapp_verification',
      templateData: { code, fullName },
      text: language === 'en' ? `Your verification code is: ${code}` : `Your verification code is: ${code}`,
      correlationId: options?.correlationId,
    });
  }

  async sendWhatsAppMFS(options: MFSOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.WHATSAPP,
      NotificationType.MFS_PAYMENT_CONFIRMATION,
      options.to,
      true,
    );
  }

  async sendPush(options: PushOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.PUSH,
      NotificationType.PAYMENT_SUCCESS,
      options.to,
      true,
    );
  }

  async sendInApp(options: InAppOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.IN_APP,
      NotificationType.ORDER_CONFIRMATION,
      options.userId,
      true,
    );
  }

  async sendVoice(options: VoiceOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.VOICE,
      NotificationType.MFA_CODE,
      options.to,
      true,
    );
  }

  async sendMFS(options: MFSOptions): Promise<NotificationResult> {
    await this.delay();
    return this.createResult(
      NotificationChannel.SMS,
      NotificationType.MFS_PAYMENT_CONFIRMATION,
      options.to,
      true,
    );
  }

  async renderTemplate(
    templateName: string,
    data: Record<string, unknown>,
    language: 'en' | 'bn',
    _channel: NotificationChannel,
  ): Promise<{
    subject?: string | undefined;
    html?: string | undefined;
    text?: string | undefined;
    body: string;
  }> {
    const key = `${templateName}:${language}`;
    const template = this.templates.get(key);
    
    if (!template) {
      return {
        body: JSON.stringify(data),
        text: JSON.stringify(data),
      };
    }

    let body = template.body;
    let html = template.html;
    let text = template.text;
    let subject = template.subject;

    // Simple template rendering (replace {{variables}})
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      const stringValue = String(value);
      body = body.replace(regex, stringValue);
      if (html) html = html.replace(regex, stringValue);
      if (text) text = text.replace(regex, stringValue);
      if (subject) subject = subject.replace(regex, stringValue);
    }

    return {
      subject,
      html,
      text,
      body,
    };
  }

  async getTemplate(
    templateId: string,
    language: 'en' | 'bn',
    _channel: NotificationChannel,
  ): Promise<NotificationTemplate | null> {
    const key = `${templateId}:${language}`;
    return this.templates.get(key) || null;
  }

  async sendBulk(
    channel: NotificationChannel,
    recipients: Array<Record<string, unknown>>,
    _options: NotificationOptions,
  ): Promise<BulkNotificationResult> {
    await this.delay();
    
    const results: NotificationResult[] = [];
    const errors: Array<{ recipient: string; error: string; channel: NotificationChannel }> = [];

    for (const recipient of recipients) {
      try {
        const result = this.createResult(
          channel,
          NotificationType.PROMOTIONAL,
          String(recipient.to || 'unknown'),
          true,
        );
        results.push(result);
      } catch (error) {
        errors.push({
          recipient: String(recipient.to || 'unknown'),
          error: (error as Error).message,
          channel,
        });
      }
    }

    return {
      total: recipients.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async sendBulkSMS(
    recipients: Array<{ to: string; message: string; operator?: string | undefined }>,
    _options?: NotificationOptions,
  ): Promise<BulkNotificationResult> {
    await this.delay();
    
    const results: NotificationResult[] = [];
    const errors: Array<{ recipient: string; error: string; channel: NotificationChannel }> = [];

    for (const recipient of recipients) {
      try {
        const result = this.createResult(
          NotificationChannel.SMS,
          NotificationType.PROMOTIONAL,
          recipient.to,
          true,
        );
        results.push(result);
      } catch (error) {
        errors.push({
          recipient: recipient.to,
          error: (error as Error).message,
          channel: NotificationChannel.SMS,
        });
      }
    }

    return {
      total: recipients.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async sendBulkWhatsApp(
    recipients: Array<{ to: string; templateData: Record<string, string> }>,
    _template: string,
    _options?: NotificationOptions,
  ): Promise<BulkNotificationResult> {
    await this.delay();
    
    const results: NotificationResult[] = [];
    const errors: Array<{ recipient: string; error: string; channel: NotificationChannel }> = [];

    for (const recipient of recipients) {
      try {
        const result = this.createResult(
          NotificationChannel.WHATSAPP,
          NotificationType.PROMOTIONAL,
          recipient.to,
          true,
        );
        results.push(result);
      } catch (error) {
        errors.push({
          recipient: recipient.to,
          error: (error as Error).message,
          channel: NotificationChannel.WHATSAPP,
        });
      }
    }

    return {
      total: recipients.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async getNotificationStatus(
    notificationId: string,
    _channel: NotificationChannel,
  ): Promise<NotificationResult> {
    const result = this.notifications.get(notificationId);
    if (!result) {
      return this.createResult(
        NotificationChannel.EMAIL,
        NotificationType.WELCOME,
        'unknown',
        false,
        'Notification not found',
      );
    }
    return result;
  }

  async getDeliveryStatus(
    _providerMessageId: string,
    _channel: NotificationChannel,
  ): Promise<{
    status: NotificationStatus;
    deliveredAt?: Date | undefined;
    readAt?: Date | undefined;
    error?: string | undefined;
  }> {
    return {
      status: NotificationStatus.DELIVERED,
      deliveredAt: new Date(),
    };
  }

  async handleWebhook(
    payload: Record<string, unknown>,
    _channel: NotificationChannel,
  ): Promise<{
    received: boolean;
    notificationId?: string | undefined;
    status?: NotificationStatus | undefined;
  }> {
    return {
      received: true,
      notificationId: String(payload.notificationId || 'unknown'),
      status: NotificationStatus.DELIVERED,
    };
  }

  async isChannelAvailable(
    _channel: NotificationChannel,
    _options?: {
      recipient?: string | undefined;
      type?: NotificationType | undefined;
      language?: 'en' | 'bn' | undefined;
    },
  ): Promise<boolean> {
    // All channels available in mock
    return true;
  }

  async getAvailableChannels(
    _recipient: string,
    _type: NotificationType,
    _language: 'en' | 'bn' = 'en',
  ): Promise<Array<{
    channel: NotificationChannel;
    score: number;
    reason: string;
  }>> {
    return [
      { channel: NotificationChannel.EMAIL, score: 10, reason: 'Always available' },
      { channel: NotificationChannel.SMS, score: 9, reason: 'Always available' },
      { channel: NotificationChannel.WHATSAPP, score: 8, reason: 'Always available' },
      { channel: NotificationChannel.IN_APP, score: 7, reason: 'Always available' },
    ];
  }

  async getChannelConfig(_channel: NotificationChannel): Promise<{
    enabled: boolean;
    priority: number;
    rateLimit?: {
      perSecond: number;
      perMinute: number;
      perHour: number;
    } | undefined;
    costPerUnit: number;
    maxLength?: number | undefined;
    supportedTypes: NotificationType[];
  }> {
    // Return a default config since parameter is unused
    return {
      enabled: true,
      priority: 1,
      rateLimit: { perSecond: 10, perMinute: 100, perHour: 1000 },
      costPerUnit: 0.001,
      supportedTypes: Object.values(NotificationType),
    };
  }

  private detectType(options: EmailOptions): NotificationType {
    if (options.template?.includes('welcome')) return NotificationType.WELCOME;
    if (options.template?.includes('verification')) return NotificationType.EMAIL_VERIFICATION;
    if (options.template?.includes('reset')) return NotificationType.PASSWORD_RESET;
    if (options.template?.includes('order')) return NotificationType.ORDER_CONFIRMATION;
    if (options.template?.includes('payment')) return NotificationType.PAYMENT_SUCCESS;
    return NotificationType.PROMOTIONAL;
  }

  async getAnalytics(
    _from: Date,
    _to: Date,
    _options?: {
      channels?: NotificationChannel[] | undefined;
      types?: NotificationType[] | undefined;
      status?: NotificationStatus[] | undefined;
    },
  ): Promise<{
    total: number;
    byChannel: Record<NotificationChannel, number>;
    byType: Record<NotificationType, number>;
    byStatus: Record<NotificationStatus, number>;
    successRate: number;
    avgDeliveryTime: number;
    costs: {
      total: number;
      currency: string;
      byChannel: Record<NotificationChannel, number>;
    };
  }> {
    const allChannels = Object.values(NotificationChannel);
    const allTypes = Object.values(NotificationType);
    const allStatuses = Object.values(NotificationStatus);

    const byChannel: Record<NotificationChannel, number> = {} as Record<NotificationChannel, number>;
    const byType: Record<NotificationType, number> = {} as Record<NotificationType, number>;
    const byStatus: Record<NotificationStatus, number> = {} as Record<NotificationStatus, number>;
    const costsByChannel: Record<NotificationChannel, number> = {} as Record<NotificationChannel, number>;

    for (const channel of allChannels) {
      byChannel[channel] = Math.floor(Math.random() * 100);
      costsByChannel[channel] = Math.random() * 10;
    }

    for (const type of allTypes) {
      byType[type] = Math.floor(Math.random() * 50);
    }

    for (const status of allStatuses) {
      byStatus[status] = Math.floor(Math.random() * 30);
    }

    const total = Object.values(byChannel).reduce((a, b) => a + b, 0);

    return {
      total,
      byChannel,
      byType,
      byStatus,
      successRate: 0.95,
      avgDeliveryTime: 2.5,
      costs: {
        total: Object.values(costsByChannel).reduce((a, b) => a + b, 0),
        currency: 'USD',
        byChannel: costsByChannel,
      },
    };
  }
}

// ============================================================
// Type Exports (for convenience)
// ============================================================

export type { INotificationSender as NotificationSenderPort };
