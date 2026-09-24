export interface TeamResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly description: string | null;
  readonly isActive: boolean;
  readonly memberCount: number;
}
