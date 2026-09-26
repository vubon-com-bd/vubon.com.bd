import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeleteAddressRequestDTO } from '../../dtos/requests/user/delete-address.dto';

export class DeleteAddressCommand extends BaseCommand {
  readonly type = 'user.delete-address';
  constructor(public readonly input: DeleteAddressRequestDTO) { super(); }
}
