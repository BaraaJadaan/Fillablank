# Content Management Infrastructure

This directory contains the core infrastructure for the content management system that externalizes website content into JSON configuration files.

## Directory Structure

```
lib/content/
├── __tests__/          # Test files
│   ├── setup.test.ts   # Testing infrastructure verification
│   ├── types.test.ts   # Type definitions tests
│   ├── manager.test.ts # ContentManager tests
│   ├── ContentProvider.test.tsx # ContentProvider tests
│   └── hooks.test.ts   # Custom hooks tests
├── types.ts            # TypeScript type definitions for all content sections
├── iconMap.ts          # Lucide React icon mapping
├── manager.ts          # ContentManager singleton for loading and validating content
├── ContentProvider.tsx # React Context provider for content state
├── hooks.ts            # Section-specific custom hooks
└── README.md           # This file
```

## Files

### types.ts

Defines TypeScript interfaces for all content sections:
- `SiteContent` - Root interface containing all sections
- `HeroContent` - Hero section with headlines, CTAs, and statistics
- `ServicesContent` - Services section with service cards
- `ProjectsContent` - Projects portfolio section
- `AboutContent` - About section with story, statistics, and values
- `ContactContent` - Contact information and form fields
- `FooterContent` - Footer links, social media, and newsletter
- `NavigationContent` - Navigation menu and branding

### iconMap.ts

Maps icon identifier strings to Lucide React icon components. Includes commonly used icons:
- UI icons: Sparkles, Zap, Code, Orbit, Binary
- Action icons: ArrowRight, ArrowUpRight, Send, ExternalLink
- Feature icons: Smartphone, Globe, Brain, Palette, Rocket, Shield
- Social icons: Github, Linkedin, Twitter, Instagram
- Contact icons: Mail, Phone, MapPin
- Navigation icons: Menu, X, ArrowUp

## Testing Setup

The testing infrastructure uses:
- **Vitest** - Fast unit test runner with Jest-compatible API
- **fast-check** - Property-based testing library
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### manager.ts

ContentManager singleton class that handles:
- Loading content from `/content.json`
- Validating content structure against TypeScript schemas
- Providing fallback content on errors
- Icon mapping via `getIcon(iconName)`
- Image path resolution via `resolveImagePath(path)`

### ContentProvider.tsx

React Context provider that:
- Loads content on mount using ContentManager
- Provides content state to all child components
- Manages loading and error states
- Supports hot reload in development mode (polls every 2 seconds)
- Exports `useContent()` hook for accessing content context

### hooks.ts

Section-specific custom hooks that wrap `useContent()`:
- `useHeroContent()` - Returns hero section content, loading state, and getIcon
- `useServicesContent()` - Returns services section content, loading state, and getIcon
- `useProjectsContent()` - Returns projects section content, loading state, getIcon, and resolveImagePath
- `useAboutContent()` - Returns about section content, loading state, and getIcon
- `useContactContent()` - Returns contact section content, loading state, and getIcon
- `useFooterContent()` - Returns footer section content, loading state, and getIcon
- `useNavigationContent()` - Returns navigation section content, loading state, and getIcon

## Usage

### In Components

```typescript
import { useHeroContent } from '@/lib/content/hooks';

export function Hero() {
  const { content, loading, getIcon } = useHeroContent();
  
  if (loading) return <div>Loading...</div>;
  if (!content) return null;
  
  const BadgeIcon = getIcon(content.badge.icon);
  
  return (
    <section>
      <BadgeIcon />
      <h1>{content.mainHeadline}</h1>
      <p>{content.subHeadline}</p>
    </section>
  );
}
```

## Next Steps

The following components will be implemented in subsequent tasks:
1. content.json - Configuration file with all website content
2. Component refactoring - Update all components to use the content system
