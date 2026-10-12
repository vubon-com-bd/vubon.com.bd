/**
 * Scheduled Report Email Template
 */
export interface ScheduledReportTemplateData {
  readonly reportName: string;
  readonly reportUrl: string;
  readonly format: string;
  readonly rowCount?: number;
  readonly generatedAt: string;
}

export function renderScheduledReportTemplate(data: ScheduledReportTemplateData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${data.reportName}</title></head>
<body style="font-family: sans-serif; max-width: 600px; margin: auto;">
  <h2>📊 ${data.reportName}</h2>
  <p>Your scheduled report is ready.</p>
  <table style="border-collapse: collapse;">
    <tr><td><strong>Format:</strong></td><td>${data.format}</td></tr>
    <tr><td><strong>Rows:</strong></td><td>${data.rowCount ?? 'N/A'}</td></tr>
    <tr><td><strong>Generated:</strong></td><td>${data.generatedAt}</td></tr>
  </table>
  <p><a href="${data.reportUrl}" style="display:inline-block; padding:10px 20px; background:#007bff; color:#fff; text-decoration:none; border-radius:4px;">Download Report</a></p>
</body>
</html>
  `.trim();
}
