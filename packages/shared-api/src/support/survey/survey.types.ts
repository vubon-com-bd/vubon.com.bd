export interface SurveyQuestion {
  readonly id: string;
  readonly type: 'text' | 'rating' | 'single_choice' | 'multi_choice';
  readonly question: string;
  readonly options?: readonly string[];
  readonly required: boolean;
}

export interface Survey {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly questions: readonly SurveyQuestion[];
  readonly startsAt?: string;
  readonly endsAt?: string;
}

export interface SurveyListResponse {
  readonly surveys: readonly Survey[];
  readonly total: number;
}

export interface SubmitSurveyRequest {
  readonly answers: Record<string, unknown>;
}

export interface SubmitSurveyResponse {
  readonly submitted: boolean;
  readonly submissionId: string;
}
