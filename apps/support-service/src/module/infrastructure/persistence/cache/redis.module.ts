/**
 * SupportRedisModule — Redis + cache repositories
 * @module support-service/infrastructure/persistence/cache
 */
import { Global, Module } from '@nestjs/common';
import { SupportRedisService } from './redis.service';
import { TicketCacheRepository } from './repositories/ticket.cache.repository';
import { FaqCacheRepository } from './repositories/faq.cache.repository';
import { KnowledgeArticleCacheRepository } from './repositories/knowledge-article.cache.repository';
import { AgentCacheRepository } from './repositories/agent.cache.repository';
import { SlaCacheRepository } from './repositories/sla.cache.repository';
import { ChatbotCacheRepository } from './repositories/chatbot.cache.repository';

const CACHE_REPOSITORIES = [
  TicketCacheRepository,
  FaqCacheRepository,
  KnowledgeArticleCacheRepository,
  AgentCacheRepository,
  SlaCacheRepository,
  ChatbotCacheRepository,
];

@Global()
@Module({
  providers: [SupportRedisService, ...CACHE_REPOSITORIES],
  exports: [SupportRedisService, ...CACHE_REPOSITORIES],
})
export class SupportRedisModule {}
