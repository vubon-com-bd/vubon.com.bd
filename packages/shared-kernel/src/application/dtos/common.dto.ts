/**
 * Common DTO
 * @module shared-kernel/application/dtos
 *
 * Pure DTO — কোনো external import নেই।
 */
export class CommonDTO {
  readonly id?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  constructor(input?: Partial<CommonDTO>) {
    this.id = input?.id;
    this.createdAt = input?.createdAt;
    this.updatedAt = input?.updatedAt;
  }

  static create(input?: Partial<CommonDTO>): CommonDTO {
    return new CommonDTO(input);
  }
}
