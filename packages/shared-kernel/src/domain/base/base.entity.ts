/**
 * Base Entity
 * এন্টিটির বেস ক্লাস
 */
export abstract class Entity<T> {
  protected readonly _id: string;
  protected _props: T;
  protected _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt: Date | null;

  constructor(props: T, id?: string) {
    this._id = id || crypto.randomUUID();
    this._props = props;
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._deletedAt = null;
    this.validate();
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

  get isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  protected update(): void {
    this._updatedAt = new Date();
  }

  protected validate(): void {
    // Override in child classes
  }

  softDelete(): void {
    this._deletedAt = new Date();
    this.update();
  }

  restore(): void {
    this._deletedAt = null;
    this.update();
  }

  equals(other: Entity<T>): boolean {
    if (!other) return false;
    return this._id === other._id;
  }

  abstract toJSON(): Record<string, unknown>;
}
