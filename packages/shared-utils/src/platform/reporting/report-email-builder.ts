export interface ReportEmailData {
  emailId: string;
  reportId: string;
  status: string;
  type: string;
  template: string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  format: string;
  isSent: boolean;
  isFailed: boolean;
  metadata: Record<string, unknown>;
}

export interface EmailInput {
  reportId: string;
  to: string[];
  subject: string;
  body: string;
  format: string;
}

export const buildReportEmail = (data: EmailInput): ReportEmailData => {
  return {
    emailId: crypto.randomUUID(),
    reportId: data.reportId,
    status: 'pending',
    type: 'summary',
    template: 'email_summary_template',
    from: 'reports@example.com',
    to: data.to,
    cc: [],
    bcc: [],
    subject: data.subject,
    body: data.body,
    format: data.format,
    isSent: false,
    isFailed: false,
    metadata: {},
  };
};
