/**
 * KnowledgeStatusVO — KB article publication status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { KNOWLEDGE_BASE_STATUS } from '@vubon/shared-constants/support';

export type KnowledgeStatusValue =
  (typeof KNOWLEDGE_BASE_STATUS)[keyof typeof KNOWLEDGE_BASE_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(KNOWLEDGE_BASE_STATUS),
);

const PUBLISHED: ReadonlySet<string> = new Set<string>(['published']);

export class KnowledgeStatusVO extends BaseStatusVO<KnowledgeStatusValue> {
  private constructor(value: KnowledgeStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): KnowledgeStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid knowledge status: ${raw}`,
        'knowledgeStatus',
      );
    }
    return new KnowledgeStatusVO(normalized as KnowledgeStatusValue);
  }

  isPublished(): boolean {
    return PUBLISHED.has(this.value);
  }

  isEditable(): boolean {
    return this.value !== ('archived' as KnowledgeStatusValue);
  }
}
