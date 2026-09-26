/**
 * ListChatbotsHandler
 * @module support-service/application/queries/chatbot
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListChatbotsQuery } from './list-chatbots.query';
import type { ChatbotRepository } from '../../../domain/repositories/chatbot.repository.interface';
import { ChatbotMapper } from '../../mappers/chatbot.mapper';

export interface ChatbotListResponse {
  readonly items: readonly Readonly<Record<string, unknown>>[];
  readonly total: number;
}

export class ListChatbotsHandler extends BaseQueryHandler<
  ListChatbotsQuery,
  ChatbotListResponse
> {
  readonly queryType = 'support.chatbot.list';

  constructor(
    private readonly chatbotRepo: ChatbotRepository,
    private readonly mapper: ChatbotMapper,
  ) {
    super();
  }

  async execute(query: ListChatbotsQuery): Promise<ChatbotListResponse> {
    const all = await this.chatbotRepo.findAll();
    const safeLimit = Math.max(1, Math.min(query.limit, 100));
    const safePage = Math.max(1, query.page);
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice).map((dto) => ({ ...dto })),
      total: all.length,
    };
  }
}
