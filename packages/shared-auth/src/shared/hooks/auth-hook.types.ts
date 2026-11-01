export interface AuthFlowState {
  readonly step: string;
  readonly loading: boolean;
  readonly error: string | null;
  readonly success: boolean;
}

export interface AuthFlowActions {
  readonly start: () => void;
  readonly advance: (step: string) => void;
  readonly fail: (error: string) => void;
  readonly reset: () => void;
}
