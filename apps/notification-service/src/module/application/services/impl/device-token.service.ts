import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeviceTokenServiceInterface } from '../interfaces/device-token.service.interface';
import type { DeviceTokenRepository } from '../../../domain/repositories/device-token.repository.interface';
import { DeviceTokenEntity } from '../../../domain/entities/device-token.entity';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo';
import { DeviceTokenVO } from '../../../domain/value-objects/primitives/device-token.vo';

@Injectable()
export class DeviceTokenService
  extends BaseService<DeviceTokenEntity, string>
  implements DeviceTokenServiceInterface
{
  readonly name = 'DeviceTokenService';

  constructor(private readonly repo: DeviceTokenRepository) {
    super();
  }

  async findByDeviceId(deviceId: string): Promise<readonly DeviceTokenEntity[]> {
    return this.repo.findByDeviceId(DeviceIdVO.create(deviceId));
  }

  async findByToken(token: string): Promise<DeviceTokenEntity | null> {
    return this.repo.findByToken(DeviceTokenVO.create(token));
  }

  async updateToken(deviceId: string, token: string): Promise<void> {
    const entity = DeviceTokenEntity.create({
      deviceId: DeviceIdVO.create(deviceId),
      token: DeviceTokenVO.create(token),
      lastUsedAt: new Date(),
    });
    await this.repo.save(entity);
  }
}
