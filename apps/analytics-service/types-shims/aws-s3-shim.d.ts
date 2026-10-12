declare module '@aws-sdk/client-s3' {
  export class S3Client {
    constructor(options: unknown);
    send(cmd: unknown): Promise<unknown>;
  }
  export class PutObjectCommand {
    constructor(args: unknown);
  }
  export class GetObjectCommand {
    constructor(args: unknown);
  }
  export class DeleteObjectCommand {
    constructor(args: unknown);
  }
}
