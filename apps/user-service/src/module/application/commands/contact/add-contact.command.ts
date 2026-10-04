/**
 * AddContactCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddContactRequestDTO } from '../../dtos/requests/contact/index.js';

export class AddContactCommand extends BaseCommand {
  readonly type = 'contact.add';

  constructor(public readonly payload: AddContactRequestDTO) {
    super();
  }
}
