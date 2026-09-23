import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DriverServiceInterface } from '../interfaces/driver.service.interface';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.interface';
import { DriverEntity } from '../../../domain/entities/driver.entity';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo';
import { DriverNameVO } from '../../../domain/value-objects/primitives/driver-name.vo';
import { DriverLicenseVO } from '../../../domain/value-objects/primitives/driver-license.vo';
import { DriverStatusVO } from '../../../domain/value-objects/primitives/driver-status.vo';
import { DriverTypeVO } from '../../../domain/value-objects/primitives/driver-type.vo';
import type { RegisterDriverRequestDTO } from '../../dtos/requests/driver/register-driver.dto';
import type { UpdateDriverRequestDTO } from '../../dtos/requests/driver/update-driver.dto';
import type { SetDriverStatusRequestDTO } from '../../dtos/requests/driver/set-driver-status.dto';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@Injectable()
export class DriverService
  extends BaseService<DriverEntity, string>
  implements DriverServiceInterface
{
  readonly name = 'DriverService';

  constructor(private readonly repo: DriverRepository) {
    super();
  }

  async register(input: RegisterDriverRequestDTO): Promise<DriverResponseDTO> {
    const entity = DriverEntity.create({
      name: DriverNameVO.create(input.name),
      phone: input.phone,
      license: DriverLicenseVO.create(input.licenseNo),
      type: DriverTypeVO.create(input.type),
      status: DriverStatusVO.create('available'),
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateDriverRequestDTO): Promise<DriverResponseDTO> {
    const entity = await this.repo.findById(DriverIdVO.create(input.driverId));
    if (!entity) throw new Error('Driver not found');
    return this.toDTO(entity);
  }

  async setStatus(input: SetDriverStatusRequestDTO): Promise<DriverResponseDTO> {
    const entity = await this.repo.findById(DriverIdVO.create(input.driverId));
    if (!entity) throw new Error('Driver not found');
    return this.toDTO(entity);
  }

  async listAvailable(): Promise<readonly DriverResponseDTO[]> {
    const entities = await this.repo.findAvailable();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: DriverEntity): DriverResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DriverResponseDTO;
  }
}
