import { Injectable, Logger } from '@nestjs/common';
import { HandlebarsEngine } from './engines/handlebars.engine';
import { MjmlEngine } from './engines/mjml.engine';
import type { TemplateEntity } from '../../domain/entities/template.entity';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(
    private readonly handlebars: HandlebarsEngine,
    private readonly mjml: MjmlEngine,
  ) {}

  render(
    template: TemplateEntity,
    variables: Record<string, unknown>,
  ): { subject: string | null; html: string; text: string | null } {
    const format = template.format.value;
    const source = template.content.value;

    let html: string;
    if (format === 'mjml') {
      html = this.mjml.render(source, variables);
    } else {
      html = this.handlebars.render(source, variables);
    }

    const subject = template.subject
      ? this.handlebars.render(template.subject, variables)
      : null;

    this.logger.debug(`Rendered template ${template.name.value}`);
    return { subject, html, text: null };
  }
}
