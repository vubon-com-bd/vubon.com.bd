import type { SupportAutomationEntity } from '../../../domain/entities/support-automation.entity';
import type { AutomationIdVO } from '../../../domain/value-objects/primitives/automation-id.vo';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation';

export interface AutomationServiceInterface {
  create(input: CreateAutomationRequestDTO): Promise<{ id: string }>;
  findById(id: AutomationIdVO): Promise<SupportAutomationEntity | null>;
}
