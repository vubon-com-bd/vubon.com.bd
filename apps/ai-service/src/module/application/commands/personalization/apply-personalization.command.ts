import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ApplyPersonalizationRequestDTO } from '../../dtos/requests/personalization/apply-personalization.dto';

export class ApplyPersonalizationCommand extends BaseCommand {
  readonly type = 'ai.personalization.apply';
  constructor(public readonly input: ApplyPersonalizationRequestDTO, public readonly userId: string) { super(); }
}
