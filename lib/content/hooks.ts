// lib/content/hooks.ts

import { useContent } from './ContentProvider';

export function useHeroContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.hero,
    loading,
    getIcon
  };
}

export function useServicesContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.services,
    loading,
    getIcon
  };
}

export function useProjectsContent() {
  const { content, loading, getIcon, resolveImagePath } = useContent();
  return {
    content: content?.projects,
    loading,
    getIcon,
    resolveImagePath
  };
}

export function useAboutContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.about,
    loading,
    getIcon
  };
}

export function useContactContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.contact,
    loading,
    getIcon
  };
}

export function useFooterContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.footer,
    loading,
    getIcon
  };
}

export function useNavigationContent() {
  const { content, loading, getIcon } = useContent();
  return {
    content: content?.navigation,
    loading,
    getIcon
  };
}
