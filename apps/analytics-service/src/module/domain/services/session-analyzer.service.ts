import { SessionEntity } from '../entities/session.entity';

export interface SessionStats {
  readonly totalSessions: number;
  readonly bounceRate: number;
  readonly avgDurationSeconds: number;
  readonly avgPagesPerSession: number;
}

export class SessionAnalyzerService {
  analyze(sessions: readonly SessionEntity[]): SessionStats {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        bounceRate: 0,
        avgDurationSeconds: 0,
        avgPagesPerSession: 0,
      };
    }

    let bounces = 0;
    let totalDuration = 0;
    let totalPages = 0;

    for (const s of sessions) {
      if (s.isBounce) bounces++;
      const d = s.getDuration();
      totalDuration += d?.seconds ?? 0;
      totalPages += s.pageViewCount;
    }

    return {
      totalSessions: sessions.length,
      bounceRate: (bounces / sessions.length) * 100,
      avgDurationSeconds: totalDuration / sessions.length,
      avgPagesPerSession: totalPages / sessions.length,
    };
  }
}
