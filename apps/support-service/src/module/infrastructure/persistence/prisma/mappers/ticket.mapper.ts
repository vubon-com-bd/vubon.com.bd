/**
 * TicketMapper — domain ↔ Prisma raw mapping
 * @module support-service/infrastructure/persistence/prisma/mappers
 *
 * Rule: ORM entity never leaks to domain; map explicitly
 */
import { Injectable } from '@nestjs/common';
import type { Ticket as PrismaTicket } from '@prisma/client';

import { TicketEntity } from '../../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../../../../domain/value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../../../../domain/value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../../../../domain/value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../../../../domain/value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../../../../domain/value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../../../../domain/value-objects/primitives/ticket-channel.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { TicketCategoryIdVO } from '../../../../domain/value-objects/primitives/ticket-category-id.vo';

export interface TicketPersistenceData {
  readonly id: string;
  readonly number: string;
  readonly subject: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly type: string;
  readonly channel: string;
  readonly categoryId: string | null;
  readonly userId: string;
  readonly assignedAgentId: string | null;
  readonly orderId: string | null;
  readonly productId: string | null;
  readonly tags: readonly string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly resolvedAt: Date | null;
  readonly closedAt: Date | null;
  readonly reopenedAt: Date | null;
  readonly deletedAt: Date | null;
}

@Injectable()
export class TicketMapper {
  toDomain(raw: PrismaTicket): TicketEntity {
    return TicketEntity.rehydrate({
      id: raw.id,
      number: raw.number,
      subject: raw.subject,
      description: raw.description,
      status: raw.status,
      priority: raw.priority,
      type: raw.type,
      channel: raw.channel,
      categoryId: raw.categoryId ?? undefined,
      userId: raw.userId,
      assignedAgentId: raw.assignedAgentId ?? undefined,
      orderId: raw.orderId ?? undefined,
      productId: raw.productId ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      resolvedAt: raw.resolvedAt?.toISOString(),
      closedAt: raw.closedAt?.toISOString(),
      reopenedAt: raw.reopenedAt?.toISOString(),
    });
  }

  toPersistence(entity: TicketEntity): TicketPersistenceData {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      number: snap.number,
      subject: snap.subject,
      description: snap.description,
      status: snap.status,
      priority: snap.priority,
      type: snap.type,
      channel: snap.channel,
      categoryId: snap.categoryId ?? null,
      userId: snap.userId,
      assignedAgentId: snap.assignedAgentId ?? null,
      orderId: snap.orderId ?? null,
      productId: snap.productId ?? null,
      tags: [],
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
      resolvedAt: snap.resolvedAt ? new Date(snap.resolvedAt) : null,
      closedAt: snap.closedAt ? new Date(snap.closedAt) : null,
      reopenedAt: snap.reopenedAt ? new Date(snap.reopenedAt) : null,
      deletedAt: null,
    };
  }

  // Reference for unused VO imports (keeps import contract explicit)
  protected readonly __refs = {
    TicketIdVO,
    TicketNumberVO,
    TicketSubjectVO,
    TicketDescriptionVO,
    TicketStatusVO,
    TicketPriorityVO,
    TicketTypeVO,
    TicketChannelVO,
    UserIdVO,
    AgentIdVO,
    OrderIdVO,
    ProductIdVO,
    TicketCategoryIdVO,
  };
}
