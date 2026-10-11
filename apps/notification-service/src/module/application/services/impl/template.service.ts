/**
 * TemplateService — template CRUD + render
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
} from '../../../domain/repositories/template.repository.interface.js';
import { TemplateEntity } from '../../../domain/entities/template.entity.js';

import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo.js';
import { TemplateTypeVO } from '../../../domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../domain/value-objects/primitives/template-category.vo.js';
import { TemplateNameVO } from '../../../domain/value-objects/primitives/template-name.vo.js';
import { TemplateLocaleVO } from '../../../domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableNameVO } from '../../../domain/value-objects/primitives/template-variable-name.vo.js';
import { TemplateVariableVO } from '../../../domain/value-objects/composites/template-variable.vo.js';

import { NotificationTemplateRendererService } from '../../../domain/services/notification-template-renderer.service.js';

import { TemplateMapper } from '../../mappers/template.mapper.js';
import {
  TemplateNotFoundApplicationError,
  TemplateSlugConflictError,
  TemplateNotUsableError,
} from '../../errors/template.errors.js';

import type { ITemplateService } from '../interfaces/template.service.interface.js';
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  RenderTemplateRequestDTO,
  PreviewTemplateRequestDTO,
  GetTemplateRequestDTO,
  GetTemplateBySlugRequestDTO,
  ListTemplatesRequestDTO,
  ActivateTemplateRequestDTO,
  DeactivateTemplateRequestDTO,
  DeprecateTemplateRequestDTO,
  ArchiveTemplateRequestDTO,
  CreateTemplateVersionRequestDTO,
  TemplateVariableInputDTO,
} from '../../dtos/requests/template/index.js';
import type {
  TemplateResponseDTO,
  TemplatePublicResponseDTO,
  TemplateListResponseDTO,
  TemplateRenderResponseDTO,
  TemplatePreviewResponseDTO,
} from '../../dtos/responses/template-response.dto.js';

@Injectable()
export class TemplateService implements ITemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepo: TemplateRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const existing = await this.templateRepo.findBySlugAndLocale(
      dto.slug,
      TemplateLocaleVO.create(dto.locale),
    );
    if (existing) throw new TemplateSlugConflictError(dto.slug);

    const now = new Date().toISOString();
    const entity = TemplateEntity.create({
      id: randomUUID(),
      now,
      props: {
        name: TemplateNameVO.create(dto.name),
        slug: dto.slug,
        type: TemplateTypeVO.create(dto.type),
        category: TemplateCategoryVO.create(dto.category),
        locale: TemplateLocaleVO.create(dto.locale),
        subject: dto.subject,
        body: dto.body,
        bodyHtml: dto.bodyHtml,
        variables: dto.variables.map((v) => this.toVariableVO(v)),
        createdBy: actorId ?? 'system',
      },
    });
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Template created: ${saved.id} slug=${dto.slug}`);
    return TemplateMapper.toResponse(saved);
  }

  async update(dto: UpdateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.update(
      {
        name: dto.name ? TemplateNameVO.create(dto.name) : undefined,
        category: dto.category ? TemplateCategoryVO.create(dto.category) : undefined,
        subject: dto.subject,
        body: dto.body,
        bodyHtml: dto.bodyHtml,
        variables: dto.variables ? dto.variables.map((v) => this.toVariableVO(v)) : undefined,
      },
      actorId ?? 'system',
    );
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async activate(dto: ActivateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.activate(actorId ?? 'system');
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.deactivate(actorId ?? 'system', dto.reason);
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async deprecate(dto: DeprecateTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.deprecate(actorId ?? 'system', dto.replacementTemplateId, dto.reason);
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async archive(dto: ArchiveTemplateRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.archive(actorId ?? 'system');
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async createVersion(dto: CreateTemplateVersionRequestDTO, actorId?: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    entity.createVersion(actorId ?? 'system');
    const saved = await this.templateRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TemplateMapper.toResponse(saved);
  }

  async render(dto: RenderTemplateRequestDTO): Promise<TemplateRenderResponseDTO> {
    const entity = await this.load(dto.templateId);
    if (!entity.isUsable()) {
      throw new TemplateNotUsableError(entity.id, entity.status.value);
    }
    const result = NotificationTemplateRendererService.render({
      template: entity,
      data: dto.data,
    });
    return TemplateMapper.toRenderResponse(result);
  }

  async preview(dto: PreviewTemplateRequestDTO): Promise<TemplatePreviewResponseDTO> {
    const entity = await this.load(dto.templateId);
    const data = dto.sampleData ?? {};
    const result = NotificationTemplateRendererService.render({
      template: entity,
      data,
    });
    return {
      templateId: entity.id,
      subject: result.subject,
      body: result.body,
      bodyHtml: result.bodyHtml,
      variables: entity.variables.map((v) => ({
        name: v.name.value,
        type: v.type as 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email',
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      })),
    };
  }

  async getById(dto: GetTemplateRequestDTO): Promise<TemplateResponseDTO> {
    return TemplateMapper.toResponse(await this.load(dto.templateId));
  }

  async getPublic(dto: GetTemplateRequestDTO): Promise<TemplatePublicResponseDTO> {
    return TemplateMapper.toPublicResponse(await this.load(dto.templateId));
  }

  async getBySlug(dto: GetTemplateBySlugRequestDTO): Promise<TemplateResponseDTO> {
    const entity = dto.locale
      ? await this.templateRepo.findBySlugAndLocale(dto.slug, TemplateLocaleVO.create(dto.locale))
      : await this.templateRepo.findBySlug(dto.slug);
    if (!entity) throw new TemplateNotFoundApplicationError(`slug:${dto.slug}`);
    return TemplateMapper.toResponse(entity);
  }

  async list(dto: ListTemplatesRequestDTO): Promise<TemplateListResponseDTO> {
    const result = await this.templateRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
      filter: dto.filter,
    });
    return TemplateMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  private toVariableVO(v: TemplateVariableInputDTO): TemplateVariableVO {
    return TemplateVariableVO.create({
      name: TemplateVariableNameVO.create(v.name),
      type: v.type,
      required: v.required,
      defaultValue: v.defaultValue,
      description: v.description,
    });
  }

  private async load(id: string): Promise<TemplateEntity> {
    const vo = TemplateIdVO.create(id);
    const entity = await this.templateRepo.findByIdVO(vo);
    if (!entity) throw new TemplateNotFoundApplicationError(id);
    return entity;
  }
}
