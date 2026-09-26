/**
 * TemplateService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';

import type { TemplateServiceInterface } from '../interfaces/template.service.interface';
import type { SupportTemplateRepository } from '../../../domain/repositories/support-template.repository.interface';
import { SupportTemplateEntity } from '../../../domain/entities/support-template.entity';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../../../domain/value-objects/primitives/template-type.vo';
import { TemplateContentVO } from '../../../domain/value-objects/primitives/template-content.vo';

import { TemplateMapper } from '../../mappers/template.mapper';
import { TemplateNotFoundException } from '../../errors/template.errors';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template/create-template.dto';
import type { UpdateTemplateRequestDTO } from '../../dtos/requests/template/update-template.dto';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

@Injectable()
export class TemplateService implements TemplateServiceInterface {
  constructor(
    private readonly templateRepo: SupportTemplateRepository,
    private readonly mapper: TemplateMapper,
  ) {}

  async create(input: CreateTemplateRequestDTO): Promise<TemplateResponseDTO> {
    const now = new Date().toISOString();
    const template = SupportTemplateEntity.create({
      id: TemplateIdVO.fromSlug(input.slug),
      type: TemplateTypeVO.create(input.type),
      name: input.name,
      content: TemplateContentVO.create(input.body),
      language: input.locale ?? 'en',
      now,
    });
    await this.templateRepo.save(template);
    return this.mapper.map(template);
  }

  async update(input: UpdateTemplateRequestDTO): Promise<TemplateResponseDTO> {
    const template = await this.loadOrThrow(input.templateId);
    const now = new Date().toISOString();
    if (input.name !== undefined) {
      template.rename(input.name, now);
    }
    if (input.body !== undefined) {
      template.updateContent(TemplateContentVO.create(input.body), now);
    }
    await this.templateRepo.save(template);
    return this.mapper.map(template);
  }

  async getById(templateId: string): Promise<TemplateResponseDTO> {
    const template = await this.loadOrThrow(templateId);
    return this.mapper.map(template);
  }

  async list(page: number, limit: number): Promise<readonly TemplateResponseDTO[]> {
    const all = await this.templateRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const start = (safePage - 1) * safeLimit;
    return this.mapper.toList(all.slice(start, start + safeLimit));
  }

  async render(
    templateId: string,
    values: Readonly<Record<string, string | number>>,
  ): Promise<string> {
    const template = await this.loadOrThrow(templateId);
    const text = template.render(values);
    await this.templateRepo.save(template);
    return text;
  }

  private async loadOrThrow(templateId: string): Promise<SupportTemplateEntity> {
    const template = await this.templateRepo.findById(
      TemplateIdVO.create(templateId),
    );
    if (!template) {
      throw new TemplateNotFoundException(templateId);
    }
    return template;
  }
}
