/**
 * ProductEntity — AGGREGATE ROOT
 * @module product-service/domain/entities
 *
 * State machine:
 *   draft → pending → approved → published
 *   pending/approved → rejected → draft
 *   published → out_of_stock | discontinued | archived
 *   * → deleted
 *
 * Invariants:
 *   - Published requires non-zero totalStock AND at least one image
 *   - Rejected requires rejectionReason
 *   - Published requires publishedAt
 *   - Draft cannot have publishedAt
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ProductVO } from '../value-objects/composites/product.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { ProductStatusVO } from '../value-objects/primitives/product-status.vo.js';
import { ProductStatusChangedEvent } from '../events/product.events.js';
import {
  ProductCreatedEvent,
  ProductUpdatedEvent,
  ProductPublishedEvent,
  ProductUnpublishedEvent,
  ProductDeletedEvent,
  ProductStockChangedEvent,
} from '../events/product.events.js';

export interface ProductEntityProps {
  readonly vo: ProductVO;
  readonly rejectionReason?: string;
  readonly archivedAt?: string;
  readonly deletedBy?: string;
}

export class ProductEntity extends AggregateRoot<string> {
  private _vo: ProductVO;
  private _rejectionReason?: string;
  private _archivedAt?: string;
  private _deletedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._rejectionReason = props.rejectionReason;
    this._archivedAt = props.archivedAt;
    this._deletedBy = props.deletedBy;
    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    const v = this._vo;
    if (v.isPublished) {
      if (v.totalStock <= 0) {
        throw new ValidationError('Published product must have stock > 0', 'totalStock');
      }
      if (!v.hasImages()) {
        throw new ValidationError('Published product must have at least one image', 'images');
      }
      if (!v.publishedAt) {
        throw new ValidationError('Published product must have publishedAt', 'publishedAt');
      }
    } else {
      if (v.publishedAt) {
        throw new ValidationError(
          'Non-published product cannot have publishedAt',
          'publishedAt',
        );
      }
    }
    if (v.status.isRejected() && !this._rejectionReason) {
      throw new ValidationError('Rejected product must have rejectionReason', 'rejectionReason');
    }
  }

  // ═══════════════ Getters ═══════════════
  get vo(): ProductVO { return this._vo; }
  get productId(): ProductIdVO { return this._vo.id; }
  get status(): ProductStatusVO { return this._vo.status; }
  get rejectionReason(): string | undefined { return this._rejectionReason; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get deletedBy(): string | undefined { return this._deletedBy; }

  // ═══════════════ Predicates ═══════════════
  isDraft(): boolean { return this.status.isDraft(); }
  isPending(): boolean { return this.status.isPending(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isPublished(): boolean { return this.status.isPublished(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isArchived(): boolean { return this.status.isArchived(); }
  isDeleted(): boolean { return this.status.isDeleted(); }
  isEditable(): boolean { return this.status.isEditable(); }
  isFinal(): boolean { return this.status.isFinal(); }

  canBeSubmitted(): boolean { return this.status.isDraft(); }
  canBeApproved(): boolean { return this.status.isPending(); }
  canBePublished(): boolean {
    return this.status.isApproved() || this.status.isOutOfStock();
  }
  canBeDeleted(): boolean {
    return !this.isDeleted() && !this.status.isPublished();
  }

  // ═══════════════ Business Actions ═══════════════
  rename(name: ProductVO['name'], now: string = new Date().toISOString()): void {
    this.assertEditable('rename');
    const next = ProductVO.create({ ...this._vo.value, name });
    this._vo = next;
    this.touch(now);
    this.incrementVersion();
    this.emitUpdate(['name']);
  }

  submit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('pending');
    const from = this.status.value;
    this._vo = ProductVO.create({ ...this._vo.value, status: ProductStatusVO.pending() });
    this.emitStatusChange(from, 'pending');
    this.touch(now);
    this.incrementVersion();
  }

  approve(approvedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('approved');
    const from = this.status.value;
    this._vo = ProductVO.create({ ...this._vo.value, status: ProductStatusVO.approved() });
    this._rejectionReason = undefined;
    this.emitStatusChange(from, 'approved', approvedBy);
    this.touch(now);
    this.incrementVersion();
  }

  reject(reason: string, rejectedBy?: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new BusinessRuleError(
        'Rejection reason is required',
        'PRODUCT_REJECTION_REASON_REQUIRED',
        { productId: this.id },
      );
    }
    this.assertTransitionTo('rejected');
    const from = this.status.value;
    this._vo = ProductVO.create({ ...this._vo.value, status: ProductStatusVO.rejected() });
    this._rejectionReason = reason;
    this.emitStatusChange(from, 'rejected', rejectedBy);
    this.touch(now);
    this.incrementVersion();
  }

  publish(now: string = new Date().toISOString()): void {
    if (!this.canBePublished()) {
      throw new BusinessRuleError(
        `Cannot publish product in status "${this.status.value}"`,
        'PRODUCT_CANNOT_BE_PUBLISHED',
        { productId: this.id, status: this.status.value },
      );
    }
    if (this._vo.totalStock <= 0) {
      throw new BusinessRuleError(
        'Cannot publish product with zero stock',
        'PRODUCT_CANNOT_BE_PUBLISHED',
        { productId: this.id, reason: 'zero_stock' },
      );
    }
    if (!this._vo.hasImages()) {
      throw new BusinessRuleError(
        'Cannot publish product without images',
        'PRODUCT_CANNOT_BE_PUBLISHED',
        { productId: this.id, reason: 'no_images' },
      );
    }

    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.published(),
      isPublished: true,
      publishedAt: now,
    });
    this.emitStatusChange(from, 'published');
    this.addDomainEvent(
      new ProductPublishedEvent({
        aggregateId: this.id,
        payload: { productId: this.id, publishedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unpublish(reason: string | undefined, now: string = new Date().toISOString()): void {
    if (!this.status.isPublished() && !this.status.isOutOfStock()) {
      throw new BusinessRuleError(
        `Cannot unpublish product in status "${this.status.value}"`,
        'PRODUCT_CANNOT_BE_UNPUBLISHED',
        { productId: this.id, status: this.status.value },
      );
    }
    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.approved(),
      isPublished: false,
      publishedAt: undefined,
    });
    this.addDomainEvent(
      new ProductUnpublishedEvent({
        aggregateId: this.id,
        payload: { productId: this.id, reason, unpublishedAt: now },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'approved');
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.archived(),
      isPublished: false,
      publishedAt: undefined,
    });
    this._archivedAt = now;
    this.emitStatusChange(from, 'archived');
    this.touch(now);
    this.incrementVersion();
  }

  markOutOfStock(now: string = new Date().toISOString()): void {
    if (!this.status.isPublished()) {
      return;
    }
    const from = this.status.value;
    this._vo = ProductVO.create({ ...this._vo.value, status: ProductStatusVO.outOfStock() });
    this.emitStatusChange(from, 'out_of_stock');
    this.touch(now);
    this.incrementVersion();
  }

  backInStock(now: string = new Date().toISOString()): void {
    if (!this.status.isOutOfStock()) {
      return;
    }
    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.published(),
    });
    this.emitStatusChange(from, 'published');
    this.touch(now);
    this.incrementVersion();
  }

  discontinue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('discontinued');
    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.discontinued(),
      isPublished: false,
      publishedAt: undefined,
    });
    this.emitStatusChange(from, 'discontinued');
    this.touch(now);
    this.incrementVersion();
  }

  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeDeleted()) {
      throw new BusinessRuleError(
        `Cannot delete product in status "${this.status.value}"`,
        'PRODUCT_CANNOT_BE_DELETED',
        { productId: this.id, status: this.status.value },
      );
    }
    const from = this.status.value;
    this._vo = ProductVO.create({
      ...this._vo.value,
      status: ProductStatusVO.deleted(),
      isPublished: false,
      publishedAt: undefined,
    });
    this._deletedBy = deletedBy;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new ProductDeletedEvent({
        aggregateId: this.id,
        payload: { productId: this.id, deletedAt: now, deletedBy },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'deleted', deletedBy);
    this.touch(now);
    this.incrementVersion();
  }

  updateStock(newStock: number, reason: string, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(newStock) || newStock < 0) {
      throw new ValidationError('Stock must be a non-negative integer', 'totalStock');
    }
    const previous = this._vo.totalStock;
    if (previous === newStock) return;

    this._vo = ProductVO.create({ ...this._vo.value, totalStock: newStock });
    this.addDomainEvent(
      new ProductStockChangedEvent({
        aggregateId: this.id,
        payload: {
          productId: this.id,
          previousStock: previous,
          newStock,
          reason,
        },
        version: this.version + 1,
      }),
    );

    if (newStock === 0 && this.status.isPublished()) {
      this.markOutOfStock(now);
    } else if (newStock > 0 && this.status.isOutOfStock()) {
      this.backInStock(now);
    }

    this.touch(now);
    this.incrementVersion();
  }

  updateMetadata(
    patch: Partial<{
      name: ProductVO['name'];
      description: ProductVO['description'];
      tags: readonly string[];
      images: readonly string[];
      isFeatured: boolean;
    }>,
    now: string = new Date().toISOString(),
  ): void {
    this.assertEditable('update');

    const current = this._vo.value;
    const changed: string[] = [];

    const nextProps = {
      ...current,
      name: patch.name ?? current.name,
      description: patch.description ?? current.description,
      tags: patch.tags ?? current.tags,
      images: patch.images ?? current.images,
      isFeatured: patch.isFeatured ?? current.isFeatured,
    };

    if (patch.name !== undefined && !patch.name.equals(current.name)) changed.push('name');
    if (patch.description !== undefined && patch.description !== current.description) changed.push('description');
    if (patch.tags !== undefined) changed.push('tags');
    if (patch.images !== undefined) changed.push('images');
    if (patch.isFeatured !== undefined && patch.isFeatured !== current.isFeatured) changed.push('isFeatured');

    if (changed.length === 0) return;

    this._vo = ProductVO.create(nextProps as typeof current);
    this.emitUpdate(changed);
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertEditable(action: string): void {
    if (!this.status.isEditable()) {
      throw new BusinessRuleError(
        `Cannot ${action} product in status "${this.status.value}"`,
        'PRODUCT_NOT_EDITABLE',
        { productId: this.id, status: this.status.value, action },
      );
    }
  }

  private assertTransitionTo(target: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid product status transition: "${this.status.value}" → "${target}"`,
        'INVALID_PRODUCT_STATUS_TRANSITION',
        { from: this.status.value, to: target, productId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new ProductStatusChangedEvent({
        aggregateId: this.id,
        payload: { productId: this.id, fromStatus: from, toStatus: to, changedBy },
        version: this.version + 1,
      }),
    );
  }

  private emitUpdate(changedFields: readonly string[]): void {
    this.addDomainEvent(
      new ProductUpdatedEvent({
        aggregateId: this.id,
        payload: {
          productId: this.id,
          changedFields,
          updatedAt: new Date().toISOString(),
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: ProductIdVO;
    vo: Omit<ProductVO, 'value'> extends never ? never : ProductVO;
    now: string;
  }): ProductEntity {
    const vo = params.vo;
    if (!vo.status.isDraft()) {
      throw new ValidationError('New product must be in draft status', 'status');
    }

    const entity = new ProductEntity(
      params.id.value,
      params.now,
      params.now,
      { vo },
      null,
    );

    entity.addDomainEvent(
      new ProductCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          productId: params.id.value,
          name: vo.name.value,
          sku: vo.sku.value,
          categoryId: vo.categoryId.value,
          vendorId: vo.vendorId?.value,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductVO;
    rejectionReason?: string;
    archivedAt?: string;
    deletedBy?: string;
    version?: number;
  }): ProductEntity {
    const entity = new ProductEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      {
        vo: params.vo,
        rejectionReason: params.rejectionReason,
        archivedAt: params.archivedAt,
        deletedBy: params.deletedBy,
      },
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
