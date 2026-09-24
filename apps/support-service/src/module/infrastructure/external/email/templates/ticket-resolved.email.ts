import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const TicketResolvedEmailTemplate: EmailTemplate = {
  name: 'ticket-resolved',
  subject: 'Ticket {{ticketNumber}} has been resolved',
  html: `
    <h2>Ticket Resolved</h2>
    <p>Hi {{name}},</p>
    <p>Your ticket <strong>{{ticketNumber}}</strong> has been resolved.</p>
    <p>If you need further assistance, please reply.</p>
  `,
  text: 'Ticket {{ticketNumber}} resolved.',
  variables: ['name', 'ticketNumber'],
};
