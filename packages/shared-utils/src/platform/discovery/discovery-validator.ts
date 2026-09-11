import { DISCOVERY } from '@vubon/shared-constants/src/platform/discovery/discovery.constants';

export interface DiscoveryInput {
  status: string;
  type: string;
}

export const validateDiscovery = (
  discovery: Partial<DiscoveryInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (discovery.status && !Object.keys(DISCOVERY.STATUS).includes(discovery.status)) {
    errors.push('Invalid discovery status');
  }
  if (discovery.type && !Object.keys(DISCOVERY.DISCOVERY_TYPES).includes(discovery.type)) {
    errors.push('Invalid discovery type');
  }
  return { isValid: errors.length === 0, errors };
};
