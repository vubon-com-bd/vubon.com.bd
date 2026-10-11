/**
 * TemplateRendererService — sync render facade with cache
 * @module notification-service/infrastructure/services/internal
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
} from '../../../domain/repositories/template.repository.interface.js';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo.js';
import { NotificationTemplateRendererService } from '../../../domain/services/notification-template-renderer.service.js';
import { TemplateCacheRepository } from '../../persistence/cache/repositories/template.cache.repository.js';
import type { TemplateRenderResponseDTO } from '../../../application/dtos/responses/template-response.dto.js';

export const TEMPLATE_RENDERER_SERVICE = Symbol('TEMPLATE_RENDERER_SERVICE');

export interface ITemplateRendererService {
  render(
    templateId: string,
    data: Readonly<Record<string, unknown>>,
    locale?: string,
    useCache?: boolean,
  ): Promise<TemplateRenderResponseDTO>;
}

@Injectable()
export class TemplateRendererService implements ITemplateRendererService {
  private readonly logger = new Logger(TemplateRendererService.name);

  constructor(
    @Inject(TEMPLATE_REPOSITORY) private readonly templateRepo: TemplateRepository,
    private readonly cache: TemplateCacheRepository,
  ) {}

  async render(
    templateId: string,
    data: Readonly<Record<string, unknown>>,
    locale?: string,
    useCache = true,
  ): Promise<TemplateRenderResponseDTO> {
    const vo = TemplateIdVO.create(templateId);
    const template = await this.templateRepo.findByIdVO(vo);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const effectiveLocale = locale ?? template.locale.value;

    if (useCache) {
      const cached = await this.cache.getRender(
        templateId,
        template.version,
        effectiveLocale,
        data,
      );
      if (cached) {
        this.logger.debug(`Render cache HIT for ${templateId}`);
        return cached;
      }
    }

    const result = NotificationTemplateRendererService.render({ template, data });
    const dto: TemplateRenderResponseDTO = {
      subject: result.subject,
      body: result.body,
      bodyHtml: result.bodyHtml,
      missingVariables: result.missingVariables,
      resolvedVariables: result.resolvedVariables,
    };

    if (useCache && result.missingVariables.length === 0) {
      await this.cache.setRender(templateId, template.version, effectiveLocale, data, dto);
    }

    return dto;
  }
}
