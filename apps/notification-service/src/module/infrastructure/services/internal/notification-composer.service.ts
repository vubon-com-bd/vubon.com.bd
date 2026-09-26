import { Injectable } from '@nestjs/common';
import { TemplateService } from '../../template-engine/template.service';
import type { TemplateEntity } from '../../../domain/entities/template.entity';

export interface ComposedNotification {
  readonly subject: string | null;
  readonly html: string;
  readonly text: string | null;
}

@Injectable()
export class NotificationComposerService {
  constructor(private readonly templateService: TemplateService) {}

  compose(
    template: TemplateEntity,
    variables: Record<string, unknown>,
  ): ComposedNotification {
    return this.templateService.render(template, variables);
  }
}
