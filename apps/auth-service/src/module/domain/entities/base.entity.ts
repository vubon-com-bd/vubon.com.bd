import { randomUUID } from 'node:crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  version?: number;
  isActive?: boolean;
}

export abstract class BaseEntity {
  private readonly _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _version: number;
  private _isActive: boolean;

  protected constructor(props: BaseEntityProps = {}) {
    this._id = props.id ?? randomUUID();
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
    this._version = props.version ?? 0;
    this._isActive = props.isActive ?? true;
  }

  get id(): string {
    return this._id;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get deletedAt(): Date | null {
    return this._deletedAt;
  }
  get version(): number {
    return this._version;
  }
  get isActive(): boolean {
    return this._isActive;
  }

  protected setUpdatedAt(): void {
    this._updatedAt = new Date();
    this._version += 1;
  }

  public softDelete(): void {
    this._deletedAt = new Date();
    this._isActive = false;
    this.setUpdatedAt();
  }

  public restore(): void {
    this._deletedAt = null;
    this._isActive = true;
    this.setUpdatedAt();
  }

  public activate(): void {
    this._isActive = true;
    this.setUpdatedAt();
  }

  public deactivate(): void {
    this._isActive = false;
    this.setUpdatedAt();
  }

  public isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  public equals(entity: BaseEntity): boolean {
    return entity instanceof BaseEntity && this._id === entity._id;
  }

  public toJSON(): Required<BaseEntityProps> {
    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      version: this._version,
      isActive: this._isActive,
    };
  }
}

export abstract class BaseAggregateRoot extends BaseEntity {
  private _domainEvents: unknown[] = [];

  protected addDomainEvent(event: unknown): void {
    this._domainEvents.push(event);
  }

  public pullDomainEvents(): unknown[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }
}
