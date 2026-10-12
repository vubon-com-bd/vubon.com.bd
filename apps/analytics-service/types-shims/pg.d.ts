declare module 'pg' {
  export class Pool {
    constructor(opts: {
      host?: string;
      port?: number;
      database?: string;
      user?: string;
      password?: string;
      max?: number;
      statement_timeout?: number;
    });
    query: (text: string, values?: readonly unknown[]) => Promise<{ rows: unknown[] }>;
    end: () => Promise<void>;
  }
}
