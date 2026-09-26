import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TestTemplateCommand } from './test-template.command';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateNameVO } from '../../../domain/value-objects/primitives/template-name.vo';
import { SendGridProvider } from '../../../infrastructure/providers/email/sendgrid.provider';

@CommandHandler(TestTemplateCommand)
export class TestTemplateHandler
  extends BaseCommandHandler<TestTemplateCommand, { sent: boolean }>
  implements ICommandHandler<TestTemplateCommand>
{
  readonly commandType = 'template.test';

  constructor(
    private readonly templateRepo: TemplateRepository,
    private readonly sendGrid: SendGridProvider,
  ) {
    super();
  }

  async execute(command: TestTemplateCommand): Promise<{ sent: boolean }> {
    const template = await this.templateRepo.findByName(
      TemplateNameVO.create(command.templateName),
    );
    if (!template) {
      throw new Error(`Template not found: ${command.templateName}`);
    }

    const rendered = template.content.value.replace(
      /\{\{\s*(\w+)\s*\}\}/g,
      (_, key: string) => {
        const value = command.variables[key];
        return value === undefined ? '' : String(value);
      },
    );

    const result = await this.sendGrid.send({
      recipient: command.recipientEmail,
      subject: template.subject ?? `Test: ${command.templateName}`,
      body: rendered,
      bodyHtml: rendered,
    });

    return { sent: result.success };
  }
}
