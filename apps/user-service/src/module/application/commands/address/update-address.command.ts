/**
 * UpdateAddressCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/address/index.js';

export class UpdateAddressCommand extends BaseCommand {
  readonly type = 'address.update';

  constructor(public readonly payload: UpdateAddressRequestDTO) {
    super();
  }
}
