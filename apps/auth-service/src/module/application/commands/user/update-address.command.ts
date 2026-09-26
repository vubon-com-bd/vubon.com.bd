import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';

export class UpdateAddressCommand extends BaseCommand {
  readonly type = 'user.update-address';
  constructor(
    public readonly addressId: string,
    public readonly input: UpdateAddressRequestDTO,
  ) { super(); }
}
