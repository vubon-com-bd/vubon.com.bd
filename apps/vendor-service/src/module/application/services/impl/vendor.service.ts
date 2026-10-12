/**
 * VendorService — vendor aggregate root implementation
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../domain/entities/vendor.entity.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../domain/value-objects/primitives/rating-score.vo.js';
import { BusinessDescriptionVO } from '../../../domain/value-objects/primitives/business-description.vo.js';
import { SuspensionReasonVO } from '../../../domain/value-objects/primitives/suspension-reason.vo.js';
import { ApprovalReasonVO } from '../../../domain/value-objects/primitives/approval-reason.vo.js';
import { VendorContactVO } from '../../../domain/value-objects/composites/vendor-contact.vo.js';
import { VendorLocationVO } from '../../../domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../domain/value-objects/primitives/vendor-upazila.vo.js';
import { VendorPhoneVO } from '../../../domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorPhoneVO as _Phone } from '../../../domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorBrandingVO } from '../../../domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLogoVO } from '../../../domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../domain/value-objects/primitives/vendor-banner.vo.js';
import { VendorBusinessInfoVO } from '../../../domain/value-objects/composites/vendor-business-info.vo.js';
import { BusinessNameVO } from '../../../domain/value-objects/primitives/business-name.vo.js';
import { VendorMapper } from '../../mappers/vendor.mapper.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
  type VendorListOptionsDto,
} from '../interfaces/vendor.service.interface.js';
import type { RegisterVendorRequestDto } from '../../dtos/requests/register-vendor.dto.js';
import type { UpdateVendorRequestDto } from '../../dtos/requests/update-vendor.dto.js';
import type { UpdateVendorProfileRequestDto } from '../../dtos/requests/update-profile.dto.js';
import type { UpdateVendorBusinessRequestDto } from '../../dtos/requests/update-business.dto.js';
import type { ActivateVendorRequestDto } from '../../dtos/requests/activate-vendor.dto.js';
import type { DeactivateVendorRequestDto } from '../../dtos/requests/deactivate-vendor.dto.js';
import type { SuspendVendorRequestDto } from '../../dtos/requests/suspend-vendor.dto.js';
import type { ReinstateVendorRequestDto } from '../../dtos/requests/reinstate-vendor.dto.js';
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';
import type { DeleteVendorRequestDto } from '../../dtos/requests/delete-vendor.dto.js';
import type {
  VendorResponseDto,
  VendorPublicDto,
  VendorSummaryDto,
} from '../../dtos/responses/vendor-response.dto.js';
import type { VendorListResponseDto } from '../../dtos/responses/vendor-list-response.dto.js';
import type { VendorStatsResponseDto } from '../../dtos/responses/vendor-stats-response.dto.js';
import { VendorNotFoundError } from '../../errors/vendor.errors.js';
import { VendorAlreadyExistsError } from '../../errors/vendor.errors.js';
import { VendorSlugUnavailableError } from '../../errors/vendor.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import { VendorSlugGeneratorService } from '../../../domain/services/vendor-slug-generator.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

@Injectable()
export class VendorService implements IVendorService {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async register(dto: RegisterVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const existing = await this.repo.existsByUserId(dto.ownerId);
    if (existing) {
      throw new VendorAlreadyExistsError(dto.ownerId);
    }

    const email = VendorEmailVO.create(dto.contactEmail);
    const emailTaken = await this.repo.existsByEmail(email);
    if (emailTaken) {
      throw new VendorAlreadyExistsError(dto.contactEmail);
    }

    const slugBase = dto.slug ? VendorSlugVO.create(dto.slug) : VendorSlugVO.fromName(dto.businessName);
    const allTaken = new Set<string>();
    const pagination = await this.repo.findPaginated({ page: 1, limit: 1000 });
    for (const v of pagination.items) {
      allTaken.add(v.slug.value);
    }
    const slugResult = VendorSlugGeneratorService.generateUnique(slugBase.value, allTaken);
    const slug = slugResult.slug;

    const contact = VendorContactVO.create({
      email,
      phone: dto.contactPhone ? VendorPhoneVO.create(dto.contactPhone) : undefined,
    });

    const address = VendorAddressVO.create({
      line1: dto.addressLine1,
      line2: dto.addressLine2,
      upazila: dto.upazila ?? dto.district,
      district: dto.district,
      division: dto.division,
      postalCode: dto.postalCode,
      country: 'BD',
    });

    const location = VendorLocationVO.create({
      address,
      division: VendorDivisionVO.create(dto.division),
      district: VendorDistrictVO.create(dto.district),
      upazila: VendorUpazilaVO.create(dto.upazila ?? dto.district),
    });

    const businessInfo = VendorBusinessInfoVO.create({
      type: VendorTypeVO.create(dto.vendorType),
      businessType: VendorBusinessTypeVO.create(dto.businessType),
      legalName: BusinessNameVO.create(dto.businessName),
      description: dto.businessDescription
        ? BusinessDescriptionVO.create(dto.businessDescription)
        : undefined,
    });

    const now = new Date().toISOString();
    const vendorId = VendorIdGeneratorService.generateUUID();

    const vendor = VendorEntity.create({
      id: vendorId,
      now,
      props: {
        userId: dto.ownerId,
        name: VendorNameVO.create(dto.businessName),
        slug,
        displayName: VendorNameVO.create(dto.displayName),
        type: VendorTypeVO.create(dto.vendorType),
        businessType: VendorBusinessTypeVO.create(dto.businessType),
        email,
        contact,
        businessInfo,
        location,
        branding: VendorBrandingVO.empty(),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0,
        totalOrders: 0,
        isVerified: false,
        isFeatured: false,
        joinedAt: now,
      },
    });

    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async update(dto: UpdateVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    const now = new Date().toISOString();

    vendor.updateProfile(
      {
        name: dto.name ? VendorNameVO.create(dto.name) : undefined,
        displayName: dto.displayName ? VendorNameVO.create(dto.displayName) : undefined,
        description: dto.description ? BusinessDescriptionVO.create(dto.description) : undefined,
      },
      now,
    );

    if (dto.logoUrl || dto.bannerUrl) {
      const current = vendor.branding ?? VendorBrandingVO.empty();
      let branding = current;
      if (dto.logoUrl) branding = branding.withLogo(VendorLogoVO.create(dto.logoUrl));
      if (dto.bannerUrl) branding = branding.withBanner(VendorBannerVO.create(dto.bannerUrl));
      vendor.updateBranding(branding, now);
    }

    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async updateProfile(dto: UpdateVendorProfileRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    const now = new Date().toISOString();

    vendor.updateProfile(
      {
        name: undefined,
        displayName: undefined,
        description: dto.about ? BusinessDescriptionVO.create(dto.about) : undefined,
      },
      now,
    );

    if (dto.logoUrl || dto.bannerUrl) {
      const current = vendor.branding ?? VendorBrandingVO.empty();
      let branding = current;
      if (dto.logoUrl) branding = branding.withLogo(VendorLogoVO.create(dto.logoUrl));
      if (dto.bannerUrl) branding = branding.withBanner(VendorBannerVO.create(dto.bannerUrl));
      vendor.updateBranding(branding, now);
    }

    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async updateBusiness(dto: UpdateVendorBusinessRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    const now = new Date().toISOString();
    // Business info updates go through profile path in current aggregate
    vendor.updateProfile(
      {
        description: dto.description ? BusinessDescriptionVO.create(dto.description) : undefined,
      },
      now,
    );
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async activate(dto: ActivateVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.activate(new Date().toISOString());
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.deactivate(dto.reason, new Date().toISOString());
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async suspend(dto: SuspendVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.suspend(
      dto.reason,
      dto.durationDays,
      dto.suspendedBy,
      new Date().toISOString(),
    );
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async reinstate(dto: ReinstateVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.liftSuspension(dto.liftedBy, new Date().toISOString());
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async approve(dto: ApproveVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.approve(dto.reviewedBy, new Date().toISOString());
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async reject(dto: RejectVendorRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.reject(dto.reviewedBy, dto.note ?? dto.reason, new Date().toISOString());
    const saved = await this.repo.save(vendor);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async softDelete(dto: DeleteVendorRequestDto, actorId?: string): Promise<void> {
    const vendor = await this.requireVendor(dto.vendorId);
    vendor.softDelete(actorId, new Date().toISOString());
    await this.repo.save(vendor);
  }

  async getById(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this.requireVendor(vendorId);
    return VendorMapper.toResponse(vendor);
  }

  async getPublic(vendorId: string): Promise<VendorPublicDto> {
    const vendor = await this.requireVendor(vendorId);
    return VendorMapper.toPublic(vendor);
  }

  async getBySlug(slug: string): Promise<VendorPublicDto> {
    const vendor = await this.repo.findBySlug(VendorSlugVO.create(slug));
    if (!vendor) {
      throw new VendorNotFoundError(slug);
    }
    return VendorMapper.toPublic(vendor);
  }

  async getSummary(vendorId: string): Promise<VendorSummaryDto> {
    const vendor = await this.requireVendor(vendorId);
    return VendorMapper.toSummary(vendor);
  }

  async list(options: VendorListOptionsDto): Promise<VendorListResponseDto> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    const items = VendorMapper.toSummaryList(result.items);
    return {
      items,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      hasNext: result.page * result.limit < result.total,
      hasPrev: result.page > 1,
    };
  }

  async getStats(vendorId: string): Promise<VendorStatsResponseDto> {
    const vendor = await this.requireVendor(vendorId);
    return {
      vendorId: vendor.id,
      totalProducts: 0,
      totalOrders: vendor.totalOrders,
      totalRevenue: vendor.totalSales,
      totalCommission: 0,
      totalPayout: 0,
      totalRefunds: 0,
      netRevenue: vendor.totalSales,
      averageOrderValue: vendor.totalOrders === 0 ? 0 : Math.round((vendor.totalSales / vendor.totalOrders) * 100) / 100,
      averageRating: vendor.rating.value,
      fulfillmentRate: 0,
      cancellationRate: 0,
      currency: 'BDT',
    };
  }

  private async requireVendor(vendorId: string): Promise<VendorEntity> {
    const vendor = await this.repo.findByIdVO(VendorIdVO.create(vendorId));
    if (!vendor) {
      throw new VendorNotFoundError(vendorId);
    }
    return vendor;
  }
}
