import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrainEntityCommand extends BaseCommand {
  readonly type = 'support.chatbot.entity.train';

  constructor(
    public readonly chatbotId: string,
    public readonly name: string,
    public readonly type_: string,
    public readonly value: string,
  ) {
    super();
  }
}
