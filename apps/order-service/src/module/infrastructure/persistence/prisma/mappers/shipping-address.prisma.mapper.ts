/**
 * ShippingAddressPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { ShippingAddressEntity } from '../../../../domain/entities/shipping-address.entity.js';
import { ShippingAddressVO } from '../../../../domain/value-objects/composites/shipping-address.vo.js';
import { ShippingAddressIdVO } from '../../../../domain/value-objects/primitives/shipping-address-id.vo.js';

export interface PrismaShippingAddressRow {
  id: string;
  orderId: string;
  customerId: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  country: string;
  label: string | null;
  createdAt: Date;
}

export class ShippingAddressPrismaMapper {
  static toDomain(raw: PrismaShippingAddressRow): ShippingAddressEntity {
    const vo = ShippingAddressVO.create({
      id: ShippingAddressIdVO.reconstitute(raw.id),
      recipientName: raw.fullName,
      phone: raw.phone,
      line1: raw.line1,
      line2: raw.line2 ?? undefined,
      city: raw.city,
      district: raw.state ?? undefined,
      division: undefined,
      postalCode: raw.postalCode ?? undefined,
      country: raw.country,
    });
    return ShippingAddressEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.createdAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: ShippingAddressEntity, orderId: string, customerId: string): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId,
      customerId,
      fullName: vo.recipientName,
      phone: vo.phone,
      line1: vo.line1,
      line2: vo.line2 ?? null,
      city: vo.city,
      state: vo.district ?? null,
      postalCode: vo.postalCode ?? null,
      country: vo.country,
      label: null,
    };
  }
}
