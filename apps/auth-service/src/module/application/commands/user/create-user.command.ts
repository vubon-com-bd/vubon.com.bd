import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';

export class CreateUserCommand extends BaseCommand {
  readonly type = 'user.create';
  constructor(public readonly input: CreateUserRequestDTO) { super(); }
}
