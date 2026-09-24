import { Injectable } from '@nestjs/common';

export interface ChartData {
  readonly labels: readonly string[];
  readonly values: readonly number[];
  readonly seriesName: string;
}

export interface ChartConfig {
  readonly type: 'line' | 'bar' | 'pie' | 'area';
  readonly title: string;
  readonly xAxisLabel?: string;
  readonly yAxisLabel?: string;
}

@Injectable()
export class ChartRendererService {
  /**
   * Produce a Chart.js-compatible JSON config.
   */
  toChartJs(data: ChartData, config: ChartConfig): Record<string, unknown> {
    const palette = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
      '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
    ];

    return {
      type: config.type,
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.seriesName,
            data: data.values,
            backgroundColor: palette.slice(0, data.values.length),
            borderColor: palette[0],
            borderWidth: 2,
            fill: config.type === 'area',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: config.title },
        },
        scales:
          config.type === 'pie'
            ? undefined
            : {
                x: { title: { display: !!config.xAxisLabel, text: config.xAxisLabel } },
                y: { title: { display: !!config.yAxisLabel, text: config.yAxisLabel } },
              },
      },
    };
  }
}
