/**
 * Unique ID Generator — cryptographically secure.
 */
import { secureUUID } from '../helper/crypto.helper';

export const generateUniqueId = (): string => secureUUID();
