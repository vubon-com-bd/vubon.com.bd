export interface LogoutRequest {
  readonly refreshToken?: string;
  readonly allDevices?: boolean;
}
