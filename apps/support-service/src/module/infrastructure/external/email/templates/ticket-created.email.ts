import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const TicketCreatedEmailTemplate: EmailTemplate = {
  name: 'ticket-created',
  subject: 'Your support ticket {{ticketNumber}} has been created',
  html: `
    <h2>Ticket Created</h2>
    <p>Hi {{name}},</p>
    <p>Your ticket <strong>{{ticketNumber}}</strong> has been created.</p>
    <p>Subject: {{subject}}</p>
    <p>We'll get back to you soon.</p>
  `,
  text: 'Ticket {{ticketNumber}} created: {{subject}}',
  variables: ['name', 'ticketNumber', 'subject'],
};
