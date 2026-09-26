/**
 * PromptSanitizerService — Sanitize user prompts before LLM
 * @module ai-service/infrastructure/services/internal
 *
 * Removes HTML tags, script injection vectors, and dangerous
 * URL schemes to prevent prompt injection & XSS.
 */
import { Injectable } from '@nestjs/common';

const SCRIPT_OPEN = /<\s*script\b[^>]*>/gi;
const SCRIPT_CLOSE = /<\s*\/\s*script\s*>/gi;
const ANY_TAG = /<[^>]*>/g;
const DANGEROUS_SCHEMES = /(?:javascript|data|vbscript|file|blob)\s*:/gi;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

@Injectable()
export class PromptSanitizerService {
  sanitize(text: string): string {
    if (typeof text !== 'string') return '';

    let output = text;

    // Remove entire <script>...</script> blocks (with optional spaces)
    output = output.replace(SCRIPT_OPEN, '');
    output = output.replace(SCRIPT_CLOSE, '');

    // Strip all remaining HTML tags
    output = output.replace(ANY_TAG, '');

    // Neutralize dangerous URL schemes
    output = output.replace(DANGEROUS_SCHEMES, '');

    // Remove control characters (except \n, \t)
    output = output.replace(CONTROL_CHARS, (ch) =>
      ch === '\n' || ch === '\t' ? ch : '',
    );

    return output.trim();
  }
}
