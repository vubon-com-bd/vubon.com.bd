export interface AgentResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly teamId: string | null;
  readonly status: string;
  readonly type: string;
  readonly skills: readonly string[];
  readonly currentLoad: number;
  readonly maxLoad: number;
}
