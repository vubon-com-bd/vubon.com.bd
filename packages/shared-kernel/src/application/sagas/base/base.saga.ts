import { DomainEvent } from '../../../domain/base/base.event';

/**
 * Base Saga
 * সাগার বেস ক্লাস
 */
export abstract class BaseSaga {
  private _isRunning: boolean = false;
  private _events: DomainEvent[] = [];

  abstract start(event: DomainEvent): Promise<void>;
  protected abstract onEvent(event: DomainEvent): Promise<void>;

  get isRunning(): boolean {
    return this._isRunning;
  }

  get events(): DomainEvent[] {
    return this._events;
  }

  protected async run(event: DomainEvent): Promise<void> {
    if (this._isRunning) {
      throw new Error('Saga is already running');
    }

    this._isRunning = true;
    this._events = [];

    try {
      await this.onEvent(event);
    } catch (error) {
      await this.handleError(error);
      throw error;
    } finally {
      this._isRunning = false;
    }
  }

  protected async handleError(_error: unknown): Promise<void> {
    // Override in child classes for error handling
    // Default implementation does nothing
  }

  protected addEvent(event: DomainEvent): void {
    this._events.push(event);
  }
}
