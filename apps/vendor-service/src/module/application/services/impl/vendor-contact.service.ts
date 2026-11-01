/**
 * VendorContactService — contact management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_CONTACT_REPOSITORY,
  type VendorContactRepository,
} from '../../../domain/repositories/vendor-contact.repository.interface.js';
import { VendorContactEntity } from '../../../domain/entities/vendor-contact.entity.js';
import { VendorContactVO } from '../../../domain/value-objects/composites/vendor-contact.vo.js';
import { ContactIdVO } from '../../../domain/value-objects/primitives/contact-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ContactTypeVO } from '../../../domain/value-objects/primitives/contact-type.vo.js';
import { ContactValueVO } from '../../../domain/value-objects/primitives/contact-value.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorMapper } from '../../mappers/vendor.mapper.js';
import { VendorValidationError } from '../../errors/vendor.errors.js';
import type { ContactSummaryDTO } from '../../dtos/responses/vendor-detail-response.dto.js';
import type { IVendorContactService } from '../interfaces/vendor-contact.service.interface.js';

@Injectable()
export class VendorContactService implements IVendorContactService {
  private readonly logger = new Logger(VendorContactService.name);

  constructor(
    @Inject(VENDOR_CONTACT_REPOSITORY)
    private readonly repo: VendorContactRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async add(vendorId: string, type: string, value: string, label?: string, _actorId?: string): Promise<ContactSummaryDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = VendorContactVO.create({
      id: ContactIdVO.create(id),
      vendorId: VendorIdVO.create(vendorId),
      type: ContactTypeVO.create(type),
      contactValue: ContactValueVO.create(value),
      label,
      isPrimary: false,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorContactEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.contactToSummary(saved as never);
  }

  async update(contactId: string, patch: Partial<ContactSummaryDTO>, _actorId?: string): Promise<ContactSummaryDTO> {
    const entity = await this.loadContact(contactId);
    if (patch.label !== undefined) entity.updateLabel(patch.label);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.contactToSummary(saved as never);
  }

  async remove(contactId: string, _actorId?: string): Promise<{ readonly success: true }> {
    await this.repo.delete(contactId);
    this.logger.log(`Contact ${contactId} removed`);
    return { success: true };
  }

  async verify(contactId: string, _actorId: string): Promise<ContactSummaryDTO> {
    const entity = await this.loadContact(contactId);
    entity.verify();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.contactToSummary(saved as never);
  }

  async unverify(contactId: string, _actorId: string): Promise<ContactSummaryDTO> {
    const entity = await this.loadContact(contactId);
    entity.unverify();
    const saved = await this.repo.save(entity);
    return VendorMapper.contactToSummary(saved as never);
  }

  async markPrimary(contactId: string, _actorId: string): Promise<ContactSummaryDTO> {
    const entity = await this.loadContact(contactId);
    entity.markPrimary();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.contactToSummary(saved as never);
  }

  async listByVendor(vendorId: string): Promise<readonly ContactSummaryDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => VendorMapper.contactToSummary(e as never));
  }

  async getPrimary(vendorId: string): Promise<ContactSummaryDTO | null> {
    const entity = await this.repo.findPrimaryByVendor(VendorIdVO.create(vendorId));
    return entity ? VendorMapper.contactToSummary(entity as never) : null;
  }

  private async loadContact(id: string): Promise<VendorContactEntity> {
    const vo = ContactIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorValidationError(`Contact "${id}" not found`, 'contactId');
    return entity;
  }
}
