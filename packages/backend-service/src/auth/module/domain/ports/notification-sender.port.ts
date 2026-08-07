/**
 * Notification Sender Port
 * Defines the contract for sending notifications (email, SMS, push, WhatsApp)
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface INotificationSender {
  /**
   * Send an email notification
   * @param to - The recipient email address
   * @param subject - The email subject
   * @param body - The email body (HTML or plain text)
   * @param options - Optional email options (attachments, etc.)
   * @returns A promise that resolves when the email is sent
   * @throws {Error} If email sending fails
   */
  sendEmail(to: string, subject: string, body: string, options?: EmailOptions): Promise<void>;

  /**
   * Send an SMS notification
   * @param to - The recipient phone number
   * @param message - The SMS message body
   * @returns A promise that resolves when the SMS is sent
   * @throws {Error} If SMS sending fails
   */
  sendSMS(to: string, message: string): Promise<void>;

  /**
   * Send a push notification to a device
   * @param deviceToken - The device token for push notifications
   * @param title - The notification title
   * @param body - The notification body
   * @param data - Optional additional data payload
   * @returns A promise that resolves when the push notification is sent
   * @throws {Error} If push notification sending fails
   */
  sendPushNotification(
    deviceToken: string,
    title: string,
    body: string,
    data?: Record<string, unknown>
  ): Promise<void>;

  /**
   * Send a WhatsApp message
   * @param phone - The recipient phone number
   * @param message - The message body
   * @returns A promise that resolves when the WhatsApp message is sent
   * @throws {Error} If WhatsApp message sending fails
   */
  sendWhatsApp(phone: string, message: string): Promise<void>;
}

/**
 * Email options for sending emails
 */
export interface EmailOptions {
  /** Email attachments */
  attachments?: EmailAttachment[];
  /** BCC recipients */
  bcc?: string[];
  /** CC recipients */
  cc?: string[];
  /** Reply-to address */
  replyTo?: string;
  /** HTML body (overrides body) */
  html?: string;
  /** Plain text body (overrides body) */
  text?: string;
  /** Additional headers */
  headers?: Record<string, string>;
}

/**
 * Email attachment interface
 */
export interface EmailAttachment {
  /** The filename of the attachment */
  filename: string;
  /** The content of the attachment (base64 encoded or Buffer) */
  content: string | Buffer;
  /** The content type (e.g., 'application/pdf') */
  contentType?: string;
  /** The content disposition (e.g., 'attachment', 'inline') */
  disposition?: 'attachment' | 'inline';
}
