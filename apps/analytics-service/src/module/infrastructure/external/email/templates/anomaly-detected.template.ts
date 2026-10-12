/**
 * Anomaly Detected Email Template
 */
export interface AnomalyTemplateData {
  readonly metricName: string;
  readonly anomalyCount: number;
  readonly severity: string;
  readonly detectedAt: string;
}

export function renderAnomalyTemplate(data: AnomalyTemplateData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: auto;">
  <h2>🚨 Anomaly Detected</h2>
  <p>Metric: <strong>${data.metricName}</strong></p>
  <p>Anomalies: <strong>${data.anomalyCount}</strong></p>
  <p>Severity: <strong>${data.severity}</strong></p>
  <p>Detected at: ${data.detectedAt}</p>
</body>
</html>
  `.trim();
}
