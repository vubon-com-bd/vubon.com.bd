/**
 * Multipart Parser — minimal multipart/form-data parser.
 * @module shared-utils/common/parser/multipart
 *
 * Note: For production HTTP handling, prefer `busboy` or `formidable`.
 * This helper is for lightweight cases and testing.
 */

export interface MultipartField {
  name: string;
  value: string;
  filename?: string;
  contentType?: string;
}

export interface ParsedMultipart {
  fields: Record<string, string>;
  files: MultipartField[];
}

/**
 * Extracts the boundary from a Content-Type header.
 */
export const extractBoundary = (contentType: string): string | null => {
  const match = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType);
  return match ? (match[1] ?? match[2] ?? '').trim() : null;
};

/**
 * Parses a multipart/form-data body.
 */
export const parseMultipart = (body: string, boundary: string): ParsedMultipart => {
  if (!boundary) throw new Error('Boundary is required');

  const fields: Record<string, string> = {};
  const files: MultipartField[] = [];
  const delimiter = `--${boundary}`;
  const parts = body.split(delimiter).filter((p) => p.trim() !== '' && p.trim() !== '--');

  for (const rawPart of parts) {
    const part = rawPart.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;

    const rawHeaders = part.slice(0, headerEnd);
    const value = part.slice(headerEnd + 4);

    const nameMatch = /name="([^"]+)"/i.exec(rawHeaders);
    const filenameMatch = /filename="([^"]+)"/i.exec(rawHeaders);
    const ctMatch = /Content-Type:\s*([^\r\n]+)/i.exec(rawHeaders);

    if (!nameMatch) continue;
    const name = nameMatch[1]!;

    if (filenameMatch) {
      files.push({
        name,
        value,
        filename: filenameMatch[1]!,
        contentType: ctMatch ? ctMatch[1]!.trim() : undefined,
      });
    } else {
      fields[name] = value;
    }
  }

  return { fields, files };
};
