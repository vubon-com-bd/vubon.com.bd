/**
 * KnowledgeArticleBodyVO — KB article content body
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 20;
const MAX_LENGTH = 100_000;

export class KnowledgeArticleBodyVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KnowledgeArticleBodyVO {
    BaseCodeVO.validateNonEmpty(raw, 'KnowledgeArticleBody');
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `KnowledgeArticleBody too short (min ${MIN_LENGTH})`,
        'knowledgeArticleBody',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `KnowledgeArticleBody too long (max ${MAX_LENGTH})`,
        'knowledgeArticleBody',
      );
    }
    return new KnowledgeArticleBodyVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get readingTimeMinutes(): number {
    return Math.max(1, Math.ceil(this.wordCount / 200));
  }

  get isLongForm(): boolean {
    return this.wordCount > 1000;
  }
}
