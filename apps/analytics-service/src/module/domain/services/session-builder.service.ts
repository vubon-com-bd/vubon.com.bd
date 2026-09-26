import { SessionEntity } from '../entities/session.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { PagePathVO } from '../value-objects/primitives/page-path.vo';

export interface RawPageView {
  readonly userId: string | null;
  readonly path: string;
  readonly viewedAt: Date;
  readonly ip?: string;
  readonly userAgent?: string;
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export class SessionBuilderService {
  /**
   * Build sessions from a stream of page views.
   * New session when:
   *   1. Gap > 30 minutes
   *   2. User changes (userId)
   *   3. IP changes
   *   4. User agent changes
   */
  build(views: readonly RawPageView[]): readonly SessionEntity[] {
    if (views.length === 0) return [];

    const sorted = [...views].sort(
      (a, b) => a.viewedAt.getTime() - b.viewedAt.getTime(),
    );

    const sessions: SessionEntity[] = [];
    let current: SessionEntity | null = null;
    let currentIp: string | null = null;
    let currentAgent: string | null = null;

    for (const v of sorted) {
      const isNew =
        current === null ||
        current.userId?.value !== v.userId ||
        v.viewedAt.getTime() - current.startedAt.getTime() > SESSION_TIMEOUT_MS ||
        (v.ip !== undefined && currentIp !== null && v.ip !== currentIp) ||
        (v.userAgent !== undefined &&
          currentAgent !== null &&
          v.userAgent !== currentAgent);

      if (isNew) {
        if (current !== null) sessions.push(current);
        current = SessionEntity.create({
          userId: v.userId ? UserIdVO.create(v.userId) : null,
          entryPage: PagePathVO.create(v.path),
          exitPage: PagePathVO.create(v.path),
          pageViewCount: 1,
          startedAt: v.viewedAt,
          endedAt: null,
        });
        currentIp = v.ip ?? null;
        currentAgent = v.userAgent ?? null;
      } else if (current !== null) {
        // Safe: isNew was false only if current !== null
        current = current.incrementPageView();
      }
    }

    if (current !== null) sessions.push(current);
    return sessions;
  }

  /**
   * Detect anomalous sessions (very long or too many pages).
   */
  detectAnomalies(
    sessions: readonly SessionEntity[],
    maxDurationSeconds = 4 * 60 * 60,
    maxPages = 200,
  ): readonly SessionEntity[] {
    return sessions.filter((s) => {
      const duration = s.getDuration()?.seconds ?? 0;
      return duration > maxDurationSeconds || s.pageViewCount > maxPages;
    });
  }
}
