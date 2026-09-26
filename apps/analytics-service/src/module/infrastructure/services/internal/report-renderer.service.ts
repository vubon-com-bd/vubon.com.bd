import { Injectable } from '@nestjs/common';

export interface RenderInput {
  readonly title: string;
  readonly rows: readonly Readonly<Record<string, unknown>>[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class ReportRendererService {
  /**
   * Render a simple HTML report.
   */
  toHtml(input: RenderInput): string {
    const headers = input.rows.length > 0 ? Object.keys(input.rows[0]!) : [];
    const rowsHtml = input.rows
      .map(
        (row) =>
          `<tr>${headers.map((h) => `<td>${String(row[h] ?? '')}</td>`).join('')}</tr>`,
      )
      .join('');
    const headerHtml = headers.map((h) => `<th>${h}</th>`).join('');
    return `
      <html>
      <head><title>${input.title}</title></head>
      <body>
        <h1>${input.title}</h1>
        <table border="1">
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body>
      </html>
    `;
  }

  /**
   * Render a CSV string.
   */
  toCsv(rows: readonly Readonly<Record<string, unknown>>[]): string {
    if (rows.length === 0) return '';
    const headers = Object.keys(rows[0]!);
    const lines = [headers.join(',')];
    for (const row of rows) {
      lines.push(
        headers
          .map((h) => {
            const v = row[h];
            const s = v === null || v === undefined ? '' : String(v);
            return s.includes(',') ? `"${s.replace(/"/g, '""')}"` : s;
          })
          .join(','),
      );
    }
    return lines.join('\n');
  }

  /**
   * Render a JSON string.
   */
  toJson(input: RenderInput): string {
    return JSON.stringify(
      {
        title: input.title,
        metadata: input.metadata ?? {},
        rows: input.rows,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    );
  }
}
