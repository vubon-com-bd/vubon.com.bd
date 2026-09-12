export interface NotificationSortData {
  field: string;
  order: 'asc' | 'desc';
}

export class NotificationSort {
  private sorts: NotificationSortData[] = [];

  byDate(): this {
    this.sorts.push({ field: 'createdAt', order: 'desc' });
    return this;
  }

  byPriority(): this {
    this.sorts.push({ field: 'priority', order: 'desc' });
    return this;
  }

  byStatus(): this {
    this.sorts.push({ field: 'status', order: 'asc' });
    return this;
  }

  byType(): this {
    this.sorts.push({ field: 'type', order: 'asc' });
    return this;
  }

  byReadStatus(): this {
    this.sorts.push({ field: 'isRead', order: 'asc' });
    return this;
  }

  build(): NotificationSortData[] {
    return this.sorts;
  }
}
