export interface OlapQuery {
  readonly sql: string;
  readonly params?: readonly unknown[];
}

export interface OlapResultRow {
  readonly [key: string]: string | number | boolean | null;
}

export interface OlapQueryResult {
  readonly rows: readonly OlapResultRow[];
  readonly rowCount: number;
  readonly durationMs: number;
}
