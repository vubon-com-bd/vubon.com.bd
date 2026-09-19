export interface VersionResponse {
  readonly name: string;
  readonly version: string;
  readonly environment: string;
  readonly buildSha?: string;
  readonly buildTime?: string;
}
