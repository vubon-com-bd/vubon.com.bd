/**
 * TicketSatisfactionModule
 * @module support-service/modules/ticket-satisfaction
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class TicketSatisfactionModule {}
