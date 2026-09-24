export interface SurveyResponseDTO {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly status: string;
  readonly questions: readonly unknown[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SurveyAnswerResponseDTO {
  readonly surveyId: string;
  readonly userId: string;
  readonly answers: Readonly<Record<string, unknown>>;
  readonly submittedAt: string;
}
