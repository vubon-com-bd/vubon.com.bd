/**
 * ProductAttributeService — orchestrates attribute use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  ATTRIBUTE_REPOSITORY,
  type ProductAttributeRepository,
} from '../../../domain/repositories/product-attribute.repository.interface.js';
import { ProductAttributeEntity } from '../../../domain/entities/product-attribute.entity.js';
import { ProductAttributeVO } from '../../../domain/value-objects/composites/product-attribute.vo.js';
import { AttributeIdVO } from '../../../domain/value-objects/primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../../../domain/value-objects/primitives/attribute-name.vo.js';
import { AttributeValueVO } from '../../../domain/value-objects/primitives/attribute-value.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';

import { AttributeMapper } from '../../mappers/attribute.mapper.js';
import type {
  IProductAttributeService,
  AttributeListOptionsDTO,
  AttributeListFilterDTO,
} from '../interfaces/product-attribute.service.interface.js';
import {
  AttributeNotFoundApplicationError,
  AttributeAddError,
  AttributeLimitExceededApplicationError,
} from '../../errors/attribute.errors.js';
import type {
  AddAttributeRequestDTO,
  UpdateAttributeRequestDTO,
  RemoveAttributeRequestDTO,
} from '../../dtos/requests/attribute/index.js';
import type {
  AttributeResponseDTO,
  AttributePublicResponseDTO,
  AttributeListResponseDTO,
} from '../../dtos/responses/attribute-response.dto.js';

const MAX_ATTRIBUTES = 50;

@Injectable()
export class ProductAttributeService implements IProductAttributeService {
  private readonly logger = new Logger(ProductAttributeService.name);

  constructor(
    @Inject(ATTRIBUTE_REPOSITORY)
    private readonly repo: ProductAttributeRepository,
  ) {}

  async add(dto: AddAttributeRequestDTO): Promise<AttributeResponseDTO> {
    const existing = await this.repo.findByProduct(ProductIdVO.create(dto.productId));
    if (existing.length >= MAX_ATTRIBUTES) {
      throw new AttributeLimitExceededApplicationError(MAX_ATTRIBUTES, existing.length);
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    try {
      const vo = ProductAttributeVO.create({
        id: AttributeIdVO.create(id),
        name: AttributeNameVO.create(dto.name),
        values: dto.values.map((v) => AttributeValueVO.create(v.value)),
        isRequired: dto.isRequired ?? false,
        isSearchable: dto.isSearchable ?? true,
        isFilterable: dto.isFilterable ?? true,
        unit: dto.unit,
      });

      const entity = ProductAttributeEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      this.logger.log(`Attribute ${saved.id} added to product ${dto.productId}`);
      return AttributeMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new AttributeAddError(msg);
    }
  }

  async update(dto: UpdateAttributeRequestDTO): Promise<AttributeResponseDTO> {
    const entity = await this.load(dto.attributeId);
    const current = entity.vo.value;

    const nextVo = ProductAttributeVO.create({
      ...current,
      name: dto.name ? AttributeNameVO.create(dto.name) : current.name,
      values: dto.values
        ? dto.values.map((v) => AttributeValueVO.create(v.value))
        : current.values,
      isRequired: dto.isRequired ?? current.isRequired,
      isSearchable: dto.isSearchable ?? current.isSearchable,
      isFilterable: dto.isFilterable ?? current.isFilterable,
      unit: dto.unit !== undefined ? dto.unit : current.unit,
    });

    entity.updateVo(nextVo);
    const saved = await this.repo.save(entity);
    this.logger.log(`Attribute ${saved.id} updated`);
    return AttributeMapper.toResponse(saved);
  }

  async remove(
    dto: RemoveAttributeRequestDTO,
  ): Promise<{ readonly success: true; readonly attributeId: string }> {
    const entity = await this.load(dto.attributeId);
    await this.repo.softDelete(entity.id, dto.actorId);
    this.logger.log(`Attribute ${entity.id} removed`);
    return { success: true, attributeId: entity.id };
  }

  async getById(id: string): Promise<AttributeResponseDTO> {
    const entity = await this.load(id);
    return AttributeMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<AttributePublicResponseDTO> {
    const entity = await this.load(id);
    return AttributeMapper.toPublicResponse(entity);
  }

  async listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]> {
    const entities = await this.repo.findByProduct(ProductIdVO.create(productId));
    return entities.map((e) => AttributeMapper.toResponse(e));
  }

  async list(options: AttributeListOptionsDTO): Promise<AttributeListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as AttributeListFilterDTO | undefined,
    } as never);
    return AttributeMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  private async load(id: string): Promise<ProductAttributeEntity> {
    const vo = AttributeIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new AttributeNotFoundApplicationError(id);
    return entity;
  }
}
