/**
 * VendorContactPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorContactEntity } from '../../../../domain/entities/vendor-contact.entity.js';
import { VendorContactVO } from '../../../../domain/value-objects/composites/vendor-contact.vo.js';
import { ContactIdVO } from '../../../../domain/value-objects/primitives/contact-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ContactTypeVO } from '../../../../domain/value-objects/primitives/contact-type.vo.js';
import { ContactValueVO } from '../../../../domain/value-objects/primitives/contact-value.vo.js';

export interface VendorContactPrismaRow {
  id: string;
  vendorId: string;
  type: string;
  value: string;
  label: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class VendorContactPrismaMapper {
  static toDomain(raw: VendorContactPrismaRow): VendorContactEntity {
    const vo = VendorContactVO.reconstitute({
      id: ContactIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: ContactTypeVO.reconstitute(raw.type),
      contactValue: ContactValueVO.reconstitute(raw.value),
      label: raw.label ?? undefined,
      isPrimary: raw.isPrimary,
      isVerified: raw.isVerified,
      verifiedAt: raw.verifiedAt ? new Date(raw.verifiedAt).toISOString() : undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorContactEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorContactEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      type: vo.type.value,
      value: vo.contactValue.value,
      label: vo.label ?? null,
      isPrimary: vo.isPrimary,
      isVerified: vo.isVerified,
      verifiedAt: vo.verifiedAt ? new Date(vo.verifiedAt) : null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
