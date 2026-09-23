import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LeadSourceServiceInterface } from '../interfaces/lead-source.service.interface';
import type { LeadSourceRepository } from '../../../domain/repositories/lead-source.repository.interface';
import { LeadSourceEntity } from '../../../domain/entities/lead-source.entity';
import { LeadIdVO } from '../../../domain/value-objects/primitives/lead-id.vo';

@Injectable()
export class LeadSourceService
  extends BaseService<LeadSourceEntity, string>
  implements LeadSourceServiceInterface
{
  readonly name = 'LeadSourceService';

  constructor(private readonly repo: LeadSourceRepository) {
    super();
  }

  async findByLead(leadId: string): Promise<readonly LeadSourceEntity[]> {
    return this.repo.findByLead(LeadIdVO.create(leadId));
  }
}
