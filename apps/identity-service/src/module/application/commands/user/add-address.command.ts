import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto.js';
export class AddAddressCommand extends BaseCommand {
  readonly type = 'user.add-address';
  readonly commandType = 'user.add-address';
  constructor(public readonly userId: string, public readonly input: AddAddressRequestDTO) { super(); }
}
