import type { AuthFlowActions, AuthFlowState } from './auth-hook.types';

/**
 * Framework-agnostic auth-flow state machine.
 * Not a React hook — React/Next apps wrap this with their own
 * useState/useReducer-based hook in the consuming app.
 */
export class AuthFlowMachine {
  private state: AuthFlowState = {
    step: 'idle',
    loading: false,
    error: null,
    success: false,
  };

  getState(): AuthFlowState {
    return this.state;
  }

  readonly actions: AuthFlowActions = {
    start: () => {
      this.state = { step: 'start', loading: true, error: null, success: false };
    },
    advance: (step: string) => {
      this.state = {
        ...this.state,
        step,
        loading: step !== 'complete',
        success: step === 'complete',
      };
    },
    fail: (error: string) => {
      this.state = { ...this.state, loading: false, error, success: false };
    },
    reset: () => {
      this.state = { step: 'idle', loading: false, error: null, success: false };
    },
  };
}
