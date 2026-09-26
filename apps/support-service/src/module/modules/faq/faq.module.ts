/**
 * FaqModule
 * @module support-service/modules/faq
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class FaqModule {}
