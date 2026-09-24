import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const SlaBreachAlertEmailTemplate: EmailTemplate = {
  name: 'sla-breach-alert',
  subject: 'SLA breach on ticket {{ticketNumber}}',
  html: `
    <h2>SLA Breach Alert</h2>
    <p>Ticket <strong>{{ticketNumber}}</strong> has breached SLA <em>{{slaName}}</em>.</p>
    <p>Priority: {{priority}}</p>
  `,
  text: 'SLA breach on ticket {{ticketNumber}} ({{slaName}})',
  variables: ['ticketNumber', 'slaName', 'priority'],
};
