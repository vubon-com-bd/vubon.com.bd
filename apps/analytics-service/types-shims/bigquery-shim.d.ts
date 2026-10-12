declare module '@google-cloud/bigquery' {
  export class BigQuery {
    constructor(options?: unknown);
    query(args: unknown): Promise<[unknown[]]>;
    dataset(name: string): {
      table(name: string): {
        insert(rows: unknown): Promise<unknown>;
      };
    };
  }
}
