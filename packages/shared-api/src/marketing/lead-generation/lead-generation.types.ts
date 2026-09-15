export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
export type LeadSource = 'web_form' | 'landing_page' | 'ad' | 'referral' | 'manual';

export interface Lead {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly source: LeadSource;
  readonly status: LeadStatus;
  readonly notes?: string;
  readonly createdAt: string;
}

export interface CreateLeadRequest {
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly source: LeadSource;
  readonly notes?: string;
}

export interface LeadListResponse {
  readonly leads: readonly Lead[];
  readonly total: number;
}
