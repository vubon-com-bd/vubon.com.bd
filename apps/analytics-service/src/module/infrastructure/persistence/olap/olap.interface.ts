import type { OlapQuery, OlapQueryResult } from './olap.types';

export interface OlapProvider {
  readonly name: string;
  query(query: OlapQuery): Promise<OlapQueryResult>;
  insert(table: string, rows: readonly Readonly<Record<string, unknown>>[]): Promise<number>;
  healthCheck(): Promise<boolean>;
}
