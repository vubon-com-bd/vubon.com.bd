/**
 * TemplateRendererWorker — async template rendering (off-critical-path)
 * @module notification-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import type { RenderTemplatePayload } from '../queues/template.queue.js';
import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
} from '../../domain/repositories/template.repository.interface.js';
import { TemplateIdVO } from '../../domain/value-objects/primitives/template-id.vo.js';
import { NotificationTemplateRendererService } from '../../domain/services/notification-template-renderer.service.js';
import { TemplateCacheRepository } from '../persistence/cache/repositories/template.cache.repository.js';

@Injectable()
export class TemplateRendererWorker extends BaseWorker<RenderTemplatePayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.RENDER_TEMPLATE] as const;

  constructor(
    queueService: QueueService,
    @Inject(TEMPLATE_REPOSITORY) private readonly templateRepo: TemplateRepository,
    private readonly cache: TemplateCacheRepository,
  ) {
    super(queueService, 'TemplateRendererWorker');
  }

  protected async handle(payload: RenderTemplatePayload): Promise<unknown> {
    const { templateId, data, locale, cacheResult } = payload;
    this.logger.debug(`Render template ${templateId} locale=${locale ?? 'en'}`);

    const vo = TemplateIdVO.create(templateId);
    const template = await this.templateRepo.findByIdVO(vo);
    if (!template) return { skipped: true, reason: 'not_found' };

    const result = NotificationTemplateRendererService.render({ template, data });

    if (cacheResult) {
      await this.cache.setRender(
        templateId,
        template.version,
        locale ?? template.locale.value,
        data,
        {
          subject: result.subject,
          body: result.body,
          bodyHtml: result.bodyHtml,
          missingVariables: result.missingVariables,
          resolvedVariables: result.resolvedVariables,
        },
      );
    }

    return {
      rendered: true,
      missingCount: result.missingVariables.length,
      bodyLength: result.body.length,
    };
  }

  protected concurrency(): number {
    return 8;
  }
}
