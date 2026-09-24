import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';

export interface KnowledgeCategoryEntityProps {
  readonly name: string;
  readonly description: string | null;
  readonly sortOrder: number;
  readonly isActive: boolean;
}

export class KnowledgeCategoryEntity extends AggregateRoot<string> {
  private readonly _name: string;
  private readonly _description: string | null;
  private readonly _sortOrder: number;
  private readonly _isActive: boolean;

  private constructor(
    id: string,
    props: KnowledgeCategoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._description = props.description;
    this._sortOrder = props.sortOrder;
    this._isActive = props.isActive;
  }

  static create(props: KnowledgeCategoryEntityProps): KnowledgeCategoryEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new KnowledgeCategoryEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: KnowledgeCategoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): KnowledgeCategoryEntity {
    return new KnowledgeCategoryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get description(): string | null { return this._description; }
  get sortOrder(): number { return this._sortOrder; }
  get isActive(): boolean { return this._isActive; }
}
