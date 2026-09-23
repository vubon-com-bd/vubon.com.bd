import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CourierServiceInterface } from '../interfaces/courier.service.interface';
import type { CourierRepository } from '../../../domain/repositories/courier.repository.interface';
import { CourierEntity } from '../../../domain/entities/courier.entity';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo';
import { CourierNameVO } from '../../../domain/value-objects/primitives/courier-name.vo';
import { CourierStatusVO } from '../../../domain/value-objects/primitives/courier-status.vo';
import { CourierTypeVO } from '../../../domain/value-objects/primitives/courier-type.vo';
import type { RegisterCourierRequestDTO } from '../../dtos/requests/courier/register-courier.dto';
import type { UpdateCourierRequestDTO } from '../../dtos/requests/courier/update-courier.dto';
import type { SuspendCourierRequestDTO } from '../../dtos/requests/courier/suspend-courier.dto';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

@Injectable()
export class CourierService
  extends BaseService<CourierEntity, string>
  implements CourierServiceInterface
{
  readonly name = 'CourierService';

  constructor(private readonly repo: CourierRepository) {
    super();
  }

  async register(input: RegisterCourierRequestDTO): Promise<CourierResponseDTO> {
    const entity = CourierEntity.create({
      name: CourierNameVO.create(input.name),
      type: CourierTypeVO.create(input.type),
      status: CourierStatusVO.create('active'),
      apiUrl: input.apiUrl ?? null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateCourierRequestDTO): Promise<CourierResponseDTO> {
    const entity = await this.repo.findById(CourierIdVO.create(input.courierId));
    if (!entity) throw new Error('Courier not found');
    return this.toDTO(entity);
  }

  async suspend(input: SuspendCourierRequestDTO): Promise<void> {
    const entity = await this.repo.findById(CourierIdVO.create(input.courierId));
    if (!entity) throw new Error('Courier not found');
    const updated = entity.suspend(input.reason);
    await this.repo.save(updated);
  }

  async listActive(): Promise<readonly CourierResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: CourierEntity): CourierResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as CourierResponseDTO;
  }
}
