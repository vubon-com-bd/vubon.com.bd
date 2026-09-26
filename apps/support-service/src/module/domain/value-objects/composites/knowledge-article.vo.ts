/**
 * KnowledgeArticleVO — KB article composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { KnowledgeArticleIdVO } from '../primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../primitives/knowledge-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface KnowledgeArticleVOProps {
  readonly id: KnowledgeArticleIdVO;
  readonly title: KnowledgeArticleTitleVO;
  readonly body: KnowledgeArticleBodyVO;
  readonly status: KnowledgeStatusVO;
  readonly authorId: UserIdVO;
  readonly categoryId?: string;
  readonly tags?: readonly string[];
}

export class KnowledgeArticleVO extends BaseVO<Readonly<KnowledgeArticleVOProps>> {
  private constructor(props: KnowledgeArticleVOProps) {
    super(
      Object.freeze({
        ...props,
        tags: props.tags ? Object.freeze([...props.tags]) : Object.freeze([]),
      }),
    );
  }

  static create(props: KnowledgeArticleVOProps): KnowledgeArticleVO {
    if (!props.id || !props.title || !props.body || !props.authorId) {
      throw new ValidationError(
        'KnowledgeArticleVO requires id, title, body, authorId',
        'knowledgeArticle',
      );
    }
    return new KnowledgeArticleVO(props);
  }

  get id(): KnowledgeArticleIdVO {
    return this.value.id;
  }

  get title(): KnowledgeArticleTitleVO {
    return this.value.title;
  }

  get body(): KnowledgeArticleBodyVO {
    return this.value.body;
  }

  get isPublished(): boolean {
    return this.value.status.isPublished();
  }

  get readingTime(): number {
    return this.value.body.readingTimeMinutes;
  }

  get tags(): readonly string[] {
    return this.value.tags ?? [];
  }

  get isLongForm(): boolean {
    return this.value.body.isLongForm;
  }
}
