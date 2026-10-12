import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AnalyzeCohortDto } from '../../dtos/requests/cohort/analyze-cohort.dto.js';

export class AnalyzeCohortCommand extends BaseCommand {
  readonly type = 'analytics.cohort.analyze';
  constructor(public readonly cohortId: string, public readonly payload: AnalyzeCohortDto) { super(); }
}
