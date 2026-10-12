/**
 * VendorProfileService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorBrandingVO } from '../../../domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLogoVO } from '../../../domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../domain/value-objects/primitives/vendor-banner.vo.js';
import { BusinessDescriptionVO } from '../../../domain/value-objects/primitives/business-description.vo.js';
import { VendorMapper } from '../../mappers/vendor.mapper.js';
import {
  VENDOR_PROFILE_SERVICE,
  type IVendorProfileService,
} from '../interfaces/vendor-profile.service.interface.js';
import type { UpdateVendorProfileRequestDto } from '../../dtos/requests/update-profile.dto.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';
import { VendorNotFoundError } from '../../errors/vendor.errors.js';

@Injectable()
export class VendorProfileService implements IVendorProfileService {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
  ) {}

  async update(dto: UpdateVendorProfileRequestDto, _actorId?: string): Promise<VendorResponseDto> {
    const vendor = await this.repo.findByIdVO(VendorIdVO.create(dto.vendorId));
    if (!vendor) throw new VendorNotFoundError(dto.vendorId);

    const now = new Date().toISOString();
    vendor.updateProfile(
      {
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
    return VendorMapper.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this.repo.findByIdVO(VendorIdVO.create(vendorId));
    if (!vendor) throw new VendorNotFoundError(vendorId);
    return VendorMapper.toResponse(vendor);
  }
}
