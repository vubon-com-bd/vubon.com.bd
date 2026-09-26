/**
 * TicketEscalationModule
 * @module support-service/modules/ticket-escalation
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class TicketEscalationModule {}
