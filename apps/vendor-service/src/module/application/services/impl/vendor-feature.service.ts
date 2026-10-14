/**
 * VendorFeatureService — feature entitlements
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_FEATURE_REPOSITORY,
  type VendorFeatureRepository,
} from '../../../domain/repositories/vendor-feature.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { FeatureMapper } from '../../mappers/feature.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  IVendorFeatureService,
  FeatureDTO,
} from '../interfaces/vendor-feature.service.interface.js';

@Injectable()
export class VendorFeatureService implements IVendorFeatureService {
  private readonly logger = new Logger(VendorFeatureService.name);

  constructor(
    @Inject(VENDOR_FEATURE_REPOSITORY)
    private readonly repo: VendorFeatureRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async enable(vendorId: string, featureKey: string, actorId: string): Promise<FeatureDTO> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    if (!entity) throw new VendorNotFoundApplicationError(`${vendorId}:${featureKey}`);
    entity.enable(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Feature "${featureKey}" enabled for vendor ${vendorId}`);
    return FeatureMapper.toResponse(saved as never);
  }

  async disable(vendorId: string, featureKey: string, reason: string, actorId: string): Promise<FeatureDTO> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    if (!entity) throw new VendorNotFoundApplicationError(`${vendorId}:${featureKey}`);
    entity.disable(actorId, reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return FeatureMapper.toResponse(saved as never);
  }

  async consume(vendorId: string, featureKey: string, count = 1): Promise<FeatureDTO> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    if (!entity) throw new VendorNotFoundApplicationError(`${vendorId}:${featureKey}`);
    entity.consume(count);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return FeatureMapper.toResponse(saved as never);
  }

  async resetUsage(vendorId: string, featureKey: string, _actorId: string): Promise<FeatureDTO> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    if (!entity) throw new VendorNotFoundApplicationError(`${vendorId}:${featureKey}`);
    entity.resetUsage();
    const saved = await this.repo.save(entity);
    return FeatureMapper.toResponse(saved as never);
  }

  async setLimit(vendorId: string, featureKey: string, limit: number | null, _actorId: string): Promise<FeatureDTO> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    if (!entity) throw new VendorNotFoundApplicationError(`${vendorId}:${featureKey}`);
    entity.setLimit(limit ?? undefined);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return FeatureMapper.toResponse(saved as never);
  }

  async isEnabled(vendorId: string, featureKey: string): Promise<boolean> {
    return this.repo.isFeatureEnabled(vendorId, featureKey);
  }

  async getByKey(vendorId: string, featureKey: string): Promise<FeatureDTO | null> {
    const entity = await this.repo.findByVendorAndKey(vendorId, featureKey);
    return entity ? FeatureMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string): Promise<readonly FeatureDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => FeatureMapper.toResponse(e as never));
  }

  async listEnabled(vendorId: string): Promise<readonly FeatureDTO[]> {
    const entities = await this.repo.findEnabledByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => FeatureMapper.toResponse(e as never));
  }
}
