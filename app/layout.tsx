import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import CustomCursor from './components/CustomCursor';
import { ContentProvider } from '@/lib/content/ContentProvider';
import { loadSiteContent } from '@/lib/content/loadSiteContent';

export const metadata: Metadata = {
  title: {
    default: 'Fillablank — Digital Product Engineering & Bespoke Craft',
    template: '%s | Fillablank Studio',
  },
  description:
    'Fillablank turns the ambitious blank canvas into high-performance digital reality. Elite digital product engineering, mission-critical mobile systems, and bespoke web architecture.',
  keywords: [
    'Fillablank',
    'digital product studio',
    'bespoke web engineering',
    'mobile app development',
    'Flutter',
    'Next.js',
    'GSAP',
    'custom software architecture',
    'high-performance web platforms',
  ],
  authors: [{ name: 'Fillablank Studio' }],
  creator: 'Fillablank Studio',
  publisher: 'Fillablank Studio',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fillablank.com'),
  openGraph: {
    title: 'Fillablank — Digital Product Engineering & Bespoke Craft',
    description:
      'We turn the ambitious blank canvas into high-performance reality. A focused studio of elite builders.',
    siteName: 'Fillablank Studio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/paintings/hero-canvas.webp',
        width: 1200,
        height: 630,
        alt: 'Fillablank Studio — Genesis of Execution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fillablank — Digital Product Engineering & Bespoke Craft',
    description:
      'We turn the ambitious blank canvas into high-performance reality. A focused studio of elite builders.',
    images: ['/paintings/hero-canvas.webp'],
    creator: '@fillablank',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await loadSiteContent();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Fillablank Studio',
    description:
      'Digital product engineering studio turning ambitious blank canvases into high-performance digital reality.',
    url: 'https://fillablank.com',
    email: 'hello@fillablank.com',
    telephone: '+963997748481',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Damascus',
      addressCountry: 'SY',
    },
    sameAs: [
      'https://github.com/fillablank',
      'https://linkedin.com/company/fillablank',
    ],
  };

  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0a0a0c] text-[#f4f3ef] font-sans antialiased selection:bg-[#d4a359] selection:text-[#0a0a0c] relative">
        <div className="film-grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <Providers>
          <ContentProvider initialContent={initialContent}>
            {children}
          </ContentProvider>
        </Providers>

        {/* Permanent viewport bottom subtle dark fade — always present wherever user scrolls */}
        <div
          className="fixed bottom-0 left-0 right-0 h-20 sm:h-28 pointer-events-none z-[999] bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent"
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
