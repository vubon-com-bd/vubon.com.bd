/**
 * User Registered Event
 * Event emitted when a user successfully registers
 * Used for sending welcome emails, logging, etc.
 */

export class UserRegisteredEvent {
  public readonly userId: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string | null;
  public readonly fullName: string;
  public readonly registeredAt: Date;

  constructor(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string | null = null
  ) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.fullName = `${firstName} ${lastName}`.trim();
    this.registeredAt = new Date();
  }

  /**
   * Get user's display name
   */
  getDisplayName(): string {
    return this.fullName || this.email;
  }

  /**
   * Check if user has phone number
   */
  hasPhone(): boolean {
    return !!this.phone;
  }

  /**
   * Convert to plain object for logging
   */
  toLogObject(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      fullName: this.fullName,
      hasPhone: this.hasPhone(),
      registeredAt: this.registeredAt.toISOString(),
    };
  }
}
