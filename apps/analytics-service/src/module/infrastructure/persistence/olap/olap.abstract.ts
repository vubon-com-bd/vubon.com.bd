import type { OlapProvider } from './olap.interface';
import type { OlapQuery, OlapQueryResult } from './olap.types';

export abstract class AbstractOlapProvider implements OlapProvider {
  abstract readonly name: string;

  abstract query(query: OlapQuery): Promise<OlapQueryResult>;
  abstract insert(
    table: string,
    rows: readonly Readonly<Record<string, unknown>>[],
  ): Promise<number>;
  abstract healthCheck(): Promise<boolean>;

  protected now(): number {
    return Date.now();
  }
}
