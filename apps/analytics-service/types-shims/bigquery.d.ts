declare module '@google-cloud/bigquery' {
  export class BigQuery {
    constructor(opts?: { projectId?: string });
    query: (args: { query: string; params?: Record<string, unknown> }) => Promise<[unknown[]]>;
    dataset: (ds: string) => {
      table: (t: string) => {
        insert: (rows: readonly unknown[]) => Promise<unknown>;
      };
    };
  }
}
