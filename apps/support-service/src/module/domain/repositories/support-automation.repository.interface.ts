/**
 * SupportAutomationRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportAutomationEntity } from '../entities/support-automation.entity';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';
import { AutomationStatusVO } from '../value-objects/primitives/automation-status.vo';
import { AutomationTypeVO } from '../value-objects/primitives/automation-type.vo';

export interface SupportAutomationRepository
  extends BaseRepository<SupportAutomationEntity, AutomationIdVO> {
  findActive(): Promise<readonly SupportAutomationEntity[]>;
  findByStatus(status: AutomationStatusVO): Promise<readonly SupportAutomationEntity[]>;
  findByType(type: AutomationTypeVO): Promise<readonly SupportAutomationEntity[]>;
  findScheduled(): Promise<readonly SupportAutomationEntity[]>;
  findDueBefore(isoTime: string): Promise<readonly SupportAutomationEntity[]>;
  findFailing(): Promise<readonly SupportAutomationEntity[]>;
}
