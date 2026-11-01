/**
 * SetDefaultMethodCommand
 * @module payment-service/application/commands/method
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetDefaultMethodRequestDTO } from '@application/dtos/requests/method/index.js';

export class SetDefaultMethodCommand extends BaseCommand {
  readonly type = 'payment.method.set_default';
  constructor(
    public readonly dto: SetDefaultMethodRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
