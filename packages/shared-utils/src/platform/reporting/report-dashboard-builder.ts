export interface DashboardWidgetData {
  widgetId: string;
  dashboardId: string;
  type: string;
  title: string;
}

export interface DashboardLayoutItem {
  widgetId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ReportDashboardData {
  dashboardId: string;
  name: string;
  description: string;
  status: string;
  type: string;
  widgets: DashboardWidgetData[];
  widgetCount: number;
  layout: {
    columns: number;
    rows: number;
    items: DashboardLayoutItem[];
  };
  createdBy: string;
  isActive: boolean;
  isPublished: boolean;
  isShared: boolean;
  sharedWith: string[];
  metadata: Record<string, unknown>;
}

export class ReportDashboardBuilder {
  private name = '';
  private description = '';
  private type = 'personal';
  private widgets: DashboardWidgetData[] = [];
  private isPublished = false;
  private isShared = false;
  private sharedWith: string[] = [];

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  addWidget(widget: DashboardWidgetData): this {
    this.widgets.push(widget);
    return this;
  }

  setPublished(isPublished: boolean): this {
    this.isPublished = isPublished;
    return this;
  }

  setShared(isShared: boolean): this {
    this.isShared = isShared;
    return this;
  }

  addSharedWith(userId: string): this {
    this.sharedWith.push(userId);
    return this;
  }

  build(): ReportDashboardData {
    return {
      dashboardId: crypto.randomUUID(),
      name: this.name,
      description: this.description,
      status: 'active',
      type: this.type,
      widgets: this.widgets,
      widgetCount: this.widgets.length,
      layout: {
        columns: 12,
        rows: 10,
        items: this.widgets.map((w, i) => ({
          widgetId: w.widgetId,
          x: (i % 3) * 4,
          y: Math.floor(i / 3) * 2,
          w: 4,
          h: 2,
        })),
      },
      createdBy: '',
      isActive: true,
      isPublished: this.isPublished,
      isShared: this.isShared,
      sharedWith: this.sharedWith,
      metadata: {},
    };
  }
}
