export interface UserClient {
  getById(userId: string): Promise<{
    readonly id: string;
    readonly email: string;
    readonly status: string;
  } | null>;
}
