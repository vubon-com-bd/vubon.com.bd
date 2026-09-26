import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ReturnReasonServiceInterface } from '../interfaces/return-reason.service.interface';
import type { ReturnReasonRepository } from '../../../domain/repositories/return-reason.repository.interface';
import type { ReturnReasonEntity } from '../../../domain/entities/return-reason.entity';

@Injectable()
export class ReturnReasonService
  extends BaseService<ReturnReasonEntity, string>
  implements ReturnReasonServiceInterface
{
  readonly name = 'ReturnReasonService';

  constructor(private readonly repo: ReturnReasonRepository) {
    super();
  }

  async listByType(type: string): Promise<readonly ReturnReasonEntity[]> {
    return this.repo.findByType(type);
  }

  async findByCode(code: string): Promise<ReturnReasonEntity | null> {
    return this.repo.findByCode(code);
  }
}
