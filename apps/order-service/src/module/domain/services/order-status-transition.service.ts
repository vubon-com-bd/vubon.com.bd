/**
 * OrderStatusTransitionService — validate status transitions
 * @module order-service/domain/services
 *
 * Pure state machine — no side effects.
 */
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';

export interface StatusTransition {
  readonly from: string;
  readonly to: string;
}

export class OrderStatusTransitionService {
  private static readonly TRANSITIONS: Record<string, readonly string[]> = {
    [ORDER_STATUS.PENDING]: [
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.FAILED,
      ORDER_STATUS.ON_HOLD,
    ],
    [ORDER_STATUS.CONFIRMED]: [
      ORDER_STATUS.PROCESSING,
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.ON_HOLD,
    ],
    [ORDER_STATUS.PROCESSING]: [
      ORDER_STATUS.PACKED,
      ORDER_STATUS.CANCELLED,
    ],
    [ORDER_STATUS.PACKED]: [
      ORDER_STATUS.SHIPPED,
      ORDER_STATUS.CANCELLED,
    ],
    [ORDER_STATUS.SHIPPED]: [
      ORDER_STATUS.OUT_FOR_DELIVERY,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.RETURNED,
    ],
    [ORDER_STATUS.OUT_FOR_DELIVERY]: [
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.FAILED,
    ],
    [ORDER_STATUS.DELIVERED]: [
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.RETURNED,
    ],
    [ORDER_STATUS.ON_HOLD]: [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.CANCELLED,
    ],
    [ORDER_STATUS.RETURNED]: [ORDER_STATUS.REFUNDED],
    // COMPLETED, CANCELLED, REFUNDED, FAILED — terminal
  };

  private static readonly FINAL_STATUSES: readonly string[] = [
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
    ORDER_STATUS.REFUNDED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RETURNED,
  ];

  /** Check if transition is allowed. */
  static canTransition(from: string, to: string): boolean {
    if (from === to) return false;
    const allowed = this.TRANSITIONS[from] ?? [];
    return allowed.includes(to);
  }

  /** Check if a status is terminal (no outgoing transitions). */
  static isFinal(status: string): boolean {
    return this.FINAL_STATUSES.includes(status);
  }

  /** Check if a status is "active" (order still in progress). */
  static isActive(status: string): boolean {
    return !this.isFinal(status) && status !== ORDER_STATUS.FAILED && status !== ORDER_STATUS.ON_HOLD;
  }

  /** Get all valid next statuses from a given status. */
  static nextStatuses(from: string): readonly string[] {
    return this.TRANSITIONS[from] ?? [];
  }

  /** Get all previous statuses that can transition TO a given status. */
  static previousStatuses(to: string): readonly string[] {
    return Object.entries(this.TRANSITIONS)
      .filter(([, targets]) => targets.includes(to))
      .map(([from]) => from);
  }

  /** Check if a status can be cancelled. */
  static canCancel(status: string): boolean {
    return this.canTransition(status, ORDER_STATUS.CANCELLED);
  }

  /** Check if a status can be shipped. */
  static canShip(status: string): boolean {
    return this.canTransition(status, ORDER_STATUS.SHIPPED);
  }

  /** Check if a status can be delivered. */
  static canDeliver(status: string): boolean {
    return this.canTransition(status, ORDER_STATUS.DELIVERED);
  }

  /** Check if a status can be returned. */
  static canReturn(status: string): boolean {
    return this.canTransition(status, ORDER_STATUS.RETURNED);
  }

  /** Check if a status can be refunded. */
  static canRefund(status: string): boolean {
    return status === ORDER_STATUS.RETURNED || status === ORDER_STATUS.CANCELLED;
  }

  /** Compute the full path from one status to another (BFS). */
  static findPath(from: string, to: string): readonly string[] | null {
    if (from === to) return [from];
    const queue: Array<{ status: string; path: string[] }> = [
      { status: from, path: [from] },
    ];
    const visited = new Set<string>([from]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const nexts = this.TRANSITIONS[current.status] ?? [];
      for (const next of nexts) {
        if (next === to) return [...current.path, next];
        if (!visited.has(next)) {
          visited.add(next);
          queue.push({ status: next, path: [...current.path, next] });
        }
      }
    }
    return null;
  }
}
