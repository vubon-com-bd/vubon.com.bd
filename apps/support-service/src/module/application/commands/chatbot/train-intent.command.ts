import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrainIntentCommand extends BaseCommand {
  readonly type = 'support.chatbot.intent.train';

  constructor(
    public readonly chatbotId: string,
    public readonly name: string,
    public readonly patterns: readonly string[],
    public readonly response: string,
  ) {
    super();
  }
}
