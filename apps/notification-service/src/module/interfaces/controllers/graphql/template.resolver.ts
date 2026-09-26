import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

// ⚠️ GraphQL decorators skipped — see notification.resolver.ts
@Injectable()
export class TemplateResolver {
  constructor(private readonly queryBus: QueryBus) {}

  async templates(): Promise<unknown> {
    return this.queryBus.execute({ type: 'template.list' });
  }
}
