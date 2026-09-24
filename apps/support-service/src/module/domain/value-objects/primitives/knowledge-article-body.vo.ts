import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class KnowledgeArticleBodyVO extends BaseCodeVO {
  static create(value: string): KnowledgeArticleBodyVO {
    BaseCodeVO.validateNonEmpty(value, 'KnowledgeArticleBody');
    return new KnowledgeArticleBodyVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
