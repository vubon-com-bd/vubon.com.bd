/**
 * Log Registration Activity Event Handler
 */

import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event.js';

@Injectable()
export class LogRegistrationActivityHandler {
  private readonly logger = new Logger(LogRegistrationActivityHandler.name);

  @OnEvent('user.registered', { async: true })
  async handle(event: UserRegisteredEvent): Promise<void> {
    const logData = {
      eventType: 'USER_REGISTERED',
      userId: event.userId,
      email: event.email,
      fullName: event.fullName,
      hasPhone: event.hasPhone(),
      registeredAt: event.registeredAt.toISOString(),
      timestamp: new Date().toISOString(),
    };

    this.logger.log({
      message: 'User registration activity',
      ...logData,
    });

    this.logger.debug(`Audit log: ${JSON.stringify(logData)}`);
  }
}
