import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { Auth2FaServiceInterface } from '../interfaces/auth-2fa.service.interface';
import type { Auth2FaRepository } from '../../../domain/repositories/auth-2fa.repository.interface';
import { Auth2FaEntity } from '../../../domain/entities/auth-2fa.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@Injectable()
export class Auth2FaService
  extends BaseService<Auth2FaEntity, string>
  implements Auth2FaServiceInterface
{
  readonly name = 'Auth2FaService';

  constructor(
    @Inject('Auth2FaRepository') private readonly twoFaRepo: Auth2FaRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async enable(userId: string, method: string): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const existing = await this.twoFaRepo.findByUser(userIdVO);
    if (existing) {
      const enabled = existing.enable(method as never);
      await this.twoFaRepo.save(enabled);
      return;
    }
    const created = Auth2FaEntity.create({
      userId: userIdVO,
      isEnabled: true,
      method: method as never,
      backupCodesRemaining: 0,
      enabledAt: new Date(),
    });
    await this.twoFaRepo.save(created);
  }

  async disable(userId: string): Promise<void> {
    const entity = await this.twoFaRepo.findByUser(UserIdVO.create(userId));
    if (!entity) return;
    const disabled = entity.disable();
    await this.twoFaRepo.save(disabled);
  }

  async verify(userId: string, code: string): Promise<boolean> {
    void code;
    const entity = await this.twoFaRepo.findByUser(UserIdVO.create(userId));
    return entity?.isEnabled ?? false;
  }
}
