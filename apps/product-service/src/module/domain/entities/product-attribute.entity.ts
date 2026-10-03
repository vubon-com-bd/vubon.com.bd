/**
 * ProductAttributeEntity — Child of Product aggregate
 * @module product-service/domain/entities
 *
 * Business rules:
 * - Option-based attributes (select/multiselect) require options
 * - Value type must match attribute type
 * - Per-product attribute limit: 50
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ATTRIBUTE, ATTRIBUTE_TYPE } from '@vubon/shared-constants/business/product';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface ProductAttributeOptionItem {
  readonly value: string;
  readonly label: string;
  readonly sortOrder: number;
}

export type AttributeValuePrimitive = string | number | boolean | readonly string[];

export interface ProductAttributeEntityProps {
  readonly productId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
  readonly options?: readonly ProductAttributeOptionItem[];
  readonly value?: AttributeValuePrimitive;
}

const OPTION_BASED_TYPES: readonly string[] = [
  ATTRIBUTE_TYPE.SELECT,
  ATTRIBUTE_TYPE.MULTISELECT,
];

export class ProductAttributeEntity extends BaseEntity<string> {
  private readonly _productId: string;
  private _name: string;
  private _slug: string;
  private readonly _type: string;
  private _isRequired: boolean;
  private _isSearchable: boolean;
  private _isFilterable: boolean;
  private _unit?: string;
  private _options?: readonly ProductAttributeOptionItem[];
  private _value?: AttributeValuePrimitive;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductAttributeEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._name = props.name;
    this._slug = props.slug;
    this._type = props.type;
    this._isRequired = props.isRequired;
    this._isSearchable = props.isSearchable;
    this._isFilterable = props.isFilterable;
    this._unit = props.unit;
    this._options = props.options ? Object.freeze([...props.options]) : undefined;
    this._value = props.value;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!(Object.values(ATTRIBUTE_TYPE) as readonly string[]).includes(this._type)) {
      throw new ValidationError(`Invalid attribute type: ${this._type}`, 'type');
    }
    if (this._name.length === 0 || this._name.length > ATTRIBUTE.NAME_MAX_LENGTH) {
      throw new ValidationError(
        `Attribute name must be 1-${ATTRIBUTE.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    if (OPTION_BASED_TYPES.includes(this._type)) {
      if (!this._options || this._options.length === 0) {
        throw new BusinessRuleError(
          `${this._type} attribute requires at least one option`,
          'ATTRIBUTE_OPTIONS_REQUIRED',
        );
      }
      if (this._options.length > ATTRIBUTE.MAX_OPTIONS) {
        throw new ValidationError(
          `Options cannot exceed ${ATTRIBUTE.MAX_OPTIONS}`,
          'options',
        );
      }
    }
  }

  // Getters
  get productId(): string { return this._productId; }
  get name(): string { return this._name; }
  get slug(): string { return this._slug; }
  get type(): string { return this._type; }
  get isRequired(): boolean { return this._isRequired; }
  get isSearchable(): boolean { return this._isSearchable; }
  get isFilterable(): boolean { return this._isFilterable; }
  get unit(): string | undefined { return this._unit; }
  get options(): readonly ProductAttributeOptionItem[] | undefined { return this._options; }
  get value(): AttributeValuePrimitive | undefined { return this._value; }

  // Business methods
  public rename(name: string, slug: string): void {
    if (name.length === 0 || name.length > ATTRIBUTE.NAME_MAX_LENGTH) {
      throw new ValidationError('Invalid attribute name', 'name');
    }
    if (slug.length === 0) throw new ValidationError('Slug cannot be empty', 'slug');
    this._name = name;
    this._slug = slug;
  }

  public changeFlags(flags: {
    isRequired?: boolean;
    isSearchable?: boolean;
    isFilterable?: boolean;
  }): void {
    if (flags.isRequired !== undefined) this._isRequired = flags.isRequired;
    if (flags.isSearchable !== undefined) this._isSearchable = flags.isSearchable;
    if (flags.isFilterable !== undefined) this._isFilterable = flags.isFilterable;
  }

  public addOption(option: ProductAttributeOptionItem): void {
    if (!OPTION_BASED_TYPES.includes(this._type)) {
      throw new BusinessRuleError(
        `Cannot add options to ${this._type} attribute`,
        'OPTIONS_NOT_ALLOWED',
      );
    }
    const options = [...(this._options ?? [])];
    if (options.some((o) => o.value === option.value)) {
      throw new BusinessRuleError(
        `Option "${option.value}" already exists`,
        'DUPLICATE_OPTION',
      );
    }
    if (options.length >= ATTRIBUTE.MAX_OPTIONS) {
      throw new BusinessRuleError(
        `Option limit reached (${ATTRIBUTE.MAX_OPTIONS})`,
        'OPTION_LIMIT_REACHED',
      );
    }
    options.push(option);
    this._options = Object.freeze(options);
  }

  public removeOption(value: string): void {
    if (!this._options) return;
    this._options = Object.freeze(this._options.filter((o) => o.value !== value));
  }

  public setValue(value: AttributeValuePrimitive): void {
    if (!this.validateValue(value)) {
      throw new ValidationError(
        `Invalid value for attribute type "${this._type}"`,
        'value',
      );
    }
    this._value = value;
  }

  public clearValue(): void {
    this._value = undefined;
  }

  // Queries
  public validateValue(value: AttributeValuePrimitive): boolean {
    switch (this._type) {
      case ATTRIBUTE_TYPE.TEXT:
      case ATTRIBUTE_TYPE.COLOR:
        return typeof value === 'string' && value.length <= ATTRIBUTE.VALUE_MAX_LENGTH;
      case ATTRIBUTE_TYPE.NUMBER:
        return typeof value === 'number' && Number.isFinite(value);
      case ATTRIBUTE_TYPE.BOOLEAN:
        return typeof value === 'boolean';
      case ATTRIBUTE_TYPE.SELECT:
        return typeof value === 'string' && this.hasOption(value);
      case ATTRIBUTE_TYPE.MULTISELECT:
        return (
          Array.isArray(value) &&
          value.every((v) => typeof v === 'string' && this.hasOption(v))
        );
      case ATTRIBUTE_TYPE.DATE:
        return typeof value === 'string' && !Number.isNaN(Date.parse(value));
      default:
        return false;
    }
  }

  public hasOption(value: string): boolean {
    return (this._options ?? []).some((o) => o.value === value);
  }

  public isOptionBased(): boolean {
    return OPTION_BASED_TYPES.includes(this._type);
  }

  // Factories
  public static create(params: {
    id: string;
    props: ProductAttributeEntityProps;
    now: string;
  }): ProductAttributeEntity {
    return new ProductAttributeEntity(params.id, params.now, params.now, params.props);
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductAttributeEntityProps;
  }): ProductAttributeEntity {
    return new ProductAttributeEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
