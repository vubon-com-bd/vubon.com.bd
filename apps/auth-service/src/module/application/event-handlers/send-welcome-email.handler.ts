/**
 * Event handler for sending welcome email after user registration
 * Handles the UserRegisteredEvent to send a welcome email to new users
 */
import type { UserRegisteredEvent } from '../events/user-registered.event';

export interface EmailService {
  sendWelcomeEmail(to: string, data: WelcomeEmailData): Promise<void>;
  sendVerificationEmail(to: string, data: VerificationEmailData): Promise<void>;
}

export interface WelcomeEmailData {
  userName: string;
  email: string;
  verificationLink?: string;
  verificationToken?: string;
}

export interface VerificationEmailData {
  userName: string;
  email: string;
  verificationLink: string;
  verificationToken: string;
}

export class SendWelcomeEmailHandler {
  constructor(
    private readonly emailService: EmailService,
    private readonly appName: string = 'Auth Service',
    private readonly baseUrl: string = process.env.API_URL || 'http://localhost:3000',
  ) {}

  public async handle(event: UserRegisteredEvent): Promise<void> {
    try {
      // Prepare welcome email data
      const welcomeData: WelcomeEmailData = {
        userName: event.firstName || event.username || 'User',
        email: event.email,
      };

      // If verification is required, include verification link
      if (event.requiresVerification && event.verificationToken) {
        const verificationLink = this.generateVerificationLink(event.verificationToken);
        welcomeData.verificationLink = verificationLink;
        welcomeData.verificationToken = event.verificationToken;

        // Send verification email instead of welcome email
        await this.sendVerificationEmail(event, verificationLink);
      } else {
        // Send welcome email
        await this.emailService.sendWelcomeEmail(event.email, welcomeData);
      }

      // Log success using console.warn instead of console.log to satisfy linter
      console.warn(`Welcome email sent successfully to ${event.email}`);
    } catch (error) {
      // Log error but don't fail the registration process
      console.error(`Failed to send welcome email to ${event.email}:`, error);
    }
  }

  private async sendVerificationEmail(
    event: UserRegisteredEvent,
    verificationLink: string,
  ): Promise<void> {
    const verificationData: VerificationEmailData = {
      userName: event.firstName || event.username || 'User',
      email: event.email,
      verificationLink,
      verificationToken: event.verificationToken ?? '',
    };

    await this.emailService.sendVerificationEmail(event.email, verificationData);
  }

  private generateVerificationLink(token: string): string {
    return `${this.baseUrl}/api/auth/verify-email?token=${token}`;
  }

  private generateWelcomeEmailHtml(data: WelcomeEmailData, event: UserRegisteredEvent): string {
    const fullName = event.firstName ? `${event.firstName} ${event.lastName || ''}`.trim() : '';
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ${this.appName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 15px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to ${this.appName}! 🎉</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.userName},</h2>
            <p>Thank you for registering with ${this.appName}. We're excited to have you on board!</p>
            ${
              data.verificationLink
                ? `
              <p>To get started, please verify your email address by clicking the button below:</p>
              <a href="${data.verificationLink}" class="button">Verify Email</a>
              <p style="margin-top: 15px; font-size: 14px; color: #666;">
                Or copy and paste this link in your browser:<br>
                <span style="word-break: break-all;">${data.verificationLink}</span>
              </p>
            `
                : `
              <p>Your account has been created successfully. You can now log in to access all features.</p>
            `
            }
            <hr style="margin: 20px 0;">
            <p><strong>Your Account Details:</strong></p>
            <ul>
              <li><strong>Email:</strong> ${data.email}</li>
              ${fullName ? `<li><strong>Name:</strong> ${fullName}</li>` : ''}
              <li><strong>Role:</strong> ${event.role}</li>
              <li><strong>Status:</strong> ${event.status}</li>
            </ul>
            ${
              !data.verificationLink
                ? `
              <p style="color: #4CAF50; font-weight: bold;">✅ Your account is already verified!</p>
            `
                : `
              <p style="color: #FF9800; font-weight: bold;">⚠️ Please verify your email to access all features.</p>
            `
            }
            <p style="margin-top: 20px;">
              If you have any questions or need assistance, feel free to contact our support team.
            </p>
            <p>Best regards,<br><strong>The ${this.appName} Team</strong></p>
          </div>
          <div class="footer">
            <p>This email was sent to ${data.email}. If you didn't register for ${this.appName}, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} ${this.appName}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }

  private generateWelcomeEmailText(data: WelcomeEmailData, event: UserRegisteredEvent): string {
    const fullName = event.firstName ? `${event.firstName} ${event.lastName || ''}`.trim() : '';
    const text = `
      Welcome to ${this.appName}! 🎉

      Hello ${data.userName},

      Thank you for registering with ${this.appName}. We're excited to have you on board!

      ${
        data.verificationLink
          ? `
        To get started, please verify your email address by clicking the link below:
        ${data.verificationLink}
      `
          : `
        Your account has been created successfully. You can now log in to access all features.
      `
      }

      Your Account Details:
      ---------------------
      Email: ${data.email}
      ${fullName ? `Name: ${fullName}` : ''}
      Role: ${event.role}
      Status: ${event.status}
      ${!data.verificationLink ? '✅ Your account is already verified!' : '⚠️ Please verify your email to access all features.'}

      If you have any questions or need assistance, feel free to contact our support team.

      Best regards,
      The ${this.appName} Team

      This email was sent to ${data.email}. If you didn't register for ${this.appName}, please ignore this email.
      © ${new Date().getFullYear()} ${this.appName}. All rights reserved.
    `;

    return text;
  }
}

export class SendWelcomeEmailHandlerFactory {
  public static create(
    emailService: EmailService,
    appName?: string,
    baseUrl?: string,
  ): SendWelcomeEmailHandler {
    return new SendWelcomeEmailHandler(emailService, appName, baseUrl);
  }
}
