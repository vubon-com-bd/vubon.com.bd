/**
 * Send Welcome Email Event Handler
 */

import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event.js';
import { INotificationSender } from '../../domain/ports/notification-sender.port.js';

@Injectable()
export class SendWelcomeEmailHandler {
  private readonly logger = new Logger(SendWelcomeEmailHandler.name);

  constructor(private readonly notificationSender: INotificationSender) {}

  @OnEvent('user.registered', { async: true })
  async handle(event: UserRegisteredEvent): Promise<void> {
    const { email, firstName } = event;

    this.logger.log(`Sending welcome email to: ${email}`);

    try {
      const sent = await this.notificationSender.sendWelcomeEmail(email, firstName, {
        loginLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`,
      });

      if (sent) {
        this.logger.log(`Welcome email sent successfully to: ${email}`);
      } else {
        this.logger.warn(`Failed to send welcome email to: ${email}`);
      }
    } catch (error) {
      this.logger.error(`Error sending welcome email: ${error}`);
    }
  }
}
