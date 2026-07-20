/**
 * Domain events for user registration and authentication lifecycle
 * Contains events emitted when users are registered or updated
 */
import type { User } from '../../domain/entities/user.entity';

export class UserRegisteredEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly username: string;
  public readonly firstName: string | null;
  public readonly lastName: string | null;
  public readonly role: string;
  public readonly status: string;
  public readonly isVerified: boolean;
  public readonly requiresVerification: boolean;
  public readonly verificationToken?: string;
  public readonly registeredAt: Date;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: {
    userId: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
    status: string;
    isVerified: boolean;
    requiresVerification: boolean;
    verificationToken?: string;
    registeredAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.status = data.status;
    this.isVerified = data.isVerified;
    this.requiresVerification = data.requiresVerification;
    this.verificationToken = data.verificationToken;
    this.registeredAt = data.registeredAt;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public static fromUser(
    user: User,
    requiresVerification: boolean,
    verificationToken?: string,
    ipAddress?: string,
    userAgent?: string,
  ): UserRegisteredEvent {
    return new UserRegisteredEvent({
      userId: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      requiresVerification,
      verificationToken,
      registeredAt: user.createdAt,
      ipAddress,
      userAgent,
    });
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      status: this.status,
      isVerified: this.isVerified,
      requiresVerification: this.requiresVerification,
      registeredAt: this.registeredAt.toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class UserVerifiedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly verifiedAt: Date;

  constructor(data: { userId: string; email: string; verifiedAt: Date }) {
    this.userId = data.userId;
    this.email = data.email;
    this.verifiedAt = data.verifiedAt;
  }

  public static fromUser(user: User): UserVerifiedEvent {
    return new UserVerifiedEvent({
      userId: user.id,
      email: user.email,
      verifiedAt: new Date(),
    });
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      verifiedAt: this.verifiedAt.toISOString(),
    };
  }
}

export class UserPasswordResetRequestedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly resetToken: string;
  public readonly requestedAt: Date;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: {
    userId: string;
    email: string;
    resetToken: string;
    requestedAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.resetToken = data.resetToken;
    this.requestedAt = data.requestedAt;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      requestedAt: this.requestedAt.toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class UserPasswordChangedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly changedAt: Date;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: {
    userId: string;
    email: string;
    changedAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.changedAt = data.changedAt;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      changedAt: this.changedAt.toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class UserLoggedInEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly sessionId: string;
  public readonly loggedInAt: Date;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: {
    userId: string;
    email: string;
    sessionId: string;
    loggedInAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.sessionId = data.sessionId;
    this.loggedInAt = data.loggedInAt;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      sessionId: this.sessionId,
      loggedInAt: this.loggedInAt.toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class UserLoggedOutEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly sessionId: string;
  public readonly loggedOutAt: Date;
  public readonly allSessions: boolean;

  constructor(data: {
    userId: string;
    email: string;
    sessionId: string;
    loggedOutAt: Date;
    allSessions: boolean;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.sessionId = data.sessionId;
    this.loggedOutAt = data.loggedOutAt;
    this.allSessions = data.allSessions;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      sessionId: this.sessionId,
      loggedOutAt: this.loggedOutAt.toISOString(),
      allSessions: this.allSessions,
    };
  }
}

export class UserAccountSuspendedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly reason?: string;
  public readonly suspendedAt: Date;

  constructor(data: { userId: string; email: string; reason?: string; suspendedAt: Date }) {
    this.userId = data.userId;
    this.email = data.email;
    this.reason = data.reason;
    this.suspendedAt = data.suspendedAt;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      reason: this.reason,
      suspendedAt: this.suspendedAt.toISOString(),
    };
  }
}

export class UserAccountActivatedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly activatedAt: Date;

  constructor(data: { userId: string; email: string; activatedAt: Date }) {
    this.userId = data.userId;
    this.email = data.email;
    this.activatedAt = data.activatedAt;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      activatedAt: this.activatedAt.toISOString(),
    };
  }
}

export class UserDeletedEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly deletedAt: Date;
  public readonly permanent: boolean;

  constructor(data: { userId: string; email: string; deletedAt: Date; permanent: boolean }) {
    this.userId = data.userId;
    this.email = data.email;
    this.deletedAt = data.deletedAt;
    this.permanent = data.permanent;
  }

  public toJSON(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      deletedAt: this.deletedAt.toISOString(),
      permanent: this.permanent,
    };
  }
}
