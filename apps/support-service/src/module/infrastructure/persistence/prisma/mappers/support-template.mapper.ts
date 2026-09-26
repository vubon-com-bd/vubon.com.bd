/**
 * SupportTemplateMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportTemplate as PrismaSupportTemplate } from '@prisma/client';
import { SupportTemplateEntity } from '../../../../domain/entities/support-template.entity';

@Injectable()
export class SupportTemplateMapper {
  toDomain(raw: PrismaSupportTemplate): SupportTemplateEntity {
    return SupportTemplateEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      name: raw.name,
      content: raw.content,
      language: raw.language,
      isActive: raw.isActive,
      usageCount: raw.usageCount,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SupportTemplateEntity): {
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly content: string;
    readonly language: string;
    readonly isActive: boolean;
    readonly usageCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      name: snap.name,
      content: snap.content,
      language: snap.language,
      isActive: snap.isActive,
      usageCount: snap.usageCount,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
