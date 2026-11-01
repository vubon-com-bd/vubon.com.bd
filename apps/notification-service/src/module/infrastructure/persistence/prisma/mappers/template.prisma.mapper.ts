/**
 * TemplatePrismaMapper — Prisma NotificationTemplate ↔ TemplateEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma `variables` (Json array) → TemplateVO.variables (TemplateVariableVO[])
 */
import type { PrismaNotificationTemplate } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
  jsonAs,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateTypeVO } from '@domain/primitives/template-type.vo.js';

interface VariableJsonShape {
  readonly name?: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export class TemplatePrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationTemplate): TemplateEntity {
    const variables = this.buildVariables(raw.variables);

    const vo = TemplateVO.reconstitute({
      id: TemplateIdVO.reconstitute(raw.id),
      name: TemplateNameVO.reconstitute(raw.name),
      slug: raw.slug,
      type: TemplateTypeVO.reconstitute(raw.type),
      status: raw.status as never,
      format: TemplateFormatVO.reconstitute(raw.bodyHtml ? 'html' : 'text'),
      subject: raw.subject ? TemplateContentVO.reconstitute(raw.subject) : undefined,
      body: TemplateContentVO.reconstitute(raw.body),
      variables,
      locale: raw.locale,
      version: raw.version,
    });

    return TemplateEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        renderedHistory: [],
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: TemplateEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      type: vo.type.value,
      status: vo.status,
      category: 'system',
      locale: vo.locale,
      subject: vo.subject?.value ?? null,
      body: vo.body.value,
      bodyHtml: null,
      variables: vo.variables.map((v) => ({
        name: v.name,
        type: v.type,
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      })),
      version: vo.version,
      parentId: null,
      createdBy: '00000000-0000-0000-0000-000000000000',
      updatedBy: null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // ═══════════════ Helpers ═══════════════
  private static buildVariables(rawVariables: unknown): readonly TemplateVariableVO[] {
    if (!rawVariables) return Object.freeze([]);
    const list = Array.isArray(rawVariables) ? rawVariables : [];

    return Object.freeze(
      list
        .filter((v): v is VariableJsonShape => typeof v === 'object' && v !== null)
        .filter((v) => v.name && v.type)
        .map((v) =>
          TemplateVariableVO.reconstitute({
            name: v.name!,
            type: v.type as never,
            required: v.required ?? false,
            defaultValue: v.defaultValue,
            description: v.description,
          }),
        ),
    );
  }

  static readonly _helpers = { jsonRecord, jsonAs };
}
