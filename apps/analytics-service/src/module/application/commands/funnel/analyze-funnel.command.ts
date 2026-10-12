import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AnalyzeFunnelDto } from '../../dtos/requests/funnel/analyze-funnel.dto.js';

export class AnalyzeFunnelCommand extends BaseCommand {
  readonly type = 'analytics.funnel.analyze';
  constructor(public readonly funnelId: string, public readonly payload: AnalyzeFunnelDto) { super(); }
}
