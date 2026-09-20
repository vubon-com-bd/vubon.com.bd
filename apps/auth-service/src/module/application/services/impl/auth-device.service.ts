import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthDeviceServiceInterface } from '../interfaces/auth-device.service.interface';
import type { AuthDeviceRepository } from '../../../domain/repositories/auth-device.repository.interface';
import { AuthDeviceEntity } from '../../../domain/entities/auth-device.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { DeviceFingerprintVO } from '../../../domain/value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../domain/value-objects/primitives/device-status.vo';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto';

@Injectable()
export class AuthDeviceService
  extends BaseService<AuthDeviceEntity, string>
  implements AuthDeviceServiceInterface
{
  readonly name = 'AuthDeviceService';

  constructor(
    @Inject('AuthDeviceRepository') private readonly deviceRepo: AuthDeviceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async register(input: {
    userId: string;
    fingerprint: string;
    type: string;
    name: string | null;
  }): Promise<AuthDeviceResponseDTO> {
    const entity = AuthDeviceEntity.create({
      userId: UserIdVO.create(input.userId),
      fingerprint: DeviceFingerprintVO.create(input.fingerprint),
      type: DeviceTypeVO.create(input.type),
      status: DeviceStatusVO.create('untrusted'),
      name: input.name,
      lastSeenAt: new Date(),
      trustedAt: null,
    });
    await this.deviceRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async trust(deviceId: string): Promise<AuthDeviceResponseDTO> {
    const entity = await this.deviceRepo.findById(deviceId);
    if (!entity) {
      throw new Error(`Device not found: ${deviceId}`);
    }
    const trusted = entity.trust();
    await this.deviceRepo.save(trusted);
    return this.toDTO(trusted);
  }

  async findByFingerprint(fingerprint: string): Promise<AuthDeviceResponseDTO | null> {
    const entity = await this.deviceRepo.findByFingerprint(
      DeviceFingerprintVO.create(fingerprint),
    );
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: AuthDeviceEntity): AuthDeviceResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value,
      name: entity.name ?? undefined,
      trusted: entity.isTrusted,
      lastActiveAt: entity.lastSeenAt.toISOString(),
      createdAt: entity.createdAt,
      isCurrent: false,
    };
  }

  private async publishEvents(entity: AuthDeviceEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
