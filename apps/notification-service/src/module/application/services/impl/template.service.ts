/**
 * TemplateService
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - TemplateValidatorService (validate before create)
 *  - TemplateRendererService (render for test)
 *  - Event publishing
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
  type TemplateListOptions,
} from '@domain/repositories/template.repository.interface.js';
import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/value-objects/composites/template.vo.js';
import { TemplateTypeVO } from '@domain/primitives/template-type.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateRendererService } from '@domain/services/template-renderer.service.js';
import { TemplateValidatorService } from '@domain/services/template-validator.service.js';
import { TemplateRenderVO } from '@domain/composites/template-render.vo.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { TemplateMapper } from '@application/mappers/template.mapper.js';
import {
  TemplateNotFoundApplicationError,
  TemplateCreationError,
  TemplateUpdateError,
  TemplateRenderApplicationError,
  TemplateSlugConflictError,
  TemplateValidationError,
} from '@application/errors/template.errors.js';

import type {
  ITemplateService,
  TemplateListOptionsDTO,
} from '@application/services/interfaces/template.service.interface.js';
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  TestTemplateRequestDTO,
} from '@application/dtos/requests/template/index.js';
import type {
  TemplateResponseDTO,
  TemplateListResponseDTO,
  TemplateRenderResponseDTO,
} from '@application/dtos/responses/template-response.dto.js';

@Injectable()
export class TemplateService implements ITemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly repo: TemplateRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ CREATE ═══════════════
  async create(
    dto: CreateTemplateRequestDTO,
    actorId?: string,
  ): Promise<TemplateResponseDTO> {
    const now = new Date().toISOString();

    // Check slug uniqueness
    const existing = await this.repo.findBySlug(dto.slug);
    if (existing) throw new TemplateSlugConflictError(dto.slug);

    // Validate template
    try {
      TemplateValidatorService.assertValid({
        body: dto.body,
        subject: dto.subject,
        declaredVariables: (dto.variables ?? []) as never,
        allowHtml: true,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid template';
      throw new TemplateValidationError(msg);
    }

    const id = randomUUID();
    let entity: TemplateEntity;
    try {
      // Build via TemplateEntity.create (assumes VO assembly in application layer)
      entity = await this.buildAndCreate({ id, dto, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new TemplateCreationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Template ${saved.id} created — slug=${dto.slug} by=${actorId ?? 'system'}`);
    return TemplateMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: CreateTemplateRequestDTO;
    now: string;
  }): Promise<TemplateEntity> {
    const { id, dto, now } = args;

    // ─── Assemble primitive VOs ───
    const idVO = TemplateIdVO.create(id);
    const nameVO = TemplateNameVO.create(dto.name);
    const typeVO = TemplateTypeVO.create(dto.type);
    const formatVO = TemplateFormatVO.create(dto.bodyHtml ? 'html' : 'text');
    const contentVO = TemplateContentVO.create(dto.body);
    const subjectVO = dto.subject
      ? TemplateContentVO.create(dto.subject)
      : undefined;

    // ─── Assemble variables ───
    const variablesVO = (dto.variables ?? []).map((v) =>
      TemplateVariableVO.create({
        name: v.name,
        type: v.type as never,
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      }),
    );

    // ─── Assemble composite VO ───
    const vo = TemplateVO.create({
      id: idVO,
      name: nameVO,
      slug: dto.slug,
      type: typeVO,
      status: 'draft',
      format: formatVO,
      subject: subjectVO,
      body: contentVO,
      variables: variablesVO,
      locale: dto.locale ?? 'en',
      version: 1,
    });

    // ─── Create entity ───
    return TemplateEntity.create({ id: idVO, vo, now });
  }

  // ═══════════════ UPDATE ═══════════════
  async update(
    dto: UpdateTemplateRequestDTO,
    actorId?: string,
  ): Promise<TemplateResponseDTO> {
    const entity = await this.load(dto.templateId);
    const now = new Date().toISOString();

    try {
      if (dto.body) {
        entity.updateBody(dto.body as never, now);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new TemplateUpdateError(dto.templateId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Template ${saved.id} updated by ${actorId ?? 'system'}`);
    return TemplateMapper.toResponse(saved);
  }

  // ═══════════════ TEST (render) ═══════════════
  async test(
    dto: TestTemplateRequestDTO,
    _actorId?: string,
  ): Promise<TemplateRenderResponseDTO> {
    const entity = await this.load(dto.templateId);
    const now = new Date().toISOString();

    try {
      const result = TemplateRendererService.render({
        template: entity.vo.body.value,
        data: dto.variables as Readonly<Record<string, unknown>>,
        escapeHtml: false,
      });

      const renderVO = TemplateRenderVO.create({
        templateId: entity.templateId,
        subject: entity.vo.subject?.value,
        body: result.output,
        missingVariables: result.missingVariables,
        renderedAt: now,
        locale: dto.locale ?? entity.vo.locale,
      });

      entity.recordRender(renderVO, now);
      await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(entity);

      return {
        templateId: entity.id,
        subject: entity.vo.subject?.value,
        body: result.output,
        bodyHtml: undefined,
        missingVariables: result.missingVariables,
        renderedAt: now,
        locale: dto.locale ?? entity.vo.locale,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Render failed';
      throw new TemplateRenderApplicationError(dto.templateId, msg);
    }
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<TemplateResponseDTO> {
    const entity = await this.load(id);
    return TemplateMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<TemplateResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new TemplateNotFoundApplicationError(slug);
    return TemplateMapper.toResponse(entity);
  }

  async list(options: TemplateListOptionsDTO): Promise<TemplateListResponseDTO> {
    const result = await this.repo.findPaginated(options as TemplateListOptions);
    return TemplateMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async load(id: string): Promise<TemplateEntity> {
    const vo = TemplateIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new TemplateNotFoundApplicationError(id);
    return entity;
  }
}
