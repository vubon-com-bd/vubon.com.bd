export interface VectorResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly dimension: number;
  readonly values: readonly number[];
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
  readonly createdAt: string;
}

export interface VectorIndexResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly dimension: number;
  readonly provider: string;
  readonly status: string;
  readonly entryCount: number;
}

export interface VectorSearchMatchDTO {
  readonly vectorId: string;
  readonly distance: number;
}

export interface VectorSearchResponseDTO {
  readonly indexId: string;
  readonly matches: readonly VectorSearchMatchDTO[];
  readonly tookMs: number;
}
