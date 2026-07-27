/**
 * Domain Event Bus
 * Simple event bus for domain events
 * Can be extended to use more sophisticated event bus (e.g., NestJS EventEmitter)
 */

export interface DomainEvent {
  readonly timestamp: Date;
}

export type EventHandler<T extends DomainEvent> = (event: T) => Promise<void> | void;

export class DomainEventBus {
  private handlers: Map<string, EventHandler<DomainEvent>[]> = new Map();

  /**
   * Register a handler for a specific event type
   */
  register<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)?.push(handler as EventHandler<DomainEvent>);
  }

  /**
   * Unregister a handler for a specific event type
   */
  unregister<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler as EventHandler<DomainEvent>);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Publish an event to all registered handlers
   */
  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const eventType = event.constructor.name;
    const handlers = this.handlers.get(eventType) || [];

    // Execute all handlers in parallel
    await Promise.all(
      handlers.map(async (handler) => {
        try {
          await handler(event);
        } catch (error) {
          console.error(`Error executing handler for event ${eventType}:`, error);
        }
      })
    );
  }

  /**
   * Publish an event synchronously (one by one)
   */
  async publishSync<T extends DomainEvent>(event: T): Promise<void> {
    const eventType = event.constructor.name;
    const handlers = this.handlers.get(eventType) || [];

    // Execute handlers sequentially
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Error executing handler for event ${eventType}:`, error);
        throw error; // Re-throw to stop execution
      }
    }
  }

  /**
   * Get all registered handlers for an event type
   */
  getHandlers(eventType: string): EventHandler<DomainEvent>[] {
    return this.handlers.get(eventType) || [];
  }

  /**
   * Clear all handlers (useful for testing)
   */
  clear(): void {
    this.handlers.clear();
  }

  /**
   * Check if an event type has any handlers
   */
  hasHandlers(eventType: string): boolean {
    const handlers = this.handlers.get(eventType);
    return handlers !== undefined && handlers.length > 0;
  }
}

// Export singleton instance
export const domainEventBus = new DomainEventBus();
