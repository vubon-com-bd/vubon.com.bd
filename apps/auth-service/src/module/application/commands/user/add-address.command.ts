import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';

export class AddAddressCommand extends BaseCommand {
  readonly type = 'user.add-address';
  constructor(
    public readonly userId: UserId,
    public readonly input: AddAddressRequestDTO,
  ) { super(); }
}
