/**
 * Profile Complete Email Template
 */
export interface ProfileCompleteEmailVariables {
  readonly userName: string;
  readonly profileUrl: string;
  readonly completionScore: number;
}

export const ProfileCompleteEmailTemplate = {
  name: 'profile-complete',
  subjectKey: 'email.profileComplete.subject',
  subjectFallback: 'Your Vubon profile is ready',
  variables: {
    userName: '{{user_name}}',
    profileUrl: '{{profile_url}}',
    completionScore: '{{completion_score}}',
  },
  buildVariables(input: ProfileCompleteEmailVariables): Record<string, string> {
    return {
      user_name: input.userName,
      profile_url: input.profileUrl,
      completion_score: String(input.completionScore),
    };
  },
} as const;
