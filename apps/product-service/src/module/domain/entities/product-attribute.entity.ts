/**
 * ProductAttributeEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ProductAttributeVO } from '../value-objects/composites/product-attribute.vo.js';

export class ProductAttributeEntity extends BaseEntity<string> {
  private _vo: ProductAttributeVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductAttributeVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductAttributeVO { return this._vo; }
  get attributeId(): ProductAttributeVO['id'] { return this._vo.id; }
  get name(): ProductAttributeVO['name'] { return this._vo.name; }
  get isRequired(): boolean { return this._vo.isRequired; }
  get isSearchable(): boolean { return this._vo.isSearchable; }
  get isFilterable(): boolean { return this._vo.isFilterable; }

  updateVo(vo: ProductAttributeVO, now: string = new Date().toISOString()): void {
    this._vo = vo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductAttributeVO;
    now: string;
  }): ProductAttributeEntity {
    return new ProductAttributeEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductAttributeVO;
  }): ProductAttributeEntity {
    return new ProductAttributeEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
