/**
 * VendorProfileService — profile management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_PROFILE_REPOSITORY,
  type VendorProfileRepository,
} from '../../../domain/repositories/vendor-profile.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../domain/value-objects/primitives/vendor-name.vo.js';
import { BusinessDescriptionVO } from '../../../domain/value-objects/primitives/business-description.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorMapper } from '../../mappers/vendor.mapper.js';
import { VendorNotFoundApplicationError, VendorProfileUpdateError } from '../../errors/vendor.errors.js';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/vendor/update-profile.dto.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';
import type { IVendorProfileService } from '../interfaces/vendor-profile.service.interface.js';

@Injectable()
export class VendorProfileService implements IVendorProfileService {
  private readonly logger = new Logger(VendorProfileService.name);

  constructor(
    @Inject(VENDOR_PROFILE_REPOSITORY)
    private readonly profileRepo: VendorProfileRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateProfileRequestDTO, _actorId?: string): Promise<VendorResponseDTO> {
    const vendorId = VendorIdVO.create(dto.vendorId);
    const profile = await this.profileRepo.findByVendorId(vendorId);
    if (!profile) throw new VendorNotFoundApplicationError(dto.vendorId);

    try {
      profile.updateBasics({
        name: dto.name ? VendorNameVO.create(dto.name) : undefined,
        displayName: dto.displayName,
        tagline: dto.tagline,
        description: dto.description ? BusinessDescriptionVO.create(dto.description) : undefined,
      });
      profile.updateMedia({ logoUrl: dto.logoUrl, bannerUrl: dto.bannerUrl });
      if (dto.website !== undefined) profile.updateWebsite(dto.website);
      if (dto.socialLinks !== undefined) profile.setSocialLinks(dto.socialLinks);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorProfileUpdateError(dto.vendorId, msg);
    }

    const saved = await this.profileRepo.save(profile);
    await this.eventBridge.publishFromEntity(saved as never);

    this.logger.log(`Vendor ${dto.vendorId} profile updated`);
    return VendorMapper.profileToResponse(saved as never);
  }

  async getByVendorId(vendorId: string): Promise<VendorResponseDTO> {
    const profile = await this.profileRepo.findByVendorId(VendorIdVO.create(vendorId));
    if (!profile) throw new VendorNotFoundApplicationError(vendorId);
    return VendorMapper.profileToResponse(profile as never);
  }

  async markFeatured(vendorId: string, _actorId: string): Promise<VendorResponseDTO> {
    const profile = await this.profileRepo.findByVendorId(VendorIdVO.create(vendorId));
    if (!profile) throw new VendorNotFoundApplicationError(vendorId);
    profile.markFeatured();
    const saved = await this.profileRepo.save(profile);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.profileToResponse(saved as never);
  }

  async markUnfeatured(vendorId: string, _actorId: string): Promise<VendorResponseDTO> {
    const profile = await this.profileRepo.findByVendorId(VendorIdVO.create(vendorId));
    if (!profile) throw new VendorNotFoundApplicationError(vendorId);
    profile.markUnfeatured();
    const saved = await this.profileRepo.save(profile);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.profileToResponse(saved as never);
  }
}
