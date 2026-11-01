import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateReturnPolicyRequestDTO } from '../../dtos/requests/return-policy/index.js';

export class UpdateReturnPolicyCommand extends BaseCommand {
  readonly type = 'vendor.return_policy.update';
  constructor(
    public readonly dto: UpdateReturnPolicyRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
