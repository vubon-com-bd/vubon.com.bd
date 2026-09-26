import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { BuildProfileRequestDTO } from '../../dtos/requests/personalization/build-profile.dto';

export class BuildProfileCommand extends BaseCommand {
  readonly type = 'ai.personalization.build-profile';
  constructor(public readonly input: BuildProfileRequestDTO, public readonly userId: string) { super(); }
}
