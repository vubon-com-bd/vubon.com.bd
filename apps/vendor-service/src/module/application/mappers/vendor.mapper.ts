/**
 * VendorMapper — Entity → Response DTO
 * @module vendor-service/application/mappers
 *
 * Multi-shape output:
 *  - toResponse: full (admin)
 *  - toPublicResponse: customer-safe
 *  - toSummary: list views
 *  - toListResponse: paginated
 *  - toDetail: with children
 *  - toStats: aggregated
 *  - profileToResponse / businessToResponse: for sub-services
 *  - contactToSummary / addressToSummary: child summaries
 */
import type { VendorEntity } from '../../domain/entities/vendor.entity.js';
import type { VendorProfileEntity } from '../../domain/entities/vendor-profile.entity.js';
import type { VendorBusinessEntity } from '../../domain/entities/vendor-business.entity.js';
import type { VendorContactEntity } from '../../domain/entities/vendor-contact.entity.js';
import type { VendorAddressEntity } from '../../domain/entities/vendor-address.entity.js';
import type {
  VendorStatusValue,
  VendorTypeValue,
  VendorBusinessTypeValue,
  VendorTierValue,
} from '@vubon/shared-types/business/vendor';

import type {
  VendorResponseDTO,
  VendorPublicResponseDTO,
  VendorSummaryResponseDTO,
  VendorListResponseDTO,
  VendorStatsResponseDTO,
} from '../dtos/responses/vendor-response.dto.js';
import type {
  VendorDetailResponseDTO,
  ContactSummaryDTO,
  AddressSummaryDTO,
  BankAccountSummaryDTO,
  DocumentSummaryDTO,
  TeamMemberSummaryDTO,
  BusinessInfoSummaryDTO,
} from '../dtos/responses/vendor-detail-response.dto.js';

