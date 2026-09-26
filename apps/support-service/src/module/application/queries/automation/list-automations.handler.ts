/**
 * ListAutomationsHandler
 * @module support-service/application/queries/automation
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAutomationsQuery } from './list-automations.query';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class ListAutomationsHandler extends BaseQueryHandler<
  ListAutomationsQuery,
  readonly AutomationResponseDTO[]
> {
  readonly queryType = 'support.automation.list';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(query: ListAutomationsQuery): Promise<readonly AutomationResponseDTO[]> {
    return this.automationService.list(query.page, query.limit);
  }
}
