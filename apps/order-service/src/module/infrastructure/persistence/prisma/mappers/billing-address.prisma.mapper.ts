/**
 * BillingAddressPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { BillingAddressEntity } from '../../../../domain/entities/billing-address.entity.js';
import { BillingAddressVO } from '../../../../domain/value-objects/composites/billing-address.vo.js';
import { BillingAddressIdVO } from '../../../../domain/value-objects/primitives/billing-address-id.vo.js';

export interface PrismaBillingAddressRow {
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

export class BillingAddressPrismaMapper {
  static toDomain(raw: PrismaBillingAddressRow): BillingAddressEntity {
    const vo = BillingAddressVO.create({
      id: BillingAddressIdVO.reconstitute(raw.id),
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
    return BillingAddressEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.createdAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: BillingAddressEntity, orderId: string, customerId: string): Record<string, unknown> {
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
