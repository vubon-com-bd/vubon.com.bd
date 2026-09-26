import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PackagingServiceInterface } from '../interfaces/packaging.service.interface';
import type { PackagingRepository } from '../../../domain/repositories/packaging.repository.interface';
import { PackagingEntity } from '../../../domain/entities/packaging.entity';
import { PackagingTypeVO } from '../../../domain/value-objects/primitives/packaging-type.vo';
import { PackagingMaterialVO } from '../../../domain/value-objects/primitives/packaging-material.vo';
import { PackagingSizeVO } from '../../../domain/value-objects/primitives/packaging-size.vo';
import type { CreatePackagingRequestDTO } from '../../dtos/requests/packaging/create-packaging.dto';
import type { SelectPackagingRequestDTO } from '../../dtos/requests/packaging/select-packaging.dto';

@Injectable()
export class PackagingService
  extends BaseService<PackagingEntity, string>
  implements PackagingServiceInterface
{
  readonly name = 'PackagingService';

  constructor(private readonly repo: PackagingRepository) {
    super();
  }

  async create(input: CreatePackagingRequestDTO): Promise<PackagingEntity> {
    const entity = PackagingEntity.create({
      type: PackagingTypeVO.create(input.type),
      material: PackagingMaterialVO.create(input.material),
      size: PackagingSizeVO.create(input.size),
      maxWeight: null,
      cost: input.cost,
      currency: input.currency,
      status: 'available',
    });
    return this.repo.save(entity);
  }

  async select(input: SelectPackagingRequestDTO): Promise<PackagingEntity | null> {
    const all = await this.repo.findAvailable();
    void input;
    return all[0] ?? null;
  }
}
