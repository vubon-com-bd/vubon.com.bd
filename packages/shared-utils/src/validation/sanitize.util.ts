/**
 * Sanitizes HTML by removing all HTML tags and potentially dangerous content
 *
 * @param input - The string to sanitize
 * @returns The sanitized string with HTML tags removed
 *
 * @example
 * sanitizeHtml('<p>Hello <b>World</b></p>') // 'Hello World'
 * sanitizeHtml('<script>alert("xss")</script>') // 'alert("xss")'
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags and decode entities
  return input
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 *
 * @param input - The string to escape
 * @returns The escaped string safe for HTML output
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  return input.replace(/[&<>"'/`=]/g, (char) => htmlEscapes[char] || char);
}

/**
 * Removes script tags and JavaScript event handlers from HTML
 *
 * @param input - The string to clean
 * @returns The cleaned string with scripts and event handlers removed
 *
 * @example
 * removeScripts('<script>alert("xss")</script><p>Hello</p>')
 * // '<p>Hello</p>'
 */
export function removeScripts(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let cleaned = input;

  // Remove script tags and their content
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove inline JavaScript event handlers
  cleaned = cleaned.replace(/\s(on\w+)\s*=\s*(["'])(?:(?!\2).)*?\2/gi, '');

  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript\s*:/gi, '');

  // Remove src="javascript:..." patterns
  cleaned = cleaned.replace(/src\s*=\s*(["'])(javascript\s*:.*?)\1/gi, '');

  // Remove href="javascript:..." patterns
  cleaned = cleaned.replace(/href\s*=\s*(["'])(javascript\s*:.*?)\1/gi, '');

  return cleaned.trim();
}

/**
 * Removes event handler attributes from HTML elements
 *
 * @param input - The string to clean
 * @returns The cleaned string with event handlers removed
 *
 * @example
 * removeEventHandlers('<div onclick="doSomething()">Click</div>')
 * // '<div>Click</div>'
 */
export function removeEventHandlers(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const eventHandlers = [
    'onabort',
    'onblur',
    'onchange',
    'onclick',
    'oncontextmenu',
    'oncopy',
    'oncut',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'onerror',
    'onfocus',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onpaste',
    'onreset',
    'onresize',
    'onscroll',
    'onselect',
    'onsubmit',
    'ontouchcancel',
    'ontouchend',
    'ontouchmove',
    'ontouchstart',
    'onwheel',
  ];

  let cleaned = input;

  // Remove event handler attributes
  const eventPattern = new RegExp(
    `\\s(${eventHandlers.join('|')})\\s*=\\s*(["'])(?:(?!\\2).)*?\\2`,
    'gi'
  );
  cleaned = cleaned.replace(eventPattern, '');

  // Remove event handler attributes with single quotes (already handled above)
  // Remove event handler attributes with no quotes
  cleaned = cleaned.replace(
    new RegExp(`\\s(${eventHandlers.join('|')})\\s*=\\s*[^\\s>"']+`, 'gi'),
    ''
  );

  return cleaned.trim();
}

/**
 * Checks if a string contains SQL injection patterns
 *
 * @param input - The string to check
 * @returns `true` if SQL injection patterns are detected, `false` otherwise
 *
 * @example
 * hasSqlInjectionPattern("SELECT * FROM users WHERE id = '1' OR '1'='1'")
 * // true
 * hasSqlInjectionPattern("Hello World")
 * // false
 */
export function hasSqlInjectionPattern(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const sqlPatterns = [
    /(\bSELECT\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bCREATE\b.*\bTABLE\b)/i,
    /(\bALTER\b.*\bTABLE\b)/i,
    /(\bEXEC\b)/i,
    /(\bEXECUTE\b)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bOR\s+1\s*=\s*1\b)/i,
    /('.*?OR.*?'.*?=.*?')/i,
    /('.*?AND.*?'.*?=.*?')/i,
    /(--\s*$)/, // SQL comment
    /(;.*\bDROP\b)/i,
    /(;.*\bDELETE\b)/i,
    /(;.*\bUPDATE\b)/i,
    /(;.*\bINSERT\b)/i,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}

/**
 * Sanitizes a string by applying multiple sanitization methods
 *
 * @param input - The string to sanitize
 * @param options - Sanitization options
 * @returns The fully sanitized string
 *
 * @example
 * sanitize('<script>alert("xss")</script><p>Hello</p>')
 * // 'Hello'
 */
export function sanitize(
  input: string,
  options: {
    removeHtml?: boolean;
    escapeHtml?: boolean;
    removeScripts?: boolean;
    removeEventHandlers?: boolean;
    checkSqlInjection?: boolean;
  } = {}
): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let result = input;

  // Apply sanitization based on options or defaults
  if (options.removeScripts !== false) {
    result = removeScripts(result);
  }

  if (options.removeEventHandlers !== false) {
    result = removeEventHandlers(result);
  }

  if (options.removeHtml !== false) {
    result = sanitizeHtml(result);
  }

  if (options.escapeHtml) {
    result = escapeHtml(result);
  }

  if (options.checkSqlInjection) {
    // Just check but don't modify
    const hasInjection = hasSqlInjectionPattern(result);
    if (hasInjection) {
      // You might want to log this or handle it differently
      // For now, we'll just return the sanitized result
      console.warn('SQL injection pattern detected in input');
    }
  }

  return result.trim();
}

/**
 * Sanitizes a string for use in a URL
 *
 * @param input - The string to sanitize for URL usage
 * @returns The sanitized string safe for URLs
 *
 * @example
 * sanitizeUrl('https://example.com?q=<script>alert("xss")</script>')
 * // 'https://example.com?q=alert("xss")'
 */
export function sanitizeUrl(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let result = input;

  // Remove javascript: protocol
  result = result.replace(/javascript\s*:/gi, '');

  // Remove data: protocol
  result = result.replace(/data\s*:/gi, '');

  // Remove vbscript: protocol
  result = result.replace(/vbscript\s*:/gi, '');

  // Encode special characters
  result = encodeURI(result);

  return result;
}

/**
 * Sanitizes a string for use in a file name
 *
 * @param input - The string to sanitize for file name usage
 * @param replacement - The character to replace invalid characters with (default: '_')
 * @returns The sanitized string safe for file names
 *
 * @example
 * sanitizeFileName('file<name>.txt?query=test')
 * // 'file_name_.txt_query_test'
 */
export function sanitizeFileName(input: string, replacement: string = '_'): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove path traversal
  let result = input.replace(/\.\./g, '');

  // Remove directory separators
  result = result.replace(/[\\/]/g, replacement);

  // Remove other dangerous characters
  result = result.replace(/[<>:"|?*]/g, replacement);

  // Remove control characters
  result = result.replace(/[\x00-\x1f\x7f]/g, '');

  // Trim whitespace
  result = result.trim();

  // Remove leading/trailing dots and spaces
  result = result.replace(/^[.\s]+|[.\s]+$/g, '');

  return result || 'file';
}
