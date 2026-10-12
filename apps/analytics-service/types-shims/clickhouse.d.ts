declare module '@clickhouse/client' {
  export function createClient(opts: {
    host: string;
    username?: string;
    password?: string;
    database?: string;
    request_timeout?: number;
  }): {
    query: (args: {
      query: string;
      query_params?: Record<string, unknown>;
      format?: string;
    }) => Promise<{ json: () => Promise<unknown> }>;
    insert: (args: {
      table: string;
      values: readonly unknown[];
      format?: string;
    }) => Promise<void>;
    close: () => Promise<void>;
  };
}
