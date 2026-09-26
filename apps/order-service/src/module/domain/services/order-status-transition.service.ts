const TRANSITIONS: Record<string, readonly string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: ['returned'],
  cancelled: [],
  returned: ['refunded'],
  refunded: [],
};

export class OrderStatusTransitionService {
  static canTransition(from: string, to: string): boolean {
    return TRANSITIONS[from]?.includes(to) ?? false;
  }
}
