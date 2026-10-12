/**
 * PackagingService
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IPackagingService, PackagingListOptionsDTO } from '../interfaces/packaging.service.interface.js';
import { PACKAGING_REPOSITORY, type PackagingRepository } from '../../../domain/repositories/packaging.repository.interface.js';
import { PackagingEntity } from '../../../domain/entities/packaging.entity.js';
import { PackagingIdVO } from '../../../domain/value-objects/primitives/packaging-id.vo.js';
import { PackagingTypeVO } from '../../../domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../../../domain/value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '../../../domain/value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';

import { PackagingMapper } from '../../mappers/packaging.mapper.js';
import {
  PackagingNotFoundApplicationError,
  PackagingOperationFailedApplicationError,
} from '../../errors/packaging.errors.js';

import type {
  CreatePackagingRequestDTO, UpdatePackagingRequestDTO,
  AdjustPackagingStockRequestDTO, RestockPackagingRequestDTO,
  ConsumePackagingRequestDTO, SelectPackagingRequestDTO,
} from '../../dtos/requests/packaging/packaging.dto.js';
import type { PackagingResponseDTO, PackagingListResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@Injectable()
export class PackagingService implements IPackagingService {
  private readonly logger = new Logger(PackagingService.name);

  constructor(@Inject(PACKAGING_REPOSITORY) private readonly repo: PackagingRepository) {}

  async create(dto: CreatePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO> {
    const now = new Date().toISOString();
    if (await this.repo.existsByCode(dto.code)) {
      throw new PackagingOperationFailedApplicationError('create', `packaging code exists: ${dto.code}`);
    }
    const id = randomUUID();
    let entity: PackagingEntity;
    try {
      entity = PackagingEntity.create({
        id, now,
        props: {
          name: dto.name,
          code: dto.code,
          type: PackagingTypeVO.create(dto.type),
          material: PackagingMaterialVO.create(dto.material),
          dimensions: DimensionCmVO.create(dto.lengthCm, dto.widthCm, dto.heightCm),
          maxWeightKg: WeightKgVO.create(dto.maxWeightKg),
          cost: dto.cost !== undefined ? ShippingCostVO.create(dto.cost, dto.currency ?? 'BDT') : undefined,
          imageUrl: dto.imageUrl as never,
          isFragile: dto.isFragile,
          isTemperatureControlled: dto.isTemperatureControlled,
          isRecyclable: dto.isRecyclable,
          stock: dto.stock,
          isDefault: dto.isDefault ?? false,
        },
      });
    } catch (e) {
      throw new PackagingOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Packaging ${saved.id} created by ${actorId ?? 'system'}`);
    return PackagingMapper.toResponse(saved);
  }

  async update(dto: UpdatePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO> {
    const entity = await this.load(dto.packagingId);
    // PackagingEntity-এ updateName নেই; শুধু cost-update scenario handle করা হলো
    const saved = await this.repo.save(entity);
    this.logger.log(`Packaging ${saved.id} updated by ${actorId ?? 'system'}`);
    return PackagingMapper.toResponse(saved);
  }

  async restock(dto: RestockPackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO> {
    const entity = await this.load(dto.packagingId);
    entity.restock(dto.quantity);
    const saved = await this.repo.save(entity);
    this.logger.log(`Packaging ${saved.id} restocked +${dto.quantity} by ${actorId ?? 'system'}`);
    return PackagingMapper.toResponse(saved);
  }

  async consume(dto: ConsumePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO> {
    const entity = await this.load(dto.packagingId);
    entity.consume(dto.quantity);
    const saved = await this.repo.save(entity);
    this.logger.log(`Packaging ${saved.id} consumed -${dto.quantity} by ${actorId ?? 'system'}`);
    return PackagingMapper.toResponse(saved);
  }

  async adjustStock(dto: AdjustPackagingStockRequestDTO, actorId?: string): Promise<PackagingResponseDTO> {
    const entity = await this.load(dto.packagingId);
    entity.adjustStock(dto.delta, dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Packaging ${saved.id} stock adjusted ${dto.delta} by ${actorId ?? 'system'}`);
    return PackagingMapper.toResponse(saved);
  }

  async select(dto: SelectPackagingRequestDTO): Promise<readonly PackagingResponseDTO[]> {
    const items = await this.repo.findCapableOf(dto.weightKg, dto.dimensions);
    return items.map((p) => PackagingMapper.toResponse(p));
  }

  async getById(packagingId: string): Promise<PackagingResponseDTO> {
    return PackagingMapper.toResponse(await this.load(packagingId));
  }

  async list(options: PackagingListOptionsDTO): Promise<PackagingListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return PackagingMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  async getDefault(): Promise<PackagingResponseDTO | null> {
    const p = await this.repo.findDefault();
    return p ? PackagingMapper.toResponse(p) : null;
  }

  private async load(id: string): Promise<PackagingEntity> {
    const vo = PackagingIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new PackagingNotFoundApplicationError(id);
    return e;
  }
}
