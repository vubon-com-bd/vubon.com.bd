export interface ReportFilterData {
  filterId: string;
  reportId: string;
  type: string;
  operator: string;
  group: string;
  field: string;
  value: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class ReportFilterBuilder {
  private filters: ReportFilterData[] = [];

  addDateRange(field: string, start: Date, end: Date): this {
    this.filters.push({
      filterId: crypto.randomUUID(),
      reportId: '',
      type: 'date',
      operator: 'between',
      group: 'time',
      field,
      value: [start, end],
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addTextFilter(field: string, operator: string, value: string): this {
    this.filters.push({
      filterId: crypto.randomUUID(),
      reportId: '',
      type: 'text',
      operator,
      group: 'dimension',
      field,
      value,
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addNumberFilter(field: string, operator: string, value: number): this {
    this.filters.push({
      filterId: crypto.randomUUID(),
      reportId: '',
      type: 'number',
      operator,
      group: 'metric',
      field,
      value,
      isActive: true,
      metadata: {},
    });
    return this;
  }

  addSelectFilter(field: string, value: string): this {
    this.filters.push({
      filterId: crypto.randomUUID(),
      reportId: '',
      type: 'select',
      operator: 'eq',
      group: 'dimension',
      field,
      value,
      isActive: true,
      metadata: {},
    });
    return this;
  }

  build(): ReportFilterData[] {
    return this.filters;
  }
}
