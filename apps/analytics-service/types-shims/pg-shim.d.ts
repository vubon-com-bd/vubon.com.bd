declare module 'pg' {
  export class Pool {
    constructor(options?: unknown);
    query(text: string, values?: readonly unknown[]): Promise<{ rows: any[] }>;
    end(): Promise<void>;
  }
}
