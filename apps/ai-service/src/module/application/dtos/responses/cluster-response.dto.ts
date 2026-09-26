export interface ClusterEntryResponseDTO {
  readonly clusterIndex: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

export interface ClusterResponseDTO {
  readonly id: string;
  readonly algorithm: string;
  readonly clusterCount: number;
  readonly totalMembers: number;
  readonly clusters: readonly ClusterEntryResponseDTO[];
  readonly createdAt: string;
}
