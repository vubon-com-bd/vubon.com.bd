/**
 * AddVariantCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddVariantRequestDTO } from '../../dtos/requests/variant/add-variant.dto.js';

export class AddVariantCommand extends BaseCommand {
  readonly type = 'variant.add';
  constructor(
    public readonly dto: AddVariantRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
