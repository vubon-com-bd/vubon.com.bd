/**
 * KnowledgeArticleIdVO — Knowledge base article identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'kb_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class KnowledgeArticleIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KnowledgeArticleIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('KnowledgeArticleId must be a string', 'knowledgeArticleId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `KnowledgeArticleId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'knowledgeArticleId',
      );
    }
    return new KnowledgeArticleIdVO(trimmed);
  }

  static generate(): KnowledgeArticleIdVO {
    const suffix = Date.now().toString(36);
    return KnowledgeArticleIdVO.create(`${PREFIX}${suffix}`);
  }
}
