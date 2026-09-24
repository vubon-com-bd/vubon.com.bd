import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PreferenceServiceInterface } from '../interfaces/preference.service.interface';
import type { PreferenceRepository } from '../../../domain/repositories/preference.repository.interface';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { PreferenceEntity } from '../../../domain/entities/preference.entity';
import { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { PreferenceIdVO } from '../../../domain/value-objects/primitives/preference-id.vo';
import { PreferenceTypeVO } from '../../../domain/value-objects/primitives/preference-type.vo';
import { PreferenceOptionVO } from '../../../domain/value-objects/primitives/preference-option.vo';
import { PreferenceValueVO } from '../../../domain/value-objects/primitives/preference-value.vo';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

@Injectable()
export class PreferenceService
  extends BaseService<PreferenceEntity, string>
  implements PreferenceServiceInterface
{
  readonly name = 'PreferenceService';

  constructor(
    private readonly preferenceRepo: PreferenceRepository,
    private readonly matrixRepo: PreferenceMatrixRepository,
  ) {
    super();
  }

  async findByUser(userId: string): Promise<PreferenceResponseDTO | null> {
    const matrix = await this.matrixRepo.findByUser(UserIdVO.create(userId));
    if (!matrix) return null;

    return {
      userId: matrix.userId.value,
      emailOptIn: matrix.emailOptIn,
      smsOptIn: matrix.smsOptIn,
      pushOptIn: matrix.pushOptIn,
      inAppOptIn: matrix.inAppOptIn,
      webhookOptIn: matrix.webhookOptIn,
    };
  }

  async update(
    userId: string,
    type: string,
    option: string,
    value: string | boolean | number,
  ): Promise<PreferenceResponseDTO> {
    const userIdVO = UserIdVO.create(userId);

    // Ensure matrix exists
    let matrix = await this.matrixRepo.findByUser(userIdVO);
    if (!matrix) {
      matrix = PreferenceMatrixEntity.create({
        userId: userIdVO,
        emailOptIn: true,
        smsOptIn: true,
        pushOptIn: true,
        inAppOptIn: true,
        webhookOptIn: true,
      });
      matrix = await this.matrixRepo.save(matrix);
    }

    // Upsert granular preference
    const existing = await this.preferenceRepo.findByUserAndType(
      userIdVO,
      PreferenceTypeVO.create(type),
    );
    const match = existing.find((p) => p.option.value === option);
    const valueStr = typeof value === 'boolean' ? String(value) : String(value);

    if (match) {
      const updated = match.updateValue(PreferenceValueVO.create(valueStr));
      await this.preferenceRepo.save(updated);
    } else {
      const entity = PreferenceEntity.create({
        userId: userIdVO,
        type: PreferenceTypeVO.create(type),
        option: PreferenceOptionVO.create(option),
        value: PreferenceValueVO.create(valueStr),
      });
      await this.preferenceRepo.save(entity);
    }

    return {
      userId: matrix.userId.value,
      emailOptIn: matrix.emailOptIn,
      smsOptIn: matrix.smsOptIn,
      pushOptIn: matrix.pushOptIn,
      inAppOptIn: matrix.inAppOptIn,
      webhookOptIn: matrix.webhookOptIn,
    };
  }

  async unsubscribe(
    userId: string,
    channel: string,
    reason?: string,
  ): Promise<void> {
    void reason;
    const userIdVO = UserIdVO.create(userId);

    let matrix = await this.matrixRepo.findByUser(userIdVO);
    if (!matrix) {
      matrix = PreferenceMatrixEntity.create({
        userId: userIdVO,
        emailOptIn: true,
        smsOptIn: true,
        pushOptIn: true,
        inAppOptIn: true,
        webhookOptIn: true,
      });
    }

    const updated = PreferenceMatrixEntity.reconstitute(
      matrix.id,
      {
        userId: matrix.userId,
        emailOptIn: channel === 'email' ? false : matrix.emailOptIn,
        smsOptIn: channel === 'sms' ? false : matrix.smsOptIn,
        pushOptIn: channel === 'push' ? false : matrix.pushOptIn,
        inAppOptIn: channel === 'in_app' ? false : matrix.inAppOptIn,
        webhookOptIn: channel === 'webhook' ? false : matrix.webhookOptIn,
      },
      matrix.createdAt,
      new Date().toISOString(),
      matrix.deletedAt ?? null,
    );

    await this.matrixRepo.save(updated);
  }
}
