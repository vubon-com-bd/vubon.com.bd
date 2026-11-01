export interface AutocompleteRequest {
  readonly q: string;
  readonly limit?: number;
}

export interface AutocompleteSuggestion {
  readonly text: string;
  readonly type: string;
  readonly score: number;
}

export interface AutocompleteResponse {
  readonly suggestions: readonly AutocompleteSuggestion[];
}
