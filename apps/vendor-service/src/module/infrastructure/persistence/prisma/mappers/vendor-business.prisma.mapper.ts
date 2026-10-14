/**
 * VendorBusinessPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorBusinessEntity } from '../../../../domain/entities/vendor-business.entity.js';
import { VendorBusinessVO } from '../../../../domain/value-objects/composites/vendor-business.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BusinessNameVO } from '../../../../domain/value-objects/primitives/business-name.vo.js';
import { BusinessTypeVO } from '../../../../domain/value-objects/primitives/business-type.vo.js';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo.js';
import { BusinessRegistrationVO } from '../../../../domain/value-objects/primitives/business-registration.vo.js';

export interface VendorBusinessPrismaRow {
  id: string;
  vendorId: string;
  legalName: string;
  businessType: string;
  vendorType: string;
  registrationNumber: string | null;
  taxId: string | null;
  vatNumber: string | null;
  establishedYear: number | null;
  employeeCount: number | null;
  annualRevenue: unknown;
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

export class VendorBusinessPrismaMapper {
  static toDomain(raw: VendorBusinessPrismaRow): VendorBusinessEntity {
    const vo = VendorBusinessVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      legalName: BusinessNameVO.reconstitute(raw.legalName),
      businessType: BusinessTypeVO.reconstitute(raw.businessType),
      vendorType: VendorTypeVO.reconstitute(raw.vendorType),
      registrationNumber: raw.registrationNumber
        ? BusinessRegistrationVO.reconstitute(raw.registrationNumber)
        : undefined,
      taxId: raw.taxId ?? undefined,
      vatNumber: raw.vatNumber ?? undefined,
      establishedYear: raw.establishedYear ?? undefined,
      employeeCount: raw.employeeCount ?? undefined,
      annualRevenue: raw.annualRevenue !== null ? toNum(raw.annualRevenue) : undefined,
    });

    return VendorBusinessEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorBusinessEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      legalName: vo.legalName.value,
      businessType: vo.businessType.value,
      vendorType: vo.vendorType.value,
      registrationNumber: vo.registrationNumber?.value ?? null,
      taxId: vo.taxId ?? null,
      vatNumber: vo.vatNumber ?? null,
      establishedYear: vo.establishedYear ?? null,
      employeeCount: vo.employeeCount ?? null,
      annualRevenue: vo.annualRevenue ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
