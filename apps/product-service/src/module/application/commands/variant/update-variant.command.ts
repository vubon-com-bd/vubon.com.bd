/**
 * UpdateVariantCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVariantRequestDTO } from '../../dtos/requests/variant/update-variant.dto.js';

export class UpdateVariantCommand extends BaseCommand {
  readonly type = 'variant.update';
  constructor(public readonly dto: UpdateVariantRequestDTO) { super(); }
}
