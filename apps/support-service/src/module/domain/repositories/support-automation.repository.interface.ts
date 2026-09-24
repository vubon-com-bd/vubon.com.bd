import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportAutomationEntity } from '../entities/support-automation.entity';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';

export interface SupportAutomationRepository extends BaseRepository<SupportAutomationEntity, AutomationIdVO> {
  findActive(): Promise<readonly SupportAutomationEntity[]>;
}
