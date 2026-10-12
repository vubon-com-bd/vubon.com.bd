/**
 * VendorMapper — VendorEntity → DTOs
 * @module vendor-service/application/mappers
 */
import type { VendorEntity } from '../../domain/entities/vendor.entity.js';
import type {
  VendorResponseDto,
  VendorPublicDto,
  VendorSummaryDto,
} from '../dtos/responses/vendor-response.dto.js';

export class VendorMapper {
  static toResponse(entity: VendorEntity): VendorResponseDto {
    const address = entity.location?.address.value;
    const branding = entity.branding;
    const commission = entity.commission;
    const payoutConfig = entity.payoutConfig;

    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name.value,
      slug: entity.slug.value,
      displayName: entity.displayName.value,
      description: entity.description?.value,
      type: entity.type.value as VendorResponseDto['type'],
      businessType: entity.businessType.value as VendorResponseDto['businessType'],
      status: entity.status.value as VendorResponseDto['status'],
      tier: entity.tier.value as VendorResponseDto['tier'],
      email: entity.email.value,
      contact: {
        email: entity.email.value,
        phone: entity.contact?.phone?.value,
        website: entity.contact?.website?.value,
      },
      address: {
        line1: address?.line1 ?? '',
        line2: address?.line2,
        area: address?.area,
        upazila: address?.upazila ?? '',
        district: address?.district ?? '',
        division: address?.division ?? '',
        postalCode: address?.postalCode,
        country: address?.country ?? 'BD',
      } as VendorResponseDto['address'],
      branding: {
        logoUrl: branding?.logo?.value,
        bannerUrl: branding?.banner?.value,
      },
      commission: commission
        ? {
            type: commission.type,
            percent: commission.percent.value,
            fixedAmount: commission.fixedAmount?.amount,
            currency: commission.fixedAmount?.currency ?? 'BDT',
            applyOnShipping: commission.applyOnShipping,
            applyOnTax: commission.applyOnTax,
            effectiveFrom: commission.effectiveFrom,
            effectiveTo: commission.effectiveTo,
          }
        : undefined,
      payoutConfig: payoutConfig
        ? {
            method: payoutConfig.method,
            cycle: payoutConfig.cycle,
            minAmount: payoutConfig.minAmount.amount,
            autoPayout: payoutConfig.autoPayout,
            requireApproval: payoutConfig.requireApproval,
            bankAccountId: payoutConfig.bankAccountId,
          }
        : undefined,
      rating: entity.rating.value,
      totalSales: entity.totalSales,
      totalOrders: entity.totalOrders,
      isVerified: entity.isVerified,
      isFeatured: entity.isFeatured,
      joinedAt: entity.joinedAt,
      approvedAt: entity.approvedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublic(entity: VendorEntity): VendorPublicDto {
    return {
      id: entity.id,
      name: entity.name.value,
      slug: entity.slug.value,
      displayName: entity.displayName.value,
      description: entity.description?.value,
      type: entity.type.value as VendorPublicDto['type'],
      tier: entity.tier.value as VendorPublicDto['tier'],
      logoUrl: entity.branding?.logo?.value,
      bannerUrl: entity.branding?.banner?.value,
      rating: entity.rating.value,
      totalSales: entity.totalSales,
      isVerified: entity.isVerified,
      isFeatured: entity.isFeatured,
      joinedAt: entity.joinedAt,
    };
  }

  static toSummary(entity: VendorEntity): VendorSummaryDto {
    return {
      id: entity.id,
      name: entity.name.value,
      displayName: entity.displayName.value,
      slug: entity.slug.value,
      logoUrl: entity.branding?.logo?.value,
      status: entity.status.value as VendorSummaryDto['status'],
      tier: entity.tier.value as VendorSummaryDto['tier'],
      rating: entity.rating.value,
    };
  }

  static toSummaryList(entities: readonly VendorEntity[]): readonly VendorSummaryDto[] {
    return entities.map((e) => VendorMapper.toSummary(e));
  }

  static toPublicList(entities: readonly VendorEntity[]): readonly VendorPublicDto[] {
    return entities.map((e) => VendorMapper.toPublic(e));
  }
}
