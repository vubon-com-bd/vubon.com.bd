export interface DigestNotificationData {
  createdAt: Date;
}

export interface DigestResult<T> {
  summary: string;
  count: number;
  notifications: T[];
}

export class NotificationDigest<T extends DigestNotificationData> {
  private notifications: T[] = [];
  private period: 'hourly' | 'daily' | 'weekly' | 'monthly' = 'daily';

  addNotification(notification: T): this {
    this.notifications.push(notification);
    return this;
  }

  setPeriod(period: 'hourly' | 'daily' | 'weekly' | 'monthly'): this {
    this.period = period;
    return this;
  }

  generate(): DigestResult<T> {
    const count = this.notifications.length;
    const summary = `${count} notifications from the last ${this.period}`;
    const sorted = [...this.notifications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return {
      summary,
      count,
      notifications: sorted,
    };
  }

  reset(): void {
    this.notifications = [];
  }
}
