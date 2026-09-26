/**
 * ListAuthRolesQuery
 * @module auth-service/application/queries/auth
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAuthRolesQuery extends BaseQuery {
  readonly type = 'auth.list-roles';

  constructor() {
    super();
  }
}
