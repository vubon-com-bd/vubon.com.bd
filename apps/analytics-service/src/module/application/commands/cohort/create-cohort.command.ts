import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCohortDto } from '../../dtos/requests/cohort/create-cohort.dto.js';

export class CreateCohortCommand extends BaseCommand {
  readonly type = 'analytics.cohort.create';
  constructor(public readonly payload: CreateCohortDto) { super(); }
}
