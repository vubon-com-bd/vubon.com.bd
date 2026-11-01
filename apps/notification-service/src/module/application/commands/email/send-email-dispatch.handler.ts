/**
 * SendEmailDispatchHandler — sends notification to email provider directly
 * @module notification-service/application/commands/email
 *
 * This handler:
 *   1. Fetches notification from repo
 *   2. Extracts email, subject, body, html from notification
 *   3. Calls email provider directly (no NotificationService.send loop!)
 *   4. Marks notification as sent/failed
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { SendEmailDispatchCommand } from './send-email-dispatch.command.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import {
  ProviderResolverService,
} from '@infrastructure/providers/base/provider-resolver.service.js';
import type { EmailProviderInput } from '@infrastructure/providers/base/provider.interface.js';

@CommandHandler(SendEmailDispatchCommand)
export class SendEmailDispatchHandler
  implements ICommandHandler<SendEmailDispatchCommand, { success: boolean; reason?: string }>
{
  private readonly logger = new Logger(SendEmailDispatchHandler.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
    private readonly providerResolver: ProviderResolverService,
  ) {}

  async execute(command: SendEmailDispatchCommand): Promise<{ success: boolean; reason?: string }> {
    const vo = NotificationIdVO.reconstitute(command.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${command.notificationId} not found`);
      return { success: false, reason: 'not-found' };
    }

    // Extract email from recipients (email VO) or data
    const recipients = entity.recipients ?? [];
    const emailFromRecipient = recipients.find((r) => r.email)?.email?.value;
    const dataValue = (entity.vo?.data?.value ?? {}) as { email?: string; html?: string };
    const email = dataValue.email ?? emailFromRecipient;
    
    if (!email) {
      this.logger.warn(`Notification ${command.notificationId}: no email recipient`);
      return { success: false, reason: 'no-recipient' };
    }

    // ─── HTML: prefer content.html (proper field), fallback to data.html ───
    const contentHtml = entity.content?.html;
    const rawBody = entity.vo?.body?.value ?? '';
    const bodyLooksLikeHtml = /<[a-zA-Z][\s\S]*>/.test(rawBody);
    const html = contentHtml ?? dataValue.html ?? (bodyLooksLikeHtml ? rawBody : undefined);
    const subject = entity.vo?.subject?.value ?? 'Notification';
    // Plain text fallback: strip HTML tags if body is HTML, otherwise use as-is
    const text = bodyLooksLikeHtml ? rawBody.replace(/<[^>]*>/g, '').trim() : rawBody;

    try {
      const provider = this.providerResolver.resolve('email');
      this.logger.log(
        `📧 Sending via ${provider.metadata.name} → ${email} | subject="${subject}" | html=${!!html} | source=${contentHtml ? 'content.html' : (dataValue.html ? 'data.html' : 'none')}`,
      );

      const input: EmailProviderInput = {
        to: email,
        subject,
        text,
        html,
      };

      const result = await (provider as { send: (i: EmailProviderInput) => Promise<{ success: boolean; providerMessageId?: string; error?: string }> }).send(input);

      if (!result.success) {
        this.logger.error(
          `Email send failed → ${result.error ?? 'unknown'}`,
        );
        entity.markFailed(result.error ?? 'provider-error');
        await this.repo.save(entity);
        return { success: false, reason: result.error ?? 'provider-error' };
      }

      this.logger.log(`✅ Email sent → ${email} | msgId=${result.providerMessageId}`);
      // Transition: pending → sending → sent (as per state machine)
      const status = entity.status.value;
      if (status === 'pending') {
        entity.markSending();
      }
      entity.markSent();
      await this.repo.save(entity);
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Email dispatch failed: ${msg}`);
      return { success: false, reason: msg };
    }
  }
}
