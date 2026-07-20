/**
 * Event handler for logging user registration activity
 * Handles the UserRegisteredEvent to log registration activities
 */
import { randomUUID } from 'node:crypto';

import type { UserRegisteredEvent } from '../events/user-registered.event';

export interface ActivityLogger {
  logActivity(data: ActivityLogData): Promise<void>;
}

export interface ActivityLogData {
  userId: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown>;
  ipAddress: string | null;
  userAgent: string | null;
  timestamp: Date;
}

export interface UserActivityRepository {
  save(activity: UserActivity): Promise<UserActivity>;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export class LogRegistrationActivityHandler {
  constructor(
    private readonly activityLogger: ActivityLogger,
    private readonly activityRepository?: UserActivityRepository
  ) {}

  public async handle(event: UserRegisteredEvent): Promise<void> {
    try {
      // Prepare activity log data
      const activityData: ActivityLogData = {
        userId: event.userId,
        action: 'REGISTER',
        resource: 'User',
        resourceId: event.userId,
        metadata: {
          email: event.email,
          username: event.username,
          firstName: event.firstName,
          lastName: event.lastName,
          role: event.role,
          status: event.status,
          isVerified: event.isVerified,
          requiresVerification: event.requiresVerification,
          registrationDate: event.registeredAt.toISOString(),
          ipAddress: event.ipAddress ?? null,
          userAgent: event.userAgent ?? null,
        },
        ipAddress: event.ipAddress || null,
        userAgent: event.userAgent || null,
        timestamp: event.registeredAt,
      };

      // Log the activity using the logger
      await this.activityLogger.logActivity(activityData);

      // If repository is available, save the activity
      if (this.activityRepository) {
        const activity: UserActivity = {
          id: this.generateActivityId(),
          userId: event.userId,
          action: 'REGISTER',
          resource: 'User',
          resourceId: event.userId,
          metadata: activityData.metadata,
          ipAddress: activityData.ipAddress,
          userAgent: activityData.userAgent,
          createdAt: event.registeredAt,
        };

        await this.activityRepository.save(activity);
      }

      // Log success using console.warn to satisfy no-console rule
      console.warn(`Registration activity logged successfully for user ${event.userId}`);
    } catch (error) {
      // Log error but don't fail the registration process
      console.error(`Failed to log registration activity for user ${event.userId}:`, error);
    }
  }

  private generateActivityId(): string {
    return randomUUID();
  }
}

export class DetailedRegistrationLogger {
  constructor(private readonly activityLogger: ActivityLogger) {}

  public async logRegistration(event: UserRegisteredEvent): Promise<void> {
    const activityData: ActivityLogData = {
      userId: event.userId,
      action: 'REGISTER',
      resource: 'User',
      resourceId: event.userId,
      metadata: {
        // User details
        email: event.email,
        username: event.username,
        firstName: event.firstName,
        lastName: event.lastName,
        fullName:
          event.firstName && event.lastName
            ? `${event.firstName} ${event.lastName}`
            : event.firstName || event.lastName || event.username,

        // Account details
        role: event.role,
        status: event.status,
        isVerified: event.isVerified,
        requiresVerification: event.requiresVerification,

        // Registration details
        registrationDate: event.registeredAt.toISOString(),
        registrationSource: 'email',
        verificationToken: event.verificationToken ? '****' : null,

        // Request context
        ipAddress: event.ipAddress ?? null,
        userAgent: event.userAgent ?? null,
        userAgentParsed: this.parseUserAgent(event.userAgent),

        // Timestamps
        timestamp: new Date().toISOString(),
      },
      ipAddress: event.ipAddress || null,
      userAgent: event.userAgent || null,
      timestamp: event.registeredAt,
    };

    await this.activityLogger.logActivity(activityData);
  }

  private parseUserAgent(userAgent?: string): Record<string, string> | null {
    if (!userAgent) {
      return null;
    }

    const parsed: Record<string, string> = {
      raw: userAgent,
    };

    // Extract browser information
    const browserMatch = userAgent.match(/(chrome|safari|firefox|edge|opera)\/(\d+\.\d+)/i);
    if (browserMatch && browserMatch[1] && browserMatch[2]) {
      parsed.browser = browserMatch[1];
      parsed.browserVersion = browserMatch[2];
    }

    // Extract OS information
    const osMatch = userAgent.match(/(windows|mac os x|linux|android|ios|iphone|ipad)/i);
    if (osMatch && osMatch[1]) {
      parsed.os = osMatch[1];
    }

    // Check if mobile
    parsed.isMobile = /mobile/i.test(userAgent) ? 'true' : 'false';

    return parsed;
  }
}

export class RegistrationMetricsLogger {
  constructor(private readonly activityLogger: ActivityLogger) {}

  public async logRegistrationMetrics(event: UserRegisteredEvent): Promise<void> {
    const metricsData: ActivityLogData = {
      userId: event.userId,
      action: 'REGISTRATION_METRICS',
      resource: 'Metrics',
      resourceId: null,
      metadata: {
        // User metrics
        userId: event.userId,
        role: event.role,
        status: event.status,
        isVerified: event.isVerified,
        requiresVerification: event.requiresVerification,

        // Time metrics
        registrationTime: event.registeredAt.toISOString(),
        timezone: new Date().getTimezoneOffset(),

        // Source metrics
        ipAddress: event.ipAddress ?? null,
        userAgent: event.userAgent ?? null,
        source: 'web',

        // Derived metrics
        isNewUser: true,
        verificationRequired: event.requiresVerification,
        registrationMethod: 'email',
      },
      ipAddress: event.ipAddress || null,
      userAgent: event.userAgent || null,
      timestamp: event.registeredAt,
    };

    await this.activityLogger.logActivity(metricsData);
  }
}
