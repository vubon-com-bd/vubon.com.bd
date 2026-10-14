/**
 * VendorShippingEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorShippingVO,
  type VendorShippingVOProps,
  type ShippingZoneConfig,
} from '../value-objects/composites/vendor-shipping.vo.js';
import { ShippingMethodVO } from '../value-objects/primitives/shipping-method.vo.js';

export interface VendorShippingEntityProps {
  readonly vo: VendorShippingVO;
}

export class VendorShippingEntity extends BaseEntity<string> {
  private _vo: VendorShippingVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorShippingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorShippingVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get methods(): readonly ShippingMethodVO[] { return this._vo.methods; }
  get zones(): readonly ShippingZoneConfig[] { return this._vo.zones; }
  get freeShippingThreshold(): number | undefined { return this._vo.freeShippingThreshold; }
  get defaultShippingCost(): number { return this._vo.defaultShippingCost; }
  get maxShippingCost(): number { return this._vo.maxShippingCost; }
  get allowsPickup(): boolean { return this._vo.allowsPickup; }
  get allowsCourier(): boolean { return this._vo.allowsCourier; }
  get trackingRequired(): boolean { return this._vo.trackingRequired; }
  get processingDays(): number { return this._vo.processingDays; }
  get earliestDeliveryDays(): number { return this._vo.earliestDeliveryDays; }
  get latestDeliveryDays(): number { return this._vo.latestDeliveryDays; }

  // ═══ Predicates ═══
  hasFreeShipping(): boolean { return this._vo.hasFreeShipping(); }
  supportsMethod(method: string): boolean { return this._vo.supportsMethod(method); }
  supportsZone(zone: string): boolean { return this._vo.supportsZone(zone); }
  hasExpressShipping(): boolean { return this._vo.hasExpressShipping(); }
  shipsInternationally(): boolean { return this._vo.shipsInternationally(); }

  // ═══ Business Actions ═══
  calculateCost(zone: string, orderAmount: number): number {
    return this._vo.calculateCost(zone, orderAmount);
  }

  addMethod(method: ShippingMethodVO, now: string = new Date().toISOString()): void {
    if (this.supportsMethod(method.value)) return;
    const current = this._vo.value;
    this._vo = VendorShippingVO.create({
      ...current,
      methods: [...current.methods, method],
    });
    this.touch(now);
  }

  removeMethod(methodValue: string, now: string = new Date().toISOString()): void {
    if (this.methods.length <= 1) {
      throw new ValidationError('Cannot remove all shipping methods', 'methods');
    }
    const current = this._vo.value;
    this._vo = VendorShippingVO.create({
      ...current,
      methods: current.methods.filter((m) => m.value !== methodValue),
    });
    this.touch(now);
  }

  setFreeShippingThreshold(
    threshold: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorShippingVO.create({
      ...current,
      freeShippingThreshold: threshold,
    });
    this.touch(now);
  }

  setProcessingDays(days: number, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorShippingVO.create({
      ...current,
      processingDays: days,
    });
    this.touch(now);
  }

  updateZoneConfig(
    zone: ShippingZoneConfig['zone'],
    config: Partial<Omit<ShippingZoneConfig, 'zone'>>,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    const zones = current.zones.map((z) =>
      z.zone === zone ? { ...z, ...config, zone: z.zone } : z,
    );
    this._vo = VendorShippingVO.create({ ...current, zones });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorShippingVO;
    now: string;
  }): VendorShippingEntity {
    return new VendorShippingEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorShippingEntityProps;
  }): VendorShippingEntity {
    return new VendorShippingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
