// lib/content/ContentProvider.tsx

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SiteContent } from './types';
import { contentManager } from './manager';

interface ContentContextType {
  content: SiteContent | null;
  loading: boolean;
  error: Error | null;
  getIcon: (iconName: string) => any;
  resolveImagePath: (path: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

type ContentProviderProps = {
  children: ReactNode;
  /** From server (e.g. imported content.json) so first paint is not empty while fetch runs */
  initialContent?: SiteContent | null;
};

export function ContentProvider({ children, initialContent = null }: ContentProviderProps) {
  const [content, setContent] = useState<SiteContent | null>(() => initialContent ?? null);
  const [loading, setLoading] = useState(() => initialContent == null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        if (initialContent == null) {
          setLoading(true);
        }
        const loadedContent = await contentManager.loadContent();
        if (!cancelled) {
          setContent(loadedContent);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          console.error('Failed to load content:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContent();

    // Hot reload support in development - only reload on file changes
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      let lastModified = 0;
      let lastEtag = '';

      const checkForUpdates = async () => {
        try {
          const response = await fetch('/api/site-content', { method: 'HEAD' });
          const modified = response.headers.get('last-modified');
          const modifiedTime = modified ? new Date(modified).getTime() : 0;
          const etag = response.headers.get('etag') ?? '';
          if (!etag && !modified) return;
          if (lastEtag === '' && lastModified === 0) {
            lastEtag = etag;
            lastModified = modifiedTime;
          } else if ((etag && etag !== lastEtag) || (modifiedTime && modifiedTime > lastModified)) {
            lastEtag = etag;
            lastModified = modifiedTime;
            loadContent();
          }
        } catch {
          // Silently fail — content API might not be available yet
        }
      };
      
      const interval = setInterval(checkForUpdates, 5000);
      return () => {
        clearInterval(interval);
        cancelled = true;
      };
    }

    return () => {
      cancelled = true;
    };
  }, [initialContent]);

  const value: ContentContextType = {
    content,
    loading,
    error,
    getIcon: (iconName: string) => contentManager.getIcon(iconName),
    resolveImagePath: (path: string) => contentManager.resolveImagePath(path)
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
