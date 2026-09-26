/**
 * KnowledgeArticleTitleVO — KB article title
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseNameVO
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 200;

export class KnowledgeArticleTitleVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KnowledgeArticleTitleVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('KnowledgeArticleTitle must be a string', 'knowledgeArticleTitle');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(
        `KnowledgeArticleTitle too short (min ${MIN_LENGTH})`,
        'knowledgeArticleTitle',
      );
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `KnowledgeArticleTitle too long (max ${MAX_LENGTH})`,
        'knowledgeArticleTitle',
      );
    }
    return new KnowledgeArticleTitleVO(normalized);
  }

  get slug(): string {
    return this.value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }
}
