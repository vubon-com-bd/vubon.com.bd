import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

// ⚠️ GraphQL decorators skipped due to @nestjs/graphql v14 / NestJS 10 mismatch
// Enabling GraphQL would require @nestjs/graphql@12
@Injectable()
export class NotificationResolver {
  constructor(private readonly queryBus: QueryBus) {}

  async notifications(userId: string): Promise<unknown> {
    return this.queryBus.execute({ type: 'notification.list', userId });
  }
}
