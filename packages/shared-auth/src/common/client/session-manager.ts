/**
 * Session Manager
 * সেশন ম্যানেজার
 */
export interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo?: {
    userAgent: string;
    ip: string;
    platform: string;
    browser: string;
  };
  isActive: boolean;
}

export interface SessionOptions {
  maxSessionDuration: number; // milliseconds
  inactivityTimeout: number; // milliseconds
  maxConcurrentSessions: number;
  rememberMe: boolean;
}

export class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private options: SessionOptions;

  constructor(options: SessionOptions) {
    this.options = options;
  }

  createSession(userId: string, deviceInfo?: Session['deviceInfo']): Session {
    const session: Session = {
      id: this.generateSessionId(),
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.options.maxSessionDuration),
      lastActivity: new Date(),
      deviceInfo,
      isActive: true,
    };

    this.sessions.set(session.id, session);

    // Clean up old sessions if limit exceeded
    this.enforceSessionLimit(userId);

    return session;
  }

  getSession(sessionId: string): Session | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      this.invalidateSession(sessionId);
      return null;
    }

    // Check inactivity timeout
    const inactiveTime = Date.now() - session.lastActivity.getTime();
    if (inactiveTime > this.options.inactivityTimeout) {
      this.invalidateSession(sessionId);
      return null;
    }

    // Update last activity
    session.lastActivity = new Date();
    this.sessions.set(sessionId, session);

    return session;
  }

  validateSession(sessionId: string): boolean {
    const session = this.getSession(sessionId);
    return session !== null && session.isActive;
  }

  invalidateSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      this.sessions.set(sessionId, session);
    }
  }

  invalidateAllSessions(userId: string): void {
    for (const [sessionId, session] of this.sessions) {
      if (session.userId === userId && session.isActive) {
        session.isActive = false;
        this.sessions.set(sessionId, session);
      }
    }
  }

  getActiveSessions(userId: string): Session[] {
    const activeSessions: Session[] = [];
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.isActive) {
        const isValid = this.getSession(session.id) !== null;
        if (isValid) {
          activeSessions.push(session);
        }
      }
    }
    return activeSessions;
  }

  getSessionCount(userId: string): number {
    return this.getActiveSessions(userId).length;
  }

  extendSession(sessionId: string): boolean {
    const session = this.getSession(sessionId);
    if (!session) return false;

    session.expiresAt = new Date(Date.now() + this.options.maxSessionDuration);
    session.lastActivity = new Date();
    this.sessions.set(sessionId, session);
    return true;
  }

  private enforceSessionLimit(userId: string): void {
    const activeSessions = this.getActiveSessions(userId);
    if (activeSessions.length > this.options.maxConcurrentSessions) {
      // Invalidate oldest sessions
      const sorted = activeSessions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const toRemove = sorted.slice(0, sorted.length - this.options.maxConcurrentSessions);
      for (const session of toRemove) {
        this.invalidateSession(session.id);
      }
    }
  }

  private generateSessionId(): string {
    return 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
  }

  clearExpiredSessions(): void {
    for (const [sessionId, session] of this.sessions) {
      if (session.expiresAt < new Date() || !session.isActive) {
        this.sessions.delete(sessionId);
      }
    }
  }

  getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }

  getStats(): {
    totalSessions: number;
    activeSessions: number;
    expiredSessions: number;
  } {
    let active = 0;
    let expired = 0;

    for (const session of this.sessions.values()) {
      if (session.isActive) {
        if (session.expiresAt < new Date()) {
          expired++;
        } else {
          active++;
        }
      }
    }

    return {
      totalSessions: this.sessions.size,
      activeSessions: active,
      expiredSessions: expired,
    };
  }
}

export const createSessionManager = (options: Partial<SessionOptions> = {}): SessionManager => {
  const defaultOptions: SessionOptions = {
    maxSessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
    inactivityTimeout: 30 * 60 * 1000, // 30 minutes
    maxConcurrentSessions: 5,
    rememberMe: false,
  };

  return new SessionManager({ ...defaultOptions, ...options });
};
