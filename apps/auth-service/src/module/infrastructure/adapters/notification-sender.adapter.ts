/**
 * Notification Sender Adapter
 * Implements INotificationSender port using SMTP
 * Currently a placeholder - can be extended with actual email service
 */

import { Injectable, Logger } from '@nestjs/common';
import { INotificationSender } from '@domain/ports/notification-sender.port.js';
import { getEnv } from '@vubon/auth-shared-config';

@Injectable()
export class NotificationSenderAdapter implements INotificationSender {
  private readonly logger = new Logger(NotificationSenderAdapter.name);
  private readonly env = getEnv();

  async sendEmail(
    to: string,
    subject: string,
    body: string,
    options?: { isHtml?: boolean }
  ): Promise<boolean> {
    this.logger.log(`📧 Sending email to: ${to}`);
    this.logger.debug(`Subject: ${subject}`);
    this.logger.debug(`Body length: ${body.length} characters`);
    this.logger.debug(`Is HTML: ${options?.isHtml || false}`);

    // Placeholder - replace with actual email service
    this.logger.warn('⚠️ Email sending is not configured. Using placeholder.');

    return true;
  }

  async sendWelcomeEmail(
    to: string,
    name: string,
    options?: {
      verificationLink?: string;
      loginLink?: string;
    }
  ): Promise<boolean> {
    const subject = `Welcome to Vubon, ${name}! 🎉`;

    const body = `
      <h1>Welcome to Vubon!</h1>
      <p>Hello ${name},</p>
      <p>Thank you for registering with Vubon. We're excited to have you on board!</p>
      ${options?.verificationLink ? `<p><a href="${options.verificationLink}">Verify your email address</a></p>` : ''}
      ${options?.loginLink ? `<p><a href="${options.loginLink}">Login to your account</a></p>` : ''}
      <p>Best regards,<br>The Vubon Team</p>
    `;

    return this.sendEmail(to, subject, body, { isHtml: true });
  }

  async sendVerificationEmail(
    to: string,
    name: string,
    verificationLink: string
  ): Promise<boolean> {
    const subject = `Verify your email address - Vubon`;

    const body = `
      <h1>Verify Your Email</h1>
      <p>Hello ${name},</p>
      <p>Please click the link below to verify your email address:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account with Vubon, please ignore this email.</p>
      <p>Best regards,<br>The Vubon Team</p>
    `;

    return this.sendEmail(to, subject, body, { isHtml: true });
  }

  async sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<boolean> {
    const subject = `Reset your password - Vubon`;

    const body = `
      <h1>Reset Your Password</h1>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      <p>Best regards,<br>The Vubon Team</p>
    `;

    return this.sendEmail(to, subject, body, { isHtml: true });
  }

  async sendOTPSMS(phone: string, otp: string): Promise<boolean> {
    this.logger.log(`📱 Sending OTP SMS to: ${phone}`);
    this.logger.debug(`OTP: ${otp}`);

    this.logger.warn('⚠️ SMS sending is not configured. Using placeholder.');
    return true;
  }

  async sendNotification(
    type: 'email' | 'sms' | 'push' | 'whatsapp',
    recipient: string,
    content: string | Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<boolean> {
    this.logger.log(`📨 Sending ${type} notification to: ${recipient}`);

    switch (type) {
      case 'email':
        if (typeof content === 'string') {
          return this.sendEmail(
            recipient,
            (options?.subject as string) || 'Notification',
            content,
            { isHtml: true }
          );
        }
        return false;

      case 'sms':
        if (typeof content === 'string') {
          return this.sendOTPSMS(recipient, content);
        }
        return false;

      case 'push':
        this.logger.warn('⚠️ Push notifications are not implemented yet.');
        return false;

      case 'whatsapp':
        this.logger.warn('⚠️ WhatsApp notifications are not implemented yet.');
        return false;

      default:
        this.logger.warn(`Unknown notification type: ${type}`);
        return false;
    }
  }

  async sendBulkNotification(
    type: 'email' | 'sms' | 'push' | 'whatsapp',
    recipients: string[],
    content: string | Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<number> {
    this.logger.log(`📨 Sending bulk ${type} notifications to ${recipients.length} recipients`);

    let successCount = 0;

    for (const recipient of recipients) {
      try {
        const success = await this.sendNotification(type, recipient, content, options);
        if (success) {
          successCount++;
        }
      } catch (error) {
        this.logger.error(`Failed to send to ${recipient}: ${error}`);
      }
    }

    this.logger.log(`✅ ${successCount}/${recipients.length} notifications sent successfully`);
    return successCount;
  }

  isValidEmailForSending(email: string): boolean {
    return !!(email && email.includes('@') && email.length < 255);
  }

  async getEmailDeliveryStatus(messageId: string): Promise<{
    delivered: boolean;
    opened?: boolean;
    clicked?: boolean;
    error?: string;
  }> {
    this.logger.log(`📊 Checking delivery status for: ${messageId}`);

    return {
      delivered: true,
      opened: false,
      clicked: false,
    };
  }
}
