import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ProfileCompleteEmailTemplate: EmailTemplate = {
  name: 'profile-complete',
  subject: 'Your profile is complete',
  html: `<p>Hi {{name}}, your profile is 100% complete.</p>`,
  text: 'Hi {{name}}, your profile is 100% complete.',
  variables: ['name'],
};
