/**
 * TemplateVariableService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  TEMPLATE_VARIABLE_REPOSITORY,
  type TemplateVariableRepository,
} from '@domain/repositories/template-variable.repository.interface.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import type { TemplateVariableEntity } from '@domain/entities/template-variable.entity.js';

import type {
  ITemplateVariableService,
  TemplateVariableResponseDTO,
} from '@application/services/interfaces/template-variable.service.interface.js';

@Injectable()
export class TemplateVariableService implements ITemplateVariableService {
  constructor(
    @Inject(TEMPLATE_VARIABLE_REPOSITORY)
    private readonly repo: TemplateVariableRepository,
  ) {}

  async listByTemplate(templateId: string): Promise<readonly TemplateVariableResponseDTO[]> {
    const vo = TemplateIdVO.create(templateId);
    const items = await this.repo.findByTemplate(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listRequired(templateId: string): Promise<readonly TemplateVariableResponseDTO[]> {
    const items = await this.repo.findRequired(templateId);
    return items.map((e) => this.toDTO(e));
  }

  async getByName(templateId: string, name: string): Promise<TemplateVariableResponseDTO | null> {
    const entity = await this.repo.findByName(templateId, name);
    if (!entity) return null;
    return this.toDTO(entity);
  }

  private toDTO(e: TemplateVariableEntity): TemplateVariableResponseDTO {
    return {
      id: e.id,
      templateId: e.templateId.value,
      name: e.variable.name,
      type: e.variable.type,
      required: e.variable.required,
      defaultValue: e.variable.defaultValue,
      description: e.variable.description,
      usageCount: e.usageCount,
    };
  }
}
