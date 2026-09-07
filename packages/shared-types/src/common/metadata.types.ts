export interface Metadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version: number;
  tags?: string[];
  notes?: string;
  custom?: Record<string, unknown>;
}

export type MetadataKey = keyof Metadata;
