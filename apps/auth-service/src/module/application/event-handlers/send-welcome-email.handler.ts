/**
 * Send Welcome Email Handler - Enterprise Grade Event Handler
 *
 * @module application/event-handlers/send-welcome-email.handler
 */

import { Injectable, Logger } from '@nestjs/common';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import { EMAIL_CONFIG, APP_NAME, SUPPORT_EMAIL } from '@vubon/shared-constants';

import { maskEmail, formatDisplayDate } from '@vubon/shared-utils';

// ============================================================
// Domain/Application Imports
// ============================================================

import { UserRegisteredEvent } from '../events/user-registered.event';

// ============================================================
// Ports (Application Layer Interfaces)
// ============================================================

export interface IEmailSender {
  sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text: string;
    from?: string;
    replyTo?: string;
    attachments?: Array<{ filename: string; content: Buffer | string; contentType?: string }>;
    correlationId?: string;
  }): Promise<{ messageId: string; accepted: string[] }>;
}

export interface ITemplateEngine {
  render(templateName: string, data: Record<string, unknown>, locale?: string): Promise<string>;
}

export interface IMetricsService {
  incrementCounter(name: string, labels?: Record<string, string>): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void;
}

export interface ITracerService {
  startSpan(
    name: string,
    context?: Record<string, unknown>,
  ): {
    end: () => void;
    setAttribute: (key: string, value: unknown) => void;
    setStatus: (status: { code: number; message?: string }) => void;
  };
}

// ============================================================
// Circuit Breaker
// ============================================================

export interface CircuitBreakerStatus {
  state: string;
  failures: number;
  nextAttemptAt: Date | undefined;
}

export class CircuitBreaker {
  private static instances: Map<string, CircuitBreaker> = new Map();
  private state: {
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    failures: number;
    lastFailureTime: number;
    nextAttemptTime: number;
    successes: number;
  };
  private readonly successThreshold: number = 3;

  private constructor(
    private readonly name: string,
    private readonly failureThreshold: number = 5,
    private readonly timeoutMs: number = 30000,
  ) {
    this.state = {
      state: 'CLOSED',
      failures: 0,
      lastFailureTime: 0,
      nextAttemptTime: 0,
      successes: 0,
    };
  }

