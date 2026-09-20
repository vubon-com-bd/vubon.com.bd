import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthBiometricServiceInterface } from '../interfaces/auth-biometric.service.interface';
import type { AuthBiometricRepository } from '../../../domain/repositories/auth-biometric.repository.interface';
import { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { BiometricIdVO } from '../../../domain/value-objects/primitives/biometric-id.vo';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto';

@Injectable()
export class AuthBiometricService
  extends BaseService<AuthBiometricEntity, string>
  implements AuthBiometricServiceInterface
{
  readonly name = 'AuthBiometricService';

  constructor(
    @Inject('AuthBiometricRepository') private readonly biometricRepo: AuthBiometricRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async enroll(
    userId: string,
    input: { biometricId: string; type: string },
  ): Promise<BiometricResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const entity = AuthBiometricEntity.create({
      userId: userIdVO,
      biometricId: BiometricIdVO.create(input.biometricId),
      type: input.type as never,
      isEnabled: true,
      enrolledAt: new Date(),
      lastUsedAt: null,
    });
    await this.biometricRepo.save(entity);
    return {
      enabled: true,
      biometricId: input.biometricId,
      enrolledAt: new Date().toISOString(),
    };
  }

  async verify(userId: string, biometricId: string): Promise<boolean> {
    const entities = await this.biometricRepo.findByUser(UserIdVO.create(userId));
    return entities.some(
      (e) => e.isEnabled && e.biometricId.value === biometricId,
    );
  }

  async disable(userId: string): Promise<void> {
    const entities = await this.biometricRepo.findByUser(UserIdVO.create(userId));
    for (const entity of entities) {
      if (!entity.isEnabled) continue;
      const disabled = entity.disable();
      await this.biometricRepo.save(disabled);
    }
  }
}
