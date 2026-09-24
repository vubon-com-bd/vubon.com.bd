import { Injectable } from '@nestjs/common';
import { TemplateEngine } from './template-engine';

export interface ResponseOption {
  readonly text: string;
  readonly weight?: number;
}

@Injectable()
export class ResponseSelector {
  constructor(private readonly engine: TemplateEngine) {}

  select(
    responses: readonly ResponseOption[],
    variables: Readonly<Record<string, string>>,
  ): string {
    if (responses.length === 0) return '';
    const picked = responses[Math.floor(Math.random() * responses.length)];
    return this.engine.render(picked?.text ?? '', variables);
  }
}
