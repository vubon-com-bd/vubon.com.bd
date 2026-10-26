/**
 * RulePrismaMapper — Prisma NotificationRule row
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Notification rules — trigger/filter/throttle/quiet-hours/escalation।
 */
import type { PrismaNotificationRule } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonAs,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

export interface RuleConditionRow {
  readonly field: string;
  readonly operator: string;
  readonly value: unknown;
}

export interface RuleActionRow {
  readonly action: string;
  readonly params?: Readonly<Record<string, unknown>>;
}

export interface RuleRow {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly status: string;
  readonly priority: number;
  readonly conditions: readonly RuleConditionRow[];
  readonly actions: readonly RuleActionRow[];
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string;
}

export class RulePrismaMapper {
  static toRow(raw: PrismaNotificationRule): RuleRow {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      status: raw.status,
      priority: raw.priority,
      conditions: jsonAs<readonly RuleConditionRow[]>(raw.conditions, Object.freeze([])),
      actions: jsonAs<readonly RuleActionRow[]>(raw.actions, Object.freeze([])),
      metadata: jsonAs<Readonly<Record<string, unknown>>>(raw.metadata, Object.freeze({})),
      createdBy: raw.createdBy,
      updatedBy: raw.updatedBy ?? undefined,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt),
    };
  }

  static toPersistence(row: RuleRow): Record<string, unknown> {
    return {
      id: row.id,
      name: row.name,
      type: row.type,
      status: row.status,
      priority: row.priority,
      conditions: [...row.conditions],
      actions: [...row.actions],
      metadata: { ...row.metadata },
      createdBy: row.createdBy,
      updatedBy: row.updatedBy ?? null,
      deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
    };
  }
}
