/**
 * CreateUserCommand
 * @module user-service/application/commands/user
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/index.js';

export class CreateUserCommand extends BaseCommand {
  readonly type = 'user.create';

  constructor(public readonly payload: CreateUserRequestDTO) {
    super();
  }
}
