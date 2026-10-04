/**
 * AddAddressCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddAddressRequestDTO } from '../../dtos/requests/address/index.js';

export class AddAddressCommand extends BaseCommand {
  readonly type = 'address.add';

  constructor(public readonly payload: AddAddressRequestDTO) {
    super();
  }
}
