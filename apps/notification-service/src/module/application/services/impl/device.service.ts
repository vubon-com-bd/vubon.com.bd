import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeviceServiceInterface } from '../interfaces/device.service.interface';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { DeviceEntity } from '../../../domain/entities/device.entity';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo';
import { DevicePlatformVO } from '../../../domain/value-objects/primitives/device-platform.vo';
import { DeviceStatusVO } from '../../../domain/value-objects/primitives/device-status.vo';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto';

@Injectable()
export class DeviceService
  extends BaseService<DeviceEntity, string>
  implements DeviceServiceInterface
{
  readonly name = 'DeviceService';

  constructor(private readonly repo: DeviceRepository) {
    super();
  }

  async findById(id: string): Promise<DeviceResponseDTO | null> {
    const entity = await this.repo.findById(DeviceIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findByUser(userId: string): Promise<readonly DeviceResponseDTO[]> {
    const entities = await this.repo.findByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async register(
    userId: string,
    type: string,
    platform: string,
    token: string,
    fingerprint?: string,
  ): Promise<DeviceResponseDTO> {
    void token;
    const entity = DeviceEntity.create({
      userId: UserIdVO.create(userId),
      type: DeviceTypeVO.create(type),
      platform: DevicePlatformVO.create(platform),
      status: DeviceStatusVO.create('active'),
      fingerprint: fingerprint ?? null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async unregister(deviceId: string): Promise<void> {
    await this.repo.delete(DeviceIdVO.create(deviceId));
  }

  private toDTO(entity: DeviceEntity): DeviceResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      platform: entity.platform.value,
      status: entity.status.value,
      fingerprint: entity.fingerprint,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
