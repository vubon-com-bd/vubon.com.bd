import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface FilterOptions {
  fields: string[];
  operators?: string[];
  groups?: string[];
}

export interface FilterDefinition {
  id: string;
  name: string;
  field: string;
  operator: string;
  value: unknown;
  group?: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterGroup {
  id: string;
  name: string;
  filters: FilterDefinition[];
  logic: 'and' | 'or';
  enabled: boolean;
}

export interface FilterTemplate {
  id: string;
  name: string;
  description?: string;
  filters: FilterDefinition[];
  groups: FilterGroup[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export class FilterEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async getAvailableFilters(resource: string): Promise<FilterOptions> {
    return this.client.get<FilterOptions>(`/filters/available/${resource}`);
  }

  async createFilter(
    filter: Omit<FilterDefinition, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<FilterDefinition> {
    return this.client.post<FilterDefinition>('/filters', filter);
  }

  async updateFilter(id: string, filter: Partial<FilterDefinition>): Promise<FilterDefinition> {
    return this.client.patch<FilterDefinition>(`/filters/${id}`, filter);
  }

  async deleteFilter(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/filters/${id}`);
  }

  async getFilter(id: string): Promise<FilterDefinition> {
    return this.client.get<FilterDefinition>(`/filters/${id}`);
  }

  async listFilters(resource?: string): Promise<FilterDefinition[]> {
    const params: Record<string, string> = {};
    if (resource) params.resource = resource;
    return this.client.get<FilterDefinition[]>('/filters', { params });
  }

  async createFilterGroup(group: Omit<FilterGroup, 'id'>): Promise<FilterGroup> {
    return this.client.post<FilterGroup>('/filters/groups', group);
  }

  async updateFilterGroup(id: string, group: Partial<FilterGroup>): Promise<FilterGroup> {
    return this.client.patch<FilterGroup>(`/filters/groups/${id}`, group);
  }

  async deleteFilterGroup(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/filters/groups/${id}`);
  }

  async getFilterGroup(id: string): Promise<FilterGroup> {
    return this.client.get<FilterGroup>(`/filters/groups/${id}`);
  }

  async listFilterGroups(resource?: string): Promise<FilterGroup[]> {
    const params: Record<string, string> = {};
    if (resource) params.resource = resource;
    return this.client.get<FilterGroup[]>('/filters/groups', { params });
  }

  async saveFilterTemplate(
    template: Omit<FilterTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<FilterTemplate> {
    return this.client.post<FilterTemplate>('/filters/templates', template);
  }

  async getFilterTemplate(id: string): Promise<FilterTemplate> {
    return this.client.get<FilterTemplate>(`/filters/templates/${id}`);
  }

  async listFilterTemplates(resource?: string): Promise<FilterTemplate[]> {
    const params: Record<string, string> = {};
    if (resource) params.resource = resource;
    return this.client.get<FilterTemplate[]>('/filters/templates', { params });
  }

  async deleteFilterTemplate(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/filters/templates/${id}`);
  }

  async applyFilters(
    resource: string,
    filters: {
      filters: FilterDefinition[];
      groups: FilterGroup[];
    }
  ): Promise<{ count: number; items: unknown[] }> {
    return this.client.post<{ count: number; items: unknown[] }>(
      `/filters/apply/${resource}`,
      filters
    );
  }
}
