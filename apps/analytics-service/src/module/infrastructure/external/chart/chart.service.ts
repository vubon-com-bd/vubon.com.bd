import { Injectable } from '@nestjs/common';

export interface ChartSeries {
  readonly labels: readonly string[];
  readonly values: readonly number[];
  readonly seriesName: string;
}

export interface RenderedChart {
  readonly type: 'chartjs' | 'echarts' | 'svg';
  readonly payload: Record<string, unknown>;
}

@Injectable()
export class ChartService {
  /**
   * Render chart to Chart.js config.
   */
  toChartJs(series: ChartSeries, chartType = 'line'): RenderedChart {
    return {
      type: 'chartjs',
      payload: {
        type: chartType,
        data: {
          labels: series.labels,
          datasets: [
            {
              label: series.seriesName,
              data: series.values,
              borderWidth: 2,
            },
          ],
        },
        options: { responsive: true },
      },
    };
  }

  /**
   * Render chart to ECharts config.
   */
  toECharts(series: ChartSeries, chartType = 'line'): RenderedChart {
    return {
      type: 'echarts',
      payload: {
        xAxis: { type: 'category', data: series.labels },
        yAxis: { type: 'value' },
        series: [{ name: series.seriesName, type: chartType, data: series.values }],
      },
    };
  }

  /**
   * Render a simple inline SVG sparkline.
   */
  toSparklineSvg(values: readonly number[], width = 200, height = 40): string {
    if (values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const step = width / (values.length - 1);
    const points = values
      .map((v, i) => {
        const x = (i * step).toFixed(2);
        const y = (height - ((v - min) / range) * height).toFixed(2);
        return `${x},${y}`;
      })
      .join(' ');
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="2"/></svg>`;
  }
}
