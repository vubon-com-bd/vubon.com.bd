/**
 * Session Builder Service
 * @module analytics-service/domain/services
 *
 * Events থেকে session create/group করে।
 * Business Rule:
 * - Session timeout: 30 min inactive
 * - Same user → same session if within window
 * - Anonymous sessions per device
 */
export interface RawEvent {
  readonly eventId: string;
  readonly userId?: string;
  readonly deviceId?: string;
  readonly timestamp: number;
  readonly isPageView: boolean;
}

export interface SessionGroup {
  readonly sessionId: string;
  readonly userId?: string;
  readonly deviceId?: string;
  readonly eventIds: readonly string[];
  readonly startedAt: number;
  readonly endedAt: number;
  readonly pageViewCount: number;
}

export class SessionBuilderService {
  private static readonly SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min

  /**
   * Group events into sessions
   */
  build(events: readonly RawEvent[]): readonly SessionGroup[] {
    if (events.length === 0) return [];

    // Group by user/device key
    const grouped = new Map<string, RawEvent[]>();
    for (const e of events) {
      const key = e.userId ?? e.deviceId ?? 'anonymous';
      const arr = grouped.get(key) ?? [];
      arr.push(e);
      grouped.set(key, arr);
    }

    const sessions: SessionGroup[] = [];

    for (const [key, userEvents] of grouped.entries()) {
      const sorted = [...userEvents].sort((a, b) => a.timestamp - b.timestamp);
      let current: RawEvent[] = [];
      let lastTime = 0;

      for (const e of sorted) {
        if (current.length === 0) {
          current.push(e);
          lastTime = e.timestamp;
          continue;
        }

        if (e.timestamp - lastTime > SessionBuilderService.SESSION_TIMEOUT_MS) {
          sessions.push(this.toSessionGroup(current, key));
          current = [e];
        } else {
          current.push(e);
        }
        lastTime = e.timestamp;
      }

      if (current.length > 0) {
        sessions.push(this.toSessionGroup(current, key));
      }
    }

    return sessions;
  }

  /**
   * Extend existing session with new event
   */
  extend(
    session: SessionGroup,
    event: RawEvent
  ): { readonly extended: boolean; readonly session?: SessionGroup } {
    // Same user check
    if (session.userId && event.userId && session.userId !== event.userId) {
      return { extended: false };
    }

    // Timeout check
    if (event.timestamp - session.endedAt > SessionBuilderService.SESSION_TIMEOUT_MS) {
      return { extended: false };
    }

    return {
      extended: true,
      session: {
        ...session,
        eventIds: [...session.eventIds, event.eventId],
        endedAt: event.timestamp,
        pageViewCount: session.pageViewCount + (event.isPageView ? 1 : 0),
      },
    };
  }

  // ─── Private ────────────────────────────────

  private toSessionGroup(events: readonly RawEvent[], key: string): SessionGroup {
    const first = events[0];
    const last = events[events.length - 1];
    const pageViews = events.filter((e) => e.isPageView).length;

    return {
      sessionId: `sess_${key}_${first.timestamp}`,
      userId: first.userId,
      deviceId: first.deviceId,
      eventIds: Object.freeze(events.map((e) => e.eventId)),
      startedAt: first.timestamp,
      endedAt: last.timestamp,
      pageViewCount: pageViews,
    };
  }
}
