/**
 * DTO Interface
 * @module shared-kernel/application/dtos
 *
 * Pure interface — কোনো external import নেই।
 */
export interface DTO {
  readonly _kind: 'dto';
}

export interface RequestDTO extends DTO {
  validate?(): void;
}

export interface ResponseDTO<T = unknown> extends DTO {
  readonly data: T;
}

export interface MappableDTO<TDomain = unknown> extends DTO {
  toDomain(): TDomain;
}
