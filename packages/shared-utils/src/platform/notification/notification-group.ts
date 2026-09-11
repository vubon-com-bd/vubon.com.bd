export interface NotificationGroupData {
  type: string;
  channel: string;
  status: string;
  createdAt: Date;
}

export class NotificationGroup<T extends NotificationGroupData> {
  private groups: Map<string, T[]> = new Map();

  byType(notifications: T[]): Map<string, T[]> {
    this.groups.clear();
    for (const notification of notifications) {
      const key = notification.type;
      if (!this.groups.has(key)) {
        this.groups.set(key, []);
      }
      this.groups.get(key)!.push(notification);
    }
    return this.groups;
  }

  byChannel(notifications: T[]): Map<string, T[]> {
    this.groups.clear();
    for (const notification of notifications) {
      const key = notification.channel;
      if (!this.groups.has(key)) {
        this.groups.set(key, []);
      }
      this.groups.get(key)!.push(notification);
    }
    return this.groups;
  }

  byStatus(notifications: T[]): Map<string, T[]> {
    this.groups.clear();
    for (const notification of notifications) {
      const key = notification.status;
      if (!this.groups.has(key)) {
        this.groups.set(key, []);
      }
      this.groups.get(key)!.push(notification);
    }
    return this.groups;
  }

  byDate(notifications: T[]): Map<string, T[]> {
    this.groups.clear();
    for (const notification of notifications) {
      const date = new Date(notification.createdAt).toISOString().split('T')[0];
      if (!this.groups.has(date)) {
        this.groups.set(date, []);
      }
      this.groups.get(date)!.push(notification);
    }
    return this.groups;
  }
}
