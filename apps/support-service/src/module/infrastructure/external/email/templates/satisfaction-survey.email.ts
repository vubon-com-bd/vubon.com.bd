import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const SatisfactionSurveyEmailTemplate: EmailTemplate = {
  name: 'satisfaction-survey',
  subject: 'How did we do on ticket {{ticketNumber}}?',
  html: `
    <h2>Rate your experience</h2>
    <p>Hi {{name}},</p>
    <p>Please rate your experience with ticket <strong>{{ticketNumber}}</strong>.</p>
    <p><a href="{{surveyUrl}}">Take the survey</a></p>
  `,
  text: 'Rate your experience: {{surveyUrl}}',
  variables: ['name', 'ticketNumber', 'surveyUrl'],
};
