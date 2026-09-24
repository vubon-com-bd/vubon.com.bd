import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterDeviceCommand } from './register-device.command';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { DeviceEntity } from '../../../domain/entities/device.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../domain/value-objects/primitives/device-status.vo';
import { DevicePlatformVO } from '../../../domain/value-objects/primitives/device-platform.vo';
import { DeviceRegisteredEvent } from '../../../domain/events/device.events';

@CommandHandler(RegisterDeviceCommand)
export class RegisterDeviceHandler
  extends BaseCommandHandler<RegisterDeviceCommand, DeviceResponseDTO>
  implements ICommandHandler<RegisterDeviceCommand>
{
  readonly commandType = 'device.register';

  constructor(
    private readonly deviceRepo: DeviceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RegisterDeviceCommand): Promise<DeviceResponseDTO> {
    const userIdVO = UserIdVO.create(command.userId);
    const existing = await this.deviceRepo.findByFingerprint(command.fingerprint ?? '');
    if (existing && existing.userId.value === command.userId) {
      return this.toDTO(existing);
    }

    const entity = DeviceEntity.create({
      userId: userIdVO,
      type: DeviceTypeVO.create(command.deviceType),
      platform: DevicePlatformVO.create(command.platform),
      status: DeviceStatusVO.create('active'),
      fingerprint: command.fingerprint ?? null,
    });

    const saved = await this.deviceRepo.save(entity);

    // ✅ Fixed: 4 args
    await this.eventBus.publish(
      new DeviceRegisteredEvent(
        saved.id.value,
        saved.id,
        saved.userId,
        saved.platform.value,
        0,
      ),
    );

    return this.toDTO(saved);
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
