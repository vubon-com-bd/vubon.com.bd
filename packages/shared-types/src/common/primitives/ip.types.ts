/**
 * Branded IP Types
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type IpAddress = Branded<string, 'IpAddress'>;
export type Ipv4 = Branded<string, 'Ipv4'>;
export type Ipv6 = Branded<string, 'Ipv6'>;
export type MacAddress = Branded<string, 'MacAddress'>;

export const toIpAddress = (ip: string): IpAddress => ip as IpAddress;
