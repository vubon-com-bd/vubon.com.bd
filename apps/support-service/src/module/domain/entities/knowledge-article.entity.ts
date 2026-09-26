/**
 * KnowledgeArticleEntity — KB article aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<KnowledgeArticleIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { KnowledgeArticleIdVO } from '../value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../value-objects/primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../value-objects/primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../value-objects/primitives/knowledge-status.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CreateKnowledgeArticleInput {
  readonly id: KnowledgeArticleIdVO;
  readonly title: KnowledgeArticleTitleVO;
  readonly body: KnowledgeArticleBodyVO;
  readonly categoryId: TicketCategoryIdVO;
  readonly authorId: UserIdVO;
  readonly tags?: readonly string[];
  readonly now: string;
}

export interface KnowledgeArticleSnapshot {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly status: string;
  readonly categoryId: string;
  readonly authorId: string;
  readonly tags: readonly string[];
  readonly viewCount: number;
  readonly helpfulCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const MAX_TAGS = 10;
const TAG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class KnowledgeArticleEntity extends AggregateRoot<KnowledgeArticleIdVO> {
  private _title: KnowledgeArticleTitleVO;
  private _body: KnowledgeArticleBodyVO;
  private _status: KnowledgeStatusVO;
  private readonly _categoryId: TicketCategoryIdVO;
  private readonly _authorId: UserIdVO;
  private _tags: readonly string[];
  private _viewCount: number;
  private _helpfulCount: number;

  private constructor(
    id: KnowledgeArticleIdVO,
    title: KnowledgeArticleTitleVO,
    body: KnowledgeArticleBodyVO,
    status: KnowledgeStatusVO,
    categoryId: TicketCategoryIdVO,
    authorId: UserIdVO,
    tags: readonly string[],
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._title = title;
    this._body = body;
    this._status = status;
    this._categoryId = categoryId;
    this._authorId = authorId;
    this._tags = Object.freeze([...tags]);
    this._viewCount = 0;
    this._helpfulCount = 0;
  }

  static create(input: CreateKnowledgeArticleInput): KnowledgeArticleEntity {
    if (!input.id || !input.title || !input.body) {
      throw new ValidationError(
        'KnowledgeArticle requires id, title, body',
        'knowledgeArticle',
      );
    }
    const tags = KnowledgeArticleEntity.normalizeTags(input.tags);
    const now = input.now;
    return new KnowledgeArticleEntity(
      input.id,
      input.title,
      input.body,
      KnowledgeStatusVO.create('draft'),
      input.categoryId,
      input.authorId,
      tags,
      now,
      now,
    );
  }

  static rehydrate(snapshot: KnowledgeArticleSnapshot): KnowledgeArticleEntity {
    const article = new KnowledgeArticleEntity(
      KnowledgeArticleIdVO.create(snapshot.id),
      KnowledgeArticleTitleVO.create(snapshot.title),
      KnowledgeArticleBodyVO.create(snapshot.body),
      KnowledgeStatusVO.create(snapshot.status),
      TicketCategoryIdVO.create(snapshot.categoryId),
      UserIdVO.create(snapshot.authorId),
      snapshot.tags,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    article._viewCount = snapshot.viewCount;
    article._helpfulCount = snapshot.helpfulCount;
    return article;
  }

  private static normalizeTags(tags?: readonly string[]): readonly string[] {
    if (!tags || tags.length === 0) return Object.freeze([]);
    if (tags.length > MAX_TAGS) {
      throw new ValidationError(
        `KnowledgeArticle supports max ${MAX_TAGS} tags`,
        'knowledgeArticle',
      );
    }
    const unique = new Set<string>();
    for (const tag of tags) {
      const normalized = tag.trim().toLowerCase();
      if (!TAG_PATTERN.test(normalized)) {
        throw new ValidationError(
          `Invalid tag: ${tag}`,
          'knowledgeArticle',
        );
      }
      unique.add(normalized);
    }
    return Object.freeze(Array.from(unique));
  }

  get title(): KnowledgeArticleTitleVO {
    return this._title;
  }

  get body(): KnowledgeArticleBodyVO {
    return this._body;
  }

  get status(): KnowledgeStatusVO {
    return this._status;
  }

  get categoryId(): TicketCategoryIdVO {
    return this._categoryId;
  }

  get tags(): readonly string[] {
    return this._tags;
  }

  get viewCount(): number {
    return this._viewCount;
  }

  get helpfulCount(): number {
    return this._helpfulCount;
  }

  get isPublished(): boolean {
    return this._status.isPublished();
  }

  get readingTimeMinutes(): number {
    return this._body.readingTimeMinutes;
  }

  updateContent(
    title: KnowledgeArticleTitleVO,
    body: KnowledgeArticleBodyVO,
    now: string,
  ): void {
    if (this.isPublished) {
      throw new BusinessRuleError(
        'Published articles must be unpublished before editing',
        'knowledgeArticle.published.edit',
      );
    }
    this._title = title;
    this._body = body;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  publish(now: string): void {
    if (this.isPublished) {
      throw new BusinessRuleError(
        'Article already published',
        'knowledgeArticle.already.published',
      );
    }
    if (this._tags.length === 0) {
      throw new BusinessRuleError(
        'Article must have at least one tag before publishing',
        'knowledgeArticle.publish.requires.tags',
      );
    }
    this._status = KnowledgeStatusVO.create('published');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  unpublish(now: string): void {
    if (!this.isPublished) {
      throw new BusinessRuleError(
        'Article is not published',
        'knowledgeArticle.not.published',
      );
    }
    this._status = KnowledgeStatusVO.create('draft');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  addTag(tag: string, now: string): void {
    const normalized = tag.trim().toLowerCase();
    if (!TAG_PATTERN.test(normalized)) {
      throw new ValidationError(`Invalid tag: ${tag}`, 'knowledgeArticle');
    }
    if (this._tags.includes(normalized)) return;
    if (this._tags.length >= MAX_TAGS) {
      throw new BusinessRuleError(
        `Cannot add more than ${MAX_TAGS} tags`,
        'knowledgeArticle.tags.limit',
      );
    }
    this._tags = Object.freeze([...this._tags, normalized]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  removeTag(tag: string, now: string): void {
    const normalized = tag.trim().toLowerCase();
    if (!this._tags.includes(normalized)) return;
    this._tags = Object.freeze(this._tags.filter((t) => t !== normalized));
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordView(): void {
    this._viewCount += 1;
  }

  recordHelpful(): void {
    if (this._helpfulCount >= this._viewCount) {
      throw new BusinessRuleError(
        'Helpful count cannot exceed view count',
        'knowledgeArticle.helpful.exceeds.views',
      );
    }
    this._helpfulCount += 1;
  }

  toSnapshot(): KnowledgeArticleSnapshot {
    return {
      id: this.id.value,
      title: this._title.value,
      body: this._body.value,
      status: this._status.value,
      categoryId: this._categoryId.value,
      authorId: this._authorId.value,
      tags: this._tags,
      viewCount: this._viewCount,
      helpfulCount: this._helpfulCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
