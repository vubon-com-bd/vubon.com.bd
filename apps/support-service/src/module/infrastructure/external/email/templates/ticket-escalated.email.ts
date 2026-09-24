import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const TicketEscalatedEmailTemplate: EmailTemplate = {
  name: 'ticket-escalated',
  subject: 'Ticket {{ticketNumber}} escalated to {{level}}',
  html: `
    <h2>Ticket Escalated</h2>
    <p>Ticket <strong>{{ticketNumber}}</strong> has been escalated to level {{level}}.</p>
    <p>Reason: {{reason}}</p>
  `,
  text: 'Ticket {{ticketNumber}} escalated to {{level}}: {{reason}}',
  variables: ['ticketNumber', 'level', 'reason'],
};
