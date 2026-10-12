/**
 * Report Renderer Service (internal)
 *
 * Converts analytics data into multiple output formats.
 */
import { Injectable, Logger } from '@nestjs/common';
import { ReportGeneratorService } from '../../../domain/services/report-generator.service.js';
import { ChartService } from '../../external/chart/chart.service.js';

export interface RenderReportInput {
  readonly rows: readonly Record<string, string | number | boolean | null>[];
  readonly metricColumns: readonly string[];
  readonly dimensionColumns: readonly string[];
  readonly format: 'json' | 'csv';
  readonly includeChart?: boolean;
  readonly chartType?: 'line' | 'bar' | 'pie';
}

export interface RenderReportOutput {
  readonly content: string;
  readonly contentType: string;
  readonly rowCount: number;
  readonly chartJson?: string;
}

@Injectable()
export class ReportRendererInternalService {
  private readonly logger = new Logger(ReportRendererInternalService.name);
  private readonly generator = new ReportGeneratorService();

  constructor(private readonly chartService: ChartService) {}

  async render(input: RenderReportInput): Promise<RenderReportOutput> {
    const now = new Date().toISOString();
    const data = this.generator.build({
      rows: input.rows,
      metricColumns: input.metricColumns,
      dimensionColumns: input.dimensionColumns,
      now,
    });

    let content: string;
    let contentType: string;

    if (input.format === 'csv') {
      content = this.generator.toCsv(data);
      contentType = 'text/csv';
    } else {
      content = this.generator.toJson(data);
      contentType = 'application/json';
    }

    let chartJson: string | undefined;
    if (input.includeChart && input.metricColumns.length > 0) {
      try {
        const chart = await this.chartService.render({
          type: input.chartType ?? 'bar',
          labels: input.rows.map((_, i) => String(i)),
          datasets: input.metricColumns.map((mc) => ({
            label: mc,
            data: input.rows.map((r) => Number(r[mc]) || 0),
          })),
          format: 'json',
        });
        chartJson = typeof chart.data === 'string' ? chart.data : chart.data.toString('utf-8');
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`Chart render failed: ${msg.slice(0, 100)}`);
      }
    }

    return {
      content,
      contentType,
      rowCount: data.rowCount,
      chartJson,
    };
  }
}
