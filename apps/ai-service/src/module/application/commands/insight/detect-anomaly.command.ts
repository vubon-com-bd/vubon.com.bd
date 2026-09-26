import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DetectAnomalyRequestDTO } from '../../dtos/requests/insight/detect-anomaly.dto';

export class DetectAnomalyCommand extends BaseCommand {
  readonly type = 'ai.insight.detect-anomaly';
  constructor(public readonly input: DetectAnomalyRequestDTO, public readonly userId: string) { super(); }
}
