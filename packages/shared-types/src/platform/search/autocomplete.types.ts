/**
 * Autocomplete Types
 * @module shared-types/platform/search
 */

import type { AUTOCOMPLETE_TYPE } from '@vubon/shared-constants/platform';

export type AutocompleteTypeValue = (typeof AUTOCOMPLETE_TYPE)[keyof typeof AUTOCOMPLETE_TYPE];

export interface AutocompleteSuggestion {
  readonly text: string;
  readonly type: AutocompleteTypeValue;
  readonly score: number;
  readonly highlightedText?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface AutocompleteRequest {
  readonly query: string;
  readonly types?: readonly AutocompleteTypeValue[];
  readonly limit?: number;
  readonly fuzzy?: boolean;
}

export interface AutocompleteResponse {
  readonly query: string;
  readonly suggestions: readonly AutocompleteSuggestion[];
  readonly took: number;
  readonly cached: boolean;
}
