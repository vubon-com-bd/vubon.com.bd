/**
 * TemplatePrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { TemplateEntity } from '../../../../domain/entities/template.entity.js';
import { TemplateTypeVO } from '../../../../domain/value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../../../../domain/value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../../../../domain/value-objects/primitives/template-category.vo.js';
import { TemplateNameVO } from '../../../../domain/value-objects/primitives/template-name.vo.js';
import { TemplateLocaleVO } from '../../../../domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableNameVO } from '../../../../domain/value-objects/primitives/template-variable-name.vo.js';
import { TemplateVariableVO } from '../../../../domain/value-objects/composites/template-variable.vo.js';

export interface PrismaTemplateRow {
  id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  category: string;
  locale: string;
  subject: string | null;
  body: string;
  bodyHtml: string | null;
  variables: unknown;
  version: number;
  parentId: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class TemplatePrismaMapper {
  static toDomain(raw: PrismaTemplateRow): TemplateEntity {
    const varsRaw = Array.isArray(raw.variables) ? raw.variables : [];
    return TemplateEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: TemplateNameVO.reconstitute(raw.name),
        slug: raw.slug,
        type: TemplateTypeVO.reconstitute(raw.type),
        status: TemplateStatusVO.reconstitute(raw.status),
        category: TemplateCategoryVO.reconstitute(raw.category),
        locale: TemplateLocaleVO.reconstitute(raw.locale),
        subject: raw.subject ?? undefined,
        body: raw.body,
        bodyHtml: raw.bodyHtml ?? undefined,
        variables: varsRaw.map((v) => {
          const item = v as Record<string, unknown>;
          return TemplateVariableVO.reconstitute({
            name: TemplateVariableNameVO.reconstitute(String(item['name'])),
            type: (item['type'] as 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email') ?? 'string',
            required: Boolean(item['required']),
            defaultValue: item['defaultValue'] ? String(item['defaultValue']) : undefined,
            description: item['description'] ? String(item['description']) : undefined,
          });
        }),
        templateVersion: raw.version,
        parentId: raw.parentId ?? undefined,
        createdBy: raw.createdBy,
        updatedBy: raw.updatedBy ?? undefined,
      },
    });
  }

  static toPersistence(entity: TemplateEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name.value,
      slug: entity.slug,
      type: entity.type.value,
      status: entity.status.value,
      category: entity.category.value,
      locale: entity.locale.value,
      subject: entity.subject ?? null,
      body: entity.body,
      bodyHtml: entity.bodyHtml ?? null,
      variables: entity.variables.map((v) => ({
        name: v.name.value,
        type: v.type,
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      })),
      version: entity.version,
      parentId: entity.parentId ?? null,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
