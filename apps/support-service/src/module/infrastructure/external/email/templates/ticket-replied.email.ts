import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const TicketRepliedEmailTemplate: EmailTemplate = {
  name: 'ticket-replied',
  subject: 'New reply on ticket {{ticketNumber}}',
  html: `
    <h2>New Reply</h2>
    <p>Hi {{name}},</p>
    <p>A new reply was added to ticket <strong>{{ticketNumber}}</strong>.</p>
    <p>{{preview}}</p>
  `,
  text: 'New reply on ticket {{ticketNumber}}: {{preview}}',
  variables: ['name', 'ticketNumber', 'preview'],
};
