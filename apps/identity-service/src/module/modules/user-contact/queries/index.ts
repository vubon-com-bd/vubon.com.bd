import {
  ListUserContactsHandler,
  GetUserContactHandler,
  ListContactsHandler,
} from '../../../application/queries/index.js';

export const USER_CONTACT_QUERY_HANDLERS = [
  ListUserContactsHandler,
  GetUserContactHandler,
  ListContactsHandler,
] as const;
