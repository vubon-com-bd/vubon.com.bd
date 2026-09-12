export interface TemplateSection {
  id: string;
  name: string;
  type: string;
  content: unknown;
  order: number;
  isVisible: boolean;
}

export interface ReportTemplateData {
  sections: TemplateSection[];
}

export interface TemplateRenderData {
  title?: string;
  summary?: string;
  metrics?: Record<string, unknown>;
  charts?: unknown[];
  tables?: unknown[];
  analysis?: string;
  recommendations?: string[];
  footer?: string;
}

export const renderReportTemplate = (
  template: ReportTemplateData,
  data: TemplateRenderData
): string => {
  let rendered = '';
  for (const section of template.sections) {
    if (section.type === 'header') {
      rendered += `<h1>${data.title || ''}</h1>`;
    } else if (section.type === 'summary') {
      rendered += `<p>${data.summary || ''}</p>`;
    } else if (section.type === 'metrics') {
      rendered += `<div>${JSON.stringify(data.metrics || {})}</div>`;
    } else if (section.type === 'charts') {
      rendered += `<div>${JSON.stringify(data.charts || [])}</div>`;
    } else if (section.type === 'tables') {
      rendered += `<table>${JSON.stringify(data.tables || [])}</table>`;
    } else if (section.type === 'analysis') {
      rendered += `<p>${data.analysis || ''}</p>`;
    } else if (section.type === 'recommendations') {
      rendered += `<ul>${(data.recommendations || []).map((r) => `<li>${r}</li>`).join('')}</ul>`;
    } else if (section.type === 'footer') {
      rendered += `<p>${data.footer || ''}</p>`;
    }
  }
  return rendered;
};
