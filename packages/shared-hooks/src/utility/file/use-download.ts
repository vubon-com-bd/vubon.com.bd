import { useCallback } from 'react';

/** Returns a function that triggers a browser download. */
export function useDownload(): {
  readonly download: (blobOrUrl: Blob | string, filename?: string) => void;
} {
  return {
    download: useCallback((blobOrUrl: Blob | string, filename?: string) => {
      if (typeof document === 'undefined') return;
      const url = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
      const a = document.createElement('a');
      a.href = url;
      if (filename) a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (typeof blobOrUrl !== 'string') {
        // Give the browser time to start the download.
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    }, []),
  };
}
