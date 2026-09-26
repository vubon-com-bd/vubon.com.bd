/**
 * GetAutomationHandler
 * @module support-service/application/queries/automation
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAutomationQuery } from './get-automation.query';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class GetAutomationHandler extends BaseQueryHandler<
  GetAutomationQuery,
  AutomationResponseDTO
> {
  readonly queryType = 'support.automation.get';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(query: GetAutomationQuery): Promise<AutomationResponseDTO> {
    return this.automationService.getById(query.automationId);
  }
}
