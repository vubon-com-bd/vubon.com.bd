/**
 * VendorShippingPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorShippingEntity } from '../../../../domain/entities/vendor-shipping.entity.js';
import {
  VendorShippingVO,
  type ShippingZoneConfig,
} from '../../../../domain/value-objects/composites/vendor-shipping.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ShippingMethodVO } from '../../../../domain/value-objects/primitives/shipping-method.vo.js';

export interface VendorShippingPrismaRow {
  id: string;
  vendorId: string;
  methods: unknown; // JSON array of strings
  zones: unknown; // JSON array of zone configs
  freeShippingThreshold: unknown | null;
  defaultShippingCost: unknown;
  maxShippingCost: unknown;
  allowsPickup: boolean;
  allowsCourier: boolean;
  trackingRequired: boolean;
  processingDays: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

const toNumOrUndefined = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  return toNum(v);
};

const parseMethods = (v: unknown): ShippingMethodVO[] => {
  if (!Array.isArray(v)) return [];
  return v.map((m) => ShippingMethodVO.reconstitute(String(m)));
};

const parseZones = (v: unknown): ShippingZoneConfig[] => {
  if (!Array.isArray(v)) return [];
  return v.map((z) => {
    const zone = z as Record<string, unknown>;
    return {
      zone: (zone['zone'] ?? 'inside_city') as ShippingZoneConfig['zone'],
      cost: toNum(zone['cost'] ?? 0),
      minDays: Number(zone['minDays'] ?? 1),
      maxDays: Number(zone['maxDays'] ?? 7),
      isActive: Boolean(zone['isActive'] ?? true),
    };
  });
};

export class VendorShippingPrismaMapper {
  static toDomain(raw: VendorShippingPrismaRow): VendorShippingEntity {
    const vo = VendorShippingVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      methods: parseMethods(raw.methods),
      zones: parseZones(raw.zones),
      freeShippingThreshold: toNumOrUndefined(raw.freeShippingThreshold),
      defaultShippingCost: toNum(raw.defaultShippingCost),
      maxShippingCost: toNum(raw.maxShippingCost),
      allowsPickup: raw.allowsPickup,
      allowsCourier: raw.allowsCourier,
      trackingRequired: raw.trackingRequired,
      processingDays: raw.processingDays,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorShippingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorShippingEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      methods: vo.methods.map((m) => m.value),
      zones: vo.zones.map((z) => ({
        zone: z.zone,
        cost: z.cost,
        minDays: z.minDays,
        maxDays: z.maxDays,
        isActive: z.isActive,
      })),
      freeShippingThreshold: vo.freeShippingThreshold ?? null,
      defaultShippingCost: vo.defaultShippingCost,
      maxShippingCost: vo.maxShippingCost,
      allowsPickup: vo.allowsPickup,
      allowsCourier: vo.allowsCourier,
      trackingRequired: vo.trackingRequired,
      processingDays: vo.processingDays,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
