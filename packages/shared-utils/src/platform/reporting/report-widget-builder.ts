export interface ReportWidgetData {
  widgetId: string;
  dashboardId: string;
  type: string;
  widgetType: string;
  size: string;
  position: string;
  title: string;
  description: string;
  config: unknown;
  data: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class ReportWidgetBuilder {
  private type = 'kpi';
  private widgetType = 'kpi';
  private title = '';
  private description = '';
  private size = 'medium';
  private position = 'center';
  private config: unknown = {};
  private data: unknown = {};

  setType(type: string): this {
    this.type = type;
    this.widgetType = type;
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  setPosition(position: string): this {
    this.position = position;
    return this;
  }

  setConfig(config: unknown): this {
    this.config = config;
    return this;
  }

  setData(data: unknown): this {
    this.data = data;
    return this;
  }

  build(): ReportWidgetData {
    return {
      widgetId: crypto.randomUUID(),
      dashboardId: '',
      type: this.type,
      widgetType: this.widgetType,
      size: this.size,
      position: this.position,
      title: this.title,
      description: this.description,
      config: this.config,
      data: this.data,
      isActive: true,
      metadata: {},
    };
  }
}
