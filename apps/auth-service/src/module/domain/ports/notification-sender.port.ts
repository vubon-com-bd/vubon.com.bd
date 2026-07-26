/**
 * Notification Sender Port Interface
 * Defines contract for sending notifications
 * Infrastructure layer will provide implementation
 */

export interface INotificationSender {
  /**
   * Send an email
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param body - Email body (HTML or plain text)
   * @param options - Additional email options
   * @returns Promise resolving to boolean indicating success
   */
  sendEmail(
    to: string,
    subject: string,
    body: string,
    options?: {
      from?: string;
      cc?: string[];
      bcc?: string[];
      attachments?: Array<{
        filename: string;
        content: string | Buffer;
        contentType?: string;
      }>;
      isHtml?: boolean;
    }
  ): Promise<boolean>;

  /**
   * Send a welcome email to new user
   * @param to - Recipient email address
   * @param name - User's full name
   * @param options - Additional options (verification link, etc.)
   * @returns Promise resolving to boolean indicating success
   */
  sendWelcomeEmail(
    to: string,
    name: string,
    options?: {
      verificationLink?: string;
      loginLink?: string;
    }
  ): Promise<boolean>;

  /**
   * Send email verification email
   * @param to - Recipient email address
   * @param name - User's full name
   * @param verificationLink - Link for verification
   * @returns Promise resolving to boolean indicating success
   */
  sendVerificationEmail(to: string, name: string, verificationLink: string): Promise<boolean>;

  /**
   * Send password reset email
   * @param to - Recipient email address
   * @param name - User's full name
   * @param resetLink - Link for password reset
   * @returns Promise resolving to boolean indicating success
   */
  sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<boolean>;

  /**
   * Send OTP via SMS
   * @param phone - Recipient phone number
   * @param otp - OTP code
   * @returns Promise resolving to boolean indicating success
   */
  sendOTPSMS(phone: string, otp: string): Promise<boolean>;

  /**
   * Send a generic notification
   * @param type - Notification type
   * @param recipient - Recipient identifier (email, phone, etc.)
   * @param content - Notification content
   * @param options - Additional options
   * @returns Promise resolving to boolean indicating success
   */
  sendNotification(
    type: 'email' | 'sms' | 'push' | 'whatsapp',
    recipient: string,
    content: string | Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<boolean>;

  /**
   * Send bulk notifications
   * @param type - Notification type
   * @param recipients - List of recipient identifiers
   * @param content - Notification content
   * @param options - Additional options
   * @returns Promise resolving to number of successful sends
   */
  sendBulkNotification(
    type: 'email' | 'sms' | 'push' | 'whatsapp',
    recipients: string[],
    content: string | Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<number>;

  /**
   * Check if email is valid for sending
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid for sending
   */
  isValidEmailForSending(email: string): boolean;

  /**
   * Get email delivery status
   * @param messageId - Email message ID
   * @returns Promise resolving to delivery status
   */
  getEmailDeliveryStatus(messageId: string): Promise<{
    delivered: boolean;
    opened?: boolean;
    clicked?: boolean;
    error?: string;
  }>;
}
