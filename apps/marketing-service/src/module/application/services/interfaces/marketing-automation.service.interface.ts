import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MarketingAutomationEntity } from '../../../domain/entities/marketing-automation.entity';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';

export interface MarketingAutomationServiceInterface
  extends BaseServiceInterface<MarketingAutomationEntity, string> {
  create(input: CreateAutomationRequestDTO): Promise<AutomationResponseDTO>;
  trigger(automationId: string, userId: string): Promise<void>;
  findActive(): Promise<readonly AutomationResponseDTO[]>;
}
