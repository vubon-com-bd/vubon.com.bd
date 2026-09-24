import { ChatbotResponseService } from './chatbot-response.service';

export interface ResponseTemplate {
  readonly content: string;
}

export class AutoResponseService {
  constructor(private readonly renderer: ChatbotResponseService) {}

  build(
    template: ResponseTemplate,
    variables: Readonly<Record<string, string>>,
  ): string {
    return this.renderer.render(template.content, variables);
  }
}
