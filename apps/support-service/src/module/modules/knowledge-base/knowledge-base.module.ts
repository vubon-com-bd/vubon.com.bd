/**
 * KnowledgeBaseModule
 * @module support-service/modules/knowledge-base
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class KnowledgeBaseModule {}
