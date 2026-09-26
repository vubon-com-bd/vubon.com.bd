/**
 * AutomationServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';
import type { UpdateAutomationRequestDTO } from '../../dtos/requests/automation/update-automation.dto';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';

export interface AutomationServiceInterface {
  create(input: CreateAutomationRequestDTO): Promise<AutomationResponseDTO>;
  update(input: UpdateAutomationRequestDTO): Promise<AutomationResponseDTO>;
  getById(automationId: string): Promise<AutomationResponseDTO>;
  list(page: number, limit: number): Promise<readonly AutomationResponseDTO[]>;
  enable(automationId: string): Promise<AutomationResponseDTO>;
  disable(automationId: string): Promise<AutomationResponseDTO>;
  trigger(
    automationId: string,
    outcome: 'success' | 'failure' | 'partial',
    errorMessage?: string,
  ): Promise<AutomationResponseDTO>;
}