export class VendorMapper {
  // ─── Full (admin) ─────────────────────
  static toResponse(entity: VendorEntity): VendorResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      name: vo.name.value,
      slug: vo.slug.value,
      displayName: vo.displayName,
      description: vo.description?.value,
      type: vo.type.value as VendorTypeValue,
      businessType: vo.businessType.value as VendorBusinessTypeValue,
      status: vo.status.value as VendorStatusValue,
      tier: vo.tier.value as VendorTierValue,
      email: vo.email,
      phone: vo.phone,
      website: vo.website,
      logoUrl: vo.logoUrl,
      bannerUrl: vo.bannerUrl,
      rating: vo.rating.rating,
      totalSales: vo.totalSales,
      totalOrders: vo.totalOrders,
      isVerified: vo.isVerified,
      isFeatured: vo.isFeatured,
      rejectionReason: entity.rejectionReason,
      suspensionId: entity.suspensionId,
      joinedAt: vo.joinedAt,
      approvedAt: vo.approvedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  // ─── Public (customer-safe) ───────────
  static toPublicResponse(entity: VendorEntity): VendorPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      displayName: vo.displayName,
      description: vo.description?.value,
      type: vo.type.value as VendorTypeValue,
      tier: vo.tier.value as VendorTierValue,
      logoUrl: vo.logoUrl,
      bannerUrl: vo.bannerUrl,
      rating: vo.rating.rating,
      totalSales: vo.totalSales,
      isVerified: vo.isVerified,
      isFeatured: vo.isFeatured,
      joinedAt: vo.joinedAt,
    };
  }

  // ─── Summary (list) ───────────────────
  static toSummary(entity: VendorEntity): VendorSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      displayName: vo.displayName,
      slug: vo.slug.value,
      logoUrl: vo.logoUrl,
      status: vo.status.value as VendorStatusValue,
      tier: vo.tier.value as VendorTierValue,
      rating: vo.rating.rating,
      isVerified: vo.isVerified,
      isFeatured: vo.isFeatured,
      createdAt: entity.createdAt,
    };
  }

  // ─── List (paginated) ─────────────────
  static toListResponse(
    entities: readonly VendorEntity[],
    total: number,
    page: number,
    limit: number,
  ): VendorListResponseDTO {
    const totalPages = Math.ceil(total / limit);
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  // ─── Detail (with children) ───────────
  static toDetail(
    entity: VendorEntity,
    contacts: readonly VendorContactEntity[],
    addresses: readonly VendorAddressEntity[],
    bankAccounts: readonly [],
    documents: readonly [],
    team: readonly [],
  ): VendorDetailResponseDTO {
    return {
      vendor: this.toResponse(entity),
      business: undefined,
      contacts: contacts.map((c) => this.contactToSummary(c)),
      addresses: addresses.map((a) => this.addressToSummary(a)),
      bankAccounts: bankAccounts as readonly BankAccountSummaryDTO[],
      documents: documents as readonly DocumentSummaryDTO[],
      team: team as readonly TeamMemberSummaryDTO[],
      reviewSummary: undefined,
    };
  }

  // ─── Profile entity → response ────────
  static profileToResponse(profile: VendorProfileEntity): VendorResponseDTO {
    const vo = profile.vo;
    const now = new Date().toISOString();
    return {
      id: profile.id,
      userId: '',
      name: vo.name.value,
      slug: vo.slug.value,
      displayName: vo.displayName,
      description: vo.description?.value,
      type: 'individual' as VendorTypeValue,
      businessType: 'retailer' as VendorBusinessTypeValue,
      status: 'pending' as VendorStatusValue,
      tier: 'bronze' as VendorTierValue,
      email: '',
      logoUrl: vo.logoUrl,
      bannerUrl: vo.bannerUrl,
      website: vo.website,
      rating: vo.rating.rating,
      totalSales: 0,
      totalOrders: 0,
      isVerified: vo.isVerified,
      isFeatured: vo.isFeatured,
      joinedAt: profile.createdAt,
      createdAt: profile.createdAt ?? now,
      updatedAt: profile.updatedAt ?? now,
    };
  }

  // ─── Business entity → response ───────
  static businessToResponse(business: VendorBusinessEntity): VendorResponseDTO {
    const vo = business.vo;
    const now = new Date().toISOString();
    return {
      id: business.id,
      userId: '',
      name: vo.legalName.value,
      slug: '',
      displayName: vo.legalName.value,
      type: vo.vendorType.value as VendorTypeValue,
      businessType: vo.businessType.value as VendorBusinessTypeValue,
      status: 'pending' as VendorStatusValue,
      tier: 'bronze' as VendorTierValue,
      email: '',
      rating: 0,
      totalSales: 0,
      totalOrders: 0,
      isVerified: false,
      isFeatured: false,
      joinedAt: business.createdAt,
      createdAt: business.createdAt ?? now,
      updatedAt: business.updatedAt ?? now,
    };
  }

  // ─── Contact → summary ────────────────
  static contactToSummary(contact: VendorContactEntity): ContactSummaryDTO {
    return {
      id: contact.id,
      type: contact.type.value,
      value: contact.contactValue.value,
      label: contact.label,
      isPrimary: contact.isPrimary,
      isVerified: contact.isVerified,
    };
  }

  // ─── Address → summary ────────────────
  static addressToSummary(address: VendorAddressEntity): AddressSummaryDTO {
    return {
      id: address.id,
      label: address.label.value,
      addressType: address.addressType,
      line1: address.line1,
      city: address.city,
      district: address.district,
      division: address.division,
      country: address.country,
      isPrimary: address.isPrimary,
      isVerified: address.isVerified,
    };
  }

  // ─── Stats ────────────────────────────
  static toStatsResponse(stats: {
    total: number;
    activeCount: number;
    pendingCount: number;
    suspendedCount: number;
    verifiedCount: number;
    featuredCount: number;
    totalSales: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    byTier: Readonly<Record<string, number>>;
  }): VendorStatsResponseDTO {
    return {
      total: stats.total,
      activeCount: stats.activeCount,
      pendingCount: stats.pendingCount,
      suspendedCount: stats.suspendedCount,
      verifiedCount: stats.verifiedCount,
      featuredCount: stats.featuredCount,
      totalSales: stats.totalSales,
      byStatus: stats.byStatus,
      byType: stats.byType,
      byTier: stats.byTier,
    };
  }
}
