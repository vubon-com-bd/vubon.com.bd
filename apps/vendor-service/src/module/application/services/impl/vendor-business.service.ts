/**
 * VendorBusinessService — legal/business info management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_BUSINESS_REPOSITORY,
  type VendorBusinessRepository,
} from '../../../domain/repositories/vendor-business.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BusinessNameVO } from '../../../domain/value-objects/primitives/business-name.vo.js';
import { BusinessRegistrationVO } from '../../../domain/value-objects/primitives/business-registration.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorMapper } from '../../mappers/vendor.mapper.js';
import { VendorNotFoundApplicationError, VendorBusinessUpdateError } from '../../errors/vendor.errors.js';
import type { UpdateBusinessRequestDTO } from '../../dtos/requests/vendor/update-business.dto.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';
import type { IVendorBusinessService } from '../interfaces/vendor-business.service.interface.js';

@Injectable()
export class VendorBusinessService implements IVendorBusinessService {
  private readonly logger = new Logger(VendorBusinessService.name);

  constructor(
    @Inject(VENDOR_BUSINESS_REPOSITORY)
    private readonly businessRepo: VendorBusinessRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateBusinessRequestDTO, _actorId?: string): Promise<VendorResponseDTO> {
    const business = await this.businessRepo.findByVendorId(VendorIdVO.create(dto.vendorId));
    if (!business) throw new VendorNotFoundApplicationError(dto.vendorId);

    try {
      if (dto.legalName) business.updateLegalName(BusinessNameVO.create(dto.legalName));
      if (dto.registrationNumber !== undefined) {
        business.setRegistrationNumber(
          dto.registrationNumber ? BusinessRegistrationVO.create(dto.registrationNumber) : undefined,
        );
      }
      if (dto.taxId !== undefined) business.setTaxId(dto.taxId);
      if (dto.vatNumber !== undefined) business.setVatNumber(dto.vatNumber);
      if (dto.establishedYear !== undefined) business.setEstablishedYear(dto.establishedYear);
      if (dto.employeeCount !== undefined) business.setEmployeeCount(dto.employeeCount);
      if (dto.annualRevenue !== undefined) business.setAnnualRevenue(dto.annualRevenue);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorBusinessUpdateError(dto.vendorId, msg);
    }

    const saved = await this.businessRepo.save(business);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Vendor ${dto.vendorId} business updated`);
    return VendorMapper.businessToResponse(saved as never);
  }

  async getByVendorId(vendorId: string): Promise<VendorResponseDTO> {
    const business = await this.businessRepo.findByVendorId(VendorIdVO.create(vendorId));
    if (!business) throw new VendorNotFoundApplicationError(vendorId);
    return VendorMapper.businessToResponse(business as never);
  }

  async setRegistrationNumber(vendorId: string, regNumber: string, actorId: string): Promise<VendorResponseDTO> {
    return this.update({ vendorId, registrationNumber: regNumber, actorId }, actorId);
  }

  async setTaxId(vendorId: string, taxId: string, actorId: string): Promise<VendorResponseDTO> {
    return this.update({ vendorId, taxId, actorId }, actorId);
  }
}
