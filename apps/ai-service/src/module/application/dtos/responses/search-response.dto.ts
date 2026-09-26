export interface SearchMatchResponseDTO {
  readonly documentId: string;
  readonly score: number;
  readonly snippet: string | null;
}

export interface SearchResponseDTO {
  readonly query: string;
  readonly matches: readonly SearchMatchResponseDTO[];
  readonly totalHits: number;
  readonly tookMs: number;
}
