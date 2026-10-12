/**
 * ShipmentPrismaMapper — row ↔ domain entity
 * @module logistics-service/infrastructure/persistence/prisma
 *
 * Persistence format: LogisticsShipment + LogisticsShipmentPackage[] (child relation)
 */
import { ShipmentEntity } from '../../../domain/entities/shipment.entity.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { ShipmentStatusVO } from '../../../domain/value-objects/primitives/shipment-status.vo.js';
import { ShipmentTypeVO } from '../../../domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '../../../domain/value-objects/primitives/shipment-priority.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { CodAmountVO } from '../../../domain/value-objects/primitives/cod-amount.vo.js';
import { DeclaredValueVO } from '../../../domain/value-objects/primitives/declared-value.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';
import { DimensionCmVO } from '../../../domain/value-objects/primitives/dimension-cm.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '../../../domain/value-objects/composites/shipment-dimensions.vo.js';
import { PackageRefVO } from '../../../domain/value-objects/composites/package-ref.vo.js';
import { CustomerRefVO } from '../../../domain/value-objects/composites/customer-ref.vo.js';
import { AddressVO } from '@vubon/shared-kernel/domain/primitives';
import type { Address, Phone, Email } from '@vubon/shared-types/common';

export interface PrismaShipmentPackageRow {
  id: string;
  shipmentId: string;
  orderItemId: string;
  productId: string | null;
  variantId: string | null;
  sku: string | null;
  name: string | null;
  quantity: number;
  sortOrder: number;
  createdAt: Date;
}

