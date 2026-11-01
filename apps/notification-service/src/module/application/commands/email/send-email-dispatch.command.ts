/**
 * SendEmailDispatchCommand — dispatches already-created notification to email provider
 * @module notification-service/application/commands/email
 *
 * No circular flow — this command sends to provider directly.
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendEmailDispatchCommand extends BaseCommand {
  readonly type = 'notification.email.dispatch';
  constructor(
    public readonly notificationId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
