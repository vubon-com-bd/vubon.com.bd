import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/personalization/update-profile.dto';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'ai.personalization.update-profile';
  constructor(public readonly input: UpdateProfileRequestDTO, public readonly userId: string) { super(); }
}
