import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { PageViewEntity } from '../../../domain/entities/page-view.entity';
import { PageViewIdVO } from '../../../domain/value-objects/primitives/page-view-id.vo';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo';
import type { PageViewRepository } from '../../../domain/repositories/page-view.repository.interface';
import type { PageViewServiceInterface } from '../interfaces/page-view.service.interface';

@Injectable()
export class PageViewService
  extends BaseService<PageViewEntity, PageViewIdVO>
  implements PageViewServiceInterface
{
  readonly name = 'PageViewService';

  constructor(private readonly repo: PageViewRepository) {
    super();
  }

  async findBySessionId(sessionId: string): Promise<readonly PageViewEntity[]> {
    return this.repo.findBySession(SessionIdVO.create(sessionId));
  }
}
