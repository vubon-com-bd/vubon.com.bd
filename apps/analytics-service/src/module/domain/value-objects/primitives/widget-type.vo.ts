import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_WIDGETS = new Set<string>([
  'chart', 'table', 'metric', 'text', 'funnel', 'heatmap', 'gauge',
]);

export class WidgetTypeVO extends BaseTypeVO<string> {
  static create(raw: string): WidgetTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_WIDGETS.has(normalized)) {
      throw new Error(`Invalid widget type: ${raw}`);
    }
    return new WidgetTypeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isVisual(): boolean {
    return ['chart', 'heatmap', 'funnel', 'gauge'].includes(this.value);
  }

  get isData(): boolean {
    return this.value === 'table' || this.value === 'metric';
  }
}
