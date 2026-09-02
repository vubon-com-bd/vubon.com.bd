/**
 * Session Configuration
 * সেশন কনফিগারেশন
 */
export interface SessionConfig {
  secret: string;
  name: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: {
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
    sameSite: 'lax' | 'strict' | 'none';
  };
  store: {
    type: 'redis' | 'memory' | 'database';
    config?: Record<string, unknown>;
  };
}

export const createSessionConfig = (options: {
  secret: string;
  isProduction: boolean;
  redisUrl?: string;
}): SessionConfig => ({
  secret: options.secret,
  name: 'vubon.sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: options.isProduction,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax',
  },
  store: {
    type: options.redisUrl ? 'redis' : 'memory',
    config: options.redisUrl ? { url: options.redisUrl } : undefined,
  },
});
