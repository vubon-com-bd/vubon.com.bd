/**
 * AttributeService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IAttributeService } from '../interfaces/attribute.service.interface.js';
import { ATTRIBUTE_REPOSITORY, type AttributeRepository } from '../../../domain/repositories/attribute.repository.interface.js';
import { ProductAttributeEntity } from '../../../domain/entities/product-attribute.entity.js';
import { AttributeMapper } from '../../mappers/attribute.mapper.js';
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/add-attribute.dto.js';
import type { UpdateAttributeRequestDTO } from '../../dtos/requests/attribute/update-attribute.dto.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';
import { AttributeNotFoundApplicationError } from '../../errors/attribute.errors.js';

@Injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @Inject(ATTRIBUTE_REPOSITORY) private readonly attributeRepo: AttributeRepository,
  ) {}

  async add(dto: AddAttributeRequestDTO, actorId: string): Promise<AttributeResponseDTO> {
    const now = new Date().toISOString();
    const attr = ProductAttributeEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: dto.productId,
        name: dto.name,
        slug: dto.slug,
        type: dto.type,
        isRequired: dto.isRequired ?? false,
        isSearchable: dto.isSearchable ?? true,
        isFilterable: dto.isFilterable ?? true,
        unit: dto.unit,
        options: dto.options,
      },
    });
    await this.attributeRepo.save(attr);
    void actorId;
    return AttributeMapper.toResponse(attr);
  }

  async update(dto: UpdateAttributeRequestDTO): Promise<AttributeResponseDTO> {
    const attr = await this.attributeRepo.findById(dto.attributeId);
    if (!attr) throw new AttributeNotFoundApplicationError(dto.attributeId);
    if (dto.name !== undefined || dto.slug !== undefined) {
      attr.rename(dto.name ?? attr.name, dto.slug ?? attr.slug);
    }
    attr.changeFlags({
      isRequired: dto.isRequired,
      isSearchable: dto.isSearchable,
      isFilterable: dto.isFilterable,
    });
    await this.attributeRepo.save(attr);
    return AttributeMapper.toResponse(attr);
  }

  async remove(attributeId: string, actorId: string): Promise<void> {
    const attr = await this.attributeRepo.findById(attributeId);
    if (!attr) throw new AttributeNotFoundApplicationError(attributeId);
    await this.attributeRepo.delete(attributeId);
    void actorId;
  }

  async listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]> {
    const attrs = await this.attributeRepo.findByProductId(productId);
    return AttributeMapper.toResponseList(attrs);
  }
}
