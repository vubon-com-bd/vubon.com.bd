/**
 * Session Analyzer Service
 * @module analytics-service/domain/services
 *
 * Session-এর behavioral analysis।
 * Business Rule:
 * - Bounce: 1 page view only
 * - Engaged: > 3 min OR > 3 page views
 * - Duration variance calculation
 */
import { SessionEntity } from '../entities/session.entity.js';

export interface SessionAnalysis {
  readonly total: number;
  readonly active: number;
  readonly completed: number;
  readonly bounceRate: number;
  readonly engagementRate: number;
  readonly avgDurationSeconds: number;
  readonly avgPagesPerSession: number;
  readonly avgEventsPerSession: number;
  readonly anonymousRate: number;
}

export class SessionAnalyzerService {
  /**
   * Aggregate stats over sessions
   */
  analyze(sessions: readonly SessionEntity[]): SessionAnalysis {
    if (sessions.length === 0) {
      return {
        total: 0,
        active: 0,
        completed: 0,
        bounceRate: 0,
        engagementRate: 0,
        avgDurationSeconds: 0,
        avgPagesPerSession: 0,
        avgEventsPerSession: 0,
        anonymousRate: 0,
      };
    }

    let bounces = 0;
    let engaged = 0;
    let durationSum = 0;
    let pageViewSum = 0;
    let eventSum = 0;
    let anonymous = 0;
    let active = 0;
    let completed = 0;

    for (const s of sessions) {
      if (s.isBounce()) bounces++;
      if (s.isEngaged()) engaged++;
      durationSum += s.durationSeconds();
      pageViewSum += s.pageViewCount;
      eventSum += s.eventCount;
      if (s.isAnonymous()) anonymous++;
      if (s.isActive()) active++;
      if (s.isCompleted()) completed++;
    }

    const n = sessions.length;
    return {
      total: n,
      active,
      completed,
      bounceRate: Math.round((bounces / n) * 10000) / 100,
      engagementRate: Math.round((engaged / n) * 10000) / 100,
      avgDurationSeconds: Math.round(durationSum / n),
      avgPagesPerSession: Math.round((pageViewSum / n) * 100) / 100,
      avgEventsPerSession: Math.round((eventSum / n) * 100) / 100,
      anonymousRate: Math.round((anonymous / n) * 10000) / 100,
    };
  }

  /**
   * Find sessions with unusual patterns
   */
  findAnomalies(sessions: readonly SessionEntity[]): readonly SessionEntity[] {
    if (sessions.length < 5) return [];

    // Compute mean + stddev for duration
    const durations = sessions.map((s) => s.durationSeconds());
    const mean = durations.reduce((a, b) => a + b, 0) / durations.length;
    const variance =
      durations.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / durations.length;
    const stddev = Math.sqrt(variance);

    // Flag sessions > 2 stddev from mean
    return sessions.filter((s) => {
      const dur = s.durationSeconds();
      return Math.abs(dur - mean) > 2 * stddev;
    });
  }

  /**
   * Classify session quality
   */
  classify(session: SessionEntity): 'bounce' | 'short' | 'medium' | 'engaged' | 'deep' {
    const dur = session.durationSeconds();
    if (session.isBounce() || dur < 10) return 'bounce';
    if (dur < 30) return 'short';
    if (dur < 180) return 'medium';
    if (dur < 600) return 'engaged';
    return 'deep';
  }
}
