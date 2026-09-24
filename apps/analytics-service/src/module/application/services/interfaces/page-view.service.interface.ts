import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PageViewEntity } from '../../../domain/entities/page-view.entity';
import type { PageViewIdVO } from '../../../domain/value-objects/primitives/page-view-id.vo';

export interface PageViewServiceInterface
  extends BaseServiceInterface<PageViewEntity, PageViewIdVO> {
  findBySessionId(sessionId: string): Promise<readonly PageViewEntity[]>;
}
