/**
 * KPI Breach Alert Email Template
 */
export interface KpiBreachTemplateData {
  readonly kpiName: string;
  readonly actualValue: number;
  readonly targetValue: number;
  readonly achievementPercent: number;
  readonly severity: 'warning' | 'critical';
}

export function renderKpiBreachTemplate(data: KpiBreachTemplateData): string {
  const color = data.severity === 'critical' ? '#dc3545' : '#ffc107';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: auto;">
  <h2 style="color: ${color};">⚠️ KPI Breach: ${data.kpiName}</h2>
  <p>Severity: <strong style="color: ${color};">${data.severity.toUpperCase()}</strong></p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td><strong>Actual:</strong></td><td>${data.actualValue}</td></tr>
    <tr><td><strong>Target:</strong></td><td>${data.targetValue}</td></tr>
    <tr><td><strong>Achievement:</strong></td><td>${data.achievementPercent.toFixed(1)}%</td></tr>
  </table>
</body>
</html>
  `.trim();
}