  static getInstance(name: string): CircuitBreaker {
    if (!CircuitBreaker.instances.has(name)) {
      CircuitBreaker.instances.set(name, new CircuitBreaker(name));
    }
    return CircuitBreaker.instances.get(name)!;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state.state === 'OPEN') {
      if (Date.now() >= this.state.nextAttemptTime) {
        this.state.state = 'HALF_OPEN';
        this.state.successes = 0;
      } else {
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service temporarily unavailable.`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state.state === 'HALF_OPEN') {
      this.state.successes++;
      if (this.state.successes >= this.successThreshold) {
        this.state.state = 'CLOSED';
        this.state.failures = 0;
      }
    } else if (this.state.state === 'CLOSED') {
      this.state.failures = 0;
    }
  }

  private onFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    if (this.state.state === 'CLOSED' && this.state.failures >= this.failureThreshold) {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    } else if (this.state.state === 'HALF_OPEN') {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    }
  }

  getStatus(): CircuitBreakerStatus {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt:
        this.state.nextAttemptTime > 0 ? new Date(this.state.nextAttemptTime) : undefined,
    };
  }

  reset(): void {
    this.state = {
      state: 'CLOSED',
      failures: 0,
      lastFailureTime: 0,
      nextAttemptTime: 0,
      successes: 0,
    };
  }
}

// ============================================================
// Retry Helper
// ============================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 100,
  backoffMultiplier: number = 2,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      const delay = baseDelayMs * Math.pow(backoffMultiplier, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

// ============================================================
// Handler Configuration
// ============================================================

export interface WelcomeEmailHandlerOptions {
  enabled?: boolean;
  fromEmail?: string;
  replyToEmail?: string;
  enableCircuitBreaker?: boolean;
  circuitBreakerThreshold?: number;
  circuitBreakerTimeoutMs?: number;
  maxRetries?: number;
  retryBaseDelayMs?: number;
  enableLogging?: boolean;
  enableMetrics?: boolean;
}

// ============================================================
// Main Handler Implementation
// ============================================================

@Injectable()
export class SendWelcomeEmailHandler {
  private readonly logger = new Logger(SendWelcomeEmailHandler.name);
  private readonly options: Required<WelcomeEmailHandlerOptions>;
  private readonly circuitBreaker: CircuitBreaker;

  constructor(
    private readonly emailSender: IEmailSender,
    private readonly templateEngine: ITemplateEngine,
    private readonly metricsService?: IMetricsService,
    private readonly tracerService?: ITracerService,
    options?: WelcomeEmailHandlerOptions,
  ) {
    this.options = {
      enabled: options?.enabled ?? true,
      fromEmail: options?.fromEmail || EMAIL_CONFIG.FROM_EMAIL || 'noreply@vubon.com.bd',
      replyToEmail: options?.replyToEmail || SUPPORT_EMAIL || 'support@vubon.com.bd',
      enableCircuitBreaker: options?.enableCircuitBreaker ?? true,
      circuitBreakerThreshold: options?.circuitBreakerThreshold ?? 5,
      circuitBreakerTimeoutMs: options?.circuitBreakerTimeoutMs ?? 30000,
      maxRetries: options?.maxRetries ?? 3,
      retryBaseDelayMs: options?.retryBaseDelayMs ?? 100,
      enableLogging: options?.enableLogging ?? true,
      enableMetrics: options?.enableMetrics ?? true,
    };

    this.circuitBreaker = CircuitBreaker.getInstance('SendWelcomeEmailHandler');
  }

  // ============================================================
  // Main Handle Method
  // ============================================================

  async handle(event: UserRegisteredEvent): Promise<void> {
    if (!this.options.enabled) {
      this.logger.debug(`[${event.correlationId}] Welcome email handler disabled, skipping`);
      return;
    }

    const startTime = Date.now();
    const span = this.tracerService?.startSpan('SendWelcomeEmailHandler.handle', {
      userId: event.userId,
      correlationId: event.correlationId,
    });

    try {
      this.logger.debug(
        `[${event.correlationId}] Processing welcome email for user: ${event.userId}`,
      );

      this.metricsService?.incrementCounter('welcome_email.attempted', {
        userId: event.userId,
        correlationId: event.correlationId,
      });

      const locale = event.preferredLanguage || 'en';

      // ✅ FIXED: Await the async buildEmailData
      const emailData = await this.buildEmailData(event, locale);

      let sendResult;
      if (this.options.enableCircuitBreaker) {
        sendResult = await this.circuitBreaker.call(async () =>
          withRetry(
            () => this.emailSender.sendEmail(emailData),
            this.options.maxRetries,
            this.options.retryBaseDelayMs,
          ),
        );
      } else {
        sendResult = await withRetry(
          () => this.emailSender.sendEmail(emailData),
          this.options.maxRetries,
          this.options.retryBaseDelayMs,
        );
      }

      const duration = Date.now() - startTime;

      if (this.options.enableLogging) {
        this.logger.log(
          `[${event.correlationId}] Welcome email sent successfully to ${maskEmail(event.email)} (${duration}ms)`,
          {
            userId: event.userId,
            email: maskEmail(event.email),
            messageId: sendResult.messageId,
            duration,
            locale,
          },
        );
      }

      this.metricsService?.incrementCounter('welcome_email.sent', {
        userId: event.userId,
        correlationId: event.correlationId,
        locale,
      });
      this.metricsService?.recordHistogram('welcome_email.duration', duration, {
        success: 'true',
      });

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();
    } catch (error) {
      const err = error as Error;
      const duration = Date.now() - startTime;

      this.logger.error(
        `[${event.correlationId}] Failed to send welcome email to ${maskEmail(event.email)}: ${err.message}`,
        {
          userId: event.userId,
          email: maskEmail(event.email),
          error: err.message,
          stack: err.stack,
          duration,
        },
      );

      this.metricsService?.incrementCounter('welcome_email.failed', {
        userId: event.userId,
        correlationId: event.correlationId,
        error: err.name || 'unknown',
      });
      this.metricsService?.recordHistogram('welcome_email.duration', duration, {
        success: 'false',
      });

      span?.setStatus({ code: 2, message: err.message });
      span?.end();
    }
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /**
   * Build email data with i18n support
   * ✅ FIXED: Made async and added await for buildEmailContent
   */
  private async buildEmailData(
    event: UserRegisteredEvent,
    locale: 'en' | 'bn',
  ): Promise<{
    to: string;
    subject: string;
    html: string;
    text: string;
    from: string;
    replyTo: string;
    correlationId: string;
  }> {
    const isBengali = locale === 'bn';
    const userFirstName = event.fullName.split(' ')[0] || 'User';
    const displayName = event.displayName || userFirstName;

    const subject = isBengali
      ? `স্বাগতম ${displayName}! - ${APP_NAME}-এ আপনার অ্যাকাউন্ট তৈরি হয়েছে`
      : `Welcome ${displayName}! - Your account has been created at ${APP_NAME}`;

    // ✅ FIXED: Added await here
    const emailContent = await this.buildEmailContent(event, locale);

    return {
      to: event.email,
      subject,
      html: emailContent.html,
      text: emailContent.text,
      from: this.options.fromEmail,
      replyTo: this.options.replyToEmail,
      correlationId: event.correlationId,
    };
  }

  /**
   * Build email content with template or fallback
   */
  private async buildEmailContent(
    event: UserRegisteredEvent,
    locale: 'en' | 'bn',
  ): Promise<{ html: string; text: string }> {
    const isBengali = locale === 'bn';
    const userFirstName = event.fullName.split(' ')[0] || 'User';
    const displayName = event.displayName || userFirstName;

    const templateData = {
      userName: displayName,
      fullName: event.fullName,
      email: event.email,
      phone: event.phone || '',
      registrationDate: formatDisplayDate(new Date(event.timestamp), locale),
      appName: APP_NAME,
      supportEmail: SUPPORT_EMAIL || 'support@vubon.com.bd',
      year: new Date().getFullYear(),
      verificationLink: this.generateVerificationLink(event),
      headerColor: EMAIL_CONFIG.HEADER_COLOR,
      companyName: EMAIL_CONFIG.COMPANY_NAME,
    };

    if (this.templateEngine) {
      try {
        const templateName = isBengali ? 'welcome-email-bn' : 'welcome-email-en';
        const html = await this.templateEngine.render(templateName, templateData, locale);
        const text = this.stripHtml(html);
        return { html, text };
      } catch (error) {
        this.logger.warn(
          `[${event.correlationId}] Template rendering failed, using fallback:`,
          error,
        );
      }
    }

    return {
      html: this.buildFallbackHtml(locale, templateData),
      text: this.buildFallbackText(locale, templateData),
    };
  }

  /**
   * Build fallback HTML template
   * ✅ FIXED: Removed unused event parameter
   */
  private buildFallbackHtml(locale: 'en' | 'bn', data: Record<string, unknown>): string {
    const isBengali = locale === 'bn';

    if (isBengali) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>স্বাগতম ${data.userName}!</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>স্বাগতম, ${data.userName}! 🎉</h1>
          </div>
          <div class="content">
            <p>প্রিয় ${data.fullName},</p>
            <p>আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। আমরা ${data.appName} পরিবারে আপনাকে স্বাগতম জানাচ্ছি!</p>
            <p>আপনার অ্যাকাউন্ট তথ্য:</p>
            <ul>
              <li><strong>ইমেইল:</strong> ${data.email}</li>
              ${data.phone ? `<li><strong>ফোন:</strong> ${data.phone}</li>` : ''}
              <li><strong>নিবন্ধনের তারিখ:</strong> ${data.registrationDate}</li>
            </ul>
            <p>আপনার অ্যাকাউন্ট যাচাই করতে নিচের বাটনে ক্লিক করুন:</p>
            <div style="text-align: center;">
              <a href="${data.verificationLink}" class="button">অ্যাকাউন্ট যাচাই করুন</a>
            </div>
            <p>যদি আপনি এই অ্যাকাউন্ট তৈরি না করে থাকেন, তাহলে দয়া করে আমাদের সাপোর্ট টিমকে জানান: <a href="mailto:${data.supportEmail}">${data.supportEmail}</a></p>
            <p>শুভেচ্ছা,<br>${data.appName} টিম</p>
          </div>
          <div class="footer">
            <p>&copy; ${data.year} ${data.appName}. All rights reserved.</p>
            <p>${data.supportEmail}</p>
          </div>
        </body>
        </html>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome ${data.userName}!</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome, ${data.userName}! 🎉</h1>
        </div>
        <div class="content">
          <p>Dear ${data.fullName},</p>
          <p>Your account has been successfully created. Welcome to the ${data.appName} family!</p>
          <p>Your account details:</p>
          <ul>
            <li><strong>Email:</strong> ${data.email}</li>
            ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ''}
            <li><strong>Registration Date:</strong> ${data.registrationDate}</li>
          </ul>
          <p>To verify your account, please click the button below:</p>
          <div style="text-align: center;">
            <a href="${data.verificationLink}" class="button">Verify Your Account</a>
          </div>
          <p>If you didn't create this account, please contact our support team at <a href="mailto:${data.supportEmail}">${data.supportEmail}</a></p>
          <p>Best regards,<br>${data.appName} Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${data.year} ${data.appName}. All rights reserved.</p>
          <p>${data.supportEmail}</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Build fallback plain text template
   * ✅ FIXED: Removed unused event parameter
   */
  private buildFallbackText(locale: 'en' | 'bn', data: Record<string, unknown>): string {
    const isBengali = locale === 'bn';

    if (isBengali) {
      return `
প্রিয় ${data.fullName},

আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। ${data.appName} পরিবারে আপনাকে স্বাগতম!

আপনার অ্যাকাউন্ট তথ্য:
- ইমেইল: ${data.email}
${data.phone ? `- ফোন: ${data.phone}` : ''}
- নিবন্ধনের তারিখ: ${data.registrationDate}

অ্যাকাউন্ট যাচাই করতে এই লিংকে যান:
${data.verificationLink}

যদি আপনি এই অ্যাকাউন্ট তৈরি না করে থাকেন, তাহলে আমাদের সাপোর্ট টিমকে জানান: ${data.supportEmail}

শুভেচ্ছা,
${data.appName} টিম
---
${data.appName} - বাংলাদেশের #১ ই-কমার্স
${data.supportEmail}
`;
    }

    return `
Dear ${data.fullName},

Your account has been successfully created. Welcome to ${data.appName}!

Your account details:
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
- Registration Date: ${data.registrationDate}

To verify your account, please visit this link:
${data.verificationLink}

If you didn't create this account, please contact our support team: ${data.supportEmail}

Best regards,
${data.appName} Team
---
${data.appName} - Bangladesh's #1 E-commerce
${data.supportEmail}
`;
  }

  /**
   * Generate verification link
   */
  private generateVerificationLink(event: UserRegisteredEvent): string {
    const baseUrl = process.env['APP_URL'] || 'https://vubon.com.bd';
    return `${baseUrl}/auth/verify-email?userId=${event.userId}&token=PLACEHOLDER_TOKEN&lang=${event.preferredLanguage}`;
  }

  /**
   * Simple HTML stripper for plain text version
   */
  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

// ============================================================
// Module Configuration
// ============================================================

export const WELCOME_EMAIL_HANDLER_OPTIONS = 'WELCOME_EMAIL_HANDLER_OPTIONS';

export const SendWelcomeEmailHandlerModuleConfig = {
  provide: WELCOME_EMAIL_HANDLER_OPTIONS,
  useValue: {},
};

export type { WelcomeEmailHandlerOptions as WelcomeEmailHandlerOptionsType };
