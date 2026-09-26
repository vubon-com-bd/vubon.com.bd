export interface DeviceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly platform: string;
  readonly status: string;
  readonly fingerprint: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
