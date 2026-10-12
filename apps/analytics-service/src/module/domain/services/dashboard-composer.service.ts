/**
 * Dashboard Composer Service
 * @module analytics-service/domain/services
 *
 * Dashboard widget data orchestration।
 */
import { DashboardEntity } from '../entities/dashboard.entity.js';
import { WidgetEntity } from '../entities/widget.entity.js';

export interface WidgetData {
  readonly widgetId: string;
  readonly type: string;
  readonly title: string;
  readonly data: unknown;
  readonly hasError: boolean;
  readonly error?: string;
}

export interface ComposedDashboard {
  readonly dashboardId: string;
  readonly name: string;
  readonly layout: string;
  readonly widgets: readonly WidgetData[];
  readonly widgetCount: number;
  readonly composedAt: string;
}

export class DashboardComposerService {
  /**
   * Compose dashboard data from widgets
   */
  compose(params: {
    dashboard: DashboardEntity;
    widgets: readonly WidgetEntity[];
    dataResolver: (widget: WidgetEntity) => unknown;
    now: string;
  }): ComposedDashboard {
    const widgetData: WidgetData[] = [];

    for (const widget of params.widgets) {
      try {
        const data = params.dataResolver(widget);
        widgetData.push({
          widgetId: widget.id,
          type: widget.type.value,
          title: widget.title,
          data,
          hasError: false,
        });
      } catch (err) {
        widgetData.push({
          widgetId: widget.id,
          type: widget.type.value,
          title: widget.title,
          data: null,
          hasError: true,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return {
      dashboardId: params.dashboard.id,
      name: params.dashboard.name.value,
      layout: params.dashboard.layout.value,
      widgets: Object.freeze(widgetData),
      widgetCount: widgetData.length,
      composedAt: params.now,
    };
  }

  /**
   * Count widgets with errors
   */
  countErrors(composed: ComposedDashboard): number {
    return composed.widgets.filter((w) => w.hasError).length;
  }

  /**
   * Check if dashboard is fully loaded
   */
  isFullyLoaded(composed: ComposedDashboard): boolean {
    return this.countErrors(composed) === 0;
  }

  /**
   * Sort widgets by position (if available in config)
   */
  sortByPosition(widgets: readonly WidgetEntity[]): readonly WidgetEntity[] {
    return [...widgets].sort((a, b) => {
      if (a.position.y !== b.position.y) return a.position.y - b.position.y;
      return a.position.x - b.position.x;
    });
  }
}