export interface PrismaShipmentRow {
  id: string;
  trackingNumber: string;
  orderId: string;
  userId: string | null;
  vendorId: string | null;
  warehouseId: string | null;
  courierId: string | null;
  type: string;
  priority: string;
  status: string;
  shippingLine1: string;
  shippingLine2: string | null;
  shippingCity: string;
  shippingState: string | null;
  shippingDistrict: string | null;
  shippingDivision: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string;
  shippingLandmark: string | null;
  shippingLatitude: number | null;
  shippingLongitude: number | null;
  pickupLine1: string | null;
  pickupLine2: string | null;
  pickupCity: string | null;
  pickupState: string | null;
  pickupDistrict: string | null;
  pickupDivision: string | null;
  pickupPostalCode: string | null;
  pickupCountry: string | null;
  pickupLandmark: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  actualWeightKg: unknown;
  volumetricWeightKg: unknown;
  lengthCm: unknown;
  widthCm: unknown;
  heightCm: unknown;
  itemCount: number;
  isCOD: boolean;
  codAmount: unknown;
  isInsured: boolean;
  declaredValue: unknown;
  shippingCost: unknown;
  currency: string;
  courierTrackingNumber: string | null;
  labelUrl: string | null;
  estimatedDeliveryAt: Date | null;
  pickedUpAt: Date | null;
  deliveredAt: Date | null;
  returnedAt: Date | null;
  cancelledAt: Date | null;
  failureReason: string | null;
  notes: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PrismaShipmentRowWithPackages extends PrismaShipmentRow {
  packages: PrismaShipmentPackageRow[];
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

const toIsoOrNull = (d: Date | null | undefined): string | null =>
  d ? new Date(d).toISOString() : null;

export class ShipmentPrismaMapper {
  static toDomain(raw: PrismaShipmentRowWithPackages): ShipmentEntity {
    const shippingAddress = AddressDetailsVO.reconstitute({
      address: AddressVO.of({
        line1: raw.shippingLine1,
        line2: raw.shippingLine2 ?? undefined,
        city: raw.shippingCity,
        state: raw.shippingState ?? undefined,
        postalCode: raw.shippingPostalCode ?? undefined,
        country: raw.shippingCountry,
      } as Address),
      latitude: raw.shippingLatitude ?? undefined,
      longitude: raw.shippingLongitude ?? undefined,
    });

    const pickupAddress = raw.pickupLine1 && raw.pickupCity && raw.pickupCountry
      ? AddressDetailsVO.reconstitute({
          address: AddressVO.of({
            line1: raw.pickupLine1,
            line2: raw.pickupLine2 ?? undefined,
            city: raw.pickupCity,
            state: raw.pickupState ?? undefined,
            postalCode: raw.pickupPostalCode ?? undefined,
            country: raw.pickupCountry,
          } as Address),
        })
      : undefined;

    const customer = raw.customerName && raw.customerPhone
      ? CustomerRefVO.reconstitute({
          userId: raw.userId ? (raw.userId as never) : undefined,
          name: raw.customerName,
          phone: raw.customerPhone as Phone,
          email: raw.customerEmail ? (raw.customerEmail as Email) : undefined,
        })
      : undefined;

    const dimensionsValue = raw.lengthCm !== null && raw.widthCm !== null && raw.heightCm !== null
      ? {
          lengthCm: toNum(raw.lengthCm),
          widthCm: toNum(raw.widthCm),
          heightCm: toNum(raw.heightCm),
        }
      : undefined;

    const dimensions = ShipmentDimensionsVO.reconstitute({
      actualWeightKg: WeightKgVO.reconstitute(toNum(raw.actualWeightKg)),
      volumetricWeightKg: raw.volumetricWeightKg !== null
        ? WeightKgVO.reconstitute(toNum(raw.volumetricWeightKg))
        : undefined,
      dimensions: dimensionsValue ? DimensionCmVO.reconstitute(dimensionsValue) : undefined,
    });

    const packages = raw.packages
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => PackageRefVO.reconstitute({
        orderItemId: p.orderItemId,
        productId: p.productId ?? undefined,
        variantId: p.variantId ?? undefined,
        sku: p.sku ?? undefined,
        quantity: p.quantity,
        name: p.name ?? undefined,
      }));

    return ShipmentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        trackingNumber: TrackingNumberVO.reconstitute(raw.trackingNumber),
        orderId: OrderIdVO.reconstitute(raw.orderId),
        userId: raw.userId ? UserIdVO.reconstitute(raw.userId) : undefined,
        vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
        warehouseId: raw.warehouseId ? WarehouseIdVO.reconstitute(raw.warehouseId) : undefined,
        courierId: raw.courierId ? CourierIdVO.reconstitute(raw.courierId) : undefined,
        type: ShipmentTypeVO.reconstitute(raw.type),
        priority: ShipmentPriorityVO.reconstitute(raw.priority),
        status: ShipmentStatusVO.reconstitute(raw.status),
        dimensions,
        shippingAddress,
        pickupAddress,
        customer,
        packages,
        itemCount: raw.itemCount,
        isCOD: raw.isCOD,
        codAmount: raw.codAmount !== null
          ? CodAmountVO.reconstitute(toNum(raw.codAmount), raw.currency)
          : undefined,
        isInsured: raw.isInsured,
        declaredValue: raw.declaredValue !== null
          ? DeclaredValueVO.reconstitute(toNum(raw.declaredValue), raw.currency)
          : undefined,
        shippingCost: raw.shippingCost !== null
          ? ShippingCostVO.reconstitute(toNum(raw.shippingCost), raw.currency)
          : undefined,
        courierTrackingNumber: raw.courierTrackingNumber ?? undefined,
        labelUrl: raw.labelUrl ?? undefined,
        estimatedDeliveryAt: toIso(raw.estimatedDeliveryAt),
        pickedUpAt: toIso(raw.pickedUpAt),
        deliveredAt: toIso(raw.deliveredAt),
        returnedAt: toIso(raw.returnedAt),
        cancelledAt: toIso(raw.cancelledAt),
        failureReason: raw.failureReason ?? undefined,
        notes: raw.notes ? NotesVO.reconstitute(raw.notes) : undefined,
      },
    });
  }

  static toPersistence(entity: ShipmentEntity): Record<string, unknown> {
    const addr = entity.shippingAddress.toAddress();
    const pickup = entity.pickupAddress?.toAddress();
    const dims = entity.dimensions;
    const customer = entity.customer;

    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      orderId: entity.orderId.value,
      userId: entity.userId?.value ?? null,
      vendorId: entity.vendorId?.value ?? null,
      warehouseId: entity.warehouseId?.value ?? null,
      courierId: entity.courierId?.value ?? null,
      type: entity.type.value,
      priority: entity.priority.value,
      status: entity.status.value,
      shippingLine1: addr.line1,
      shippingLine2: addr.line2 ?? null,
      shippingCity: addr.city,
      shippingState: addr.state ?? null,
      shippingDistrict: (addr as { district?: string }).district ?? null,
      shippingDivision: (addr as { division?: string }).division ?? null,
      shippingPostalCode: addr.postalCode ?? null,
      shippingCountry: addr.country,
      shippingLandmark: (addr as { landmark?: string }).landmark ?? null,
      shippingLatitude: entity.shippingAddress.latitude ?? null,
      shippingLongitude: entity.shippingAddress.longitude ?? null,
      pickupLine1: pickup?.line1 ?? null,
      pickupLine2: pickup?.line2 ?? null,
      pickupCity: pickup?.city ?? null,
      pickupState: pickup?.state ?? null,
      pickupDistrict: (pickup as { district?: string } | undefined)?.district ?? null,
      pickupDivision: (pickup as { division?: string } | undefined)?.division ?? null,
      pickupPostalCode: pickup?.postalCode ?? null,
      pickupCountry: pickup?.country ?? null,
      pickupLandmark: (pickup as { landmark?: string } | undefined)?.landmark ?? null,
      customerName: customer?.name ?? null,
      customerPhone: customer?.phone ?? null,
      customerEmail: customer?.email ?? null,
      actualWeightKg: dims.actualWeightKg.value,
      volumetricWeightKg: dims.volumetricWeightKg?.value ?? null,
      lengthCm: dims.dimensions?.lengthCm ?? null,
      widthCm: dims.dimensions?.widthCm ?? null,
      heightCm: dims.dimensions?.heightCm ?? null,
      itemCount: entity.itemCount,
      isCOD: entity.isCOD,
      codAmount: entity.codAmount?.amount ?? null,
      isInsured: entity.isInsured,
      declaredValue: entity.declaredValue?.amount ?? null,
      shippingCost: entity.shippingCost?.amount ?? null,
      currency: entity.declaredValue?.currency ?? entity.codAmount?.currency ?? entity.shippingCost?.currency ?? 'BDT',
      courierTrackingNumber: entity.courierTrackingNumber ?? null,
      labelUrl: entity.labelUrl ?? null,
      estimatedDeliveryAt: entity.estimatedDeliveryAt ? new Date(entity.estimatedDeliveryAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      returnedAt: entity.returnedAt ? new Date(entity.returnedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      failureReason: entity.failureReason ?? null,
      notes: entity.notes?.value ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
      packages: {
        create: entity.packages.map((p, idx) => ({
          orderItemId: p.orderItemId,
          productId: p.productId ?? null,
          variantId: p.variantId ?? null,
          sku: p.sku ?? null,
          name: p.name ?? null,
          quantity: p.quantity,
          sortOrder: idx,
        })),
      },
    };
  }
}
