/**
 * BrandEntity — Aggregate Root (standalone)
 * @module product-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { BrandVO } from '../value-objects/composites/brand.vo.js';
import {
  BrandCreatedEvent,
  BrandActivatedEvent,
  BrandDeactivatedEvent,
  BrandLogoUpdatedEvent,
  BrandDeletedEvent,
} from '../events/brand.events.js';

export class BrandEntity extends AggregateRoot<string> {
  private _vo: BrandVO;
  private _deletedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: BrandVO,
    deletedBy?: string,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
    this._deletedBy = deletedBy;
  }

  get vo(): BrandVO { return this._vo; }
  get brandId(): BrandVO['id'] { return this._vo.id; }
  get name(): BrandVO['name'] { return this._vo.name; }
  get slug(): BrandVO['slug'] { return this._vo.slug; }
  get isActive(): boolean { return this._vo.isActive(); }
  get deletedBy(): string | undefined { return this._deletedBy; }

  activate(now: string = new Date().toISOString()): void {
    if (this.isActive) return;
    this._vo = BrandVO.create({ ...this._vo.value, status: 'active' });
    this.addDomainEvent(
      new BrandActivatedEvent({
        aggregateId: this.id,
        payload: { brandId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isActive) return;
    this._vo = BrandVO.create({ ...this._vo.value, status: 'inactive' });
    this.addDomainEvent(
      new BrandDeactivatedEvent({
        aggregateId: this.id,
        payload: { brandId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateLogo(newLogo: BrandVO['logo'], now: string = new Date().toISOString()): void {
    if (!newLogo) {
      throw new BusinessRuleError(
        'Brand logo is required for update',
        'BRAND_LOGO_REQUIRED',
        { brandId: this.id },
      );
    }
    const previous = this._vo.logo?.value;
    this._vo = BrandVO.create({ ...this._vo.value, logo: newLogo });
    this.addDomainEvent(
      new BrandLogoUpdatedEvent({
        aggregateId: this.id,
        payload: {
          brandId: this.id,
          previousLogoUrl: previous,
          newLogoUrl: newLogo.value,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (this.deletedAt) return;
    this._vo = BrandVO.create({ ...this._vo.value, status: 'deleted' });
    this._deletedBy = deletedBy;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new BrandDeletedEvent({
        aggregateId: this.id,
        payload: { brandId: this.id, deletedAt: now, deletedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: BrandVO;
    now: string;
  }): BrandEntity {
    const entity = new BrandEntity(
      params.id,
      params.now,
      params.now,
      params.vo,
      undefined,
      null,
    );
    entity.addDomainEvent(
      new BrandCreatedEvent({
        aggregateId: params.id,
        payload: {
          brandId: params.id,
          name: params.vo.name.value,
          slug: params.vo.slug.value,
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
    vo: BrandVO;
    deletedBy?: string;
    version?: number;
  }): BrandEntity {
    const entity = new BrandEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedBy,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
