import { Injectable } from '@nestjs/common';
import { SESSION_CONFIG } from '../../config/session.config';

export interface RawPageView {
  readonly userId: string | null;
  readonly path: string;
  readonly viewedAt: Date;
  readonly referrer?: string;
  readonly userAgent?: string;
}

export interface BuiltSession {
  readonly sessionId: string;
  readonly userId: string | null;
  readonly entryPage: string;
  readonly exitPage: string;
  readonly pageViewCount: number;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
  readonly isBounce: boolean;
}

@Injectable()
export class SessionBuilderService {
  /**
   * Build sessions from a page-view stream.
   * New session when gap > timeout or user changes.
   */
  build(views: readonly RawPageView[]): readonly BuiltSession[] {
    if (views.length === 0) return [];

    const sorted = [...views].sort(
      (a, b) => a.viewedAt.getTime() - b.viewedAt.getTime(),
    );

    const timeoutMs = SESSION_CONFIG.timeoutMinutes * 60 * 1000;
    const sessions: BuiltSession[] = [];
    let current: {
      userId: string | null;
      entry: string;
      exit: string;
      count: number;
      start: Date;
      end: Date | null;
    } | null = null;

    for (const v of sorted) {
      const isNew =
        current === null ||
        current.userId !== v.userId ||
        v.viewedAt.getTime() - current.start.getTime() > timeoutMs;

      if (isNew) {
        if (current) {
          sessions.push(this.finalize(current, timeoutMs));
        }
        current = {
          userId: v.userId,
          entry: v.path,
          exit: v.path,
          count: 1,
          start: v.viewedAt,
          end: null,
        };
      } else {
        current!.exit = v.path;
        current!.count += 1;
      }
    }

    if (current) sessions.push(this.finalize(current, timeoutMs));
    return sessions;
  }

  private finalize(
    c: {
      userId: string | null;
      entry: string;
      exit: string;
      count: number;
      start: Date;
      end: Date | null;
    },
    timeoutMs: number,
  ): BuiltSession {
    const isStillActive = Date.now() - c.start.getTime() < timeoutMs;
    const endedAt = isStillActive
      ? null
      : new Date(c.start.getTime() + c.count * 1000);
    return {
      sessionId: crypto.randomUUID(),
      userId: c.userId,
      entryPage: c.entry,
      exitPage: c.exit,
      pageViewCount: c.count,
      startedAt: c.start,
      endedAt,
      isBounce: c.count <= 1,
    };
  }
}
