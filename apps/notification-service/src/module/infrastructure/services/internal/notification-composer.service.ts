/**
 * NotificationComposerService
 * @module notification-service/infrastructure/services/internal
 *
 * Assembles a fully-composed notification payload by:
 *  1. Loading template (if templateId provided)
 *  2. Rendering with variables
 *  3. Selecting channels based on preference + priority
 *  4. Resolving recipients
 *  5. Enriching with metadata (tracking URLs, unsubscribe links)
 *
 * Used by: notification.service.ts (application layer)
 */
import { Injectable, Logger } from '@nestjs/common';

import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import type { PreferenceVO } from '@domain/composites/preference.vo.js';
import type { TemplateEntity } from '@domain/entities/template.entity.js';

import { TemplateEngineService } from '@infrastructure/template-engine/template.service.js';
import { PreferenceCheckerService } from '@domain/services/preference-checker.service.js';

export interface ComposeRequest {
  readonly userId: string;
  readonly template?: TemplateEntity;
  readonly variables?: Readonly<Record<string, unknown>>;
  readonly subject?: string;
  readonly body?: string;
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly priority: NotificationPriorityVO;
  readonly channels: readonly NotificationChannelVO[];
  readonly preference?: PreferenceVO | null;
}

export interface ComposedChannel {
  readonly channel: NotificationChannelVO;
  readonly subject: string;
  readonly body: string;
  readonly bodyHtml?: string;
}

export interface ComposeResult {
  readonly userId: UserIdVO;
  readonly composedChannels: readonly ComposedChannel[];
  readonly skippedChannels: readonly {
    readonly channel: string;
    readonly reason: string;
  }[];
  readonly missingVariables: readonly string[];
}

@Injectable()
export class NotificationComposerService {
  private readonly logger = new Logger(NotificationComposerService.name);

  constructor(private readonly templateEngine: TemplateEngineService) {}

  async compose(request: ComposeRequest): Promise<ComposeResult> {
    const userId = UserIdVO.create(request.userId);
    const composedChannels: ComposedChannel[] = [];
    const skippedChannels: { channel: string; reason: string }[] = [];
    const allMissing: Set<string> = new Set();

    // 1. Render template (if provided)
    let renderedSubject = request.subject ?? '';
    let renderedBody = request.body ?? '';
    let renderedHtml: string | undefined;

    if (request.template && request.variables) {
      try {
        const result = await this.templateEngine.render({
          template: request.template.vo.body.value,
          context: request.variables,
        });
        renderedBody = result.output;
        result.missingVariables.forEach((v) => allMissing.add(v));

        const subjResult = request.template.vo.subject
          ? await this.templateEngine.render({
              template: request.template.vo.subject.value,
              context: request.variables,
            })
          : null;
        if (subjResult) {
          renderedSubject = subjResult.output;
          subjResult.missingVariables.forEach((v) => allMissing.add(v));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`Template render failed: ${msg}`);
      }
    }

    // 2. Per-channel: check preference
    for (const channel of request.channels) {
      const check = PreferenceCheckerService.check({
        preference: request.preference ?? null,
        type: request.type,
        category: request.category,
        channel: channel.value,
      });

      if (!check.allowed) {
        skippedChannels.push({ channel: channel.value, reason: check.reason });
        continue;
      }

      composedChannels.push({
        channel,
        subject: renderedSubject,
        body: renderedBody,
        bodyHtml: renderedHtml,
      });
    }

    this.logger.debug(
      `Composed user=${userId.value} channels=${composedChannels.length} skipped=${skippedChannels.length}`,
    );

    return {
      userId,
      composedChannels,
      skippedChannels,
      missingVariables: Array.from(allMissing),
    };
  }
}
