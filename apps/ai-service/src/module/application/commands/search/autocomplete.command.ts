import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AutocompleteRequestDTO } from '../../dtos/requests/search/autocomplete.dto';

export class AutocompleteCommand extends BaseCommand {
  readonly type = 'ai.search.autocomplete';
  constructor(public readonly input: AutocompleteRequestDTO) { super(); }
}
