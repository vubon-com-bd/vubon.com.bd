import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MarketingAutomationEntity } from '../entities/marketing-automation.entity';
import { MarketingAutomationIdVO } from '../value-objects/primitives/marketing-automation-id.vo';

export interface MarketingAutomationRepository
  extends BaseRepository<MarketingAutomationEntity, MarketingAutomationIdVO> {
  findActive(): Promise<readonly MarketingAutomationEntity[]>;
}
