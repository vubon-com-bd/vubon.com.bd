import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateFunnelDto } from '../../dtos/requests/funnel/create-funnel.dto.js';

export class CreateFunnelCommand extends BaseCommand {
  readonly type = 'analytics.funnel.create';
  constructor(public readonly payload: CreateFunnelDto) { super(); }
}
