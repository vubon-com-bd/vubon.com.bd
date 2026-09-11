export interface NotificationFilterData {
  type?: string;
  channel?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  endDate?: Date;
  isRead?: boolean;
  isDismissed?: boolean;
  isArchived?: boolean;
}

export class NotificationFilter {
  private filters: NotificationFilterData = {};

  byType(type: string): this {
    this.filters.type = type;
    return this;
  }

  byChannel(channel: string): this {
    this.filters.channel = channel;
    return this;
  }

  byStatus(status: string): this {
    this.filters.status = status;
    return this;
  }

  byPriority(priority: string): this {
    this.filters.priority = priority;
    return this;
  }

  byDateRange(start: Date, end: Date): this {
    this.filters.startDate = start;
    this.filters.endDate = end;
    return this;
  }

  isReadFilter(isRead: boolean): this {
    this.filters.isRead = isRead;
    return this;
  }

  isDismissedFilter(isDismissed: boolean): this {
    this.filters.isDismissed = isDismissed;
    return this;
  }

  isArchivedFilter(isArchived: boolean): this {
    this.filters.isArchived = isArchived;
    return this;
  }

  build(): NotificationFilterData {
    return this.filters;
  }
}
